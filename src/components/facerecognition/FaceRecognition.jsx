import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, imageRef, box, onImageLoad }) => {
  return (
    <div className="center ma">
      <div className="mt2 face-recognition-container">
        {imageUrl && (
          <img
            alt=""
            src={imageUrl}
            className="face-recognition-image"
            ref={imageRef}
            onLoad={onImageLoad}
          />
        )}

        {box && (
          <div
            className="bounding-box"
            style={{
              top: `${box.topRow}px`,
              left: `${box.leftCol}px`,
              width: `${box.rightCol - box.leftCol}px`,
              height: `${box.bottomRow - box.topRow}px`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
