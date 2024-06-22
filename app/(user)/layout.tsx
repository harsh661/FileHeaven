export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex items-center h-full">
            {children}
        </section>
    );
}