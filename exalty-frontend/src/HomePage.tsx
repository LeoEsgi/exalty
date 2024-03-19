import React, { useEffect, useRef, useState } from "react";
import logo from "./asset/start-bg.jpg";
import "./HomePage.css";
import TopBar from "./TopBar";
import jersey from "./asset/home-shirt.png";
import ga from "./asset/ga.jpg";
import BottomBar from "./BottomBar";
import { Link } from "react-router-dom";
import balmain from "./asset/balmain.svg";
import svgExa from "./asset/exalty.svg";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import exaltyLogo from "./asset/Logo_blanc.png";
import axios from "axios";
import { match, match_status } from "./Models";

function HomePage() {
  const [open, setOpen] = React.useState(true);
  const [show, setShow] = useState(match_status.IN_PROGRESS);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const [matches, setMatches] = useState<match[]>([]);
  const triangleRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);

  const handleScrollDown = function () {
    if (triangleRef.current != null) {
      triangleRef.current!.style.transform = "translateY(-100%)";
      if (historyRef.current != null) {
        historyRef.current!.scrollIntoView();
        setIsLogoVisible(true);
        window.removeEventListener("scroll", handleScrollDown);
        setTimeout(() => {
          window.addEventListener("scroll", handleScrollUp);
        }, 1000);
      }
    }
  };
  const handleScrollUp = function () {
    if (triangleRef.current != null) {
      if (
        homeRef.current != null &&
        historyRef.current != null &&
        historyRef.current.getBoundingClientRect().top >= 0
      ) {
        triangleRef.current!.style.transform = "translateY(0%)";
        console.log(homeRef.current.getBoundingClientRect().top);
        homeRef.current!.scrollIntoView();
        setIsLogoVisible(false);
        window.removeEventListener("scroll", handleScrollUp);
        setTimeout(() => {
          window.addEventListener("scroll", handleScrollDown);
        }, 1000);
      }
    }
  };

  const getMatches = async () => {
    const response = await axios
      .get("http://localhost:5000/match/")
      .catch((err) => {
        console.error("Error fetching matches:", err);
        return { data: [] };
      });
    return response.data as match[];
  };
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as match_status;
    setShow(value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchMatches = async () => {
      const matches = await getMatches();
      if (Array.isArray(matches)) {
        setMatches(matches);
      } else {
        console.error("Expected an array of matches, but got:", matches);
      }
    };

    fetchMatches();
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScrollDown);
    return () => {
      window.removeEventListener("scroll", handleScrollDown);
    };
  }, []);
  return (
    <>
      <TopBar isLogoVisible={isLogoVisible} />

      <div
        className="HomePage"
        ref={homeRef}
        style={{
          backgroundImage: `url(${logo})`,
          height: "100vh",
          backgroundSize: "cover",
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
      <div className="triangle" ref={triangleRef} />
      <div
        className="history"
        ref={historyRef}
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
        className="shop-home"
        style={{
          backgroundImage: `url(${jersey})`,
          height: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div className="shop-home-content">
          <div className="discover">Decouvrez notre nouveau maillot</div>
          <Link to="/shop" className="btn">
            VOIR LA BOUTIQUE
          </Link>
        </div>
      </div>

      <div
        className="matches matches-home"
        style={{
          backgroundImage: `url(${balmain})`,
          height: "100%",
          backgroundSize: "cover",
        }}
      >
        <div className="matches-content">
          <div className="matches-selector">
            <select onChange={handleChange} className="matches-selector-select">
              <option value={match_status.IN_PROGRESS}>Matchs en cours</option>
              <option value={match_status.NOT_STARTED}>Prochains Matchs</option>
              <option value={match_status.FINISHED}>Derniers Matchs</option>
            </select>
          </div>
          <div
            className="upcoming-matches"
            style={{
              display: show === match_status.NOT_STARTED ? "flex" : "none",
            }}
          >
            <div className="title">Prochains Matchs</div>
            <div className="matches">
              {matches
                .filter((match) => match.status === match_status.NOT_STARTED)
                .map((match, index) => {
                  return (
                    <div className="match" key={index}>
                      <div className="match-date">
                        {formatter.format(new Date(match.date))}
                      </div>

                      <div className="match-opponent">
                        VS
                        <img
                          className="logo_opponent"
                          src={
                            "http://localhost:5000/uploads/match/" +
                            match.opponent_logo
                          }
                          alt={match.opponent}
                        ></img>
                        {match.opponent}
                      </div>

                      <div className="match-title">{match.title}</div>
                      <div className="match-instance">{match.instance}</div>
                      <div className="match-time">
                        {new Date(match.date).getHours() +
                          ":" +
                          new Date(match.date)
                            .getMinutes()
                            .toString()
                            .padStart(2, "0") +
                          " " +
                          match.timezone}
                      </div>
                      <div className="match-link">
                        <a href={match.link}>Lien</a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="past-matches"
            style={{
              display: show === match_status.FINISHED ? "flex" : "none",
            }}
          >
            <div className="title">Derniers Matchs</div>
            <div className="matches">
              {matches
                .filter((match) => match.status === match_status.FINISHED)
                .map((match, index) => {
                  return (
                    <div className="match" key={index}>
                      <div className="match-date">
                        {formatter.format(new Date(match.date))}
                      </div>

                      <div className="match-opponent">
                        VS
                        <img
                          className="logo_opponent"
                          src={
                            "http://localhost:5000/uploads/match/" +
                            match.opponent_logo
                          }
                          alt={match.opponent}
                        ></img>
                        {match.opponent}
                      </div>
                      <div className="match-score">
                        {match.score_exa} - {match.score_opponent}
                      </div>

                      <div className="match-title">{match.title}</div>
                      <div className="match-instance">{match.instance}</div>

                      <div className="match-link">
                        <a href={match.link}>Lien</a>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div
            className="current-matches"
            style={{
              display: show === match_status.IN_PROGRESS ? "flex" : "none",
            }}
          >
            <div className="title">Matchs en cours</div>
            <div className="matches">
              {matches
                .filter((match) => match.status === match_status.IN_PROGRESS)
                .map((match, index) => {
                  return (
                    <div className="match" key={index}>
                      <div className="match-header">
                        <div className="match-title">
                          {match.title} - {match.instance}
                        </div>
                        <div className="match-format">
                          Format : {match.format}
                        </div>
                      </div>
                      <div className="match-content">
                        <div className="match-exalty">
                          <img
                            className="logo_exalty"
                            src={exaltyLogo}
                            alt={match.opponent}
                          ></img>
                        </div>

                        <div className="match-link">
                          <a href={match.link}>Lien</a>
                        </div>
                        <div className="match-opponent">
                          <img
                            className="logo_opponent"
                            src={
                              "http://localhost:5000/uploads/match/" +
                              match.opponent_logo
                            }
                            alt={match.opponent}
                          ></img>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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

        <div
          className="back_to_top"
          style={{ display: isLogoVisible ? "flex" : "none" }}
        >
          <a onClick={scrollToTop} style={{ cursor: "pointer" }}>
            <ArrowUpwardIcon style={{ color: "#cdcdcd92" }} />
          </a>
        </div>
      </div>
    </>
  );
}

export default HomePage;
