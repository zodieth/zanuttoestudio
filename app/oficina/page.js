"use client";
import React from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import SignInPage from "../login/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function page() {
  const { data: session, status } = useSession();

  if (session && session.user) {
    return (
      <div>
        <Header />
        <div className="flex">
          <SideBar session={session} />
          <Table />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <SignInPage />
    </div>
  );
}

export default page;
