import { Link } from "react-router-dom";
import BasicComponent from "./BasicComponent";
import "./Legal.css";

function Faq() {
  return (
    <BasicComponent
      className="Legal"
      title="Legal Notice"
      content={
        <>
          <div>
            <div className="legal-section-title">1 - site edition</div>
            <div className="legal-section-content">
              <p>
                Under Article 6 of Law No. 2004-575 of 21 June 2004 For
                confidence in the digital economy, it is specified to the users
                of the website exalty.fr l identity of the various stakeholders
                in the context of its realization and its follow-up:
              </p>
              <p>
                <b>Site owner</b>: Exalty non-profit association - Contact:
                contact@exalty.fr - Address : 175 avenue de Flandre, 75019
                Paris.
              </p>
              <p>
                <b>Identification of the company</b>: Exalty non-profit
                association - SIREN: 892 284 571 - RNA: W583004688 - POSTAL
                ADDRESS : 175 avenue de Flandre, 75019 Paris.
              </p>
              <p>
                <b>Host</b>: OVH SAS-2 rue Kellermann-BP 80157-59053 Roubaix
                cedex 1 - Phone: 1007
              </p>
              <p>
                <b>Data Protection Delegate</b>: contact@exalty.fr
              </p>
            </div>
          </div>
          <div>
            <div className="legal-section-title">
              2 - Intellectual property and counterfeits
            </div>
            <div className="legal-section-content">
              <p>
                Exalty non-profit association owns intellectual property rights
                and holds the rights of use on all items available on the
                website, including texts, images, graphics, logos, Videos,
                architecture, icons and sounds.
              </p>
              <p>
                Any reproduction, representation, modification, publication,
                adaptation of all or part of the elements of the site,
                regardless of the means or method used, shall be prohibited,
                except for prior written permission of Exalty Non-Profit
                Association.
              </p>
              <p>
                Any unauthorized operation of the site or any of the elements it
                contains will be considered as constitutive of a counterfeiting
                and pursued in accordance with the provisions of the articles
                L.335-2 and following of the intellectual property code.
              </p>
            </div>
          </div>
          <div>
            <div className="legal-section-title">
              3 - Limitation limitations
            </div>
            <div className="legal-section-content">
              <p>
                Exalty non-profit association can not be held responsible for
                the direct and indirect damage caused to the user's hardware,
                during access to the site exalty.fr.
              </p>
              <p>
                Exalty non-profit association declines any responsibility for
                the use that could be made of information and content on
                exalty.fr.
              </p>
              <p>
                Exalty non-profit association undertakes to secure at best the
                site exalty.fr , however her responsibility can not be put In
                cause if unwanted data is imported and installed on its insuE
                site.
              </p>
              <p>
                Interactive spaces (contact space or comments) are available to
                users. Exalty Non-Profit Association reserves the right to
                delete, without prior notice, any content filed in this space
                which contravenes the applicable legislation in France, in
                particular the provisions relating to the protection of the
                protection of data.
              </p>
              <p>
                If applicable, Exalty non-profit association also reserves the
                opportunity to call into question the user's civil and / or
                criminal liability, particularly in the event of a racist
                message, abusive, defaming, or pornographic, regardless of the
                support used (text, photography ...).
              </p>
            </div>
          </div>
          <div>
            <div className="legal-section-title">
              4 - CNIL and personal data management
            </div>
            <div className="legal-section-content">
              <p>
                In accordance with the provisions of Law 78-17 of the January 6,
                1978 Amended, the user of the site exalty.fr has a right of
                access, modification and deletion of the information collected.
                To exercise this right, send a message to our data protection
                delegate: contact@exalty.fr.
              </p>
              <p>
                For more information on how we process your data (data type,
                purpose, recipient ...), read our Privacy Policy.
              </p>
              <p>It is also possible from file a claim with the CNIL.</p>
            </div>
          </div>
          <div>
            <div className="legal-section-title">
              5 - Hypertext links and cookies
            </div>
            <div className="legal-section-content">
              <p>
                exalty.fr contains hypertext links to other sites and gives off
                any responsibility about these external links or links created
                by Other sites to exalty.fr.
              </p>
              <p>
                The navigation on the site exalty.fr is likely to cause the
                cookie installation (s) on the computer of the user.
              </p>
              <p>
                A "cookie" is a small file that records information about
                navigating a user on a site. The data thus obtained makes it
                possible to obtain attendance measures, for example.
              </p>
              <p>
                You have the option to accept or refuse cookies by changing the
                settings of your browser. No cookie will be deposited without
                your consent.
              </p>
              <p>Cookies are recorded for a maximum period of months.</p>
              <p>
                For more information on how we use cookies, read our Privacy
                Policy
              </p>
            </div>
          </div>
        </>
      }
    />
  );
}
export default Faq;
