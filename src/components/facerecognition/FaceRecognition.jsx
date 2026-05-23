import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="mt2 face-recognition-container">
        {imageUrl && (
          <img alt="" src={imageUrl} className="face-recognition-image" />
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
