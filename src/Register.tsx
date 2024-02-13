import React from "react";
import "./Register.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import { Link } from "react-router-dom";
function Register() {
  return (
    <>
      <TopBar />
      <div
        className="Register"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">Creation du compte</div>
        <div className="register-form">
          <div className="register-info">
            <input required placeholder="Nom"></input>
            <input required placeholder="Prénom"></input>
            <input required placeholder="Pseudo"></input>
            <input placeholder="Tag discord"></input>
          </div>
          <div className="register-mail">
            <input required placeholder="Email" type="mail"></input>
            <input required placeholder="Confirmer Email" type="mail"></input>
          </div>

          <div className="register-password">
            <input required placeholder="Mot de passe" type="password"></input>
            <input
              required
              placeholder="Confirmer le mot de passe"
              type="password"
            ></input>
          </div>
        </div>
        <button className="btn">CREER MON COMPTE</button>
        <div>
          Vous avez un compte ? <Link to="/auth">Connectez-vous</Link>
        </div>
      </div>
    </>
  );
}
export default Register;
