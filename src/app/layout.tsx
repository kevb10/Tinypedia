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
        <div className="h-full w-full bg-indigo-800 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative isolate h-full min-h-screen w-full overflow-hidden  px-6 py-24 sm:px-24 xl:py-32">
              <h2 className="mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight text-white sm:text-4xl">
                Tinypedia
              </h2>
              <p className="mx-auto text-center text-sm text-indigo-200">
                like Wikipedia but super simple to understand
              </p>
              {children}
            </div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
