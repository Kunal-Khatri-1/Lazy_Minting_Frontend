import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import components from "../components/index";
import { useStateContext } from "../context";

import { useEffect } from "react";

const NftDescription = () => {
  const {
    openConnectModal,
    isConnected,
    connectedAddress,
    buyNft,
    redeemVoucher,
  } = useStateContext();

  useEffect(() => {
    if (!connectedAddress) {
      openConnectModal();
    }
  }, [isConnected]);

  const { state } = useLocation();
  const {
    nftAddress,
    voucherId,
    tokenId,
    seller,
    price,
    description,
    image,
    signature,
    uri,
    attributes,
  } = state;

  const navigate = useNavigate();
  const handleNavigate = (image, tokenId, price) => {
    navigate("/cool_mode", {
      state: {
        image: image,
        tokenId: tokenId,
        price: price,
      },
    });
  };

  const handleClick = async () => {
    if (nftAddress) {
      await buyNft(nftAddress, tokenId, price);
    } else {
      const data = await redeemVoucher(
        tokenId,
        price,
        uri,
        signature,
        voucherId
      );
    }
  };

  return (
    <div className="pt-20 bg-slate-900 text-white">
      {/* wrapper */}
      <div className="bg-slate-800 grid grid-cols-[5fr_8fr] px-8 py-16 gap-x-32">
        {/* nft Image */}
        <div
          className="w-full overflow-hidden cursor-pointer self-center"
          onClick={() => handleNavigate(image, tokenId, price)}
        >
          <img src={image} alt="IMG" className="object-cover rounded-lg" />
        </div>
        {/* Nft Details */}
        <div
          className={`grid ${
            attributes ? "grid-cols-[5fr_3fr]" : ""
          }  gap-x-16`}
        >
          {/* wrapper */}
          <div>
            {/* Header */}
            <div>
              <div>
                <h1 className="text-5xl font-semibold">#{tokenId}</h1>
              </div>
              <p className="mt-2 text-gray-300">
                {!voucherId ? (
                  <span>
                    Contract:{" "}
                    <span className="text-blue-400 font-semibold">
                      {nftAddress}
                    </span>
                  </span>
                ) : (
                  <span>
                    Voucher:{" "}
                    <span className="text-blue-400 font-semibold">
                      {voucherId}
                    </span>
                  </span>
                )}
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
                  styles="w-full py-2 mt-4 max-w-[500px]"
                  onclick={handleClick}
                />
              </div>
            </div>
          </div>
          {/* Attributes */}
          {Array.isArray(attributes) && (
            <div className="bg-slate-900 min-w-[200px] mr-2 px-4 py-8 rounded-md border-gray-300 border-[1px] self-center">
              <div>
                <h1 className="text-3xl font-semibold">Attributes</h1>
              </div>
              {attributes.map((element, index) => {
                return (
                  <div className="mt-6 bg-blue-500 rounded-md" key={index + 1}>
                    <div className=" px-4 py-1">
                      <p className="text-center text-lg text-gray-200">
                        {element.trait_type}
                      </p>
                      <p className="text-center font-semibold mt-2 text-lg">
                        {element.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {typeof attributes === "object" &&
            !Array.isArray(attributes) &&
            attributes !== null && (
              <div className="bg-slate-900 min-w-[200px] mr-2 px-4 py-8 rounded-md border-gray-300 border-[1px] self-center">
                <div>
                  <h1 className="text-3xl font-semibold">Attributes</h1>
                </div>
                <div className="mt-6 bg-blue-500 rounded-md">
                  <div className=" px-4 py-1">
                    <p className="text-center text-lg text-gray-200">
                      {attributes.trait_type}
                    </p>
                    <p className="text-center font-semibold mt-2 text-lg">
                      {attributes.value}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default NftDescription;
