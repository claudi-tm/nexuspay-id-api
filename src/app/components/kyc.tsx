import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const KYC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [selfie, setSelfie] = useState(null);
  const [documentFront, setDocumentFront] = useState(null);
  const [documentBack, setDocumentBack] = useState(null);

  const captureImage = (setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

  return (
    <div>
      <h1>KYC Verification</h1>

      {/* Webcam Setup */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      
      {/* Capture Selfie */}
      <div>
        <h2>Step 1: Take a Selfie</h2>
        <button onClick={() => captureImage(setSelfie)}>Take Selfie</button>
        {selfie && <img src={selfie} alt="Selfie" />}
      </div>

      {/* Capture ID Front */}
      <div>
        <h2>Step 2: Take Photo of ID - Front</h2>
        <button onClick={() => captureImage(setDocumentFront)}>Take ID Front</button>
        {documentFront && <img src={documentFront} alt="ID Front" />}
      </div>

      {/* Capture ID Back */}
      <div>
        <h2>Step 3: Take Photo of ID - Back</h2>
        <button onClick={() => captureImage(setDocumentBack)}>Take ID Back</button>
        {documentBack && <img src={documentBack} alt="ID Back" />}
      </div>

      {/* Submit Button */}
      <div>
        <button
          onClick={() => {
            // Handle the form submission logic here
            // Typically, send to a backend API for verification
          }}
        >
          Submit KYC
        </button>
      </div>
    </div>
  );
};

export default KYC;
