import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
function AccountOrder() {
  return (
    <BasicComponent
      className="AccountOrder"
      title="Vos Commandes"
      desc="Suivre, retourner ou acheter à nouveau"
      content={
        <>
          <div className="AccountOrder"></div>
        </>
      }
    />
  );
}

export default AccountOrder;
