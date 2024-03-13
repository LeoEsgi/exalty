import { useEffect, useState } from "react";
import BasicManagement from "./BasicManagement";
import { DialogMsg, match, match_status } from "../Models";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./MatchManagement.css";
import { CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import { handleUpload, imageUpload } from "../ImageUpload";
import DownloadIcon from "@mui/icons-material/Download";
function MatchManagement() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("0");
  const [matches, setMatches] = useState<match[]>([]);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

  const extractToExcell = () => {
    const workbook = XLSX.utils.book_new();

    const matchesSheet = XLSX.utils.json_to_sheet(matches);

    XLSX.utils.book_append_sheet(workbook, matchesSheet, "Matchs");

    XLSX.writeFile(
      workbook,
      `Liste-des-Matchs-${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShow(value);
  };

  const handleImgOpponentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = function (e) {
        console.log(e.target!.result);
        const imgDataUrl = e.target!.result;
        const img = document.getElementById(
          "matchImage-" + event.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setMatches(
            matches.map((match) => {
              if (match.id === parseInt(event.target.id.split("-")[3], 10)) {
                return {
                  ...match,
                  opponent_logo: imgDataUrl,
                  new_img: event.target.files![0],
                };
              }
              return match;
            })
          );
          img.src = imgDataUrl;
        }
      };

      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const getMatches = async () => {
    const response = await axios.get("http://localhost:5000/match/");
    return response.data as match[];
  };

  function formatDateToString(date: Date) {
    return date.toISOString().split("T")[0];
  }

  useEffect(() => {
    const fetchGames = async () => {
      const matches = await getMatches();
      if (Array.isArray(matches)) {
        setMatches(matches);
      } else {
        console.error("Expected an array of games, but got:", matches);
      }
    };

    fetchGames();
  }, []);
  return (
    <BasicManagement
      className={"MatchManagement"}
      title={"Gestion des matchs"}
      content={
        <>
          <div className="object-selector">
            <select onChange={handleChange} className="object-selector-select">
              <option value="0">Matchs en cours</option>
              <option value="1">Matchs prochains</option>
              <option value="2">Matchs terminés</option>
            </select>
          </div>
          <div
            style={{
              display: show === "0" ? "flex" : "none",
            }}
            className="object-editor"
          >
            <div className="object-edit">
              <div className="object-fct">
                <button
                  className="btn-add"
                  onClick={() => {
                    setMatches([
                      new match(
                        0,
                        new Date(),
                        "",
                        "",
                        "",
                        "",
                        0,
                        0,
                        match_status.NOT_STARTED,
                        "",
                        ""
                      ),

                      ...matches,
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
                    <th>Date</th>
                    <th>Titre</th>
                    <th>Instance</th>
                    <th>Adversaire</th>
                    <th>Score Exa</th>
                    <th>Score Adverse</th>
                    <th>Format</th>
                    <th>Status</th>
                    <th>Lien</th>
                    <th>Timezone</th>
                    <th>Logo</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {matches
                    .filter((match) => !match.deleted)
                    .map((match, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            value={formatDateToString(new Date(match.date))}
                            type="date"
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      date: new Date(event.target.value),
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
                            value={match.title}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return { ...g, title: event.target.value };
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
                            value={match.instance}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      instance: event.target.value,
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
                            value={match.opponent}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      opponent: event.target.value,
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
                            value={match.score_exa}
                            type="number"
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      score_exa: parseInt(event.target.value),
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
                            value={match.score_opponent}
                            type="number"
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      score_opponent: parseInt(
                                        event.target.value
                                      ),
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
                            value={match.format}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return { ...g, format: event.target.value };
                                  }
                                  return g;
                                })
                              );
                              setIsModified(true);
                            }}
                          ></input>
                        </td>

                        <td>
                          <select
                            value={match.status}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    const status = event.target
                                      .value as match_status;
                                    return { ...g, status: status };
                                  }
                                  return g;
                                })
                              );
                              setIsModified(true);
                            }}
                          >
                            <option value={match_status.IN_PROGRESS}>
                              En cours
                            </option>
                            <option value={match_status.NOT_STARTED}>
                              Prochain
                            </option>
                            <option value={match_status.FINISHED}>
                              Terminé
                            </option>
                          </select>
                        </td>
                        <td>
                          <input
                            value={match.link}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return { ...g, link: event.target.value };
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
                            value={match.timezone}
                            onChange={(event) => {
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      timezone: event.target.value,
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
                          id={"img-upload-change-" + match.id}
                          style={{ display: "none" }}
                          onChange={handleImgOpponentChange}
                        />
                        <td>
                          <img
                            src={
                              match.new_img
                                ? match.opponent_logo
                                : "http://localhost:5000/uploads/match/" +
                                  match.opponent_logo
                            }
                            alt={match.opponent}
                            id={"matchImage-" + match.id}
                            onClick={() => {
                              const input = document.getElementById(
                                "img-upload-change-" + match.id
                              ) as HTMLInputElement;
                              input.click();
                            }}
                          />
                        </td>
                        <td>
                          <RemoveIcon
                            className="match-delete"
                            onClick={async () => {
                              match.deleted = true;
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
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

              {loading ? (
                <CircularProgress className="progress-bar" />
              ) : (
                <button
                  className="btn btn-full"
                  disabled={!isModified}
                  onClick={async () => {
                    setLoading(true);
                    const promises = matches.map(async (match) => {
                      if (match.new_img) {
                        const uploadedFile = await handleUpload(
                          new imageUpload(
                            match.new_img,
                            match.opponent + ".png",
                            "match"
                          )
                        );
                        if (uploadedFile) {
                          return {
                            ...match,
                            opponent_logo: uploadedFile.fileName,
                          };
                        }
                      }
                      return match;
                    });

                    const newMatches = await Promise.all(promises);

                    const updatePromises = newMatches.map((match) =>
                      axios.put("http://localhost:5000/match", match)
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
          </div>
        </>
      }
    />
  );
}

export default MatchManagement;
