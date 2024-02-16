import "./Team.css";
import lol from "./asset/game/lol.jpg";
import valorant from "./asset/game/valorant.png";
import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export class game {
  constructor(
    public name: string,
    public title: string,
    public desc: string,
    public img: string
  ) {}

  public getName() {
    return this.name;
  }
  public getTitle() {
    return this.title;
  }
  public getDesc() {
    return this.desc;
  }
  public getImg() {
    return this.img;
  }
}

export class player {
  constructor(
    public name: string,
    public role: string,
    public image: string,
    public game: game
  ) {}

  public getName() {
    return this.name;
  }
  public getRole() {
    return this.role;
  }
  public getImage() {
    return this.image;
  }
  public getGame() {
    return this.game;
  }
}
function Team() {
  const [openGame, setOpenGame] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleCoffreClick = (game: string) => {
    setOpenGame(game);
    setTimeout(() => {
      navigate("/teamInfo?game=" + { game });
    }, 2000);
  };

  const valorantGame = new game("Valorant", "", "", valorant);
  const lolGame = new game("Lol", "", "", lol);
  const listGame = [valorantGame, lolGame];
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
          {listGame.map((game) => (
            <div className="team">
              <div
                className={`losange ${
                  openGame === game.getName() ? "open" : ""
                }`}
                onClick={() => handleCoffreClick(game.getName())}
              >
                <img src={game.getImg()} alt={game.getName()}></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Team;
