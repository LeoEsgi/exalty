"use strict";
exports.__esModule = true;
var TopBar_1 = require("./TopBar");
require("./Contact.css");
var balmain_svg_1 = require("./asset/balmain.svg");
var react_router_dom_1 = require("react-router-dom");
function Contact() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "Contact", style: {
                backgroundImage: "url(" + balmain_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title-desc-3" },
                React.createElement("div", null, "Vibrez \u00E0 chaque Victoire, r\u00E9sistez dans la d\u00E9faite"),
                React.createElement("div", null, "Rejoignez notre communaut\u00E9 de passionn\u00E9e pour vivre une aventure exaltante !"),
                React.createElement("div", null,
                    "Vous avez une question ? Elle a peut etre deja \u00E9t\u00E9 pos\u00E9 ici:",
                    " ",
                    React.createElement(react_router_dom_1.Link, { to: "/faq" }, "FAQ"))),
            React.createElement("div", { className: "form" },
                React.createElement("div", { className: "contact" },
                    React.createElement("h1", null, "Nous contacter"),
                    React.createElement("form", { className: "formMsg" },
                        React.createElement("label", { htmlFor: "pseudo" }, "Pseudo"),
                        React.createElement("input", { type: "text", id: "pseudo", name: "pseudo", required: true }),
                        React.createElement("label", { htmlFor: "discord" }, "Discord (recommand\u00E9)"),
                        React.createElement("input", { type: "text", id: "discord", name: "discord" }),
                        React.createElement("label", { htmlFor: "email" }, "Email"),
                        React.createElement("input", { type: "email", id: "email", name: "email", required: true }),
                        React.createElement("label", { htmlFor: "message" }, "Message"),
                        React.createElement("textarea", { id: "message", name: "message", required: true }),
                        React.createElement("button", { className: "btn" }, "Envoyer"))),
                React.createElement("div", { className: "join" },
                    React.createElement("h1", null, "Nous rejoindre"),
                    React.createElement("div", { className: "social-list" },
                        React.createElement("div", { className: "social-item" }, "@Exalty_FR"),
                        React.createElement("div", { className: "social-item" }, "@exaltyfr"),
                        React.createElement("div", { className: "social-item" }, "@exalty_fr"),
                        React.createElement("div", { className: "social-item" }, "ExaltyTV1"),
                        React.createElement("div", { className: "social-item" }, "@exalty_fr"),
                        React.createElement("div", { className: "social-item" }, "Exalty"),
                        React.createElement("div", { className: "social-item" }, "Exalty"),
                        React.createElement("div", { className: "social-item" }, "@Exalty")),
                    React.createElement("button", { className: "btn" }, "Rejoignez-Nous !"))),
            React.createElement("div", null,
                React.createElement("div", { className: "other" },
                    "Nous sommes \u00E9galement joignable par mail \u00E0 cette adresse :",
                    React.createElement("a", { href: "mailto:contact@exalty.fr" }, " contact@exalty.fr"))))));
}
exports["default"] = Contact;
