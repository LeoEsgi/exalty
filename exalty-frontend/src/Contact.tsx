import TopBar from "./TopBar";
import "./Contact.css";
import balmain from "./asset/balmain.svg";
import { Link } from "react-router-dom";
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
        <div className="title-desc-3">
          <div>Vibrez à chaque Victoire, résistez dans la défaite</div>
          <div>
            Rejoignez notre communauté de passionnée pour vivre une aventure
            exaltante !
          </div>
          <div>
            Vous avez une question ? Elle a peut etre deja été posé ici:{" "}
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
              <textarea id="message" name="message" required></textarea>
              <button className="btn">Envoyer</button>
            </form>
          </div>
          <div className="join">
            <h1>Nous rejoindre</h1>
            <div className="social-list">
              <div className="social-item">@Exalty_FR</div>
              <div className="social-item">@exaltyfr</div>
              <div className="social-item">@exalty_fr</div>
              <div className="social-item">ExaltyTV1</div>
              <div className="social-item">@exalty_fr</div>
              <div className="social-item">Exalty</div>
              <div className="social-item">Exalty</div>
              <div className="social-item">@Exalty</div>
            </div>
            <button className="btn">Rejoignez-Nous !</button>
          </div>
        </div>
        <div>
          <div className="other">
            Nous sommes également joignable par mail à cette adresse :
            <a href="mailto:contact@exalty.fr"> contact@exalty.fr</a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
