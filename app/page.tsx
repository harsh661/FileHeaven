import Button from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="pt-16 flex flex-col items-center">
      <h1 className="text-7xl font-semibold text-center max-w-5xl pt-20">Experience Effortless and Reliable Cloud Storage</h1>
      <p className="max-w-4xl font-medium text-center text-black/60 py-5">Store, share, and collaborate on files and folders seamlessly across your mobile device, tablet, or computer. Enjoy effortless access and real-time collaboration from anywhere.</p>

      <Link href={'/sign-up'}>
        <Button>Get Started Now</Button>
      </Link>

      <div className="rounded-3xl border border-black w-full max-w-screen-xl h-[80vh] my-20">

      </div>

      <div className="shape1"></div>
      <div className="shape2"></div>
    </div>
  );
}
