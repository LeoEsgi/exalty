import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import "./ValidateMail.css";
import balmain from "./asset/balmain.svg";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

function ValidateMail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const validateToken = async () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    try {
      await axios.post("http://localhost:5000/auth/validate", {
        token,
      });
      setOpen(true);
      setTimeout(() => {
        navigate("/auth");
      }, 3000);
    } catch (error) {
      alert("Error validating token");
    }
  };
  validateToken();

  return (
    <>
      <TopBar />
      <div
        className="ValidateMail"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="validate-content"></div>
      </div>

      <Dialog open={open} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {"Vous avez valider votre compte !"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Vous pouvez maintenant vous connecter.
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}
export default ValidateMail;
