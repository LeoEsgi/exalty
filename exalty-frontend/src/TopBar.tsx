import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import svgExa from "./asset/exalty.svg";

import "./TopBar.css";
import axios from "axios";
interface TopBarProps {
  isLogoVisible?: boolean;
}
function TopBar({ isLogoVisible = true }: TopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/user");
  //       console.log("Success:", response.data);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error getting user :", error);
  //     }
  //   };

  //   getUsers();
  // }, []);
  return (
    <>
      <div
        className="TopBar"
        style={{ backgroundColor: isLogoVisible ? "black" : "transparent" }}
      >
        <div className="menu-mobile">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>

          <div className="menu-mobile-content">
            {showMobileMenu && (
              <div>
                <Link to="/shop">Boutique</Link>
              </div>
            )}
            {showMobileMenu && (
              <div
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
                className="dropdown"
              >
                <Link to="/team">Equipes</Link>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <Link to="/teamInfo?game=Valorant">Valorant</Link>
                    <Link to="/teamInfo?game=Lol">League of Legends</Link>
                  </div>
                )}
              </div>
            )}
            {showMobileMenu && (
              <div>
                <Link to="/sponsor">Partenaires</Link>
              </div>
            )}
            {showMobileMenu && (
              <div>
                <Link to="/contact">Contact</Link>
              </div>
            )}
            {showMobileMenu && (
              <div
                onMouseEnter={() => setShowDropdown3(true)}
                onMouseLeave={() => setShowDropdown3(false)}
                className="dropdown"
              >
                <AccountCircleIcon fontSize="large" />
                {showDropdown3 && (
                  <div className="dropdown-menu-inverted">
                    <Link to="/auth">Se Connecter</Link>
                    <Link to="/register">S'Inscrire</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="menu-normal">
          <div>
            <Link to="/shop" className="nav-item">
              Boutique
            </Link>
          </div>{" "}
          <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            className="dropdown nav-item"
          >
            <Link to="/team">Equipes</Link>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/teamInfo?game=Valorant">Valorant</Link>
                <Link to="/teamInfo?game=Lol">League of Legends</Link>
              </div>
            )}
          </div>
          <div>
            <Link to="/sponsor" className="nav-item">
              Partenaires
            </Link>
          </div>
          <div
            style={{ visibility: isLogoVisible ? "visible" : "hidden" }}
            className="logoExaDiv"
          >
            <Link to="/">
              <img className="logoExa" src={svgExa} alt=""></img>
            </Link>
          </div>
          <div
            onMouseEnter={() => setShowDropdown2(true)}
            onMouseLeave={() => setShowDropdown2(false)}
            className="dropdown nav-item"
          >
            Devenir Membre
            {showDropdown2 && (
              <div className="dropdown-menu">
                <Link to="/member">Devenir Adhérant</Link>
                <Link to="/recruitment">Rejoindre Exalty</Link>
              </div>
            )}
          </div>
          <div>
            <Link to="/contact" className="nav-item">
              Contact
            </Link>
          </div>
          {!user && (
            <div
              onMouseEnter={() => setShowDropdown3(true)}
              onMouseLeave={() => setShowDropdown3(false)}
              className="dropdown"
            >
              <AccountCircleIcon fontSize="large" />
              {showDropdown3 && (
                <div className="dropdown-menu-inverted">
                  <Link to="/auth">Se connecter</Link>
                  <Link to="/register">S'inscrire</Link>
                </div>
              )}
            </div>
          )}
          {/* {user && (
            <div
              onMouseEnter={() => setShowDropdown3(true)}
              onMouseLeave={() => setShowDropdown3(false)}
              className="dropdown"
            >
              <AccountCircleIcon fontSize="large" />
              {showDropdown3 && (
                <div className="dropdown-menu-inverted">
                  <b>{user[0]["pseudo"]}</b>
                  <Link to="/profile">Profil</Link>
                  <a onClick={() => setUser(null)}>Se déconnecter</a>
                </div>
              )}
            </div>
          )} */}
        </div>
      </div>
    </>
  );
}

export default TopBar;
