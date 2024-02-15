import "./Team.css";
import lol from "./asset/game/lol.jpg";
import valorant from "./asset/game/valorant.png";
import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
function Team() {
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
        <div className="team-list">
          <div className="team">
            <div className="losange">
              <Link to="/teamInfo?game=Valorant">
                <img src={valorant} alt="Valorant"></img>
              </Link>
            </div>
          </div>
          <div className="team">
            <div className="losange">
              <Link to="/teamInfo?game=Lol">
                <img src={lol} alt="League of Legends"></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
