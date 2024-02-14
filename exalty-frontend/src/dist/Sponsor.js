"use strict";
exports.__esModule = true;
require("./Sponsor.css");
var balmain_svg_1 = require("./asset/balmain.svg");
var _1337_png_1 = require("./asset/sponsor/1337.png");
var nordvpn_svg_1 = require("./asset/sponsor/nordvpn.svg");
var eneba_svg_1 = require("./asset/sponsor/eneba.svg");
var flowup_png_1 = require("./asset/sponsor/flowup.png");
var onexwear_png_1 = require("./asset/sponsor/onexwear.png");
var TopBar_1 = require("./TopBar");
var react_1 = require("react");
function Sponsor() {
    var _a = react_1.useState(0), showSponsor = _a[0], setShowSponsor = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "Sponsor", style: {
                backgroundImage: "url(" + balmain_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title" }, "Nos partenaires"),
            React.createElement("div", { className: "sponsor-list" },
                React.createElement("div", { className: "sponsor", onClick: function () { return setShowSponsor(0); } },
                    React.createElement("img", { src: flowup_png_1["default"], alt: "FlowUP" })),
                React.createElement("div", { className: "sponsor", onClick: function () { return setShowSponsor(1); } },
                    React.createElement("img", { src: _1337_png_1["default"], alt: "1337 pharma" })),
                React.createElement("div", { className: "sponsor", onClick: function () { return setShowSponsor(2); } },
                    React.createElement("img", { src: onexwear_png_1["default"], alt: "One X Wear" })),
                React.createElement("div", { className: "sponsor", onClick: function () { return setShowSponsor(3); } },
                    React.createElement("img", { src: eneba_svg_1["default"], alt: "Eneba" })),
                React.createElement("div", { className: "sponsor", onClick: function () { return setShowSponsor(4); } },
                    React.createElement("img", { src: nordvpn_svg_1["default"], alt: "NordVPN" }))),
            React.createElement("div", { className: "sponsor-content" },
                showSponsor === 0 && (React.createElement("div", { className: "sponsor-desc" },
                    "FlowUP est un acteur cl\u00E9 dans le monde du gaming et du e-sport. Leur plateforme innovante offre des solutions optimis\u00E9es pour le streaming et la diffusion de contenu, renfor\u00E7ant ainsi la visibilit\u00E9 et l'engagement de notre communaut\u00E9. Leur soutien technique et technologique est essentiel pour le d\u00E9veloppement et le succ\u00E8s de nos initiatives.",
                    " ",
                    React.createElement("a", { href: "https://flowup.shop" }, "https://flowup.shop"))),
                " ",
                showSponsor === 1 && (React.createElement("div", { className: "sponsor-desc" },
                    "1337 Pharma, quant \u00E0 lui, est un leader dans le secteur de la sant\u00E9 et du bien-\u00EAtre adapt\u00E9 aux gamers. Avec une gamme de produits con\u00E7us pour am\u00E9liorer la concentration et la performance, 1337 Pharma joue un r\u00F4le crucial dans le soutien de nos athl\u00E8tes et membres, en veillant \u00E0 leur sant\u00E9 physique et mentale, un aspect fondamental dans le monde comp\u00E9titif de l'e-sport.",
                    " ",
                    React.createElement("a", { href: "https://1337pharma.com" }, "https://1337pharma.com"))),
                " ",
                showSponsor === 2 && (React.createElement("div", { className: "sponsor-desc" },
                    "One X Wear est notre partenaire officiel pour tout ce qui concerne le merchandising. Sp\u00E9cialiste dans la cr\u00E9ation de v\u00EAtements et accessoires personnalis\u00E9s pour les gamers, One X Wear propose une gamme de produits de haute qualit\u00E9 qui refl\u00E8te l'esprit et le dynamisme de notre association. Leur expertise dans le domaine du merchandising gaming fait d'eux un partenaire incontournable pour Exalty, nous permettant d'offrir \u00E0 nos membres et fans des produits exclusifs et tendance.",
                    " ",
                    React.createElement("a", { href: "https://onex.gg" }, "https://onex.gg"))),
                showSponsor === 3 && (React.createElement("div", { className: "sponsor-desc" },
                    "Eneba est une marketplace incontournable pour tous les amateurs de jeux vid\u00E9o. Leur large s\u00E9lection de jeux et leur syst\u00E8me de paiement s\u00E9curis\u00E9 en font un partenaire de choix pour Exalty. Leur engagement \u00E0 fournir un acc\u00E8s abordable et facile aux derniers jeux aide notre communaut\u00E9 \u00E0 rester \u00E0 la pointe de l'innovation et du divertissement.",
                    " ",
                    React.createElement("a", { href: "https://eneba.com" }, "https://eneba.com"))),
                showSponsor === 4 && (React.createElement("div", { className: "sponsor-desc" },
                    "NordVPN est un leader mondial dans le domaine de la s\u00E9curit\u00E9 internet. Leur service VPN de pointe assure une protection en ligne de premier ordre pour nos membres, prot\u00E9geant leurs donn\u00E9es personnelles et s\u00E9curisant leur connexion lors de tournois en ligne et de sessions de jeu. La confiance et la s\u00E9curit\u00E9 sont primordiales dans l'univers num\u00E9rique, et gr\u00E2ce \u00E0 NordVPN, nous pouvons garantir \u00E0 notre communaut\u00E9 une exp\u00E9rience en ligne s\u00FBre et sans tracas.",
                    React.createElement("a", { href: "https://nordvpn.net" }, "https://nordvpn.net")))))));
}
exports["default"] = Sponsor;
