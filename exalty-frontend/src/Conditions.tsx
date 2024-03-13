import { Link } from "react-router-dom";
import BasicComponent from "./BasicComponent";
import "./Conditions.css";

function Conditions() {
  return (
    <BasicComponent
      className="Conditions"
      title="Conditions General de Vente"
      content={
        <>
          <div>
            <div className="conditions-section-title">1. Objet</div>
            <div className="conditions-section-content">
              Les présentes Conditions Générales de Vente (ci-après dénommées
              "CGV") régissent la vente des produits fournis par notre
              partenaire One x wear (ci-après dénommé "le Fournisseur") et
              commercialisés sur le site internet exalty.fr (ci-après dénommé
              "le Site") par [Nom de votre entreprise] (ci-après dénommée "le
              Vendeur") à ses clients (ci-après dénommés "le Client").
            </div>
          </div>
          <div>
            <div className="conditions-section-title">
              2. Acceptation des CGV
            </div>
            <div className="conditions-section-content">
              En passant commande sur le site internet exalty.fr, le Client
              reconnaît avoir pris connaissance et accepté sans réserve les
              présentes CGV. Les CGV sont accessibles en permanence sur le Site
              exalty.fr et peuvent être modifiées à tout moment par le Vendeur.
            </div>
          </div>
          <div>
            <div className="conditions-section-title">3. Commande</div>
            <div className="conditions-section-content">
              <p>
                3.1. Le Client passe commande en suivant les étapes prévues sur
                le site internet exalty.fr. Le processus de commande comprend la
                sélection des Produits, la vérification du panier, la fourniture
                des informations de livraison et de paiement, et la confirmation
                de la commande.
              </p>
              <p>
                3.2. Le Vendeur se réserve le droit de refuser toute commande
                pour des motifs légitimes, notamment en cas de non-paiement, de
                litige antérieur avec le Client, ou de suspicion de fraude.
              </p>
              <p>
                3.3. Le Client peut avoir la possibilité de payer en plusieurs
                fois pour certains montants, conformément aux conditions
                spécifiques de paiement proposées par le Vendeur. Les modalités
                de paiement en plusieurs fois seront précisées lors du processus
                de commande.
              </p>
              <p>
                3.4. Les paiements sont gérés en toute sécurité par Stripe, un
                prestataire de services de paiement réputé. Le Client peut
                choisir parmi les modes de paiement acceptés par Stripe lors du
                processus de commande.
              </p>
            </div>
          </div>
          <div>
            <div className="conditions-section-title">4. Prix et Paiement</div>
            <div className="conditions-section-content">
              <p>
                4.1. Les prix des Produits sont indiqués en euros (€) et sont
                susceptibles d'être modifiés à tout moment par le Vendeur. Les
                prix applicables sont ceux en vigueur au moment de la passation
                de la commande par le Client.
              </p>
              <p>
                4.2. Le paiement s'effectue en ligne au moment de la commande
                par le Client, par les moyens de paiement acceptés sur le site
                internet exalty.fr.
              </p>
              <p>
                4.3. Le Client peut avoir la possibilité d'utiliser des codes
                promo ou de bénéficier de réductions spéciales pendant les
                périodes de soldes, conformément aux conditions spécifiques
                annoncées par le Vendeur. Les codes promo et les réductions
                seront appliqués lors du processus de commande, le cas échéant.
              </p>
            </div>
          </div>
          <div>
            <div className="conditions-section-title">5. Livraison</div>
            <div className="conditions-section-content">
              <p>
                5.1. Les délais de livraison sont indiqués sur le site internet
                exalty.fr à titre indicatif. Le Vendeur s'efforce de respecter
                ces délais, mais ne peut être tenu responsable des retards de
                livraison dus à des circonstances indépendantes de sa volonté.
              </p>
              <p>
                5.2. Les frais de livraison sont indiqués lors de la commande et
                sont à la charge du Client, sauf indication contraire.
              </p>
            </div>
          </div>
          <div>
            <div className="conditions-section-title">
              6. Droit de Retractation
            </div>
            <div className="conditions-section-content">
              Le Client dispose d'un délai de rétractation de 30 jours à compter
              de la réception des Produits pour exercer son droit de
              rétractation, sans avoir à justifier de motifs ni à payer de
              pénalités. Les modalités d'exercice de ce droit sont détaillées
              dans la politique de retour disponible sur le site internet
              exalty.fr.
            </div>
          </div>
          <div>
            <div className="conditions-section-title">
              7. Garantie et Responsabilite
            </div>
            <div className="conditions-section-content">
              <p>
                7.1. Le Vendeur garantit la conformité des Produits vendus aux
                spécifications indiquées sur le site internet exalty.fr.
              </p>
              <p>
                7.2. Le Vendeur ne peut en aucun cas être tenu responsable des
                dommages indirects ou consécutifs liés à l'utilisation des
                Produits.
              </p>
            </div>
          </div>
          <div>
            <div className="conditions-section-title">
              8. Donnees Personnelles
            </div>
            <div className="conditions-section-content">
              Le traitement des données personnelles du Client est soumis à la
              Politique de Confidentialité disponible sur le site internet
              exalty.fr. Pour ce qui est des données bancaires, veuillez noter
              que les informations de paiement sont traitées de manière
              sécurisée par notre prestataire de services de paiement, Stripe,
              conformément à leurs politiques de confidentialité et de sécurité.
            </div>
          </div>

          <div>
            <div className="conditions-section-title">9. Litiges</div>
            <div className="conditions-section-content">
              En cas de litige, les parties s'efforceront de trouver une
              solution amiable. À défaut, le litige sera soumis à la juridiction
              compétente conformément aux lois en vigueur.
            </div>
          </div>
        </>
      }
    />
  );
}
export default Conditions;
