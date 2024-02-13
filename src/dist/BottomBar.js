"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./BottomBar.css");
var exalty_svg_1 = require("./asset/exalty.svg");
var insta_svg_1 = require("./asset/icon/insta.svg");
var twitter_svg_1 = require("./asset/icon/twitter.svg");
var tiktok_svg_1 = require("./asset/icon/tiktok.svg");
var mail_svg_1 = require("./asset/icon/mail.svg");
var twitch_svg_1 = require("./asset/icon/twitch.svg");
var react_router_dom_1 = require("react-router-dom");
function BottomBar() {
    return (react_1["default"].createElement("div", { className: "BottomBar" },
        react_1["default"].createElement("div", { className: "slogan" }, "Get Exalted"),
        react_1["default"].createElement("div", { className: "contact" },
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/member" }, "NOUS REJOINDRE"),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/contact" }, "NOUS CONTACTER")),
        react_1["default"].createElement("div", { className: "social" },
            react_1["default"].createElement("img", { className: "logo", alt: "", src: exalty_svg_1["default"] }),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("a", { href: "#" }, "FAQ")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("a", { href: "#" }, "Nous contacter")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("a", { href: "#" }, "Conditions G\u00E9n\u00E9rales d'Utilisation")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("a", { href: "#" }, "Conditions G\u00E9n\u00E9rales de Vente")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("a", { href: "#" }, "Mentions l\u00E9gales")),
            react_1["default"].createElement("div", { className: "logo-social" },
                react_1["default"].createElement("img", { alt: "", src: insta_svg_1["default"] }),
                react_1["default"].createElement("img", { alt: "", src: twitter_svg_1["default"] }),
                react_1["default"].createElement("img", { alt: "", src: tiktok_svg_1["default"] }),
                react_1["default"].createElement("img", { alt: "", src: mail_svg_1["default"] }),
                react_1["default"].createElement("img", { alt: "", src: twitch_svg_1["default"] }))),
        react_1["default"].createElement("div", { className: "right" }, "Exalty 2024 \u00A9 Tous droits r\u00E9serv\u00E9s")));
}
exports["default"] = BottomBar;
