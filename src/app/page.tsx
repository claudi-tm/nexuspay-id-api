"use client"
// pages/index.tsx
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Home = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [idFrontImage, setIdFrontImage] = useState<string | null>(null);
  const [idBackImage, setIdBackImage] = useState<string | null>(null);
  
  const [currentCapture, setCurrentCapture] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<string>('user');
  const webcamRef = useRef<Webcam>(null);

  // Capture the current frame from the webcam
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        switch (currentCapture) {
          case 'selfie':
            setUserImage(imageSrc);
            break;
          case 'id-front':
            setIdFrontImage(imageSrc);
            break;
          case 'id-back':
            setIdBackImage(imageSrc);
            break;
        }
        setCurrentCapture(null); // Reset capture state after capturing
      }
    }
  };

  const handleCaptureClick = (type: string) => {
    setCurrentCapture(type);
    setFacingMode(type === 'selfie' ? 'user' : 'environment');
  };

  return (
    <div>
      <h1>Upload Your Documents</h1>
      <button onClick={() => handleCaptureClick('selfie')}>Take Selfie</button>
      <button onClick={() => handleCaptureClick('id-front')}>Capture ID Front</button>
      <button onClick={() => handleCaptureClick('id-back')}>Capture ID Back</button>

      {/* Webcam Capture Section */}
      {currentCapture && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            mirrored={facingMode === 'user'}
            width="100%"
            height="100%"
            videoConstraints={{ facingMode }}
          />
          <button onClick={capture}>Capture</button>
        </div>
      )}

      {/* Display Captured Images */}
      <div>
        <h3>Captured Images:</h3>
        {userImage && <img src={userImage} alt="User selfie" />}
        {idFrontImage && <img src={idFrontImage} alt="ID Front" />}
        {idBackImage && <img src={idBackImage} alt="ID Back" />}
      </div>
    </div>
  );
};

export default Home;