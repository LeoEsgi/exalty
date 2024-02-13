import TopBar from "./TopBar";
import flower from "./asset/flower.svg";
import "./TeamInfo.css";
import balou from "./asset/team/valo/balou.png";
import beautiful from "./asset/team/valo/beautiful.png";
import cns from "./asset/team/valo/cns.png";
import dake from "./asset/team/valo/dake.png";
import nysha from "./asset/team/valo/nysha.png";
import pitou from "./asset/team/valo/pitou.png";
import ragnarok from "./asset/team/valo/ragnarok.png";
import salva from "./asset/team/valo/salva.png";
import tommy from "./asset/team/valo/tommy.png";

function TeamInfo() {
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
        <div className="title">Notre Equipe</div>
        <div className="title-desc">
          Sur valorant retrouvez les en VCT champions
        </div>
        <div className="title-desc2">
          Notre équipe Valorant représente l’essence même de la compétitivité et
          du travail d’équipe chez Exalty. Constituée de joueurs talentueux et
          dévoués, cette équipe allie habilement stratégie, rapidité et
          précision pour dominer dans l’arène de Valorant. Avec des performances
          remarquables dans divers tournois, notre équipe Valorant ne cesse de
          repousser les limites, démontrant leur compétence et leur passion pour
          le jeu. Leur esprit d’équipe et leur détermination font d’eux non
          seulement des compétiteurs redoutables, mais aussi des ambassadeurs
          inspirants de notre association.
        </div>
        <div className="team-list">
          <div className="player">
            <img src={nysha} alt="nysha"></img>
            <div className="player-role">Smoker</div>
          </div>
          <div className="player">
            <img src={cns} alt="cns"></img>
            <div className="player-role">Sentinel</div>
          </div>
          <div className="player">
            <img src={pitou} alt="pitou"></img>
            <div className="player-role">Duelist</div>
          </div>
          <div className="player">
            <img src={ragnarok} alt="ragnarok"></img>
            <div className="player-role">Initiateur</div>
          </div>
          <div className="player">
            <img src={tommy} alt="tommy"></img>
            <div className="player-role">Initiateur/Flex</div>
          </div>
          <div className="player">
            <img src={dake} alt="dake"></img>
            <div className="player-role">Head Coach</div>
          </div>
          <div className="player">
            <img src={salva} alt="salva"></img>
            <div className="player-role">Coach</div>
          </div>
          <div className="player">
            <img src={balou} alt="balou"></img>
            <div className="player-role">Coach</div>
          </div>
          <div className="player">
            <img src={beautiful} alt="beautiful"></img>
            <div className="player-role">Manageuse</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeamInfo;
