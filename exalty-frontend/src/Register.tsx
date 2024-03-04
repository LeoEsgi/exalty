import React from "react";
import "./Register.css";
import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import axios from "axios";
import BottomBar from "./BottomBar";
function Register() {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // on enter key press connect user
  document.addEventListener("keydown" as any, (e) => {
    if (e.key === "Enter") {
      createUser();
    }
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenError = () => {
    setOpenError(true);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };
  const createUser = async () => {
    const pseudo = document.querySelector<HTMLInputElement>(
      "input[name='Pseudo']"
    )?.value;
    const password = document.querySelector<HTMLInputElement>(
      "input[name='password']"
    )?.value;
    const passwordVerify = document.querySelector<HTMLInputElement>(
      "input[name='password-verify']"
    )?.value;
    const email = document.querySelector<HTMLInputElement>(
      "input[name='Email']"
    )?.value;
    const emailVerify = document.querySelector<HTMLInputElement>(
      "input[name='verify-Email']"
    )?.value;

    const first_name = document.querySelector<HTMLInputElement>(
      "input[name='Prénom']"
    )?.value;
    const last_name =
      document.querySelector<HTMLInputElement>("input[name='Nom']")?.value;
    const tag =
      document.querySelector<HTMLInputElement>("input[name='Tag']")?.value;

    if (
      !pseudo ||
      !password ||
      !passwordVerify ||
      !email ||
      !emailVerify ||
      !first_name ||
      !last_name
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (email !== emailVerify) {
      alert("Les emails ne sont pas identiques");
      return;
    }

    if (password !== passwordVerify) {
      alert("Les mots de passe ne sont pas identiques");
      return;
    }

    try {
      await axios.post("http://localhost:5000/auth/register", {
        pseudo,
        password,
        email,
        first_name,
        last_name,
        tag,
      });
      handleClickOpen();
    } catch (error) {
      handleClickOpenError();
    }
  };
  return (
    <>
      <TopBar />
      <div
        className="Register"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="register-content">
          <div className="register-title">Creation du compte</div>
          <div className="register-form">
            <div className="register-info">
              <input required placeholder="* Nom" name="Nom"></input>
              <input required placeholder="* Prénom" name="Prénom"></input>
              <input required placeholder="* Pseudo" name="Pseudo"></input>
              <input placeholder="Tag discord" name="Tag"></input>
            </div>
            <div className="register-mail">
              <input
                required
                placeholder="* Email"
                type="mail"
                name="Email"
              ></input>
              <input
                required
                placeholder="* Confirmer Email"
                type="mail"
                name="verify-Email"
              ></input>
            </div>

            <div className="register-password">
              <input
                required
                name="password"
                placeholder="* Mot de passe"
                type="password"
              ></input>
              <input
                required
                placeholder="* Confirmer le mot de passe"
                name="password-verify"
                type="password"
              ></input>
            </div>
          </div>
          <div className="register-required">* Champs obligatoires</div>
          <div className="register-conditions">
            <button className="register-btn" onClick={() => createUser()}>
              CREER MON COMPTE
            </button>
            <div className="already-account">
              Vous avez un compte ? <Link to="/auth">Connectez-vous</Link>
            </div>
          </div>
        </div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Inscription validée !"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Un mail de confirmation vous a été envoyé, veuillez valider votre
              email pour continuer votre inscription et accéder à votre compte.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={fullScreen}
          open={openError}
          onClose={handleCloseError}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Erreur lors de l'inscription"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Une erreur est survenue lors de l'inscription, veuillez réessayer
              plus tard.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseError}>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <BottomBar />
    </>
  );
}
export default Register;
