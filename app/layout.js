import "./globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "./components/Provider";
import ReduxProvider from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Incio | Zanutto Abogados",
  description: "Zanutto Abogados",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <SessionProvider>
          <body className={`${inter.className}`}>{children}</body>
        </SessionProvider>
      </ReduxProvider>
    </html>
  );
}
