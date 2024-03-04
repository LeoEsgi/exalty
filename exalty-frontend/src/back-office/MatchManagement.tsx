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
      className={"ShopManagement"}
      title={"Gestion de la boutique"}
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
                  className="btn"
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
                  Ajouter <AddIcon className="add-icon"></AddIcon>
                </button>

                <button
                  className="btn"
                  onClick={() => {
                    extractToExcell();
                  }}
                >
                  Extraire vers Excel
                </button>
              </div>
              <div className="object-list">
                <div className="object-fields">
                  <label className="column-date">Date</label>
                  <label className="column-title">Titre</label>
                  <label className="column-instance">Instance</label>
                  <label className="column-opponent">Adversaire</label>
                  <label className="column-score">Score</label>
                  <label className="column-format">Format</label>
                  <label className="column-status">Status</label>
                  <label className="column-link">Lien</label>
                  <label className="column-timezone">Timezone</label>
                  <label className="column-opponent-logo">Logo</label>
                  <label className="column-delete">Delete</label>
                </div>
                {matches
                  .filter((match) => !match.deleted)
                  .map((match, index) => {
                    return (
                      <div className="object" key={index}>
                        <div className="match-date">
                          <input
                            value={match.date.toLocaleString()}
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
                        </div>
                        <div className="match-title">
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
                        </div>
                        <div className="match-instance">
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
                        </div>
                        <div className="match-opponent">
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
                        </div>

                        <div className="match-score">
                          <input
                            value={
                              match.score_exa + " - " + match.score_opponent
                            }
                            onChange={(event) => {
                              const scores = event.target.value.split(" - ");
                              setMatches(
                                matches.map((g) => {
                                  if (g.id === match.id) {
                                    return {
                                      ...g,
                                      score_exa: parseInt(scores[0]),
                                      score_opponent: parseInt(scores[1]),
                                    };
                                  }
                                  return g;
                                })
                              );
                              setIsModified(true);
                            }}
                          ></input>
                        </div>

                        <div className="match-format">
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
                        </div>

                        <div className="match-status">
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
                        </div>
                        <div className="match-link">
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
                        </div>
                        <div className="match-timezone">
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
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id={"img-upload-change-" + match.id}
                          style={{ display: "none" }}
                          onChange={handleImgOpponentChange}
                        />
                        <div className="match-opponent-logo">
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
                        </div>
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
                      </div>
                    );
                  })}
              </div>
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
