import vector1 from '@/public/assets/vector1.png'
import Image from 'next/image';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex items-center h-full bg-white">
            <div className="flex-1 flex items-center justify-center h-full">
                {children}
            </div>
            <div className="flex-[2] hidden lg:flex items-center justify-center bg-off-white h-full">
                <Image src={vector1} alt='FileHeaven' className='w-1/2 h-fit' />
            </div>
        </section>
    );
}