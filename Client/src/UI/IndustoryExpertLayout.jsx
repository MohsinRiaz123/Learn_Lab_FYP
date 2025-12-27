import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components/sidebar";

const IndustoryExpertLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mx-auto max-w-7xl">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

export default IndustoryExpertLayout;
