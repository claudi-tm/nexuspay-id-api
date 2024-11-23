// components/Camera.tsx
import React, { useRef } from 'react';

const Camera = ({ onCapture }: { onCapture: (data: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get user permission to use the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access error: ', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/png');
        onCapture(imageData);
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline onCanPlay={startCamera} width="300" height="400" />
      <canvas ref={canvasRef} style={{ display: 'none' }} width="300" height="400" />
      <button onClick={captureImage}>Capture</button>
    </div>
  );
};

export default Camera;
