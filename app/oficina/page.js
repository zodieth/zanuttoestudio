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
  const [turnosOn, setTurnosOn] = useState(false);
  const [oficinasOn, setOficinasOn] = useState(false);

  if (session && session.user) {
    return (
      <div>
        <Header />
        <div className="flex">
          <SideBar session={session} setTurnosOn={setTurnosOn} setOficinasOn={setOficinasOn}/>
          <Table turnosOn={turnosOn} setTurnosOn={setTurnosOn} oficinasOn={oficinasOn} setOficinasOn={setOficinasOn}/>
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