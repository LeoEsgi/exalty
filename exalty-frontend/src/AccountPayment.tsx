import axios from "axios";
import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
import { credit_card } from "./Models";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import mastercard from "./asset/credit_card/mastercard.jpeg";
import "./AccountPayment.css";
function AccountPayment() {
  const [credits, setCredit] = useState<credit_card[]>([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const getCredit = async () => {
    const response = await axios
      .get("http://localhost:5000/shop/credit/user/" + user.id)
      .catch((err) => {
        console.error("Error fetching credit_card:", err);
        return { data: [] };
      });
    return response.data as credit_card[];
  };

  const createCredit = async () => {
    const number = document.querySelector<HTMLInputElement>(
      "input[name='number']"
    )?.value;
    const name = document.querySelector<HTMLInputElement>(
      "input[name='credit_name']"
    )?.value;
    const expiration = document.querySelector<HTMLInputElement>(
      "input[name='expiration']"
    )?.value;
    const cvc =
      document.querySelector<HTMLInputElement>("input[name='cvv']")?.value;

    if (!number || !name || !expiration || !cvc) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newCredit = {
      number,
      name,
      expiration,
      cvc,
      user_id: user.id,
    };

    const response = await axios
      .post("http://localhost:5000/shop/credit", newCredit)
      .catch((err) => {
        console.error("Error creating credit card:", err);
        return { data: [] };
      });
    return response.data as credit_card;
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }

    const fetchAddress = async () => {
      const creditFromServer = await getCredit();
      setCredit(creditFromServer);
    };
    fetchAddress();
  }, []);

  return (
    <BasicComponent
      className="AccountPayment"
      title="Vos Moyens de Paiement"
      desc="Modifier ou ajouter des moyens de paiement"
      content={
        <>
          <div className="credit_card_list">
            {credits &&
              credits.map((credit) => (
                <div
                  key={credit.id}
                  style={{
                    backgroundImage: `url(${mastercard})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%",
                  }}
                  className="credit"
                >
                  <div className="credit_infos">
                    <p>**** {credit.number.toString().slice(-4)}</p>
                    <p>{credit.name}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="credit_card_add">
            <p>Ajouter une nouvelle méthode de paiement</p>
            <form className="credit_card_add_form">
              <input name="number" placeholder="Numéro de carte"></input>
              <input name="credit_name" placeholder="Nom sur la carte"></input>
              <input name="expiration" placeholder="Date d'expiration"></input>
              <input name="cvv" placeholder="Code de sécurité (CVV)"></input>

              <button className="btn" onClick={() => createCredit()}>
                Ajouter
              </button>
            </form>
          </div>
        </>
      }
    />
  );
}

export default AccountPayment;
