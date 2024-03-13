import BasicManagement from "./BasicManagement";
import axios from "axios";
import { DialogMsg, sponsor } from "../Models";
import { handleUpload, imageUpload } from "../ImageUpload";
import { CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import "./SponsorManagement.css";

function SponsorManagement() {
  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState<sponsor[]>([]);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

  const getSponsors = async () => {
    const response = await axios.get("http://localhost:5000/sponsor/");
    return response.data as sponsor[];
  };

  const handleImgSponsorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = function (e) {
        const imgDataUrl = e.target!.result;
        const img = document.getElementById(
          "gameImage-" + event.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setSponsors(
            sponsors.map((sponsor) => {
              if (sponsor.id === parseInt(event.target.id.split("-")[3], 10)) {
                return {
                  ...sponsor,
                  img: imgDataUrl,
                  new_img: event.target.files![0],
                };
              }
              return sponsor;
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
    const sponsorSheet = XLSX.utils.json_to_sheet(sponsors);
    XLSX.utils.book_append_sheet(workbook, sponsorSheet, "Sponsors");
    XLSX.writeFile(
      workbook,
      `Liste-des-Sponsor-${new Date().toLocaleDateString()}.xlsx`
    );
  };

  useEffect(() => {
    const fetchSponsors = async () => {
      const sponsors = await getSponsors();
      if (Array.isArray(sponsors)) {
        setSponsors(sponsors);
      } else {
        console.error("Expected an array of sponsors, but got:", sponsors);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <BasicManagement
      className={"SponsorManagement"}
      title={"Gestion des sponsors"}
      content={
        <div className="object-editor">
          <div className="object-edit">
            <div className="object-fct">
              <button
                className="btn-add"
                onClick={() => {
                  setSponsors([
                    new sponsor(
                      0,
                      "Nom du sponsor",
                      "sponsor.png",
                      "Description du sponsor",
                      "Lien du sponsor"
                    ),
                    ...sponsors,
                  ]);
                  setIsModified(true);
                }}
              >
                <div>Ajouter </div>
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
                  <th>Nom</th>
                  <th>Description</th>
                  <th>Lien</th>
                  <th>Image</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {sponsors
                  .filter((sponsor) => !sponsor.deleted)
                  .map((sponsor, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          value={sponsor.name}
                          onChange={(event) => {
                            setSponsors(
                              sponsors.map((g) => {
                                if (g.id === sponsor.id) {
                                  return {
                                    ...g,
                                    name: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td>
                        <textarea
                          value={sponsor.description}
                          onChange={(event) => {
                            setSponsors(
                              sponsors.map((g) => {
                                if (g.id === sponsor.id) {
                                  return {
                                    ...g,
                                    description: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td>
                        <textarea
                          value={sponsor.link}
                          onChange={(event) => {
                            setSponsors(
                              sponsors.map((g) => {
                                if (g.id === sponsor.id) {
                                  return {
                                    ...g,
                                    link: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </td>
                      <td className="input-img">
                        <input
                          type="file"
                          accept="image/*"
                          id={"img-upload-change-" + sponsor.id}
                          style={{ display: "none" }}
                          onChange={handleImgSponsorChange}
                        />
                        <img
                          src={
                            sponsor.new_img
                              ? sponsor.img
                              : "http://localhost:5000/uploads/sponsor/" +
                                sponsor.img
                          }
                          alt={sponsor.name}
                          id={"gameImage-" + sponsor.id}
                          onClick={() => {
                            const input = document.getElementById(
                              "img-upload-change-" + sponsor.id
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        />
                      </td>
                      <td className="delete-icon">
                        <RemoveIcon
                          onClick={async () => {
                            sponsor.deleted = true;
                            setSponsors(
                              sponsors.map((g) => {
                                if (g.id === sponsor.id) {
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
                        ></RemoveIcon>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {loading ? (
            <CircularProgress className="progress-bar" />
          ) : (
            <button
              className="btn btn-full"
              disabled={!isModified}
              onClick={async () => {
                setLoading(true);
                const promises = sponsors.map(async (sponsor) => {
                  if (sponsor.new_img) {
                    const uploadedFile = await handleUpload(
                      new imageUpload(
                        sponsor.new_img,
                        sponsor.name + ".png",
                        "sponsor"
                      )
                    );
                    if (uploadedFile) {
                      return {
                        ...sponsor,
                        img: uploadedFile.fileName,
                      };
                    }
                  }
                  return sponsor;
                });

                const newSponsors = await Promise.all(promises);

                const updatePromises = newSponsors.map((sponsor) =>
                  axios.put(
                    "http://localhost:5000/sponsor/" + sponsor.id,
                    sponsor
                  )
                );

                await Promise.all(updatePromises);

                setLoading(false);
                setIsModified(false);
                const dialog = new DialogMsg(
                  "Succès",
                  "Les modifications ont été sauvegardées",
                  false,
                  () => setDialogOuvert(false)
                );
                setDialogInstance(dialog);
                setDialogOuvert(true);
              }}
            >
              Sauvegarder les modifications
            </button>
          )}
          {dialogOuvert && DialogMsg.openDialog(dialogInstance)}
        </div>
      }
    />
  );
}

export default SponsorManagement;
