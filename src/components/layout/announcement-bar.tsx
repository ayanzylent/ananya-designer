"use client";

import { useState, useEffect } from "react";

const ANNOUNCEMENTS = [
  "Delivery in 3-7 business days"
];

export function AnnouncementBar() {
  const [text, setText] = useState("");
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentAnnouncement = ANNOUNCEMENTS[announcementIndex];

    if (isTyping) {
      if (text.length < currentAnnouncement.length) {
        const timeout = setTimeout(() => {
          setText(currentAnnouncement.slice(0, text.length + 1));
        }, 50); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000); // Pause before deleting
        return () => clearTimeout(timeout);
      }
    } else {
      if (text.length > 0) {
        const timeout = setTimeout(() => {
          setText(text.slice(0, text.length - 1));
        }, 30); // Deleting speed
        return () => clearTimeout(timeout);
      } else {
        setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setIsTyping(true);
      }
    }
  }, [text, isTyping, announcementIndex]);

  return (
    <div className="w-full bg-announcement-bar text-center text-xs sm:text-sm font-medium text-primary-foreground flex justify-center items-center h-8">
      <p>
        {text}
        <span className="animate-pulse ml-0.5">|</span>
      </p>
    </div>
  );
}
