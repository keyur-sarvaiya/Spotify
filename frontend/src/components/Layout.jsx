import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { SongData } from "../context/Song"

const Layout = ({ children }) => {
  const { selectedSong } = SongData();
  return (
    <div className="h-screen">
      <div className="h-full flex">
        <Sidebar />
        <div
          className={`w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0 ${selectedSong ? "pb-[6rem]" : ""
            }`}
        >
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
