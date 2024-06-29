import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import banner from "@/public/assets/dashboard.png";

export default function Home() {
  return (
    <div className="pt-10 lg:pt-16 px-5 flex flex-col items-center">
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-semibold text-center max-w-5xl pt-20">Experience Effortless and Reliable Cloud Storage</h1>
      <p className="text-sm md:text-base max-w-4xl font-medium text-center text-black/60 py-5">Store, share, and collaborate on files and folders seamlessly across your mobile device, tablet, or computer. Enjoy effortless access and real-time collaboration from anywhere.</p>

      <Link href={'/sign-up'}>
        <Button>Get Started Now</Button>
      </Link>

      <div className="relative rounded-lg overflow-hidden border shadow-xl h-auto max-w-screen-xl my-10 lg:my-20 z-[9]">
        <Image src={banner} alt="Dashboard" className="z-50"/>
      </div>

      <div className="shape1"></div>
      <div className="shape2"></div>
    </div>
  );
}
