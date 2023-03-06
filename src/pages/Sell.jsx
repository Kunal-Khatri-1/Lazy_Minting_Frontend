import React from "react";
import images from "../images";
import components from "../components/index";

import { useStateContext } from "../context";
import { useEffect, useState } from "react";

const Sell = () => {
  const { openConnectModal, approveAndList, connectedAddress, isConnected } =
    useStateContext();

  useEffect(() => {
    if (!connectedAddress) {
      openConnectModal();
    }
  }, [isConnected]);

  const [formData, setFormData] = useState({
    nftAddress: "",
    tokenId: "0",
    price: "0",
  });

  const handleFormFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await approveAndList(formData.nftAddress, formData.tokenId, formData.price);
  };

  return (
    <div className="bg-slate-900 pt-20">
      <div className="flex justify-around items-center text-white bg-slate-800 w-screen pb-44 pt-24">
        <div className="shadow-lg border-[1px] border-white w-[700px] px-8 py-16 rounded-lg bg-slate-900">
          <div>
            <h1 className="text-5xl font-semibold mb-8">Sell Your NFT</h1>
            <p className=" text-sm text-gray-300">
              <span className=" text-red-600">*</span> Required Fields
            </p>
          </div>
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* NFT Address */}
            <div className="mt-8">
              <h3 className="text-2xl">NFT Address *</h3>
              <input
                required
                placeholder="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D "
                className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-4/6 max-w-[500px] hover:border-blue-500 focus:border-blue-500"
                value={formData.nftAddress}
                onChange={(e) =>
                  handleFormFieldChange("nftAddress", e.target.value)
                }
              />
            </div>

            {/* Token Id */}
            <div className="mt-8">
              <h3 className="text-2xl">Token Id *</h3>
              <input
                type="number"
                min="0"
                required
                placeholder="9"
                className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-4/6 max-w-[500px] hover:border-blue-500 focus:border-blue-500"
                value={formData.tokenId || 0}
                onChange={(e) =>
                  handleFormFieldChange("tokenId", e.target.value)
                }
              />
            </div>
            {/* Price */}
            <div className="mt-8">
              <h3 className="text-2xl">Price ( in ETH ) *</h3>
              <input
                type="number"
                min="0"
                step="0.0001"
                required
                placeholder="2.18"
                className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-4/6 max-w-[500px] hover:border-blue-500 focus:border-blue-500"
                value={formData.price || 0}
                onChange={(e) => handleFormFieldChange("price", e.target.value)}
              />
            </div>
            {/* Submit Button */}
            <div>
              <components.Button
                text="Submit"
                styles=" w-full py-2 mt-16"
                btnType="submit"
              />
            </div>
          </form>
        </div>
        <div>
          <img src={images.sellNftBackground} alt="NFT Bg" />
        </div>
      </div>
    </div>
  );
};

export default Sell;
