import balmain from "../asset/balmain.svg";
import TopBarManagement from "./TopBarManagement";
import "./BasicManagement.css";
import React from "react";

type BasicManagementProps = {
  className: string;
  title: string;
  desc?: string;
  content?: React.ReactNode;
};

function BasicManagement({
  className,
  title,
  desc,
  content,
}: BasicManagementProps) {
  const combinedClassName = `BasicManagement ${className}`;
  return (
    <>
      <TopBarManagement />

      <div
        className={combinedClassName}
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <h1>{title}</h1>
        {desc && <p>{desc}</p>}
        <div className="content">{content}</div>
      </div>
    </>
  );
}

export default BasicManagement;
