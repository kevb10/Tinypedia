import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tinypedia - Explain complex topics in one sentence",
  description:
    "It's like Wikipedia, but for super simple explanations. Condense complex topics into one sentence.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
