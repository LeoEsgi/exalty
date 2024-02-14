"use strict";
exports.__esModule = true;
var TopBar_1 = require("./TopBar");
var flower_svg_1 = require("./asset/flower.svg");
require("./TeamInfo.css");
var balou_png_1 = require("./asset/team/valo/balou.png");
var beautiful_png_1 = require("./asset/team/valo/beautiful.png");
var cns_png_1 = require("./asset/team/valo/cns.png");
var dake_png_1 = require("./asset/team/valo/dake.png");
var nysha_png_1 = require("./asset/team/valo/nysha.png");
var pitou_png_1 = require("./asset/team/valo/pitou.png");
var ragnarok_png_1 = require("./asset/team/valo/ragnarok.png");
var salva_png_1 = require("./asset/team/valo/salva.png");
var tommy_png_1 = require("./asset/team/valo/tommy.png");
function TeamInfo() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "TeamInfo", style: {
                backgroundImage: "url(" + flower_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title" }, "Notre Equipe"),
            React.createElement("div", { className: "title-desc" }, "Sur valorant retrouvez les en VCT champions"),
            React.createElement("div", { className: "title-desc2" }, "Notre \u00E9quipe Valorant repr\u00E9sente l\u2019essence m\u00EAme de la comp\u00E9titivit\u00E9 et du travail d\u2019\u00E9quipe chez Exalty. Constitu\u00E9e de joueurs talentueux et d\u00E9vou\u00E9s, cette \u00E9quipe allie habilement strat\u00E9gie, rapidit\u00E9 et pr\u00E9cision pour dominer dans l\u2019ar\u00E8ne de Valorant. Avec des performances remarquables dans divers tournois, notre \u00E9quipe Valorant ne cesse de repousser les limites, d\u00E9montrant leur comp\u00E9tence et leur passion pour le jeu. Leur esprit d\u2019\u00E9quipe et leur d\u00E9termination font d\u2019eux non seulement des comp\u00E9titeurs redoutables, mais aussi des ambassadeurs inspirants de notre association."),
            React.createElement("div", { className: "team-list" },
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: nysha_png_1["default"], alt: "nysha" }),
                    React.createElement("div", { className: "player-role" }, "Smoker")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: cns_png_1["default"], alt: "cns" }),
                    React.createElement("div", { className: "player-role" }, "Sentinel")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: pitou_png_1["default"], alt: "pitou" }),
                    React.createElement("div", { className: "player-role" }, "Duelist")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: ragnarok_png_1["default"], alt: "ragnarok" }),
                    React.createElement("div", { className: "player-role" }, "Initiateur")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: tommy_png_1["default"], alt: "tommy" }),
                    React.createElement("div", { className: "player-role" }, "Initiateur/Flex")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: dake_png_1["default"], alt: "dake" }),
                    React.createElement("div", { className: "player-role" }, "Head Coach")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: salva_png_1["default"], alt: "salva" }),
                    React.createElement("div", { className: "player-role" }, "Coach")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: balou_png_1["default"], alt: "balou" }),
                    React.createElement("div", { className: "player-role" }, "Coach")),
                React.createElement("div", { className: "player" },
                    React.createElement("img", { src: beautiful_png_1["default"], alt: "beautiful" }),
                    React.createElement("div", { className: "player-role" }, "Manageuse"))))));
}
exports["default"] = TeamInfo;
