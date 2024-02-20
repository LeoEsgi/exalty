import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import "./Matches.css";
import React from "react";
import svgExa from "./asset/exalty.svg";

export class match {
  constructor(
    public date: Date,
    public title: string,
    public instance: string,
    public opponent: string,
    public opponent_logo: string,
    public score_exa: number,
    public score_opponent: number,
    public status: match_status,
    public link: string,
    public timezone: string
  ) {}
}

enum match_status {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}
function Matches() {
  const [show, setShow] = React.useState(match_status.IN_PROGRESS);
  const matches = [];
  matches.push(
    new match(
      new Date("2024-05-15 20:00:00"),
      "France cup",
      "Finale",
      "Karmine Corp",
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Karmine_Corp_logo.svg",
      0,
      0,
      match_status.NOT_STARTED,
      "link",
      "PCT"
    )
  );
  matches.push(
    new match(
      new Date("2024-05-18 20:00:00"),
      "France cup",
      "Finale",
      "Gentle Mates",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gentle_Mates.jpg/800px-Gentle_Mates.jpg",
      0,
      0,
      match_status.NOT_STARTED,
      "link",
      "PCT"
    )
  );
  matches.push(
    new match(
      new Date("2024-05-27 20:00:00"),
      "France cup",
      "Finale",
      "Mandatory",
      "https://upload.wikimedia.org/wikipedia/fr/thumb/7/71/Mandatory.svg/640px-Mandatory.svg.png",
      0,
      0,
      match_status.NOT_STARTED,
      "link",
      "PCT"
    )
  );

  matches.push(
    new match(
      new Date("2024-05-15 20:00:00"),
      "France cup",
      "Finale",
      "Karmine Corp",
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Karmine_Corp_logo.svg",
      13,
      7,
      match_status.FINISHED,
      "link",
      "PCT"
    )
  );
  matches.push(
    new match(
      new Date("2024-05-18 20:00:00"),
      "France cup",
      "Finale",
      "Gentle Mates",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gentle_Mates.jpg/800px-Gentle_Mates.jpg",
      7,
      13,
      match_status.FINISHED,
      "link",
      "PCT"
    )
  );
  matches.push(
    new match(
      new Date("2024-05-27 20:00:00"),
      "France cup",
      "Finale",
      "Mandatory",
      "https://upload.wikimedia.org/wikipedia/fr/thumb/7/71/Mandatory.svg/640px-Mandatory.svg.png",
      13,
      9,
      match_status.FINISHED,
      "link",
      "PCT"
    )
  );

  matches.push(
    new match(
      new Date("2024-05-15 20:00:00"),
      "France cup",
      "Finale",
      "Karmine Corp",
      "https://upload.wikimedia.org/wikipedia/commons/9/96/Karmine_Corp_logo.svg",
      0,
      0,
      match_status.IN_PROGRESS,
      "link",
      "PCT"
    )
  );
  matches.push(
    new match(
      new Date("2024-05-18 20:00:00"),
      "France cup",
      "Demi-Finale",
      "Gentle Mates",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Gentle_Mates.jpg/800px-Gentle_Mates.jpg",
      0,
      0,
      match_status.IN_PROGRESS,
      "link",
      "PCT"
    )
  );
  matches.push(
    new match(
      new Date("2024-05-27 20:00:00"),
      "France cup",
      "Finale",
      "Mandatory",
      "https://upload.wikimedia.org/wikipedia/fr/thumb/7/71/Mandatory.svg/640px-Mandatory.svg.png",
      0,
      0,
      match_status.IN_PROGRESS,
      "link",
      "PCT"
    )
  );
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
      <TopBar />
      <div
        className="Matches"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
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
                      {formatter.format(match.date)}
                    </div>

                    <div className="match-opponent">
                      VS
                      <img
                        className="logo_opponent"
                        src={match.opponent_logo}
                        alt={match.opponent}
                      ></img>
                      {match.opponent}
                    </div>

                    <div className="match-title">{match.title}</div>
                    <div className="match-instance">{match.instance}</div>
                    <div className="match-time">
                      {match.date.getHours() +
                        ":" +
                        match.date.getMinutes().toString().padStart(2, "0") +
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
          style={{ display: show === match_status.FINISHED ? "flex" : "none" }}
        >
          <div className="title">Derniers Matchs</div>
          <div className="matches">
            {matches
              .filter((match) => match.status === match_status.FINISHED)
              .map((match, index) => {
                return (
                  <div className="match" key={index}>
                    <div className="match-date">
                      {formatter.format(match.date)}
                    </div>

                    <div className="match-opponent">
                      VS
                      <img
                        className="logo_opponent"
                        src={match.opponent_logo}
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
                    <div className="match-opponent">
                      VS
                      <img
                        className="logo_opponent"
                        src={match.opponent_logo}
                        alt={match.opponent}
                      ></img>
                      {match.opponent}
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
      </div>
    </>
  );
}
export default Matches;
