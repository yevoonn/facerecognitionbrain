import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="tilt br2 shadow-2"
        style={{
          height: 150,
          width: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "20px",
        }}
        glareEnable={true}
        glareMaxOpacity={0.8}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="20px"
      >
        <img src={brain} alt="brain" />
      </Tilt>
    </div>
  );
};

export default Logo;
