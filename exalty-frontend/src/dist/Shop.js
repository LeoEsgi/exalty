"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./Shop.css");
var TopBar_1 = require("./TopBar");
var balmain_svg_1 = require("./asset/balmain.svg");
var shirt_1_png_1 = require("./asset/shop/shirt_1.png");
var shirt_2_png_1 = require("./asset/shop/shirt_2.png");
function Shop() {
    // État pour stocker la taille sélectionnée
    var _a = react_1.useState(""), size = _a[0], setSize = _a[1];
    // Fonction pour gérer le changement de sélection
    var handleChange = function (event) {
        setSize(event.target.value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "Shop", style: {
                backgroundImage: "url(" + balmain_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title" }, "Boutique"),
            React.createElement("div", { className: "title-desc" }, "Decouvrez les nouvelles couleurs d'Exalty"),
            React.createElement("div", { className: "jersey" },
                React.createElement("div", null,
                    React.createElement("img", { src: shirt_1_png_1["default"], alt: "jerseyFront" }),
                    React.createElement("img", { src: shirt_2_png_1["default"], alt: "jerseyBack" })),
                React.createElement("div", { className: "jersey-infos" },
                    React.createElement("div", { className: "jersey-price" }, "50,00 \u20AC"),
                    React.createElement("div", { className: "jersey-size" },
                        "Taille du maillot",
                        " ",
                        React.createElement("select", { value: size, onChange: handleChange },
                            React.createElement("option", { value: "S" }, "S"),
                            React.createElement("option", { value: "M" }, "M"),
                            React.createElement("option", { value: "L" }, "L"),
                            React.createElement("option", { value: "XL" }, "XL"),
                            React.createElement("option", { value: "XXL" }, "XXL"))),
                    React.createElement("div", { className: "jersey-tag" },
                        "Flocage ",
                        React.createElement("input", { placeholder: "Pseudo" })),
                    React.createElement("div", { className: "jersey-add" },
                        React.createElement("button", { className: "btn", onClick: function () { return alert("Ajouté au panier"); } }, "AJOUTER AU PANIER")))))));
}
exports["default"] = Shop;
