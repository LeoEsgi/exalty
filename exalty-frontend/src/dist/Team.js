"use strict";
exports.__esModule = true;
require("./Team.css");
var lol_jpg_1 = require("./asset/game/lol.jpg");
var valorant_png_1 = require("./asset/game/valorant.png");
var balmain_svg_1 = require("./asset/balmain.svg");
var TopBar_1 = require("./TopBar");
function Team() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "Team", style: {
                backgroundImage: "url(" + balmain_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title" }, "Nos Equipes"),
            React.createElement("div", { className: "title-desc" }, "Ils portent haut nos couleurs, terrorisent nos adversaires, repr\u00E9sentent Exalty."),
            React.createElement("div", { className: "title-desc" }, "Voici nos champions !"),
            React.createElement("div", { className: "team-list" },
                React.createElement("div", { className: "team" },
                    React.createElement("div", { className: "losange" },
                        React.createElement("img", { src: valorant_png_1["default"], alt: "Valorant" })),
                    React.createElement("div", { className: "team-game" }, "Valorant")),
                React.createElement("div", { className: "team" },
                    React.createElement("div", { className: "losange" },
                        React.createElement("img", { src: lol_jpg_1["default"], alt: "League of Legends" })),
                    React.createElement("div", { className: "team-game" }, "League of Legends"))))));
}
exports["default"] = Team;
