import { Link } from "react-router-dom";
import BasicComponent from "./BasicComponent";
import "./Faq.css";

function Faq() {
  return (
    <BasicComponent
      className="Faq"
      title="FAQ"
      content={
        <>
          <div>
            <div className="faq-section-title">
              1. Comment rejoindre Exalty ?
            </div>
            <div className="faq-section-content">
              Pour rejoindre Exalty et faire partie de notre communauté esport,
              il vous suffit de vous rendre <Link to="/recruitment">ici</Link> ,
              ou bien envoyez nous directement votre profil via :
              ressources-humaines@exalty.fr, en indiquant dans l'objet du
              message le poste qui vous intéresserait.
            </div>
          </div>
          <div>
            <div className="faq-section-title">
              2. Comment puis-je participer a des tournois ou evenements
              organises par Exalty ?
            </div>
            <div className="faq-section-content">
              Selon les événements que nous organisation, le système
              d'inscription peut varier. Pour cela, nous vous invitons à nous
              suivre sur nos réseaux sociaux où nous partagerons les
              informations nécessaires.
            </div>
          </div>
          <div>
            <div className="faq-section-title">
              3. Est-ce que je peux retourner un article si je change d'avis ?
            </div>
            <div className="faq-section-content">
              Il est possible de retourner un article non porté et non floqué
              sous 30 jours. Vous pouvez consulter nos conditions générales de
              ventes pour plus de détail.
            </div>
          </div>
          <div>
            <div className="faq-section-title">
              4. Comment puis-je contacter le support client d'Exalty ?
            </div>
            <div className="faq-section-content">
              Vous pouvez directement nous écrire à l'adresse contact@exalty.fr
            </div>
          </div>
          <div>Pour plus d'informations, n'hésitez pas à nous contacter !</div>
        </>
      }
    />
  );
}
export default Faq;
