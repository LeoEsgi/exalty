import { useEffect, useState } from "react";
import BasicManagement from "./BasicManagement";
import "./TeamManagement.css";
import axios from "axios";
import { DialogMsg, game, player } from "../Models";
import { handleUpload, imageUpload } from "../ImageUpload";
import { CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as XLSX from "xlsx";

function TeamManagement() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("0");
  const [games, setGames] = useState<game[]>([]);
  const [players, setPlayers] = useState<player[]>([]);
  const [isModified, setIsModified] = useState(false);
  const [dialogOuvert, setDialogOuvert] = useState(false);
  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );

  const extractToExcell = () => {
    const workbook = XLSX.utils.book_new();

    const gamesSheet = XLSX.utils.json_to_sheet(
      games.map((game) => ({
        Nom: game.name,
        Titre: game.title,
        Description: game.desc,
      }))
    );

    const playersSheet = XLSX.utils.json_to_sheet(
      players.map((player) => ({
        Nom: player.name,
        Role: player.role,
        Jeu: games.find((game) => game.id === player.game_id)?.name,
      }))
    );

    XLSX.utils.book_append_sheet(workbook, gamesSheet, "Jeux");
    XLSX.utils.book_append_sheet(workbook, playersSheet, "Joueurs");

    XLSX.writeFile(
      workbook,
      `Liste-des-Jeux-${new Date().toLocaleDateString()}.xlsx`
    );
  };

  const handleImgGameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = function (e) {
        const imgDataUrl = e.target!.result;
        const img = document.getElementById(
          "gameImage-" + event.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setGames(
            games.map((game) => {
              if (game.id === parseInt(event.target.id.split("-")[3], 10)) {
                return {
                  ...game,
                  img: imgDataUrl,
                  new_img: event.target.files![0],
                };
              }
              return game;
            })
          );
          img.src = imgDataUrl;
        }
      };

      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const handleImgPlayerChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];

      reader.onload = function (e) {
        console.log(e.target!.result);
        const imgDataUrl = e.target!.result;
        const img = document.getElementById(
          "playerImage-" + event.target.id.split("-")[3]
        ) as HTMLImageElement;
        if (typeof imgDataUrl === "string") {
          setPlayers(
            players.map((player) => {
              if (player.id === parseInt(event.target.id.split("-")[3], 10)) {
                return {
                  ...player,
                  img: imgDataUrl,
                  new_img: event.target.files![0],
                };
              }
              return player;
            })
          );
          img.src = imgDataUrl;
        }
      };

      reader.readAsDataURL(file);
      setIsModified(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setShow(value);
  };

  const getGames = async () => {
    const response = await axios.get("http://localhost:5000/game/");
    return response.data as game[];
  };

  const getPlayers = async () => {
    const response = await axios.get("http://localhost:5000/player/");
    return response.data as player[];
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames();
      if (Array.isArray(games)) {
        setGames(games);
      } else {
        console.error("Expected an array of games, but got:", games);
      }
      const players = await getPlayers();
      if (Array.isArray(players)) {
        setPlayers(players);
      } else {
        console.error("Expected an array of players, but got:", players);
      }
    };

    fetchGames();
  }, []);

  return (
    <BasicManagement
      className={"TeamManagement"}
      title={"Gestion des equipes"}
      content={
        <>
          <div className="object-selector">
            <select onChange={handleChange} className="object-selector-select">
              <option value="0">Jeux</option>
              <option value="1">Equipes</option>
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
                    setGames([
                      new game(
                        0,
                        "Nom du jeu",
                        "Titre du jeu",
                        "Description",
                        "game.png"
                      ),

                      ...games,
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
                  <label className="column-name">Nom</label>
                  <label className="column-title">Titre</label>
                  <label className="column-desc">Description</label>
                  <label className="column-img">Image</label>
                </div>
                {games.map((game, index) => {
                  return (
                    <div className="object" key={index}>
                      <div className="game-name">
                        <input
                          value={game.name}
                          onChange={(event) => {
                            setGames(
                              games.map((g) => {
                                if (g.id === game.id) {
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
                        ></input>
                      </div>
                      <div className="game-title">
                        <textarea
                          value={game.title}
                          onChange={(event) => {
                            setGames(
                              games.map((g) => {
                                if (g.id === game.id) {
                                  return {
                                    ...g,
                                    title: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <div className="game-description">
                        <textarea
                          value={game.desc}
                          onChange={(event) => {
                            setGames(
                              games.map((g) => {
                                if (g.id === game.id) {
                                  return {
                                    ...g,
                                    desc: event.target.value,
                                  };
                                }
                                return g;
                              })
                            );
                            setIsModified(true);
                          }}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        id={"img-upload-change-" + game.id}
                        style={{ display: "none" }}
                        onChange={handleImgGameChange}
                      />
                      <div className="game-logo">
                        <img
                          src={
                            game.new_img
                              ? game.img
                              : "http://localhost:5000/uploads/game/" + game.img
                          }
                          alt={game.name}
                          id={"gameImage-" + game.id}
                          onClick={() => {
                            const input = document.getElementById(
                              "img-upload-change-" + game.id
                            ) as HTMLInputElement;
                            input.click();
                          }}
                        />
                      </div>
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
                    const promises = games.map(async (game) => {
                      if (game.new_img) {
                        const uploadedFile = await handleUpload(
                          new imageUpload(
                            game.new_img,
                            game.name + ".png",
                            "game"
                          )
                        );
                        if (uploadedFile) {
                          return {
                            ...game,
                            img: uploadedFile.fileName,
                          };
                        }
                      }
                      return game;
                    });

                    const newGames = await Promise.all(promises);

                    const updatePromises = newGames.map((game) =>
                      axios.put("http://localhost:5000/game/" + game.id, game)
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
            </div>
          </div>
          <div
            className="object-editor"
            style={{
              display: show === "1" ? "flex" : "none",
            }}
          >
            <div className="object-edit">
              <div className="object-fct">
                <button
                  className="btn"
                  onClick={() => {
                    setPlayers([
                      new player(
                        0,
                        "Nom du joueur",
                        "Role du joueur",
                        "player.png",
                        1
                      ),
                      ...players,
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
                  <label className="column-pseudo">pseudo</label>
                  <label className="column-role">role</label>
                  <label className="column-game">jeu</label>
                  <label className="column-img">image</label>
                  <label className="column-delete">delete</label>
                </div>
                {players
                  .filter((player) => !player.deleted)
                  .map((player, index) => {
                    return (
                      <div className="object" key={index}>
                        <div className="player-name">
                          <input
                            value={player.name}
                            onChange={(event) => {
                              setPlayers(
                                players.map((g) => {
                                  if (g.id === player.id) {
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
                          ></input>
                        </div>

                        <div className="player-role">
                          <input
                            value={player.role}
                            onChange={(event) => {
                              setPlayers(
                                players.map((g) => {
                                  if (g.id === player.id) {
                                    return {
                                      ...g,
                                      role: event.target.value,
                                    };
                                  }
                                  return g;
                                })
                              );
                              setIsModified(true);
                            }}
                          />
                        </div>
                        <div className="player-game">
                          <select
                            name="game"
                            id="game"
                            defaultValue={player.game_id}
                            onChange={(event) => {
                              setPlayers(
                                players.map((g) => {
                                  if (g.id === player.id) {
                                    return {
                                      ...g,
                                      game_id: parseInt(event.target.value),
                                    };
                                  }
                                  return g;
                                })
                              );
                              setIsModified(true);
                            }}
                          >
                            {games.map((game, index) => (
                              <option key={index} value={game.id}>
                                {game.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          id={"img-upload-change-" + player.id}
                          style={{ display: "none" }}
                          onChange={handleImgPlayerChange}
                        />
                        <div className="game-logo">
                          <img
                            src={
                              player.new_img
                                ? player.img
                                : "http://localhost:5000/uploads/player/" +
                                  player.img
                            }
                            alt="player logo"
                            id={"playerImage-" + player.id}
                            onClick={() => {
                              const input = document.getElementById(
                                "img-upload-change-" + player.id
                              ) as HTMLInputElement;
                              input.click();
                            }}
                          />
                        </div>

                        <RemoveIcon
                          onClick={async () => {
                            player.deleted = true;
                            setPlayers(
                              players.map((g) => {
                                if (g.id === player.id) {
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
                    const promises = players.map(async (player) => {
                      if (player.new_img) {
                        const uploadedFile = await handleUpload(
                          new imageUpload(
                            player.new_img,
                            player.name + ".png",
                            "player"
                          )
                        );
                        if (uploadedFile) {
                          return {
                            ...player,
                            img: uploadedFile.fileName,
                          };
                        }
                      }
                      return player;
                    });

                    const newPlayers = await Promise.all(promises);

                    const updatePromises = newPlayers.map((player) =>
                      axios.put("http://localhost:5000/player", player)
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
          </div>
        </>
      }
    />
  );
}

export default TeamManagement;
