import { useEffect, useState } from "react";
import "./Member.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import { DialogMsg, membership, price_occurence } from "./Models";
import axios from "axios";
import BasicComponent from "./BasicComponent";

function Member() {
  const [memberShips, setMemberShips] = useState<membership[]>([]);

  const [dialogInstance, setDialogInstance] = useState(
    new DialogMsg("", "", false)
  );
  const getMemberShips = async () => {
    const response = await axios
      .get("http://localhost:5000/membership/")
      .catch((err) => {
        console.error("Error fetching matches:", err);
        return { data: [] };
      });
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
      <BasicComponent
        className="Member"
        title="Nous supporter"
        desc="Entrez dans la légende en rejoignant nos rangs"
        desc_2="Trouvez celui qui vous convient"
        content={
          <>
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
          </>
        }
      />
    </>
  );
}

export default Member;
