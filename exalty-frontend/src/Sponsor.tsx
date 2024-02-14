import "./Sponsor.css";
import balmain from "./asset/balmain.svg";
import pharma from "./asset/sponsor/1337.png";
import nordVpn from "./asset/sponsor/nordvpn.svg";
import eneba from "./asset/sponsor/eneba.svg";
import flowup from "./asset/sponsor/flowup.png";
import onexwear from "./asset/sponsor/onexwear.png";
import TopBar from "./TopBar";
import { useState } from "react";
function Sponsor() {
  const [showSponsor, setShowSponsor] = useState(0);
  return (
    <>
      <TopBar />
      <div
        className="Sponsor"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">Nos partenaires</div>
        <div className="sponsor-list">
          <div className="sponsor" onClick={() => setShowSponsor(0)}>
            <img src={flowup} alt="FlowUP"></img>
          </div>
          <div className="sponsor" onClick={() => setShowSponsor(1)}>
            <img src={pharma} alt="1337 pharma"></img>
          </div>
          <div className="sponsor" onClick={() => setShowSponsor(2)}>
            <img src={onexwear} alt="One X Wear"></img>
          </div>
          <div className="sponsor" onClick={() => setShowSponsor(3)}>
            <img src={eneba} alt="Eneba"></img>
          </div>
          <div className="sponsor" onClick={() => setShowSponsor(4)}>
            <img src={nordVpn} alt="NordVPN"></img>
          </div>
        </div>
        <div className="sponsor-content">
          {showSponsor === 0 && (
            <div className="sponsor-desc">
              FlowUP est un acteur clé dans le monde du gaming et du e-sport.
              Leur plateforme innovante offre des solutions optimisées pour le
              streaming et la diffusion de contenu, renforçant ainsi la
              visibilité et l'engagement de notre communauté. Leur soutien
              technique et technologique est essentiel pour le développement et
              le succès de nos initiatives.{" "}
              <a href="https://flowup.shop">https://flowup.shop</a>
            </div>
          )}{" "}
          {showSponsor === 1 && (
            <div className="sponsor-desc">
              1337 Pharma, quant à lui, est un leader dans le secteur de la
              santé et du bien-être adapté aux gamers. Avec une gamme de
              produits conçus pour améliorer la concentration et la performance,
              1337 Pharma joue un rôle crucial dans le soutien de nos athlètes
              et membres, en veillant à leur santé physique et mentale, un
              aspect fondamental dans le monde compétitif de l'e-sport.{" "}
              <a href="https://1337pharma.com">https://1337pharma.com</a>
            </div>
          )}{" "}
          {showSponsor === 2 && (
            <div className="sponsor-desc">
              One X Wear est notre partenaire officiel pour tout ce qui concerne
              le merchandising. Spécialiste dans la création de vêtements et
              accessoires personnalisés pour les gamers, One X Wear propose une
              gamme de produits de haute qualité qui reflète l'esprit et le
              dynamisme de notre association. Leur expertise dans le domaine du
              merchandising gaming fait d'eux un partenaire incontournable pour
              Exalty, nous permettant d'offrir à nos membres et fans des
              produits exclusifs et tendance.{" "}
              <a href="https://onex.gg">https://onex.gg</a>
            </div>
          )}
          {showSponsor === 3 && (
            <div className="sponsor-desc">
              Eneba est une marketplace incontournable pour tous les amateurs de
              jeux vidéo. Leur large sélection de jeux et leur système de
              paiement sécurisé en font un partenaire de choix pour Exalty. Leur
              engagement à fournir un accès abordable et facile aux derniers
              jeux aide notre communauté à rester à la pointe de l'innovation et
              du divertissement.{" "}
              <a href="https://eneba.com">https://eneba.com</a>
            </div>
          )}
          {showSponsor === 4 && (
            <div className="sponsor-desc">
              NordVPN est un leader mondial dans le domaine de la sécurité
              internet. Leur service VPN de pointe assure une protection en
              ligne de premier ordre pour nos membres, protégeant leurs données
              personnelles et sécurisant leur connexion lors de tournois en
              ligne et de sessions de jeu. La confiance et la sécurité sont
              primordiales dans l'univers numérique, et grâce à NordVPN, nous
              pouvons garantir à notre communauté une expérience en ligne sûre
              et sans tracas.
              <a href="https://nordvpn.net">https://nordvpn.net</a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sponsor;
