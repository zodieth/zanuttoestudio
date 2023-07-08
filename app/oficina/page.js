import React from "react";
import Table from "../components/Table";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function page() {
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

export default page;
