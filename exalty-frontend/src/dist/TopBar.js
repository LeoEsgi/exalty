"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./TopBar.css");
var exalty_svg_1 = require("./asset/exalty.svg");
var react_router_dom_1 = require("react-router-dom");
function TopBar() {
    var _a = react_1.useState(false), showDropdown = _a[0], setShowDropdown = _a[1];
    var _b = react_1.useState(false), showDropdown2 = _b[0], setShowDropdown2 = _b[1];
    var _c = react_1.useState(false), showDropdown3 = _c[0], setShowDropdown3 = _c[1];
    return (react_1["default"].createElement("div", { className: "TopBar" },
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/shop" }, "Boutique")),
        react_1["default"].createElement("div", { onMouseEnter: function () { return setShowDropdown(true); }, onMouseLeave: function () { return setShowDropdown(false); }, className: "dropdown" },
            "Equipes",
            showDropdown && (react_1["default"].createElement("div", { className: "dropdownMenu" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/teamInfo" }, "Valorant"),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/teamInfo" }, "League of Legends")))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/sponsor" }, "Partenaires")),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/" },
                react_1["default"].createElement("img", { className: "logoExa", src: exalty_svg_1["default"], alt: "" }))),
        react_1["default"].createElement("div", { onMouseEnter: function () { return setShowDropdown2(true); }, onMouseLeave: function () { return setShowDropdown2(false); }, className: "dropdown" },
            "Devenir Membre",
            showDropdown2 && (react_1["default"].createElement("div", { className: "dropdownMenu" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/member" }, "Devenir Adh\u00E9rant"),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/recruitment" }, "Rejoindre Exalty")))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/contact" }, "Contact")),
        react_1["default"].createElement("div", { onMouseEnter: function () { return setShowDropdown3(true); }, onMouseLeave: function () { return setShowDropdown3(false); }, className: "dropdown" },
            "Compte",
            showDropdown3 && (react_1["default"].createElement("div", { className: "dropdownMenu" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/member" }, "Se Connecter"),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/recruitment" }, "S'Inscrire"))))));
}
exports["default"] = TopBar;
