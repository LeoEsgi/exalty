import balmain from "./asset/balmain.svg";
import TopBar from "./TopBar";
import React, { useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import "./BasicComponent.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const threshold = 100;
    const position = window.scrollY;
    setIsVisible(position > threshold);
  };

  useEffect(() => {
    // Ajoutez l'écouteur d'événements lors du montage du composant
    window.addEventListener("scroll", handleScroll);

    // Nettoyez l'écouteur d'événements lors du démontage
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Les crochets vides indiquent que cet effet ne dépend d'aucune variable d'état et ne s'exécute qu'une fois

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
      <div
        className="back_to_top"
        style={{ display: isVisible ? "flex" : "none" }}
      >
        <a onClick={scrollToTop} style={{ cursor: "pointer" }}>
          <ArrowUpwardIcon style={{ color: "#cdcdcd92" }} />
        </a>
      </div>
    </>
  );
}

export default BasicComponent;
