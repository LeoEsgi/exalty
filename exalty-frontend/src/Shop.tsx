import { SetStateAction, useState } from "react";
import "./Shop.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import jerseyFront from "./asset/shop/shirt_1.png";
import jerseyBack from "./asset/shop/shirt_2.png";

function Shop() {
  // État pour stocker la taille sélectionnée
  const [size, setSize] = useState("");

  // Fonction pour gérer le changement de sélection
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSize(event.target.value);
  };
  return (
    <>
      <TopBar />
      <div
        className="Shop"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">Boutique</div>
        <div className="title-desc">
          Decouvrez les nouvelles couleurs d'Exalty
        </div>
        <div className="jersey">
          <div>
            <img src={jerseyFront} alt="jerseyFront"></img>
            <img src={jerseyBack} alt="jerseyBack"></img>
          </div>
          <div className="jersey-infos">
            <div className="jersey-price">50,00 €</div>
            <div className="jersey-size">
              Taille du maillot{" "}
              <select value={size} onChange={handleChange}>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div className="jersey-tag">
              Flocage <input placeholder="Pseudo"></input>
            </div>
            <div className="jersey-add">
              <button className="btn" onClick={() => alert("Ajouté au panier")}>
                AJOUTER AU PANIER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
