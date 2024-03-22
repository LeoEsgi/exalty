import { useEffect, useState } from "react";
import BasicManagement from "./BasicManagement";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CircularProgress } from "@mui/material";
import { event, DialogMsg } from "../Models";
import * as XLSX from "xlsx";
import { handleUpload, imageUpload } from "../ImageUpload";

function EventManagement() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<event[]>([]);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );
  const getEvents = async () => {
    const response = await axios
      .get("http://localhost:5000/event/")
      .catch((err) => {
        console.error("Error fetching events:", err);
        return { data: [] };
      });
    return response.data;
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onload = function (o) {
        const imgDataUrl = o.target!.result;
        const img = document.getElementById(
          "eventImage-" + e.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setEvents(
            events.map((event) => {
              if (event.id === parseInt(e.target.id.split("-")[3], 10)) {
                return {
                  ...event,
                  img: imgDataUrl,
                  new_img: e.target.files![0],
                };
              }
              return event;
            })
          );
          img.src = imgDataUrl;
        }
      };

      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const extractToExcell = () => {
    const workbook = XLSX.utils.book_new();

    const eventsSheet = XLSX.utils.json_to_sheet(events);

    XLSX.utils.book_append_sheet(workbook, eventsSheet, "Evenements");

    XLSX.writeFile(
      workbook,
      `Liste-des-Evenements-${new Date().toLocaleDateString()}.xlsx`
    );
  };
  function formatDateToString(date: Date) {
    return date.toISOString().split("T")[0];
  }
  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      if (Array.isArray(events)) {
        setEvents(events);
      } else {
        console.error("Expected an array of events, but got:", events);
      }
    };

    fetchEvents();
  }, []);
  return (
    <BasicManagement
      className={"EventManagement"}
      title={"Gestion des evenements"}
      content={
        <>
          <div className="object-edit">
            <div className="object-fct">
              <button
                className="btn-add"
                onClick={() => {
                  setEvents([
                    new event(
                      0,
                      "",
                      "",
                      "",
                      "",
                      new Date(),
                      new Date(),
                      new Date(),
                      new Date(),
                      null
                    ),

                    ...events,
                  ]);
                  setIsModified(true);
                }}
              >
                <div> Ajouter</div>
                <AddIcon />
              </button>

              <button
                className="btn-excel"
                onClick={() => {
                  extractToExcell();
                }}
              >
                <div>Extraire vers Excel </div>
                <DownloadIcon />
              </button>
            </div>
            <table className="basic-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Lien</th>
                  <th>Date de debut</th>
                  <th>Date de fin</th>
                  <th>Image</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {events
                  .filter((event) => !event.deleted)
                  .map((event, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          onChange={(e) => {
                            setEvents(
                              events.map((g) => {
                                if (g.id === event.id) {
                                  return {
                                    ...g,
                                    title: e.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                          value={event.title}
                        ></input>
                      </td>
                      <td>
                        <textarea
                          onChange={(e) => {
                            setEvents(
                              events.map((g) => {
                                if (g.id === event.id) {
                                  return {
                                    ...g,
                                    description: e.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                          }}
                          value={event.description}
                        ></textarea>
                      </td>
                      <td>
                        <input
                          onChange={(e) => {
                            setEvents(
                              events.map((g) => {
                                if (g.id === event.id) {
                                  return {
                                    ...g,
                                    link: e.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                          value={event.link}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="date"
                          value={formatDateToString(new Date(event.start_date))}
                          onChange={(e) => {
                            setEvents(
                              events.map((g) => {
                                if (g.id === event.id) {
                                  return {
                                    ...g,
                                    start_date: new Date(e.target.value),
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></input>
                      </td>
                      <td>
                        <input
                          type="date"
                          value={formatDateToString(new Date(event.end_date))}
                          onChange={(e) => {
                            setEvents(
                              events.map((g) => {
                                if (g.id === event.id) {
                                  return {
                                    ...g,
                                    end_date: new Date(e.target.value),
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></input>
                      </td>
                      <input
                        type="file"
                        accept="image/*"
                        id={"img-upload-change-" + event.id}
                        style={{ display: "none" }}
                        onChange={handleImgChange}
                      />
                      <td>
                        <img
                          src={
                            event.new_img
                              ? event.img
                              : "http://localhost:5000/uploads/event/" +
                                event.img
                          }
                          alt={event.title}
                          id={"eventImage-" + event.id}
                          style={{ width: "100px" }}
                          onClick={() => {
                            const input = document.getElementById(
                              "img-upload-change-" + event.id
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        />
                      </td>
                      <td
                        onClick={() => {
                          event.deleted = true;
                          setEvents(
                            events.map((g) => {
                              if (g.id === event.id) {
                                return {
                                  ...g,
                                  deleted: true,
                                };
                              }
                              return g;
                            })
                          );
                          setIsModified(true);
                        }}
                      >
                        <RemoveIcon />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {loading ? (
              <CircularProgress className="progress-bar" />
            ) : (
              <button
                className="btn btn-full"
                disabled={!isModified}
                onClick={async () => {
                  setLoading(true);
                  const promises = events.map(async (event) => {
                    if (event.new_img) {
                      const uploadedFile = await handleUpload(
                        new imageUpload(event.new_img, event.title, "event")
                      );
                      if (uploadedFile) {
                        return {
                          ...event,
                          img: uploadedFile.fileName,
                        };
                      }
                    }
                    return event;
                  });

                  const newEvents = await Promise.all(promises);

                  const updatePromises = newEvents.map((event) =>
                    axios.put("http://localhost:5000/event", event)
                  );

                  await Promise.all(updatePromises);
                  const dialog = new DialogMsg(
                    "Succès",
                    "Les modifications ont été sauvegardées",
                    false,
                    () => setDialogOuvert(false)
                  );
                  setDialogInstance(dialog);
                  setDialogOuvert(true);
                  setLoading(false);
                }}
              >
                Sauvegarder les modifications
              </button>
            )}

            {dialogOuvert && DialogMsg.openDialog(dialogInstance)}
          </div>
        </>
      }
    />
  );
}

export default EventManagement;
