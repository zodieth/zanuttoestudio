"use client";
import React from "react";
import { useEffect } from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import SignInPage from "../login/page";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { addPeople } from "../redux/features/peopleSlice";
import { api } from "../page";
import { RiLoader5Fill } from "react-icons/ri";
import { addDetail } from "../redux/features/detailSlice";

function Oficina() {
  const people = useSelector((state) => state.people);
  const detail = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  

  useEffect(() => {
    api.get("people").then((data) => dispatch(addPeople(data.data)));
    api.get("detalle").then((data) => dispatch(addDetail(data.data)));

  }, [dispatch]);

  const { data: session, status } = useSession();

  if (session && session.user) {
    return (
      <div>
        <Header />
        <div className="flex">
          <SideBar session={session} />
          <Table people={people} detail={detail}/>
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
