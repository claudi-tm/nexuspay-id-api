"use client"
// pages/index.tsx
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import { ExplanationCard } from './components/explanation-card';


const Home = () => {
  const router = useRouter();


  return (
    <div className='m-4 flex flex-col gap-8'>
      <h1 className='text-dark-solid-blue text-center text-2xl'>Verificação de KYC</h1>

      <ExplanationCard text='Passo 1: Tirar selfie' img='/camera.png' />
      <ExplanationCard text='Passo 2: Verificação de ID' img='/compliant.png' />
      <Button className='bg-dark-solid-blue text-white normal-case w-full' variant='outlined' onClick={() => router.push("/selfie")}>Começar</Button>
    </div>
  );
};

export default Home;