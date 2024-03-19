import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import svgExa from "./asset/exalty.svg";
import MinimizeIcon from "@mui/icons-material/Minimize";
import AddIcon from "@mui/icons-material/Add";
import "./TopBar.css";
import axios from "axios";
import { game } from "./Models";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "./AuthContext";
import StarsIcon from "@mui/icons-material/Stars";

axios.defaults.withCredentials = true;

interface TopBarProps {
  isLogoVisible?: boolean;
}
function TopBar({ isLogoVisible = true }: TopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [games, setGames] = useState<game[]>([]);
  const { user, isAuthenticated, cart, isAdmin, logout } = useAuth();
  const [cartTotal, setCartTotal] = useState<number>(0);

  const getGames = async () => {
    const response = await axios
      .get("http://localhost:5000/game/")
      .catch((err) => {
        console.error("Error fetching games:", err);
        return { data: [] };
      });
    return response.data as game[];
  };

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames();
      if (Array.isArray(games)) {
        setGames(games);
      } else {
        console.error("Expected an array of games, but got:", games);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    if (cart && cart.cart_content && cart.cart_content.length > 0) {
      let total = 0;
      cart?.cart_content.forEach((content) => {
        total += content.quantity;
      });
      setCartTotal(total);
    }
  }, [cart]);

  return (
    <>
      <div
        className="TopBar"
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
                <Link to="/shop">Boutique</Link>
              </div>
              <div>
                <Link to="/matches">Matchs</Link>
              </div>

              <div
                onMouseLeave={() => setShowDropdown(false)}
                onClick={() => setShowDropdown(!showDropdown)}
                className="dropdown"
              >
                <div className="dropdown-title">Equipes</div>{" "}
                {showDropdown && <MinimizeIcon />}
                {!showDropdown && <AddIcon />}
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  <Link to="/team">Toutes les equipes</Link>
                  {games.map((game, index) => (
                    <Link key={index} to={`/teamInfo?game=${game.id}`}>
                      {game.name}
                    </Link>
                  ))}
                </div>
              )}

              <div>
                <Link to="/sponsor">Partenaires</Link>
              </div>

              <div
                onMouseLeave={() => setShowDropdown2(false)}
                onClick={() => setShowDropdown2(!showDropdown2)}
                className="dropdown nav-item"
              >
                <div className="dropdown-title">Devenir Membre</div>
                {showDropdown2 && <MinimizeIcon />}
                {!showDropdown2 && <AddIcon />}
              </div>
              {showDropdown2 && (
                <div className="dropdown-menu">
                  <Link to="/member">Devenir Adhérant</Link>
                  <Link to="/recruitment">Rejoindre Exalty</Link>
                </div>
              )}
              <div>
                <Link to="/organigramme">Organigramme</Link>
              </div>
              <div>
                <Link to="/contact">Contact</Link>
              </div>

              <div
                onMouseLeave={() => setShowDropdown3(false)}
                onClick={() => setShowDropdown3(!showDropdown3)}
                className="dropdown"
              >
                <div className="dropdown-title">Compte</div>
                {showDropdown3 && <MinimizeIcon />}
                {!showDropdown3 && <AddIcon />}
              </div>

              {showDropdown3 && (
                <div className="dropdown-menu">
                  {isAuthenticated ? (
                    <>
                      <Link className="nav-item" to="/account">
                        Mon Compte
                      </Link>
                      <Link className="nav-item" to="/cart">
                        Panier
                      </Link>
                      <Link className="nav-item" to="/account/order">
                        Commandes
                      </Link>
                      <Link className="nav-item" to="/account/address">
                        Adresses
                      </Link>
                      <Link className="nav-item" to="/account/payment">
                        Moyens de paiement
                      </Link>
                      {isAdmin && (
                        <Link className="nav-item" to="/management/team">
                          Back Office
                        </Link>
                      )}
                      <a onClick={logout} className="nav-item">
                        Deconnexion
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to="/auth">Se Connecter</Link>
                      <Link to="/register">S'Inscrire</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="menu-normal">
          <div className="left-panel">
            <div>
              <Link to="/shop" className="nav-item">
                Boutique
              </Link>
            </div>
            <div
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              className="dropdown nav-item"
            >
              <Link to="/team">Equipes</Link>
              {showDropdown && (
                <div className="dropdown-menu">
                  {games.map((game, index) => (
                    <Link
                      className="nav-item"
                      key={index}
                      to={`/teamInfo?game=${game.id}`}
                    >
                      {game.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div>
              <Link to="/matches" className="nav-item">
                Matchs
              </Link>
            </div>
            <div>
              <Link to="/sponsor" className="nav-item">
                Partenaires
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
            <div
              onMouseEnter={() => setShowDropdown2(true)}
              onMouseLeave={() => setShowDropdown2(false)}
              className="dropdown nav-item"
            >
              <a>Devenir Membre</a>
              {showDropdown2 && (
                <div className="dropdown-menu">
                  <Link className="nav-item" to="/member">
                    Devenir Adhérant
                  </Link>
                  <Link className="nav-item" to="/recruitment">
                    Rejoindre Exalty
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Link to="/organigramme" className="nav-item">
                Organigramme
              </Link>
            </div>
            <div>
              <Link to="/contact" className="nav-item">
                Contact
              </Link>
            </div>
            {cart && cart.cart_content && cart.cart_content.length > 0 && (
              <div className="cart-display-content">
                <Link to="/cart" className="nav-item">
                  <ShoppingCartIcon />
                  <div className="cart-display-length">{cartTotal}</div>
                </Link>
              </div>
            )}

            {isAuthenticated && user.fidelity_points > 0 && (
              <div className="fidelity_point">
                {user?.fidelity_points}
                <StarsIcon />
              </div>
            )}

            {isAuthenticated ? (
              <div
                onMouseEnter={() => setShowDropdown3(true)}
                onMouseLeave={() => setShowDropdown3(false)}
                className="dropdown"
              >
                <Link to="/account">
                  <AccountCircleIcon fontSize="large" />
                </Link>
                {showDropdown3 && (
                  <div className="dropdown-menu-inverted">
                    <Link className="nav-item" to="/account">
                      Mon Compte
                    </Link>
                    <Link className="nav-item" to="/cart">
                      Panier
                    </Link>
                    <Link className="nav-item" to="/account/order">
                      Commandes
                    </Link>
                    <Link className="nav-item" to="/account/address">
                      Adresses
                    </Link>
                    <Link className="nav-item" to="/account/payment">
                      Moyens de paiement
                    </Link>
                    {isAdmin && (
                      <Link className="nav-item" to="/management/team">
                        Back Office
                      </Link>
                    )}
                    <a onClick={logout} className="nav-item">
                      Deconnexion
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div
                onMouseEnter={() => setShowDropdown3(true)}
                onMouseLeave={() => setShowDropdown3(false)}
                className="dropdown"
              >
                <AccountCircleIcon fontSize="large" />
                {showDropdown3 && (
                  <div className="dropdown-menu-inverted">
                    <Link className="nav-item" to="/auth">
                      Se connecter
                    </Link>
                    <Link className="nav-item" to="/register">
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBar;
