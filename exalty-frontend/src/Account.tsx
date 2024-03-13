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
import balmain from "./asset/balmain.svg";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
function Account() {
  const [user, setUser] = useState<user>({} as user);
  const { isAuthenticated } = useAuth();
  const [openPasswordChange, setOpenPasswordChange] = useState(false);
  const [openPasswordChanged, setOpenPasswordChanged] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const checkInputSqlInjection = (input: string) => {
    const sqlRegex =
      /(\b)(drop|select|exec|insert|delete|update|script|javascript|onerror|onload)(\b)/i;
    return !sqlRegex.test(input);
  };

  const checkInputXss = (input: string) => {
    const xssRegex = /(<|>|&lt;|&gt;)/i;
    return !xssRegex.test(input);
  };

  const changePassword = async () => {
    const password = document.querySelector<HTMLInputElement>(
      "input[name='password']"
    )?.value;

    const password_valid = document.querySelector<HTMLInputElement>(
      "input[name='password_valid']"
    )?.value;
    if (!password || !password_valid) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (password !== password_valid) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    if (
      !checkInputSqlInjection(password) ||
      !checkInputSqlInjection(password_valid)
    ) {
      alert("Les caractères spéciaux ne sont pas autorisés");
      return;
    }

    if (!checkInputXss(password) || !checkInputXss(password_valid)) {
      alert("Les caractères spéciaux ne sont pas autorisés");
      return;
    }

    await axios.post("http://localhost:5000/user/" + user.id, {
      password,
    });
    setOpenPasswordChange(false);
    setOpenPasswordChanged(true);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    const fetchAccount = async () => {
      const response = await axios
        .get("http://localhost:5000/auth/me")
        .catch((err) => {
          navigate("/auth");
        });
      setUser(response?.data as user);
    };
    fetchAccount();
  }, [isAuthenticated, navigate]);

  return (
    <>
      <TopBar />
      <div
        className="Account"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
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
          <div
            className="setting-password"
            onClick={() => setOpenPasswordChange(true)}
          >
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

      <Dialog
        open={openPasswordChange}
        fullScreen={fullScreen}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Changer votre mot de passe"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour changer de mot de passe, entrez votre nouveau mot de passe.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            name="password_valid"
            label="Valider mot de passe"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenPasswordChange(false)}>
            Fermer
          </Button>
          <Button autoFocus onClick={() => changePassword()}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openPasswordChanged}
        onClose={() => setOpenPasswordChanged(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Mot de passe changé"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Votre mot de passe a été changé avec succès.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenPasswordChanged(false)}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>

      <BottomBar />
    </>
  );
}

export default Account;
