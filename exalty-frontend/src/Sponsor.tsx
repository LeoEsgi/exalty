import "./Sponsor.css";
import { useEffect, useState } from "react";
import BasicComponent from "./BasicComponent";
import { sponsor } from "./Models";
import axios from "axios";
function Sponsor() {
  const [showSponsor, setShowSponsor] = useState<sponsor>();
  const [sponsors, setSponsors] = useState<sponsor[]>([]);

  const getSponsors = async () => {
    const response = await axios
      .get("http://localhost:5000/sponsor/")
      .catch((err) => {
        console.error("Error fetching sponsors:", err);
        return { data: [] };
      });
    return response.data as sponsor[];
  };

  useEffect(() => {
    const fetchSponsors = async () => {
      const sponsors = await getSponsors();
      if (Array.isArray(sponsors) && sponsors.length > 0) {
        setSponsors(sponsors);
        setShowSponsor(sponsors[0]);
      } else {
        console.error("Expected an array of sponsors, but got:", sponsors);
      }
    };

    fetchSponsors();
  }, []);

  return (
    <>
      <BasicComponent
        className="Sponsor"
        title="Nos partenaires"
        content={
          <>
            <div className="sponsor-list">
              {sponsors.map((sponsor, index) => (
                <div
                  className="sponsor"
                  onClick={() => setShowSponsor(sponsor)}
                  key={index}
                >
                  <img
                    src={"http://localhost:5000/uploads/sponsor/" + sponsor.img}
                    alt={sponsor.name}
                  ></img>
                </div>
              ))}
            </div>
            <div className="sponsor-content">
              {showSponsor && (
                <div className="sponsor-desc">{showSponsor.description}</div>
              )}

              <div className="sponsor-link">
                {showSponsor && (
                  <a href={showSponsor.link}>{showSponsor.link}</a>
                )}
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Sponsor;
