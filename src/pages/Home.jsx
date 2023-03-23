import React, { useEffect } from "react";

import NftCard from "../components/NftCard";

import components from "../components/index";
import { useStateContext } from "../context";
import { ethers } from "ethers";
import { useNavigate } from "react-router";

const Home = () => {
  const { notableItems: activeItems, notableItemsLoading: activeItemsLoading } =
    useStateContext();

  return (
    <div>
      <div
        className=" w-screen h-[100vh] object-contain flex flex-row justify-center items-center bg-slate-800"
        style={{
          backgroundImage:
            "url('https://c1.wallpaperflare.com/preview/113/230/329/fabric-texture-pattern-textile.jpg')",
        }}
      >
        <div className="w-full h-full backdrop-blur-lg flex flex-row justify-center items-center shadow-lg">
          <div className="w-4/5 h-5/6 border-gray-300 border-[3px] bg-slate-900 rounded-lg py-6 mt-16">
            <div className="grid md:grid-cols-[2fr_1fr] h-full items-center">
              <div className="text-white ml-20">
                <h1 className="xl:text-7xl lg:text-5xl md:text-4xl font-semibold flex flex-col gap-8">
                  <span>Buy, Create &</span>
                  <span>Sell Unique</span>
                  <span className=" text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-pink-600">
                    NFT Collection
                  </span>
                </h1>
              </div>

              <div className="mr-20">
                <NftCard
                  defaultImage="https://ipfs.io/ipfs/bafybeighihi6qh5atwldepgv4ew4kgxblpk2ct3vtkpqp5r4ojbocxwfuy/"
                  name="Skyie"
                  description="I am Birb"
                  price={ethers.utils.parseEther("76.25")}
                  style={{
                    transform: "rotateZ(12deg) skewX(12deg)",
                    color: "black",
                    background: "white",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery */}
      <div className="bg-slate-800 text-white">
        <h1 className="text-white font-semibold text-center py-16 text-5xl">
          Notable Collections
        </h1>
        {!activeItemsLoading ? (
          <components.NftGallery items={activeItems} />
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Home;
