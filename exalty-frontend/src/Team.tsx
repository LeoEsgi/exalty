import "./Team.css";
import lol from "./asset/game/lol.jpg";
import valorant from "./asset/game/valorant.png";
import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { game } from "./Models";
import axios from "axios";

function Team() {
  const [openGame, setOpenGame] = useState<number | null>(null);
  const [games, setGames] = useState<game[]>([]);
  const navigate = useNavigate();

  const getGames = async () => {
    const response = await axios.get("http://localhost:5000/game/");
    return response.data as game[];
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames();
      if (Array.isArray(games)) {
        setGames(games);
      } else {
        console.error("Expected an array of games, but got:", games);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <TopBar />
      <div
        className="Team"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">Nos Equipes</div>
        <div className="title-desc">
          Ils portent haut nos couleurs, terrorisent nos adversaires,
          représentent Exalty.
        </div>
        <div className="title-desc">Voici nos champions !</div>
        <div
          className="couverture"
          style={{
            display: openGame ? "block" : "none",
          }}
        ></div>

        <div className="team-list">
          {games.map((game, index) => (
            <div className="team" key={index}>
              <div
                className={`losange ${openGame === game.id ? "open" : ""}`}
                onClick={() => navigate(`/teamInfo?game=${game.id}`)}
              >
                <img
                  src={"http://localhost:5000/uploads/game/" + game.img}
                  alt={game.name}
                ></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Team;
