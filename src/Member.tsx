import "./Member.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";

function Member() {
  return (
    <>
      <TopBar />
      <div
        className="Member"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">Nous supporter</div>
        <div className="title-desc">
          Entrez dans la légende en rejoignant nos rangs
        </div>

        <div className="title-desc">Trouvez celui qui vous convient</div>

        <div className="subscribe-list">
          <div className="card">
            <div className="card-title">Cotisant 4.99€/mois</div>
            <div>La commande sera possible qu'à partir du 26/02</div>
            <button
              className="btn"
              onClick={() => alert("Souscription validée")}
            >
              Souscrire
            </button>
            <a href="#">EN SAVOIR PLUS</a>
          </div>
          <div className="card">
            <div className="card-title">Adherant 50€/an</div>
            <div>La commande sera possible qu'à partir du 10/02</div>
            <button
              className="btn"
              onClick={() => alert("Souscription validée")}
            >
              Souscrire
            </button>
            <a href="#">EN SAVOIR PLUS</a>
          </div>
          <div className="card">
            <div className="card-title">Adherant Premium 100€/an</div>
            <div>La commande sera possible qu'à partir du 10/02</div>
            <button
              className="btn"
              onClick={() => alert("Souscription validée")}
            >
              Souscrire
            </button>
            <a href="#">EN SAVOIR PLUS</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
