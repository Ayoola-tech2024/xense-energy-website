import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Xense Energy Systems",
    short_name: "Xense Energy",
    description: "Intelligent Energy Management & Automation for Modern Enterprises",
    start_url: "/",
    display: "standalone",
    background_color: "#07090e",
    theme_color: "#07090e",
    icons: [
      {
        src: "/assets/logo.png",
        sizes: "800x800",
        type: "image/png",
      },
    ],
  };
}
