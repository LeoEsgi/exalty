import TopBar from "./TopBar";
import flower from "./asset/flower.svg";
import "./TeamInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import { game, player } from "./Models";
import { useEffect, useState } from "react";
import axios from "axios";
import BottomBar from "./BottomBar";

function TeamInfo() {
  const location = useLocation();
  const [game, setGame] = useState<game>({} as game);
  const [players, setPlayers] = useState<player[]>([]);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const gameId = queryParams.get("game");

  useEffect(() => {
    const getGame = async () => {
      const response = await axios.get(`http://localhost:5000/game/${gameId}`);
      if (!response.data) {
        navigate("/team");
      } else setGame(response.data as game);
    };

    const getPlayers = async () => {
      const response = await axios.get(
        `http://localhost:5000/player/${gameId}/players`
      );
      setPlayers(response.data as player[]);
    };

    if (gameId) {
      getGame();
      getPlayers();
    }
  }, [gameId, location.search, navigate]);

  return (
    <>
      <TopBar />
      <div
        className="TeamInfo"
        style={{
          backgroundImage: `url(${flower})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="team-content">
          <div className="title">Notre Equipe</div>
          <div className="team-desc1">{game.title}</div>
          <div className="team-desc2">{game.desc}</div>
        </div>
        <div className="team-list">
          {players.length > 0 &&
            players.map((player) => (
              <div className="player">
                <img
                  src={"http://localhost:5000/uploads/player/" + player.img}
                  alt={player.name}
                ></img>
                <div className="player-role">{player.role}</div>
              </div>
            ))}
        </div>
      </div>
      <BottomBar />
    </>
  );
}
export default TeamInfo;
