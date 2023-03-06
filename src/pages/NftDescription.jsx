import React from "react";
import { useLocation } from "react-router-dom";

import components from "../components/index";
import { useStateContext } from "../context";

import { useEffect } from "react";

const NftDescription = () => {
  const { openConnectModal, isConnected, connectedAddress, buyNft } =
    useStateContext();

  useEffect(() => {
    if (!connectedAddress) {
      openConnectModal();
    }
  }, [isConnected]);

  const { state } = useLocation();
  const { nftAddress, tokenId, seller, price, description, image } = state;

  const handleClick = async () => {
    await buyNft(nftAddress, tokenId, price);
  };

  return (
    <div className="pt-20 bg-slate-900 text-white">
      {/* wrapper */}
      <div className="bg-slate-800 grid grid-cols-[5fr_8fr] px-8 py-16 gap-x-32">
        {/* nft Image */}
        <div className="w-full overflow-hidden cursor-pointer self-center">
          <img src={image} alt="IMG" className="object-cover rounded-lg" />
        </div>
        {/* Nft Details */}
        <div className="grid grid-cols-[5fr_3fr] gap-x-16">
          {/* wrapper */}
          <div>
            {/* Header */}
            <div>
              <div>
                <h1 className="text-5xl font-semibold">#{tokenId}</h1>
              </div>
              <p className="mt-2 text-gray-300">
                Contract:{" "}
                <span className="text-blue-400 font-semibold">
                  {nftAddress}
                </span>
              </p>
              <p className="mt-2 text-gray-300">
                Owned by:{" "}
                <span className="text-blue-400 font-semibold">{seller}</span>
              </p>
            </div>
            {/* Description */}
            <div>
              <div>
                <h1 className=" mt-8 mb-2 text-5xl font-semibold">
                  Description
                </h1>
                <p className=" w-11/12 min-w-[400px] max-w-[600px] text-lg text-gray-300">
                  {description}
                </p>
              </div>
              {/* Price and Buy */}
              <div className="mt-8">
                {/* Pricing */}
                <div>
                  <p className="text-lg text-gray-300">Current Price :</p>
                  <h1 className=" pb-2 text-5xl font-semibold">{price} ETH</h1>
                </div>
                <components.Button
                  text="Buy Now"
                  styles="w-full py-2 mt-4"
                  onclick={handleClick}
                />
              </div>
            </div>
          </div>
          {/* Attributes */}
          <div className="bg-slate-900 min-w-[200px] mr-2 px-4 py-8 rounded-md border-gray-300 border-[1px] self-center">
            <div>
              <h1 className="text-3xl font-semibold">Attributes</h1>
            </div>
            <div className="mt-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftDescription;
