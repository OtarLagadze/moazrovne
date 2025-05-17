import { Noto_Sans_Georgian } from "next/font/google";
import Navigation from "@/components/navigation/Navigation";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import BackToTop from "@/components/ui/BackToTop";
import NextTopLoader from "nextjs-toploader";
import Pixel from "@/components/pixel/Pixel";
import { SpeedInsights } from "@vercel/speed-insights/next"
import ReduxProvider from "@/app/redux/ReduxProvider";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1644022226318154');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1644022226318154&ev=PageView&noscript=1"/>
        </noscript>
      </head>
      <body className={notoSansGeorgian.className}>
        <NextTopLoader />
        <Navigation />
        <Pixel />
        <SpeedInsights />
        <main className="mainRender">
          <ReduxProvider>
            {children}
          </ReduxProvider>
          <Analytics debug={false} />
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}