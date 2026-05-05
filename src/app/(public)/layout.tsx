export default function PublicPageLayout(
    { children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <main className="">
                {children}
            </main>
        </div>
    );
}
