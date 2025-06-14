import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from "./";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="w-full h-screen flex flex-col overflow-y-hidden items-center">
      <Header />
      <div className="flex w-full h-screen flex-auto">
        <Sidebar />
        <div className="flex-auto bg-white shadow-md h-full overflow-y-scroll p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
