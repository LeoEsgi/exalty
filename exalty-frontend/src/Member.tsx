import { useEffect, useState } from "react";
import "./Member.css";
import { DialogMsg, membership, price_occurence } from "./Models";
import axios from "axios";
import BasicComponent from "./BasicComponent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { styled } from "@mui/material/styles";
function Member() {
  const [memberShips, setMemberShips] = useState<membership[]>([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(false);
  const [selectMembership, setSelectMembership] = useState<membership>();

  const BootstrapButton = styled(Button)({
    backgroundColor: "#928f57",
    border: "none",
    color: "white",
    borderRadius: "1em",
    fontSize: "1.2rem",
    padding: "1em",
    paddingRight: "4em",
    paddingLeft: "4em",
    marginTop: "1.5em",
    marginBottom: "1.5em",
    textDecoration: "none",

    "&:hover": {
      backgroundColor: "#928f57",
      boxShadow: "0 0 0 0.2rem #928f57",
    },
  });

  const getMemberShips = async () => {
    const response = await axios
      .get("http://localhost:5000/membership/")
      .catch((err) => {
        console.error("Error fetching matches:", err);
        return { data: [] };
      });
    return response.data as membership[];
  };

  const handleMembershipClick = async (membership: membership) => {
    setSelectMembership(membership);
    setOpen(true);
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
              {memberShips.map((membership, index) => (
                <div
                  onClick={() => handleMembershipClick(membership)}
                  style={{
                    backgroundImage: `url(${
                      "http://localhost:5000/uploads/membership/" +
                      membership.img
                    })`,
                    backgroundSize: "cover",
                  }}
                  className={"card card-" + membership.id}
                  key={index}
                >
                  <div className="card-title">
                    {membership.name} {membership.price}€/
                    {price_occurence.MONTHLY === membership.occurence
                      ? "mois"
                      : "an"}
                  </div>
                </div>
              ))}
            </div>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">
                {selectMembership?.name}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectMembership?.description.split("/n").map((i, key) => {
                    return (
                      <p key={key}>
                        <b>{i.split(" ")[0]}</b> {" : " + i.split("  ")[1]}
                      </p>
                    );
                  })}
                </DialogContentText>
              </DialogContent>
              <DialogActions style={{ justifyContent: "center" }}>
                <BootstrapButton
                  autoFocus
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Souscrire
                </BootstrapButton>
              </DialogActions>
            </Dialog>
          </>
        }
      />
    </>
  );
}

export default Member;
