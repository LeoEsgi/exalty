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
import AccountOrder from "./AccountOrder";
import AccountPayment from "./AccountPayment";
import AccountAddress from "./AccountAddress";
import Faq from "./Faq";
import Organigramme from "./Organigramme";
import Conditions from "./Conditions";
import Legal from "./Legal";
import Cart from "./Cart";
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
        <Route path="/account/order" element={<AccountOrder />} />
        <Route path="/account/payment" element={<AccountPayment />} />
        <Route path="/account/address" element={<AccountAddress />} />
        <Route path="/management/*" element={<Management />} />
        <Route path="/organigramme" element={<Organigramme />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/conditions" element={<Conditions />} />
        <Route path="/legal" element={<Legal />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Unknown />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
