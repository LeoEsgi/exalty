import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [isHomePageVisible, setIsHomePageVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Détermine si la page doit être visible en fonction de la direction du défilement.
      const shouldBeVisible = currentScrollY < lastScrollY.current;

      // Ne met à jour l'état que si la visibilité change.
      if (shouldBeVisible !== isHomePageVisible) {
        setIsHomePageVisible(shouldBeVisible);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // Cette fois, nous ne mettons pas isHomePageVisible comme dépendance pour éviter l'effet de re-création.
  }, []);

  return (
    <>
      <TopBar isHomePageVisible={isHomePageVisible} />
      <div
        className="HomePage"
        style={{
          backgroundImage: `url(${logo})`,
          height: "100vh",
          backgroundSize: "cover",
          display: isHomePageVisible ? "flex" : "none",
        }}
      >
        <div className="eiffel">
          <div className="eiffel-container">
            <div
              className="eiffel-bg"
              style={{
                backgroundImage: `url(${balmain})`,
                height: "100vh",
                backgroundSize: "repeat",
              }}
            ></div>
          </div>
          <div className="eiffel-left"></div>
          <div className="eiffel-right"></div>
          <div className="eiffel-bottom"></div>
          <div className="eiffel-logo">
            <div className="eiffel-img">
              <img alt="" src={svgExa}></img>
            </div>
          </div>
        </div>
      </div>
      <div
        className="triangle"
        style={{
          transform: isHomePageVisible ? "translateY(0%)" : "translateY(-100%)",
        }}
      />
      <div
        className="history"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundSize: "cover",
        }}
      >
        <div className="history-content">
          <div className="history-title">Notre histoire</div>
          <div className="history-desc">
            <div>
              <div className="history-date">11 janvier 2018</div>
              <div>Création d'Exalty, en tant qu'association sous loi 1901</div>
            </div>
            <div>
              <div className="history-date">2018 - 2020</div>
              <div>
                L'Age d'or, le club rayonne sur les scènes esportives amatrices
                à travers nos résultats sur 7 jeux différents
              </div>
            </div>
            <div>
              <div className="history-date">2022</div>
              <div>Retour à la compétition post covid-19</div>
            </div>
            <div>
              <div className="history-date">Janvier 2024</div>
              <div>Le renouveau d'Exalty</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="jersey"
        style={{
          backgroundImage: `url(${jersey})`,
          height: "110vh",
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
      <div
        className="event"
        style={{
          backgroundImage: `url(${balmain})`,
          height: "100%",
          backgroundSize: "cover",
        }}
      >
        <div className="event-content">
          <h1 className="event-title">Evenement a venir</h1>
          <div className="event-list">
            <img className="event1" src={ga} alt="GA"></img>
            <div className="event1-content">
              Si vous souhaitez venir encourager nos joueurs à la Gamers
              Assembly,{" "}
              <a href="https://ga2024.gamers-assembly.net/">
                voici le lien de la billeterie
              </a>
            </div>
          </div>
          <BottomBar />
        </div>
      </div>
    </>
  );
}

export default HomePage;
