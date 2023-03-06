import React, { useEffect, useState } from "react";
import { getNetwork } from "@wagmi/core";

import { FaEthereum } from "react-icons/fa";

import components from "../components/index";
import { useStateContext } from "../context";

const Explore = () => {
  const { activeItems, activeItemsLoading, isConnected } = useStateContext();

  const [connectedNetwork, setConnectedNetwork] = useState("");

  const [category, setCategory] = useState("");

  const selectCategory = (categorySelected) => {
    if (category === categorySelected) {
      setCategory("");
    } else {
      setCategory(categorySelected);
    }
  };

  useEffect(() => {
    if (isConnected) {
      const network = getNetwork();
      setConnectedNetwork(network.chain.network);
    }
  }, [isConnected]);

  return (
    <div className="bg-slate-900 pt-20 text-white">
      {/* Wrapper */}
      <div className=" w-screen grid grid-cols-[1fr_5fr] bg-slate-800 py-16 px-4 gap-12">
        {/* Filter */}
        <div className=" px-4 py-8 border-gray-300 border-[1px] rounded-lg bg-slate-900 self-start mt-28 text-lg sticky top-52">
          {/* Filter Header */}
          <div>
            <h1 className="text-3xl font-semibold mb-4">Ethereum</h1>
            <div className="flex flex-row items-center gap-2">
              <div className=" w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <FaEthereum className="text-2xl" />
              </div>
              <p className=" text-sm text-gray-300">
                {connectedNetwork
                  ? connectedNetwork.toString().toUpperCase()
                  : "Not Connected"}
              </p>
            </div>
            <br />
            <hr />
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-semibold">Price (ETH)</h1>
            <div className="flex flex-col items-center mt-1">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  className="mt-2 sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-md w-32 py-1 hover:border-blue-500 focus:border-blue-500"
                />
                <span> to </span>
                <input
                  type="number"
                  min="0"
                  className="mt-2 sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-md w-32 py-1 hover:border-blue-500 focus:border-blue-500"
                />
              </div>
              <components.Button
                text="Apply"
                // onclick={handleAddProperty}
                styles="bg-blue-500 hover:bg-blue-600 text-white px-4 text-md font-normal w-72 mt-8 py-1"
              />
            </div>
            <br />
            <hr />

            <div className="mt-4">
              <h1 className="text-2xl font-semibold">Category</h1>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {/* Art */}
                <input
                  type="checkbox"
                  name="art"
                  id="art"
                  value="art"
                  className="hidden"
                />
                <label
                  htmlFor="art"
                  className={`cursor-pointer hover:bg-blue-500 py-1 px-2 rounded-md text-center ${
                    category === "art" ? "bg-blue-500" : ""
                  }`}
                  onClick={() => selectCategory("art")}
                >
                  Art
                </label>
                {/* Membership */}
                <input
                  type="checkbox"
                  name="membership"
                  id="membership"
                  value="membership"
                  className="hidden"
                />
                <label
                  htmlFor="membership"
                  className={`cursor-pointer hover:bg-blue-500 py-1 px-2 rounded-md text-center ${
                    category === "membership" ? "bg-blue-500" : ""
                  }`}
                  onClick={() => selectCategory("membership")}
                >
                  Membership
                </label>
                {/* Gaming */}
                <input
                  type="checkbox"
                  name="gaming"
                  id="gaming"
                  value="gaming"
                  className="hidden"
                />
                <label
                  htmlFor="gaming"
                  className={`cursor-pointer hover:bg-blue-500 py-1 px-2 rounded-md text-center ${
                    category === "gaming" ? "bg-blue-500" : ""
                  }`}
                  onClick={() => selectCategory("gaming")}
                >
                  Gaming
                </label>
                {/* Photography */}
                <input
                  type="checkbox"
                  name="photography"
                  id="photography"
                  value="photography"
                  className="hidden"
                />
                <label
                  htmlFor="photography"
                  className={`cursor-pointer hover:bg-blue-500 py-1 px-2 rounded-md text-center ${
                    category === "photography" ? "bg-blue-500" : ""
                  }`}
                  onClick={() => selectCategory("photography")}
                >
                  Photography
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Right wrapper */}
        <div>
          <components.SearchBar />
          <div className=" mt-16">
            {!activeItemsLoading ? (
              <components.NftGallery
                cardStyles="max-w-[230px]"
                items={activeItems}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
