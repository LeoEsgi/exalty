import React from "react";
import "./BottomBar.css";
import svgExa from "./asset/exalty.svg";
import svgInsta from "./asset/icon/insta.svg";
import svgTwitter from "./asset/icon/twitter.svg";
import svgTiktok from "./asset/icon/tiktok.svg";
import svgMail from "./asset/icon/mail.svg";
import svgTwitch from "./asset/icon/twitch.svg";
import { Link, redirect } from "react-router-dom";
function BottomBar() {
  return (
    <div className="BottomBar">
      {/* <div className="slogan">Get Exalted</div>
      <div className="contact">
        <Link to="/member">NOUS REJOINDRE</Link>
        <Link to="/contact">NOUS CONTACTER</Link>
      </div> */}
      <div className="social">
        <img className="logo" alt="" src={svgExa}></img>
        <div>
          <Link to="/faq">FAQ</Link>
        </div>
        <div>
          <Link to="/contact">Nous contacter</Link>
        </div>
        <div>
          <a href="#">Conditions Générales d'Utilisation</a>
        </div>
        <div>
          <Link to="/conditions">Conditions Générales de Vente</Link>
        </div>
        <div>
          <Link to="/legal">Mentions légales</Link>
        </div>
        <div className="logo-social">
          <Link to={"https://twitter.com/Exalty_FR"}>
            <img
              className="logo-social-item invert-color"
              alt=""
              src={svgTwitter}
            ></img>
          </Link>
          <Link to={"https://www.instagram.com/exalty_fr"}>
            <img
              className="logo-social-item invert-color"
              alt=""
              src={svgInsta}
            ></img>
          </Link>
          <Link to={"https://www.threads.net/@exalty_fr"}>
            <img
              className="logo-social-item invert-color"
              alt=""
              src={svgTiktok}
            ></img>
          </Link>
          <Link to={"https://www.tiktok.com/@exaltyfr_"}>
            <img
              className="logo-social-item invert-color"
              alt=""
              src={svgMail}
            ></img>
          </Link>
          <Link to={"https://www.twitch.tv/ExaltyTV1"}>
            <img
              className="logo-social-item invert-color"
              alt=""
              src={svgTwitch}
            ></img>
          </Link>
        </div>
      </div>
      <div className="right">Exalty 2024 © Tous droits réservés</div>
    </div>
  );
}

export default BottomBar;
