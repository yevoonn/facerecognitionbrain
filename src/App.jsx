import { useState, useRef } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [box, setBox] = useState({});
  const imageRef = useRef(null);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    displayBox(getBoxLocation());
  };

  const getBoxLocation = () => {
    if (imageRef.current) {
      const height = imageRef.current.height;
      const width = imageRef.current.width;

      return {
        leftCol: 0.5 * width, // Left upper corner - X (0 to width)
        topRow: 0.5 * height, // Left upper corner - Y (0 to height)
        rightCol: 0.75 * width, // Right lower corner - X (0 to width)
        bottomRow: 0.75 * height, // Right lower corner - Y (0 to height)
      };
    }
  };

  const displayBox = (box) => {
    setBox(box);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        input={input}
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} imageRef={imageRef} box={box} />
    </div>
  );
}

export default App;
