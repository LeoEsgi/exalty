import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import svgExa from "../asset/exalty.svg";
import "./TopBarManagement.css";
interface TopBarProps {
  isLogoVisible?: boolean;
}
function TopBarManagement({ isLogoVisible = true }: TopBarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <div
        className="TopBarManagement"
        style={{ backgroundColor: isLogoVisible ? "#000000a1" : "transparent" }}
      >
        <div className="menu-mobile">
          <IconButton
            color="inherit"
            aria-label="open menu"
            edge="start"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="menuButton"
          >
            <MenuIcon />
          </IconButton>
          {showMobileMenu && (
            <div className="menu-mobile-content">
              <div>
                <Link to="/">Accueil</Link>
              </div>
              <div>
                <Link to="/management/shop">Gestion Boutique</Link>
              </div>
              <div>
                <Link to="/management/matches">Gestion Matchs</Link>
              </div>
              <div>
                <Link to="/management/team">Gestion Equipes</Link>
              </div>
              <div>
                <Link to="/management/sponsor">Gestion Partenaires</Link>
              </div>
              <div>
                <Link to="/management/user">Gestion des Utilisateurs</Link>
              </div>
              <div>
                <Link to="/management/newsletter">Gestion NewsLetter</Link>
              </div>
            </div>
          )}
        </div>

        <div className="menu-normal">
          <div className="left-panel">
            <div>
              <Link to="/management/shop" className="nav-item">
                Gestion Boutique
              </Link>
            </div>
            <div>
              <Link to="/management/team">Gestion Equipes</Link>
            </div>

            <div>
              <Link to="/management/match" className="nav-item">
                Gestion Matchs
              </Link>
            </div>
          </div>
          <div className="center-panel">
            <div
              style={{ visibility: isLogoVisible ? "visible" : "hidden" }}
              className="logoExaDiv"
            >
              <Link to="/">
                <img className="logoExa" src={svgExa} alt=""></img>
              </Link>
            </div>
          </div>
          <div className="right-panel">
            <div>
              <Link to="/management/sponsor" className="nav-item">
                Gestion Partenaires
              </Link>
            </div>

            <div>
              <Link to="/management/user" className="nav-item">
                Gestion Utilisateurs
              </Link>
            </div>
            <div>
              <Link to="/management/newsletter" className="nav-item">
                Gestion NewsLetter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBarManagement;
