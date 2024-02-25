import { Route, Routes } from "react-router-dom";
import ShopManagement from "./ShopManagement";
import SponsorManagement from "./SponsorManagement";
import TeamManagement from "./TeamManagement";
import UserManagement from "./UserManagement";
import MatchManagement from "./MatchManagement";
import MemberManagement from "./MemberManagement";
import ProtectedRoute from "./ProtectedRoute";
function Management() {
  return (
    <Routes>
      <Route
        path="/shop"
        element={<ProtectedRoute element={<ShopManagement />} />}
      />
      <Route
        path="/sponsor"
        element={<ProtectedRoute element={<SponsorManagement />} />}
      />
      <Route
        path="/team"
        element={<ProtectedRoute element={<TeamManagement />} />}
      />
      <Route
        path="/user"
        element={<ProtectedRoute element={<UserManagement />} />}
      />
      <Route
        path="/match"
        element={<ProtectedRoute element={<MatchManagement />} />}
      />
      <Route
        path="/member"
        element={<ProtectedRoute element={<MemberManagement />} />}
      />
    </Routes>
  );
}

export default Management;
