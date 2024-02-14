"use strict";
exports.__esModule = true;
var react_1 = require("react");
var start_bg_jpg_1 = require("./asset/start-bg.jpg");
require("./HomePage.css");
var TopBar_1 = require("./TopBar");
var home_shirt_png_1 = require("./asset/home-shirt.png");
var ga_jpg_1 = require("./asset/ga.jpg");
var BottomBar_1 = require("./BottomBar");
var react_router_dom_1 = require("react-router-dom");
function HomePage() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(TopBar_1["default"], null),
        react_1["default"].createElement("div", { className: "HomePage", style: {
                backgroundImage: "url(" + start_bg_jpg_1["default"] + ")",
                height: "100vh",
                backgroundSize: "cover"
            } }),
        react_1["default"].createElement("div", { className: "jersey", style: {
                backgroundImage: "url(" + home_shirt_png_1["default"] + ")",
                height: "100vh",
                backgroundSize: "cover"
            } },
            react_1["default"].createElement("div", { className: "jersey-content" },
                react_1["default"].createElement("div", { className: "discover" }, "Decouvrez notre nouveau maillot"),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/shop", className: "btn" }, "VOIR LA BOUTIQUE"))),
        react_1["default"].createElement("div", { className: "event" },
            react_1["default"].createElement("h1", { className: "event-title" }, "Evenement a venir"),
            react_1["default"].createElement("div", { className: "event-list" },
                react_1["default"].createElement("img", { className: "event1", src: ga_jpg_1["default"], alt: "GA" }),
                react_1["default"].createElement("a", { href: "#", className: "event1-content" },
                    "Si vous souhaitez venir encourager nos joueurs \u00E0 la Gamers Assembly,",
                    react_1["default"].createElement("a", { href: "https://ga2024.gamers-assembly.net/" }, "voici le lien de la billeterie")))),
        react_1["default"].createElement(BottomBar_1["default"], null)));
}
exports["default"] = HomePage;
