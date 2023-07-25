import Header from "./components/Header";
import Banner from "./components/Banner";
import axios from "axios";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Banner />
    </main>
  );
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
