import TopBar from "./TopBar";
import "./Contact.css";
import balmain from "./asset/balmain.svg";
import { Link } from "react-router-dom";
import BottomBar from "./BottomBar";
import svgInsta from "./asset/icon/insta.svg";
import svgTwitter from "./asset/icon/twitter.svg";
import svgTiktok from "./asset/icon/tiktok.svg";
import svgTwitch from "./asset/icon/twitch.svg";
import svgDiscord from "./asset/icon/discord.svg";
import svgThread from "./asset/icon/thread.svg";
import svgYoutube from "./asset/icon/youtube.svg";
import svgLinkdin from "./asset/icon/linkedin.svg";

function Contact() {
  return (
    <>
      <TopBar />
      <div
        className="Contact"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="contact-content">
          <div className="contact-desc">
            <div className="contact-desc2">
              <div>Vibrez à chaque Victoire, résistez dans la défaite</div>
              <div>
                Rejoignez notre communauté de passionnée pour vivre une aventure
                exaltante !
              </div>
            </div>
            <div className="ask-faq">
              Vous avez une question ? Elle a peut etre deja ete pose ici:{" "}
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
          <div className="form">
            <div className="contact">
              <h1>Nous contacter</h1>
              <form className="formMsg">
                <label htmlFor="pseudo">Pseudo</label>
                <input type="text" id="pseudo" name="pseudo" required></input>
                <label htmlFor="discord">Discord (recommandé)</label>
                <input type="text" id="discord" name="discord"></input>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required></input>
                <label htmlFor="message">Message</label>
                <textarea
                  style={{
                    backgroundImage: `url(${balmain})`,
                    backgroundPosition: "0% 0%",
                    backgroundSize: "230%",
                    backgroundRepeat: "repeat",
                  }}
                  id="message"
                  name="message"
                  required
                ></textarea>
                <div>* Champs obligatoires</div>
                <button className="contact-btn">Envoyer</button>
              </form>
            </div>
            <div className="join">
              <h1>Nous rejoindre</h1>
              <div className="social-list">
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://twitter.com/Exalty_FR"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgTwitter}
                    ></img>
                    @Exalty_FR
                  </Link>
                </div>
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://www.tiktok.com/@exaltyfr_"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgTiktok}
                    ></img>
                    @exaltyfr_
                  </Link>
                </div>
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://www.instagram.com/exalty_fr"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgInsta}
                    ></img>
                    @exalty_fr
                  </Link>
                </div>

                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://www.twitch.tv/ExaltyTV1"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgTwitch}
                    ></img>
                    ExaltyTV1
                  </Link>
                </div>
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://www.threads.net/@exalty_fr"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgThread}
                    ></img>
                    @exalty_fr
                  </Link>
                </div>
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://discord.com/invite/TH9t3Mv4qd"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgDiscord}
                    ></img>
                    Exalty
                  </Link>
                </div>
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://www.linkedin.com/company/exalty"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgLinkdin}
                    ></img>
                    Exalty
                  </Link>
                </div>
                <div className="social-item">
                  <Link
                    className="social-item-content"
                    to={"https://www.youtube.com/@Exalty"}
                  >
                    <img
                      className="logo-social-item invert-color"
                      alt=""
                      src={svgYoutube}
                    ></img>
                    @Exalty
                  </Link>
                </div>
              </div>
              <div></div>
              <button className="contact-btn">
                <Link to="/recruitment">Rejoignez-Nous !</Link>
              </button>
            </div>
          </div>
          <div>
            <div className="other">
              Nous sommes également joignable par mail à cette adresse :
              <a href="mailto:contact@exalty.fr"> contact@exalty.fr</a>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </>
  );
}
export default Contact;
