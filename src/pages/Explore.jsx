import React, { useEffect, useState } from "react";
import { getNetwork } from "@wagmi/core";

import components from "../components/index";
import { useStateContext } from "../context";

const Explore = () => {
  const {
    activeItems: items,
    activeItemsLoading,
    isConnected,
    getActiveVouchers,
    GET_ACTIVE_ITEM,
  } = useStateContext();

  const [connectedNetwork, setConnectedNetwork] = useState("");

  const [category, setCategory] = useState("");

  const [activeVouchers, setActiveVouchers] = useState("");
  const [activeItems, setActiveItems] = useState(items);

  const selectCategory = (categorySelected) => {
    if (category === categorySelected) {
      setCategory("");
    } else {
      setCategory(categorySelected);
    }
  };

  useEffect(() => {
    if (!activeItemsLoading) {
      setActiveItems(items);
    }
  }, [activeItemsLoading]);

  useEffect(() => {
    getActiveVouchers().then((data) => setActiveVouchers(data.data));
  }, []);

  useEffect(() => {
    if (isConnected) {
      const network = getNetwork();
      setConnectedNetwork(network.chain.network);
    }
  }, [isConnected]);

  return (
    <div className="bg-slate-900 pt-20 text-white">
      {/* Wrapper */}
      <div className=" w-screen bg-slate-800 py-16 px-4 gap-12">
        {/* Filter */}

        {/* Right wrapper */}
        <div>
          <components.SearchBar
            items={activeItems}
            setItems={setActiveItems}
            vouchers={activeVouchers}
            setVouchers={setActiveVouchers}
          />
          <div className="mt-16">
            {!activeItemsLoading ? (
              <components.NftGallery
                cardStyles="max-w-[230px]"
                items={activeItems}
                vouchers={activeVouchers}
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
