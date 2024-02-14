import TopBar from "./TopBar";
import balmain from "./asset/balmain.svg";
import "./404.css";

function Unknown() {
  return (
    <>
      <TopBar />
      <div
        className="Unknown"
        style={{
          backgroundImage: `url(${balmain})`,
          backgroundPosition: "0% 0%",
          backgroundSize: "60%",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="title">Vous avez trouvé notre page secrète. </div>
        <div className="title-desc">
          Malheureusement, le seul secret ici, c'est que cette page n'existe
          pas.
        </div>
      </div>
    </>
  );
}
export default Unknown;
