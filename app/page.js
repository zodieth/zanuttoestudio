import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Body from "./components/Body";
import axios from "axios";
import { AiOutlineWhatsApp } from "react-icons/ai";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Banner />
      <Body />
      <Footer />
      <a
        href="https://api.whatsapp.com/send?phone=5491176293141&text=Hola%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20informaci%C3%B3n!"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600"
      >
        <AiOutlineWhatsApp size={30} />
      </a>
    </main>
  );
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
