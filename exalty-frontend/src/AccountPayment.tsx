import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
function AccountPayment() {
  return (
    <BasicComponent
      className="AccountPayment"
      title="Vos Commandes"
      desc="Suivre, retourner ou acheter à nouveau"
      content={
        <>
          <div className="AccountPayment"></div>
        </>
      }
    />
  );
}

export default AccountPayment;
