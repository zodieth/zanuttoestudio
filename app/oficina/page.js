"use client";
import React from "react";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import SignInPage from "../login/page";
import { useSession } from "next-auth/react";
import { RiLoader5Fill } from "react-icons/ri";

function Oficina() {

  const { data: session, status } = useSession();
  //const [whatsappSession, setWhatsappSession] = useState(false);

  if (session && session.user) {
    return (
      <div>
        <Header />
        <div className="flex">
          <SideBar session={session} setWhatsappSession={setWhatsappSession}/>
          <Table whatsappSession={whatsappSession} setWhatsappSession={setWhatsappSession}/>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen ">
        <RiLoader5Fill size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return <SignInPage />;
}

export default Oficina;
