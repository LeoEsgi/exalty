"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var react_router_dom_1 = require("react-router-dom");
var HomePage_1 = require("./HomePage");
var Member_1 = require("./Member");
var Recruitment_1 = require("./Recruitment");
var Shop_1 = require("./Shop");
var Sponsor_1 = require("./Sponsor");
var Team_1 = require("./Team");
var ScrollToTop_1 = require("./ScrollToTop");
var TeamInfo_1 = require("./TeamInfo");
var Contact_1 = require("./Contact");
function App() {
    return (react_1["default"].createElement(react_router_dom_1.BrowserRouter, null,
        react_1["default"].createElement(ScrollToTop_1["default"], null),
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(HomePage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/member", element: react_1["default"].createElement(Member_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/recruitment", element: react_1["default"].createElement(Recruitment_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/shop", element: react_1["default"].createElement(Shop_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/sponsor", element: react_1["default"].createElement(Sponsor_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/team", element: react_1["default"].createElement(Team_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/teamInfo", element: react_1["default"].createElement(TeamInfo_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/contact", element: react_1["default"].createElement(Contact_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "*", element: null }))));
}
exports["default"] = App;
