import { useEffect, useState } from "react";
import "./Member.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import { DialogMsg, membership, price_occurence } from "./Models";
import axios from "axios";

function Member() {
  const [memberShips, setMemberShips] = useState<membership[]>([]);

  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );
  const getMemberShips = async () => {
    const response = await axios.get("http://localhost:5000/membership/");
    return response.data as membership[];
  };

  useEffect(() => {
    const fetchMatches = async () => {
      const memberships = await getMemberShips();
      if (Array.isArray(memberships)) {
        setMemberShips(memberships);
      } else {
        console.error("Expected an array of matches, but got:", memberships);
      }
    };

    fetchMatches();
  }, []);
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
          {memberShips.map((membership) => (
            <div className="card">
              <div className="card-title">
                {membership.name} {membership.price}€/
                {price_occurence.MONTHLY === membership.occurence
                  ? "mois"
                  : "an"}
              </div>
              <div>{membership.description}</div>
              <button
                className="btn"
                onClick={() => alert("Souscription validée")}
              >
                Souscrire
              </button>
              <a href="#">EN SAVOIR PLUS</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Member;
