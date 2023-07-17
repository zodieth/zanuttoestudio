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

function Oficina() {
  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get("people").then((data) => dispatch(addPeople(data.data)));
  }, [dispatch]);

  const { data: session, status } = useSession();

  if (session && session.user) {
    return (
      <div>
        <Header />
        <div className="flex">
          <SideBar session={session} />
          <Table people={people} />
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

export default Oficina;
