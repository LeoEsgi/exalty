import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
function AccountOrder() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
    console.log(user);
  }, [isAuthenticated, navigate]);
  return (
    <BasicComponent
      className="AccountOrder"
      title="Vos Commandes"
      desc="Suivre, retourner ou acheter à nouveau"
      content={
        <>
          <div className="AccountOrder">
            {user?.order?.map((order) => (
              <div key={order.id} className="order">
                <div>
                  <p>Commande n°{order.id}</p>
                  <p>Passée le {order.created_at.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    />
  );
}

export default AccountOrder;
