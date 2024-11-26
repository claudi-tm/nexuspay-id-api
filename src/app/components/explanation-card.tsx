import Image from 'next/image';

interface ExplanationCardProps {
  text: string;
  img: string;
}

export const ExplanationCard = ({text, img}:ExplanationCardProps) => {
  return (
    <div className='flex flex-col justify-center items-center p-4 mt-8 gap-4 border'>
      <Image width={140} height={140} src={img} alt='selfie'/>
      <p>{text}</p>
    </div>
  )
}