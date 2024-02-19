import React from "react";
import "./Auth.css";
import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import axios from "axios";
function Auth() {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
  const connectUser = async () => {
    // recupere les valeurs des inputs
    const email = document.querySelector<HTMLInputElement>(
      "input[name='Email']"
    )?.value;
    const password = document.querySelector<HTMLInputElement>(
      "input[name='password']"
    )?.value;

    try {
      await axios.post("http://localhost:5000/auth/sign-in", {
        email,
        password,
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
        className="Auth"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="auth-content">
          <div className="auth-title">Se connecter</div>
          <div className="login-form">
            <div>
              <input placeholder="Email" name="Email"></input>
            </div>
            <div>
              <input
                placeholder="Mot de passe"
                type="password"
                name="password"
              ></input>
            </div>
            <button className="auth-btn" onClick={() => connectUser()}>
              SE CONNECTER
            </button>
            <div className="create">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register">Creer votre compte</Link>
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
            {"Connexion réussie"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vous êtes maintenant connecté, vous allez être redirigé vers la
              page d'accueil.
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
            {"Compte introuvable"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Votre email ou votre mot de passe est incorrect, veuillez
              réessayer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleCloseError}>
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
export default Auth;
