import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Body from "./components/Body";
import axios from "axios";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Banner />
      <Body />
      <Footer />
      {/* sedfas */}
    </main>
  );
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
