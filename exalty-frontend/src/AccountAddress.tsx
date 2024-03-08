import BasicComponent from "./BasicComponent";
import React, { useEffect, useState } from "react";
function AccountAddress() {
  return (
    <BasicComponent
      className="AccountAddress"
      title="Vos Adresses"
      desc="Modifier ou ajouter des adresses"
      content={
        <>
          <div className="AccountAddress"></div>
        </>
      }
    />
  );
}

export default AccountAddress;
