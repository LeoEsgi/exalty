import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

type ProtectedRouteProps = {
  element: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAdmin } = useAuth();
  const [isAllowed, setIsAllowed] = useState<boolean | null>(isAdmin);

  useEffect(() => {
    setIsAllowed(isAdmin);
  }, [isAdmin]);

  if (isAllowed === null) {
    return <div>Loading...</div>;
  } else return isAllowed ? <>{element}</> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
