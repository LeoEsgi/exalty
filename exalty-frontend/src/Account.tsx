import React, { useEffect, useState } from "react";
import "./Account.css";
import TopBar from "./TopBar";
import { useNavigate } from "react-router-dom";
import { user } from "./Models";
import axios from "axios";
import { useAuth } from "./AuthContext";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PasswordIcon from "@mui/icons-material/Password";
import SettingsIcon from "@mui/icons-material/Settings";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import BottomBar from "./BottomBar";

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
          <h1>Votre Compte</h1>
        </div>
        <div className="settings-list">
          <div
            className="setting-commands"
            onClick={() => navigate("/account/order")}
          >
            <div className="img-setting">
              <Inventory2Icon />
            </div>
            <div>
              <div className="setting-title">Vos Commandes</div>
              <div className="setting-desc">
                Suivre, retourner ou acheter a nouveau
              </div>
            </div>
          </div>
          <div
            className="setting-address"
            onClick={() => navigate("/account/address")}
          >
            <div className="img-setting">
              <LocalShippingIcon />
            </div>
            <div>
              <div className="setting-title">Vos Adresses</div>
              <div className="setting-desc">
                Modifier ou ajouter des adresses
              </div>
            </div>
          </div>
          <div
            className="setting-payment"
            onClick={() => navigate("/account/payment")}
          >
            <div className="img-setting">
              <PaymentIcon />
            </div>
            <div>
              <div className="setting-title">Vos Moyens de paiement</div>
              <div className="setting-desc">
                Modifier ou ajouter des moyens de paiement
              </div>
            </div>
          </div>
          <div className="setting-password">
            <div className="img-setting">
              <PasswordIcon />
            </div>
            <div>
              <div className="setting-title">Votre mot de passe</div>
              <div className="setting-desc">Modifier votre mot de passe</div>
            </div>
          </div>
          <div className="setting-preferences">
            <div className="img-setting">
              <SettingsIcon />
            </div>
            <div>
              <div className="setting-title">Vos Preferences</div>
              <div className="setting-desc">Modifier vos preferences</div>
            </div>
          </div>
          <div className="setting-contact" onClick={() => navigate("/contact")}>
            <div className="img-setting">
              <ContactSupportIcon />
            </div>
            <div>
              <div className="setting-title">Nous contacter</div>
              <div className="setting-desc">Contacter le support</div>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
}

export default Account;
