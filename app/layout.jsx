import { Noto_Sans_Georgian } from "next/font/google";
import Navigation from "@/components/navigation/Navigation";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import BackToTop from "@/components/ui/BackToTop";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "მოაზროვნე / Moazrovne",
  description:
    "დარეგისტრირდით მოაზროვნის ოლიმპიადაზე, მოხვდით მომავლის ბანაკში, მოიგეთ სხვადასხვა პრიზი და მიიღეთ დიპლომი ",
  icons: {
    icon: "/public/metadata-images/favicon-32x32.png",
    shortcut: "/public/metadata-images/favicon-16x16.png",
    apple: "/public/metadata-images/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/public/metadata-images/apple-touch-icon.png",
    },
  },
};

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin", "georgian"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSansGeorgian.className}>
        <NextTopLoader />
        <Navigation />
        <main>
          {children}
          <Analytics debug={false} />
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
