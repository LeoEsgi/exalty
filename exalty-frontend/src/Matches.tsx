import "./Matches.css";
import React, { useEffect, useState } from "react";
import exaltyLogo from "./asset/Logo_blanc.png";
import axios from "axios";
import { event, match, match_status } from "./Models";
import BasicComponent from "./BasicComponent";

function Matches() {
  const [show, setShow] = useState(match_status.IN_PROGRESS);
  const [matches, setMatches] = useState<match[]>([]);
  const [events, setEvents] = useState<event[]>([]);
  const getMatches = async () => {
    const response = await axios
      .get("http://localhost:5000/match/")
      .catch((err) => {
        console.error("Error fetching matches:", err);
        return { data: [] };
      });
    return response.data as match[];
  };

  const getEvents = async () => {
    const response = await axios
      .get("http://localhost:5000/events/")
      .catch((err) => {
        console.error("Error fetching events:", err);
        return { data: [] };
      });
    return response.data as event[];
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

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as match_status;
    setShow(value);
  };

  return (
    <>
      <BasicComponent
        className="Matches"
        content={
          <>
            <div className="matches-selector">
              <select
                onChange={handleChange}
                className="matches-selector-select"
              >
                <option value={match_status.IN_PROGRESS}>
                  Matchs en cours
                </option>
                <option value={match_status.NOT_STARTED}>
                  Prochains Matchs
                </option>
                <option value={match_status.FINISHED}>Derniers Matchs</option>
                <option value="event">Evenements</option>
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
          </>
        }
      />
    </>
  );
}
export default Matches;
