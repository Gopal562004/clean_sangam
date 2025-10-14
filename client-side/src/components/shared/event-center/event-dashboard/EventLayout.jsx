import React from "react";
import { Outlet } from "react-router-dom";

const EventLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Could add sidebar/topbar here */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default EventLayout;
