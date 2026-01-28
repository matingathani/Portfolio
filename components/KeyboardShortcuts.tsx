"use client";

import { useEffect } from "react";

export default function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if not typing in an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Alt/Cmd + Key shortcuts
      if (e.altKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case "h":
            e.preventDefault();
            window.location.href = "/";
            break;
          case "p":
            e.preventDefault();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            break;
          case "s":
            e.preventDefault();
            document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            break;
          case "e":
            e.preventDefault();
            document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            break;
          case "c":
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return null;
}
