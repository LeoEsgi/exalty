import React, { useState } from "react";
import "./TopBar.css";
import svgExa from "./asset/exalty.svg";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function TopBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="TopBar">
      <div className="logoExaMobile">
        <Link to="/">
          <img className="logoExa" src={svgExa} alt=""></img>
        </Link>
      </div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="menuButton"
      >
        <MenuIcon />
      </IconButton>
      {!showMobileMenu && (
        <div>
          <Link to="/shop">Boutique</Link>
        </div>
      )}{" "}
      {!showMobileMenu && (
        <div
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
          className="dropdown"
        >
          Equipes
          {showDropdown && (
            <div className="dropdownMenu">
              <Link to="/teamInfo">Valorant</Link>
              <Link to="/teamInfo">League of Legends</Link>
            </div>
          )}
        </div>
      )}
      {!showMobileMenu && (
        <div>
          <Link to="/sponsor">Partenaires</Link>
        </div>
      )}
      <div className="logoExaDiv">
        <Link to="/">
          <img className="logoExa" src={svgExa} alt=""></img>
        </Link>
      </div>
      {!showMobileMenu && (
        <div
          onMouseEnter={() => setShowDropdown2(true)}
          onMouseLeave={() => setShowDropdown2(false)}
          className="dropdown"
        >
          Devenir Membre
          {showDropdown2 && (
            <div className="dropdownMenu">
              <Link to="/member">Devenir Adhérant</Link>
              <Link to="/recruitment">Rejoindre Exalty</Link>
            </div>
          )}
        </div>
      )}
      {!showMobileMenu && (
        <div>
          <Link to="/contact">Contact</Link>
        </div>
      )}
      {!showMobileMenu && (
        <div
          onMouseEnter={() => setShowDropdown3(true)}
          onMouseLeave={() => setShowDropdown3(false)}
          className="dropdown"
        >
          <AccountCircleIcon fontSize="large" />
          {showDropdown3 && (
            <div className="dropdownMenu-inverted">
              <Link to="/auth">Se Connecter</Link>
              <Link to="/register">S'Inscrire</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TopBar;
