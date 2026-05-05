import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";

export default function PublicPageLayout(
    { children }: { children: React.ReactNode }) {

    return (
    <div className="flex flex-col bg-background">
            <AnnouncementBar />
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <main>
                {children}
            </main>
        </div>
    );
}
