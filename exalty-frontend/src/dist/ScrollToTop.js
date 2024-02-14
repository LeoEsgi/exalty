"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ScrollToTop = function () {
    var pathname = react_router_dom_1.useLocation().pathname;
    react_1.useEffect(function () {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};
exports["default"] = ScrollToTop;
