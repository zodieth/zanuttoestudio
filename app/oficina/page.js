"use client";
import React from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useSession } from "next-auth/react";

function page() {
  const { session } = useSession();

  if (session && session.user) {
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

  return <div>404</div>;
}

export default page;
