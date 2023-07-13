"use client";
import React from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import SignInPage from "../components/SignInPage";
import { signIn, useSession } from "next-auth/react";

function page() {
  const { data: session, status } = useSession();

  // if (session && session.user) {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <Table />
      </div>
    </div>
  );
}

// return (
//   <div>
//     <SignInPage />
//   </div>
// );
// }

export default page;
