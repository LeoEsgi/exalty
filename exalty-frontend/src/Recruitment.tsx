import "./Recruitment.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";

function Recruitment() {
  return (
    <>
      <TopBar />
      <div
        className="Recruitment"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="recruitment-content">
          <div className="title">Trouvez votre place !</div>
          <div className="title-desc">
            Voici les postes disponibles pour vous
          </div>
          <div className="title-desc">Trouvez celui qui vous convient</div>
          <div className="categorie-list">
            <div className="categorie">
              <div className="categorie-title"> Média</div>
              <div className="functions">
                <div className="card-r">
                  <div>Videaste</div>
                  <div>
                    <button className="btnInfo">EN SAVOIR PLUS</button>
                  </div>
                </div>
                <div className="card-r">
                  <div>Streamer</div>
                  <div>
                    <button className="btnInfo">EN SAVOIR PLUS</button>
                  </div>
                </div>
                <div className="card-r">
                  <div>Moderateur Discord/Twitch</div>
                  <div>
                    <button className="btnInfo">EN SAVOIR PLUS</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="categorie">
              <div className="categorie-title">Ressources Humaines</div>
              <div className="functions">
                <div className="card-r">
                  <div>Charge de Recrutement</div>
                  <div>
                    <button className="btnInfo">EN SAVOIR PLUS</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="categorie">
              <div className="categorie-title">Graphisme</div>
              <div className="functions">
                <div className="card-r">
                  <div>Graphiste</div>
                  <div>
                    <button className="btnInfo">EN SAVOIR PLUS</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recruitment;
