"use client"
// pages/index.tsx
import { useRef, useState } from 'react';
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
    <div className='m-4'>
      <h1 className='text-red-500 text-center text-2xl'>Adicione os seus documentos</h1>
      <div className='flex gap-2'>
        <button className='border px-1' onClick={() => handleCaptureClick('selfie')}>Take Selfie</button>
        <button className='border px-1' onClick={() => handleCaptureClick('id-front')}>Capture ID Front</button>
        <button className='border px-1' onClick={() => handleCaptureClick('id-back')}>Capture ID Back</button>
      </div>
      <div className='flex justify-center mt-10'>
      {currentCapture && (
            <div>
              <div className={`webcam-container h-52 w-52  ${facingMode === "user" ? "rounded-full flex items-center justify-center" : ""}`}>
                <Webcam
                className='h-60 w-52 rounded-2xl webcam-container'
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  mirrored={facingMode === 'user'}
                  
                  videoConstraints={{ facingMode }}
                />
              </div>
              <button onClick={capture}>Capture</button>

            </div>

          )}
      </div>
      <div>
        <h3>Captured Images:</h3>
        {userImage && <img src={userImage} alt="User selfie" />}
        {idFrontImage && <img src={idFrontImage} alt="ID Front" />}
        {idBackImage && <img src={idBackImage} alt="ID Back" />}
      </div><div>
        <h3>Captured Images:</h3>
        {userImage && <img src={userImage} alt="User selfie" />}
        {idFrontImage && <img src={idFrontImage} alt="ID Front" />}
        {idBackImage && <img src={idBackImage} alt="ID Back" />}
      </div>

    </div>
    // <div>
    //   <h1 className='text-red-500'>Upload Your Documents</h1>
    //   <button onClick={() => handleCaptureClick('selfie')}>Take Selfie</button>
    //   <button onClick={() => handleCaptureClick('id-front')}>Capture ID Front</button>
    //   <button onClick={() => handleCaptureClick('id-back')}>Capture ID Back</button>

    //   {/* Webcam Capture Section */}


    //   {/* Display Captured Images */}
    //   <div>
    //     <h3>Captured Images:</h3>
    //     {userImage && <img src={userImage} alt="User selfie" />}
    //     {idFrontImage && <img src={idFrontImage} alt="ID Front" />}
    //     {idBackImage && <img src={idBackImage} alt="ID Back" />}
    //   </div>
    // </div>
  );
};

export default Home;