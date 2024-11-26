"use client"
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const DocumentSubmission = () => {
  const [idFrontImage, setIdFrontImage] = useState<string | null>(null);
  const [idBackImage, setIdBackImage] = useState<string | null>(null);
  const [currentCapture, setCurrentCapture] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<string>('environment');
  const webcamRef = useRef<Webcam>(null);


  const resetImage = () => {
    setIdFrontImage(null);
    setIdBackImage(null);
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        switch (currentCapture) {
          case 'id-front':
            setIdFrontImage(imageSrc);
            break;
          case 'id-back':
            setIdBackImage(imageSrc);
            break;
        }
        setCurrentCapture(null);
      }
    }
  };

  const handleCaptureClick = (type: string) => {
    setCurrentCapture(type);
    setFacingMode('environment');
  };

  return (
    <div className='m-4'>
      <h1 className='text-dark-solid-blue text-center text-2xl'>Passo 2: Verificação de documentos (BI)</h1>
      <div className='flex flex-col gap-2'>
        {
          idFrontImage ? (
            <Button className='normal-case' variant='outlined' onClick={() => handleCaptureClick('id-back')}>Capture ID Back</Button>
          ) : (
            <Button className='normal-case' variant='outlined' onClick={() => handleCaptureClick('id-front')}>Foto frontal</Button>
          )
        }

      </div>
      <div className='flex justify-center mt-10'>
        {currentCapture && (
          <div className='flex justify-center flex-col gap-4'>
            <div className='h-56 w-96 overflow-hidden border-4 border-gray-300'>
              <Webcam
                className='h-full w-full object-cover'
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{ facingMode }}
              />
            </div>
            <Button variant='outlined' onClick={capture}>Capture</Button>
          </div>
        )}
      </div>
      <div>
        {/* <h3>Captured Images:</h3> */}
        {idFrontImage && idBackImage && (
          <div className='flex flex-col gap-2'>
            <h3>Deseja tirar outra foto?</h3>
            <img src={idFrontImage} alt="ID front" />
            <img src={idBackImage} alt="ID back" />
            <div>
              <Button className='w-full bg-dark-solid-blue' variant='contained'>Não</Button>
              <Button className='w-full text-dark-solid-blue' onClick={resetImage} variant='outlined'>Sim</Button>
            </div>
          </div>
        ) 
        }

      </div>
    </div>
  );
};

export default DocumentSubmission;