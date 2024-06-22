import Sidebar from "./_components/sidebar";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex h-full">
            <Sidebar />
            <section className="flex-1">
                {children}
            </section>
        </section>
    );
}