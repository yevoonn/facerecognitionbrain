import { useState, useRef } from "react";
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/Rank";
import FaceRecognition from "./components/facerecognition/FaceRecognition";
import Signin from "./components/signin/Signin";
import Register from "./components/register/Register";
import ParticlesBg from "particles-bg";
import { API_URL } from "./config";
import "./App.css";

const initialUserState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: "",
};

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [pendingImageUrl, setPendingImageUrl] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);
  const imageRef = useRef(null);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    setPendingImageUrl(input);
    setBox({});
  };

  const updateUserEntries = () => {
    fetch(`${API_URL}/image`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        setUser({ ...user, entries: count });
      })
      .catch((err) => console.log(err));
  };

  const handleImageLoad = () => {
    if (imageUrl && pendingImageUrl === imageUrl) {
      setPendingImageUrl("");
      updateUserEntries();
    }
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

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setUser(initialUserState);
      setInput("");
      setImageUrl(null);
      setPendingImageUrl("");
      setBox({});
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            input={input}
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition
            imageUrl={imageUrl}
            imageRef={imageRef}
            box={box}
            onImageLoad={handleImageLoad}
          />
        </>
      ) : route === "signin" || route === "signout" ? (
        <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
