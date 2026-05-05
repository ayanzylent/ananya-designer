import { AnnouncementBar } from "@/components/layout/announcement-bar";

export default function PublicPageLayout(
    { children }: { children: React.ReactNode }) {

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <AnnouncementBar />
            <main className="">
                {children}
            </main>
        </div>
    );
}
