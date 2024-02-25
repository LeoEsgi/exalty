import { useEffect, useState } from "react";
import BasicManagement from "./BasicManagement";
import { DialogMsg, match, match_status } from "../Models";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
function MatchManagement() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("0");
  const [matches, setMatches] = useState<match[]>([]);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShow(value);
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
              <div
                className="object-add"
                onClick={() => {
                  setMatches([
                    new match(
                      0,
                      new Date(),
                      "title",
                      "instance",
                      "opponent",
                      "opponent_logo",
                      0,
                      0,
                      match_status.IN_PROGRESS,
                      "link",
                      "timezone"
                    ),
                    ...matches,
                  ]);
                  setIsModified(true);
                }}
              >
                Ajouter <AddIcon className="add-icon"></AddIcon>
              </div>
              <div className="object-list">
                <div className="object-fields">
                  <label className="column-date">Date</label>
                  <label className="column-title">Titre</label>
                  <label className="column-instance">Instance</label>
                  <label className="column-opponent">Adversaire</label>
                  <label className="column-opponent-logo">Logo</label>
                  <label className="column-score">Score</label>
                  <label className="column-status">Status</label>
                  <label className="column-link">Lien</label>
                  <label className="column-timezone">Timezone</label>
                </div>
                {matches.map((match, index) => {
                  return (
                    <div className="object" key={index}>
                      <div className="game-date">
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
                      <div className="game-title">
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
                      <div className="game-instance">
                        <input
                          value={match.instance}
                          onChange={(event) => {
                            setMatches(
                              matches.map((g) => {
                                if (g.id === match.id) {
                                  return { ...g, instance: event.target.value };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></input>
                      </div>
                      <div className="game-opponent">
                        <input
                          value={match.opponent}
                          onChange={(event) => {
                            setMatches(
                              matches.map((g) => {
                                if (g.id === match.id) {
                                  return { ...g, opponent: event.target.value };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></input>
                      </div>
                      <div className="game-opponent-logo">
                        <input
                          value={match.opponent_logo}
                          onChange={(event) => {
                            setMatches(
                              matches.map((g) => {
                                if (g.id === match.id) {
                                  return {
                                    ...g,
                                    opponent_logo: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></input>
                      </div>
                      <div className="game-score">
                        <input
                          value={match.score_exa + " - " + match.score_opponent}
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
                      <div className="game-status">
                        <select
                          value={match.status}
                          onChange={(event) => {
                            // setMatches(
                            //   matches.map((g) => {
                            //     if (g.id === match.id) {
                            //       return { ...g, status: event.target.value };
                            //     }
                            //     return g;
                            //   })
                            // );
                            setIsModified(true);
                          }}
                        >
                          <option value="IN_PROGRESS">En cours</option>
                          <option value="UPCOMING">Prochain</option>
                          <option value="FINISHED">Terminé</option>
                        </select>
                      </div>
                      <div className="game-link">
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
                      <div className="game-timezone">
                        <input
                          value={match.timezone}
                          onChange={(event) => {
                            setMatches(
                              matches.map((g) => {
                                if (g.id === match.id) {
                                  return { ...g, timezone: event.target.value };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        ></input>
                      </div>
                      <RemoveIcon
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
            </div>
          </div>

          <div
            style={{
              display: show === "1" ? "flex" : "none",
            }}
            className="object-editor"
          ></div>
        </>
      }
    />
  );
}

export default MatchManagement;
