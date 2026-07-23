import React from "react";
import { NavLink } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex justify-between items-center p-5 bg-gradient-to-r from-[#5c3317] via-[#c8a27a] to-white shadow-lg font-bold">
      <h1 className="text-xl font-bold text-white">
        Minimalist
        <span className="border-b-4 border-white pb-2 rounded-b-lg">Blog</span>
      </h1>
      <div className="flex gap-6">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive
              ? "text-black font-bold border-b-2 border-black pb-1"
              : "text-black hover:text-amber-700 hover:border-b-2 hover:border-black pb-1"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive
              ? "text-black font-bold border-b-2 border-black pb-1"
              : "text-black hover:text-amber-700 hover:border-b-2 hover:border-black pb-1"
          }
        >
          Create Post
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            isActive
              ? "text-black font-bold border-b-2 border-black pb-1"
              : "text-black hover:text-amber-700 hover:border-b-2 hover:border-black pb-1"
          }
        >
          Bookmarks
        </NavLink>
      </div>
    </nav>
  );
}
export default Navbar;
