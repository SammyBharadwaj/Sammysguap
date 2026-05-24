import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";

import { ThemeProvider } from "@/components/theme/theme-provider";

import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans-app",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif-app",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-app",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFAF2" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1f23" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Wealth OS",
    template: "%s · Wealth OS",
  },
  description: "Local-first personal finance command center",
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("wealth-os-theme");
    var theme = t === "dark" ? "dark" : "light";
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add("light");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
