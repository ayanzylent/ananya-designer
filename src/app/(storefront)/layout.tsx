import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function StorefrontLayout(
    { children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col bg-background">
            <AnnouncementBar />
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}