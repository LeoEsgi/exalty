import React, { useEffect, useState } from "react";
import "./Account.css";
import TopBar from "./TopBar";
import { useNavigate } from "react-router-dom";
import { user } from "./Models";
import axios from "axios";
import { useAuth } from "./AuthContext";

function Account() {
  const [user, setUser] = useState<user>({} as user);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    const fetchAccount = async () => {
      const response = await axios.get("http://localhost:5000/auth/me");
      setUser(response.data as user);
    };
    fetchAccount();
  }, [isAuthenticated, navigate]);

  return (
    <>
      <TopBar />
      <div className="Account">
        <div className="">
          <h1>Mon Compte</h1>
        </div>
        <div className="">
          <div className="">
            <h2>Informations personnelles</h2>
            <p>
              <span>Prénom:</span> {user.first_name}
            </p>
            <p>
              <span>Nom:</span> {user.last_name}
            </p>
            <p>
              <span>Pseudo:</span> {user.pseudo}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
            <p>
              <span>Discord:</span> {user.discord_tag}
            </p>
          </div>
          <div className="">
            <h2>Historique de commandes</h2>
            <ul>
              {user.order ? (
                user.order.map((order, index) => {
                  return (
                    <li key={index}>
                      <p>
                        <span>Commande n°:</span> {order.id}
                      </p>
                      <p>
                        <span>Date de commande:</span>{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p>
                        <span>Prix:</span> {order.paid_price_ht}€
                      </p>
                      <p>
                        <span>Status de paiement:</span> {order.payment_status}
                      </p>
                    </li>
                  );
                })
              ) : (
                <p>Pas de commandes à afficher.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Account;
