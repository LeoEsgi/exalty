"use strict";
exports.__esModule = true;
require("./Member.css");
var TopBar_1 = require("./TopBar");
var balmain_svg_1 = require("./asset/balmain.svg");
function Member() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "Member", style: {
                backgroundImage: "url(" + balmain_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title" }, "Nous supporter"),
            React.createElement("div", { className: "title-desc" }, "Entrez dans la l\u00E9gende en rejoignant nos rangs"),
            React.createElement("div", { className: "title-desc" }, "Trouvez celui qui vous convient"),
            React.createElement("div", { className: "subscribe-list" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-title" }, "Cotisant 4.99\u20AC/mois"),
                    React.createElement("h2", null, "La commande sera possible qu'\u00E0 partir du 26/02"),
                    React.createElement("button", { className: "btn", onClick: function () { return alert("Souscription validée"); } }, "Souscrire"),
                    React.createElement("a", { href: "#" }, "EN SAVOIR PLUS")),
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-title" }, "Adherant 50\u20AC/an"),
                    React.createElement("h2", null, "La commande sera possible qu'\u00E0 partir du 10/02"),
                    React.createElement("button", { className: "btn", onClick: function () { return alert("Souscription validée"); } }, "Souscrire"),
                    React.createElement("a", { href: "#" }, "EN SAVOIR PLUS")),
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-title" }, "Adherant Premium 100\u20AC/an"),
                    React.createElement("h2", null, "La commande sera possible qu'\u00E0 partir du 10/02"),
                    React.createElement("button", { className: "btn", onClick: function () { return alert("Souscription validée"); } }, "Souscrire"),
                    React.createElement("a", { href: "#" }, "EN SAVOIR PLUS"))))));
}
exports["default"] = Member;
