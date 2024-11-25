"use client"
// pages/index.tsx
import Button from '@mui/material/Button';
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
        <Button className='normal-case' variant='outlined' onClick={() => handleCaptureClick('selfie')}>Tire a selfie Selfie</Button>
        <button className='border px-1' onClick={() => handleCaptureClick('id-front')}>Capture ID Front</button>
        <button className='border px-1' onClick={() => handleCaptureClick('id-back')}>Capture ID Back</button>
      </div>
      <h3>Tire uma foto da sua cara</h3>
      <div className='flex justify-center mt-10'>
        {currentCapture && (
          <div className='flex justify-center flex-col gap-4'>
            <div className={`h-80 w-80 rounded-full overflow-hidden border-4 border-gray-300  ${facingMode === "user" ? "rounded-full flex items-center justify-center" : ""}`}>
              <Webcam
                className='h-full w-full object-cover'
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                mirrored={facingMode === 'user'}

                videoConstraints={{ facingMode }}
              />
            </div>
            <Button variant='outlined' onClick={capture}>Estou pronto (Cheeseeee!)</Button>
          </div>
        )}
      </div>
      <div className='text-center flex flex-col justify-center'>
        <h3>Deseja tirar outra foto?</h3>
        <div className='h-80 w-80 rounded-full overflow-hidden border-4 border-gray-300'>
          {userImage && <img src={userImage} alt="User selfie" />}

        </div>

        {/* {idFrontImage && <img src={idFrontImage} alt="ID Front" />}
        {idBackImage && <img src={idBackImage} alt="ID Back" />} */}
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