import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <div>
        <Image src="/banner.jpg" alt="wayshare" width={1920} height={1080} className='object-contain h-full w-full blur-md brightness-50'/>
        <div className="absolute top-45 right-50">
          <SignIn />
        </div>
      </div>
    </>
  )
}


// style={{width: "100vw", height: "100vh", filter: "blur(7px) brightness(0.5)"}}
// style={{position: "absolute", top: "50%", left: "65%", transform: "translate(-50%, -50%)"}}