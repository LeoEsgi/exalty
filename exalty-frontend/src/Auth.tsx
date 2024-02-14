import React from "react";
import "./Auth.css";
import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";
function Auth() {
  return (
    <>
      <TopBar />
      <div
        className="Auth"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div>
          <div className="title">Se connecter</div>
          <div className="login-form">
            <div>
              <input placeholder="Email"></input>
            </div>
            <div>
              <input placeholder="Mot de passe" type="password"></input>
            </div>
            <button className="btn">SE CONNECTER</button>
            <div className="create">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register">Créer votre compte</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Auth;
