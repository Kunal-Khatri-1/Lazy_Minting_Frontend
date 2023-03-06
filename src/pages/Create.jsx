import React, { useState } from "react";

import components from "../components";
import images from "../images";
import { useStateContext } from "../context";
import utils from "../utils";

import { useSigner } from "wagmi";

const Create = () => {
  const { tokenId, lazyNftAddress } = useStateContext();

  const { data: signer } = useSigner();

  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    properties: [],
  });

  const handleFormFieldChange = (fieldName, value) => {
    setForm({ ...form, [fieldName]: value, ["tokenId"]: tokenId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uri = await utils.uploadJsonToPinata(JSON.stringify({ ...form }));

    const newVoucher = await utils.createVoucher(
      tokenId,
      uri,
      form.price,
      signer,
      lazyNftAddress
    );

    console.log(newVoucher);

    console.log(form);

    // axios.post("http://localhost:4000/insert", form);
  };

  return (
    <div className="pt-20 bg-slate-900">
      <div className="flex justify-around items-center text-white bg-slate-800 w-screen pb-44 pt-24">
        {/* Wrapper */}
        <div className="shadow-lg border-[1px] border-white w-[700px] px-8 py-16 rounded-lg bg-slate-900">
          {/* Headings */}
          <div>
            <h1 className="text-5xl font-semibold mb-8">Create New NFT</h1>
            <p className=" text-sm text-gray-300">
              <span className=" text-red-600">*</span> Required Fields
            </p>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div>
              <h3 className="text-2xl">Upload Image *</h3>
              <components.DropBox form={form} setForm={setForm} />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl">Name *</h3>
              <input
                required
                placeholder="NFT Name"
                className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-4/6 max-w-[500px] hover:border-blue-500 focus:border-blue-500"
                value={form.name}
                onChange={(e) => handleFormFieldChange("name", e.target.value)}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl">Description </h3>
              <textarea
                rows="5"
                className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-4/6 max-w-[500px] hover:border-blue-500 focus:border-blue-500"
                placeholder="Provide a detailed description of your NFT."
                value={form.description}
                onChange={(e) =>
                  handleFormFieldChange("description", e.target.value)
                }
              />
            </div>

            <div className="mt-8">
              <h3 className="text-2xl">Price (ETH) *</h3>
              <input
                type="number"
                min="0"
                step="0.0001"
                required
                placeholder="2.18"
                className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-4/6 max-w-[500px] hover:border-blue-500 focus:border-blue-500"
                value={form.price}
                onChange={(e) => handleFormFieldChange("price", e.target.value)}
              />
            </div>

            <div className="mt-8">
              <div>
                <h3 className="text-2xl">Properties</h3>
              </div>
              <components.AddNftProperties form={form} setForm={setForm} />
            </div>

            <div>
              <components.Button
                text="Submit"
                styles=" w-full py-2"
                btnType="submit"
              />
            </div>
          </form>
        </div>
        <div>
          <img src={images.createNftBackground} alt="NFT Bg" />
        </div>
      </div>
    </div>
  );
};

export default Create;
