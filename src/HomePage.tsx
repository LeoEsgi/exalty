import React from "react";
import logo from "./asset/start-bg.jpg";
import "./HomePage.css";
import TopBar from "./TopBar";
import jersey from "./asset/home-shirt.png";
import ga from "./asset/ga.jpg";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";
import balmain from "./asset/balmain.svg";
import svgExa from "./asset/exalty.svg";

function HomePage() {
  return (
    <>
      <TopBar />
      <div
        className="HomePage"
        style={{
          backgroundImage: `url(${logo})`,
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        {/* <div
          className="bandoliere"
          style={{
            backgroundImage: `url(${balmain})`,
            height: "100vh",
            width: "10%",
            backgroundSize: "cover",
          }}
        >
          <img alt="" src={svgExa}></img>
        </div> */}
      </div>
      <div
        className="jersey"
        style={{
          backgroundImage: `url(${jersey})`,
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div className="jersey-content">
          <div className="discover">Decouvrez notre nouveau maillot</div>
          <Link to="/shop" className="btn">
            VOIR LA BOUTIQUE
          </Link>
        </div>
      </div>
      <div className="event">
        <h1 className="event-title">Evenement a venir</h1>
        <div className="event-list">
          <img className="event1" src={ga} alt="GA"></img>
          <div className="event1-content">
            Si vous souhaitez venir encourager nos joueurs à la Gamers Assembly,{" "}
            <a href="https://ga2024.gamers-assembly.net/">
              voici le lien de la billeterie
            </a>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default HomePage;
