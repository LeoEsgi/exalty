import React from "react";
import "./BottomBar.css";
import svgExa from "./asset/exalty.svg";
import svgInsta from "./asset/icon/insta.svg";
import svgTwitter from "./asset/icon/twitter.svg";
import svgTiktok from "./asset/icon/tiktok.svg";
import svgMail from "./asset/icon/mail.svg";
import svgTwitch from "./asset/icon/twitch.svg";
import { Link } from "react-router-dom";
function BottomBar() {
  return (
    <div className="BottomBar">
      <div className="slogan">Get Exalted</div>
      <div className="contact">
        <Link to="/member">NOUS REJOINDRE</Link>
        <Link to="/contact">NOUS CONTACTER</Link>
      </div>
      <div className="social">
        <img className="logo" alt="" src={svgExa}></img>
        <div>
          <a href="#">FAQ</a>
        </div>
        <div>
          <a href="#">Nous contacter</a>
        </div>
        <div>
          <a href="#">Conditions Générales d'Utilisation</a>
        </div>
        <div>
          <a href="#">Conditions Générales de Vente</a>
        </div>
        <div>
          <a href="#">Mentions légales</a>
        </div>
        <div className="logo-social">
          <img className="invert-color" alt="" src={svgInsta}></img>
          <img className="invert-color" alt="" src={svgTwitter}></img>
          <img className="invert-color" alt="" src={svgTiktok}></img>
          <img className="invert-color" alt="" src={svgMail}></img>
          <img className="invert-color" alt="" src={svgTwitch}></img>
        </div>
      </div>
      <div className="right">Exalty 2024 © Tous droits réservés</div>
    </div>
  );
}

export default BottomBar;
