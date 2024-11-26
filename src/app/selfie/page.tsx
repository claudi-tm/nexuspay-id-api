"use client"
// pages/index.tsx
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Webcam from 'react-webcam';


const SelfieCapturePage = () => {
  const router = useRouter();
  const [userImage, setUserImage] = useState<string | null>(null);
  // const [idFrontImage, setIdFrontImage] = useState<string | null>(null);
  // const [idBackImage, setIdBackImage] = useState<string | null>(null);

  const [currentCapture, setCurrentCapture] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<string>('user');
  const [status, setStatus] = useState<string>('none');
  const webcamRef = useRef<Webcam>(null);


  const resetImage = () => {
    setUserImage(null);
    setStatus('reset')
  };

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setUserImage(imageSrc);
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
      <h1>Passo 1: Tire uma selfie</h1>
      <div className='flex flex-col gap-2'>
        <h2>Recomendações</h2>
        <ul className='list-disc text-justify text-sm pl-4 opacity-90'>
          <li><span className='underline'>Iluminação adequada</span>: faça a captura em um ambiente bem iluminado, de preferência com luz natural suave.</li>
          <li><span className='underline'>Ambiente Limpo e Fundo Neutro</span>: idealmente, o fundo deve ser liso e de cor clara para garantir que o rosto da pessoa se destaque. </li>
          <li><span className='underline'>Expressão Facial e Posição</span>: apresente uma expressão neutra e relaxada, sem sorrir exageradamente. Os olhos devem estar bem abertos e direcionados para a câmera.</li>
          <li><span className='underline'>Rosto Visível e Claro</span>: não deve usar óculos de sol ou qualquer acessório que cubra os olhos.Evite cobrir a cabeça, a menos que seja por motivos religiosos</li>
        </ul>
        <Button className='normal-case text-dark-solid-blue' variant='outlined' onClick={() => handleCaptureClick('selfie')}>Tirar selfie</Button>
      </div>
      <div className='flex justify-center mt-10'>
        {currentCapture && (
          <div className='flex justify-center flex-col gap-4'>
            <div className={`h-80 w-80 rounded-full overflow-hidden border-4 border-gray-300`}>
              <Webcam
                className='h-full w-full object-cover'
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                mirrored={facingMode === 'user'}

                videoConstraints={{ facingMode }}
              />
            </div>
            <Button className='bg-dark-solid-blue text-white normal-case' variant='outlined' onClick={capture}>Estou pronto (Cheeseeee!)</Button>
          </div>
        )}
      </div>
      {
        userImage ? (
          <div className='text-center flex flex-col justify-center items-center gap-4'>
            <h3>Deseja tirar outra foto?</h3>
            <div className='h-80 w-80 rounded-full overflow-hidden border-4 border-gray-300 '>
              {userImage && <img className='object-cover w-full h-full' src={userImage} alt="User selfie" />}
            </div>
            <Button className='w-full bg-dark-solid-blue' variant='contained' onClick={() => router.push("/id-document")}>Não</Button>
            {/* lassName='w-full bg-slate-800' variant='contained' onClick={() => router.push('/document-submission')}>Não</Button> */}
            <Button className='w-full text-dark-solid-blue' onClick={resetImage} variant='outlined'>Sim</Button>
          </div>

        ) : (
          <div className={`${status === 'reset' ? 'flex' : 'hidden  '} flex justify-center items-center flex-col gap-4`}>
            <div className={`h-80 w-80 rounded-full overflow-hidden border-4 border-gray-300`}>
              <Webcam
                className='h-full w-full object-cover'
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                mirrored={facingMode === 'user'}

                videoConstraints={{ facingMode }}
              />
            </div>
            <Button className='bg-dark-solid-blue text-white normal-case' variant='outlined' onClick={capture}>Estou pronto (Cheeseeee!)</Button>
          </div>
        )
      }
    </div>
  );
};

export default SelfieCapturePage