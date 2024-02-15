import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import svgExa from "./asset/exalty.svg";

import "./TopBar.css";
interface TopBarProps {
  isHomePageVisible?: boolean;
}
function TopBar({ isHomePageVisible }: TopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="TopBar">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        className="menuButton"
      >
        <MenuIcon />
      </IconButton>
      <div className="logoExaMobile">
        <Link to="/">
          <img className="logoExa" src={svgExa} alt=""></img>
        </Link>
      </div>
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
          <Link to="/team">Equipes</Link>
          {showDropdown && (
            <div className="dropdownMenu">
              <Link to="/teamInfo?game=Valorant">Valorant</Link>
              <Link to="/teamInfo?game=Lol">League of Legends</Link>
            </div>
          )}
        </div>
      )}
      {!showMobileMenu && (
        <div>
          <Link to="/sponsor">Partenaires</Link>
        </div>
      )}
      <div
        style={{ visibility: isHomePageVisible ? "hidden" : "visible" }}
        className="logoExaDiv"
      >
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
