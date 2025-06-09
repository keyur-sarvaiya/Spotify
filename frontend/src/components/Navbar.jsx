import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

const Navbar = () => {
  const navigate = useNavigate();
  const { logoutUser, user } = UserData();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <img
            src={assets.arrow_left}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition"
            alt="left"
            onClick={() => navigate(-1)}
          />
          <img
            src={assets.arrow_right}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-gray-800 transition"
            alt="right"
            onClick={() => navigate(+1)}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200 transition">
            Explore Premium
          </p>
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200 transition">
            Install App
          </p>

          {user && user.role === "admin" && (
            <p
              onClick={() => navigate("/admin")}
              className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-200 transition"
            >
              Admin Dashboard
            </p>
          )}

          <p
            className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl cursor-pointer hover:bg-red-200 transition"
            onClick={logoutUser}
          >
            Logout
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <p
          className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer hover:bg-gray-200 transition"
          onClick={() => navigate("/")}
        >
          All
        </p>
        <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer hidden md:block hover:bg-gray-800 transition">
          Music
        </p>
        <p className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer hidden md:block hover:bg-gray-800 transition">
          Podcasts
        </p>
        <p
          onClick={() => navigate("/playlist")}
          className="bg-black text-white px-4 py-1 rounded-2xl cursor-pointer md:hidden hover:bg-gray-800 transition"
        >
          PlayList
        </p>
      </div>
    </>
  );
};

export default Navbar;

