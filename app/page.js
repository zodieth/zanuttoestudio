import Header from "./components/Header";
import Banner from "./components/Banner";
import axios from "axios";

export default function Home() {
  return (
    <main className="">
      <Header />
      <Banner />
    </main>
  );
}

export const api = axios.create({
  baseURL: "https://zanuttoestudio.caprover.alubric.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
