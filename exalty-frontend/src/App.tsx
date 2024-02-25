import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Member from "./Member";
import Recruitment from "./Recruitment";
import Shop from "./Shop";
import Sponsor from "./Sponsor";
import Team from "./Team";
import ScrollToTop from "./ScrollToTop";
import TeamInfo from "./TeamInfo";
import Contact from "./Contact";
import Auth from "./Auth";
import Register from "./Register";
import Unknown from "./404";
import ValidateMail from "./ValidateMail";
import Matches from "./Matches";
import Account from "./Account";
import Management from "./back-office/Management";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/member" element={<Member />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sponsor" element={<Sponsor />} />
        <Route path="/team" element={<Team />} />
        <Route path="/teamInfo" element={<TeamInfo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/validate-email" element={<ValidateMail />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/account" element={<Account />} />
        <Route path="/management/*" element={<Management />} />
        <Route path="*" element={<Unknown />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
