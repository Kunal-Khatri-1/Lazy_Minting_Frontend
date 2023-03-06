import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import images from "../images/index";

import components from "./index";

const Navbar = () => {
  const [isActive, setIsActive] = useState("");

  const toggleLink = (e) => {
    const linkClicked = e;
    if (linkClicked == "Profile") {
      console.log("profile");
      setIsActive("Profile");
    } else if (linkClicked == "Explore") {
      console.log("Explore");
      setIsActive("Explore");
    } else if (linkClicked == "Create") {
      console.log("Create");
      setIsActive("Create");
    } else if (linkClicked == "Sell") {
      console.log("Sell");
      setIsActive("Sell");
    } else {
      setIsActive("");
    }
  };

  return (
    <div>
      <div className="w-screen h-20 absolute top-0 left-0 z-50 text-white grid grid-cols-[1fr_3fr_1fr] justify-center items-center backdrop-blur-lg">
        {/* Logo */}
        <div className="ml-4 md:ml-8" onClick={() => toggleLink("")}>
          <Link to="/" className="cursor-pointer">
            <div className=" flex justify-center items-center gap-4">
              <div className="flex items-center justify-center">
                <img
                  src={images.logo}
                  alt="Logo"
                  className="h-12 min-w-[3rem]"
                />
              </div>

              <div>
                <h2 className="font-bold text-2xl">Marketplace</h2>
              </div>
            </div>
          </Link>
        </div>

        {/* Links/Menu */}
        <div className="flex flex-row items-center gap-20 justify-center font-semibold text-lg">
          <div
            className={`hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer ${
              isActive == "Profile" ? "bg-blue-500" : ""
            }`}
            onClick={() => toggleLink("Profile")}
          >
            <Link to="profile">
              <span>Profile</span>
            </Link>
            {/* <MdOutlineAccountCircle /> */}
          </div>
          <div
            className={`hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer ${
              isActive == "Explore" ? "bg-blue-500" : ""
            }`}
            onClick={() => toggleLink("Explore")}
          >
            <Link to="explore">
              <span>Explore</span>
            </Link>
            {/* <MdOutlineExplore /> */}
          </div>
          <div
            className={`hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer ${
              isActive == "Create" ? "bg-blue-500" : ""
            }`}
            onClick={() => toggleLink("Create")}
          >
            <Link to="create">
              <span>Create</span>
            </Link>
            {/* <MdOutlineCreate /> */}
          </div>

          <div
            className={`hover:bg-blue-500 px-2 py-1 rounded-md cursor-pointer ${
              isActive == "Sell" ? "bg-blue-500" : ""
            }`}
            onClick={() => toggleLink("Sell")}
          >
            <Link to="sell">
              <span>Sell</span>
            </Link>
            {/* <MdOutlineCreate /> */}
          </div>
        </div>

        {/* Rainbowkit */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
