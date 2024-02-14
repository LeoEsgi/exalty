"use strict";
exports.__esModule = true;
require("./Recruitment.css");
var TopBar_1 = require("./TopBar");
var balmain_svg_1 = require("./asset/balmain.svg");
function Recruitment() {
    return (React.createElement(React.Fragment, null,
        React.createElement(TopBar_1["default"], null),
        React.createElement("div", { className: "Recruitment", style: {
                backgroundImage: "url(" + balmain_svg_1["default"] + ")",
                backgroundPosition: "0% 0%",
                backgroundSize: "60%",
                backgroundRepeat: "repeat"
            } },
            React.createElement("div", { className: "title" }, "Trouvez votre place !"),
            React.createElement("div", { className: "title-desc" }, "Voici les postes disponibles pour vous"),
            React.createElement("div", { className: "title-desc" }, "Trouvez celui qui vous convient"),
            React.createElement("div", { className: "categorie-list" },
                React.createElement("div", { className: "categorie" },
                    "M\u00E9dia",
                    React.createElement("div", { className: "functions" },
                        React.createElement("div", { className: "card" },
                            React.createElement("div", null, "Videaste"),
                            React.createElement("div", null,
                                React.createElement("button", { className: "btnInfo" }, "EN SAVOIR PLUS"))),
                        React.createElement("div", { className: "card" },
                            React.createElement("div", null, "Streamer"),
                            React.createElement("div", null,
                                React.createElement("button", { className: "btnInfo" }, "EN SAVOIR PLUS"))),
                        React.createElement("div", { className: "card" },
                            React.createElement("div", null, "Moderateur Discord/Twitch"),
                            React.createElement("div", null,
                                React.createElement("button", { className: "btnInfo" }, "EN SAVOIR PLUS"))))),
                React.createElement("div", { className: "categorie" },
                    "Ressources Humaines",
                    React.createElement("div", { className: "functions" },
                        React.createElement("div", { className: "card" },
                            React.createElement("div", null, "Charge de Recrutement"),
                            React.createElement("div", null,
                                React.createElement("button", { className: "btnInfo" }, "EN SAVOIR PLUS"))))),
                React.createElement("div", { className: "categorie" },
                    "Graphisme",
                    React.createElement("div", { className: "functions" },
                        React.createElement("div", { className: "card" },
                            React.createElement("div", null, "Graphiste"),
                            React.createElement("div", null,
                                React.createElement("button", { className: "btnInfo" }, "EN SAVOIR PLUS")))))))));
}
exports["default"] = Recruitment;
