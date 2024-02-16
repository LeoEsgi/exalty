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
import phyraxx from "./asset/team/lol/phyraxx.png";
import karken from "./asset/team/lol/karken.png";
import diverse from "./asset/team/lol/diverse.png";
import aitlade from "./asset/team/lol/aitlade.png";
import kwebz from "./asset/team/lol/kwebz.png";
import boby_maltezer from "./asset/team/lol/boby_maltezer.png";
import sollaw from "./asset/team/lol/sollaw.png";
import tolgear from "./asset/team/lol/tolgear.png";
import sarkymm from "./asset/team/lol/sarkymm.png";
import { useLocation } from "react-router-dom";
import { game } from "./Team";
import { player } from "./Team";

const valorantGame = new game(
  "Valorant",
  "Sur valorant retrouvez les en VCT champions",
  "Notre équipe Valorant représente l’essence même de la compétitivité et du travail d’équipe chez Exalty. Constituée de joueurs talentueux et dévoués, cette équipe allie habilement stratégie, rapidité et précision pour dominer dans l’arène de Valorant. Avec des performances remarquables dans divers tournois, notre équipe Valorant ne cesse de repousser les limites, démontrant leur compétence et leur passion pour le jeu. Leur esprit d’équipe et leur détermination font d’eux non seulement des compétiteurs redoutables, mais aussi des ambassadeurs inspirants de notre association.",
  ""
);

const lolGame = new game(
  "Lol",
  "Sur League of Legends retrouvez les sur la faille de l'invocateur",
  "L’équipe League of Legends (LoL) chez Exalty est un symbole de persévérance et d’innovation dans l’esport. Nos joueurs, sélectionnés pour leur habileté exceptionnelle et leur esprit stratégique, excellent sur Summoner’s Rift, apportant fierté et prestige à notre association. Un fait marquant pour notre équipe est le retour de notre coaching staff original de 2021, qui avait mené l’équipe à sa meilleure performance historique, terminant top 9 à l’OTF. Leur retour symbolise un renouvellement d’engagement et de passion, apportant une expérience précieuse et une vision éprouvée qui galvanisent l’équipe. Cette fusion d’anciennes réussites et de nouvelles aspirations place notre équipe LoL sur la voie du succès continu et de la reconnaissance dans la scène compétitive de League of Legends.",
  ""
);

const valorant = [
  new player("Nysha", "Smoker", nysha, valorantGame),
  new player("CNS", "Sentinel", cns, valorantGame),
  new player("Pitou", "Duelist", pitou, valorantGame),
  new player("Ragnarok", "Initiateur", ragnarok, valorantGame),
  new player("Tommy", "Initiateur/Flex", tommy, valorantGame),
  new player("Dake", "Head Coach", dake, valorantGame),
  new player("Salva", "Coach", salva, valorantGame),
  new player("Balou", "Coach", balou, valorantGame),
  new player("Beautiful", "Manageuse", beautiful, valorantGame),
];

const lol = [
  new player("Phyraxx", "Toplaner", phyraxx, lolGame),
  new player("Karken", "Jungler", karken, lolGame),
  new player("Diverse", "Midlaner", diverse, lolGame),
  new player("Aitlade", "ADC", aitlade, lolGame),
  new player("Kwebz", "Supp", kwebz, lolGame),
  new player("Boby Maltezer", "Head Coach", boby_maltezer, lolGame),
  new player("Sollaw", "Assistant Coach", sollaw, lolGame),
  new player("Tolgear", "Data Analyst", tolgear, lolGame),
  new player("Sarkymm", "Manager", sarkymm, lolGame),
];

function TeamInfo() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gameName = queryParams.get("game");
  let selectGame: game;
  let players: player[];
  if (gameName === "Valorant") {
    selectGame = valorantGame;
    players = valorant;
  } else {
    selectGame = lolGame;
    players = lol;
  }

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
          <div className="team-desc1">{selectGame.getTitle()}</div>
          <div className="team-desc2">{selectGame.getDesc()}</div>
        </div>
        <div className="team-list">
          {players.map((player) => (
            <div className="player">
              <img src={player.getImage()} alt={player.getName()}></img>
              <div className="player-role">{player.getRole()}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default TeamInfo;
