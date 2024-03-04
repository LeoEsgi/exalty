import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import React from "react";
import BottomBar from "./BottomBar";
import "./BasicComponent.css";

type BasicComponentProps = {
  className: string;
  title?: string;
  desc?: string;
  desc_2?: string;
  content?: React.ReactNode;
  isLogoVisible?: boolean;
};

function BasicComponent({
  className,
  title,
  desc,
  desc_2,
  content,
  isLogoVisible,
}: BasicComponentProps) {
  const combinedClassName = `BasicComponent ${className}`;
  return (
    <>
      <TopBar isLogoVisible={isLogoVisible} />

      <div
        className={combinedClassName}
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">{title}</div>
        {desc && <div className="desc">{desc}</div>}
        {desc_2 && <div className="desc_2">{desc_2}</div>}

        <div className="content">{content}</div>
      </div>
      <BottomBar />
    </>
  );
}

export default BasicComponent;
