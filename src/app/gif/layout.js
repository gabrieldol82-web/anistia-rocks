import { Nunito } from "next/font/google";
import "../globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Rick Roll",
  description: "Rick Astley te pegou",
  icons: {
    icon: "/assets/anistiaLogoTransparente.png",
  }
};

export default function GifLayout({children}) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.className} antialiased`}>
        <main className="flex justify-center">
          {children}
        </main>
      </body>
    </html>
  );
}