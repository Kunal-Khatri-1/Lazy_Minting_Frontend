import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { ImCross } from "react-icons/im";

import images from "../images/index";

import components from "../components/index";

import { useStateContext } from "../context";

const Profile = ({ setProfileProps }) => {
  const {
    openConnectModal,
    isConnected,
    connectedAddress,
    collectedItemsLoading,
    collectedItems,
    createdItemsLoading,
    createdItems,
    withdrawProceeds,
    proceedsData,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!connectedAddress) {
      openConnectModal();
    }
  }, [isConnected]);

  useEffect(() => {
    if (!collectedItemsLoading && !createdItemsLoading) {
      console.log("collected", collectedItems);
      console.log("created", createdItems);

      setIsLoading(false);
    }
  }, [collectedItemsLoading, createdItemsLoading]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!collectedItemsLoading) {
      navigate("/profile/collected");
      setLinkSelected("collected");
      setProfileProps(collectedItems);
    }
  }, [collectedItemsLoading, collectedItems]);

  const [linkSelected, setLinkSelected] = useState("");

  const handleClick = (linkSelectedParam) => {
    if (linkSelectedParam === "collected") {
      setLinkSelected("collected");
      setProfileProps(collectedItems);
    } else if (linkSelectedParam === "created") {
      setLinkSelected("created");
      setProfileProps(createdItems);
    } else {
      setLinkSelected("");
    }
  };

  const [showModal, setShowModal] = useState(false);

  const showCollectModal = (showVal) => {
    if (showVal === true) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleWithdrawProceeds = async () => {
    await withdrawProceeds();
  };

  return (
    <div
      className={`bg-slate-800 pt-20 text-white overflow-x-hidden ${
        showModal ? "h-screen overflow-y-hidden" : ""
      }`}
    >
      {!isLoading ? (
        <div>
          <div>
            {/* Banner */}
            <div className=" w-screen h-80 md:h-96 bg-black relative">
              <img
                src={images.doodlesBackground}
                alt="Profile Background"
                className=" h-80 md:h-96 w-screen object-cover"
              />

              {/* Profile Picture */}
              <div className="absolute w-40 h-40 bg-red-300 rounded-full border-white border-[4px] -bottom-16 left-8 md:left-16 overflow-hidden">
                <img
                  src={images.doodles}
                  alt="Profile Image"
                  className=" object-cover"
                />
              </div>
            </div>
          </div>
          {/* Created and Collected and Search bar */}
          <div className="mb-20">
            <div className="grid grid-cols-[1fr_1fr_1fr_3fr] items-center gap-12 px-4 py-4 text-lg mb-20 pt-32 bg-slate-900">
              <Link to="collected" onClick={() => handleClick("collected")}>
                <div
                  className={`text-center font-semibold cursor-pointer px-4 py-4 text-xl ${
                    linkSelected === "collected"
                      ? "text-blue-500"
                      : " text-gray-300"
                  }`}
                >
                  Collected
                </div>
              </Link>

              <Link to="created" onClick={() => handleClick("created")}>
                <div
                  className={`text-center font-semibold cursor-pointer px-4 py-4 text-xl ${
                    linkSelected === "created"
                      ? "text-blue-500"
                      : " text-gray-300"
                  }`}
                >
                  Created
                </div>
              </Link>
              <div
                className={`text-center font-semibold cursor-pointer bg-blue-500 rounded-md hover:bg-white hover:text-blue-500 px-4 py-4 text-xl transition-all ease-linear duration-100 `}
                onClick={() => showCollectModal(true)}
              >
                Withdraw
              </div>
              <div>
                <components.SearchBar />
              </div>
            </div>
            <Outlet />
          </div>
          {/* Collect Modal */}
          <div
            className={`w-screen h-screen backdrop-blur-lg top-0 left-0 ${
              showModal ? "absolute" : "hidden"
            }`}
          >
            <div
              className={`top-1/2 -translate-y-1/2 left-1/3 z-50 shadow-lg border-gray-300 border-[1px] bg-slate-900 px-8 py-16 rounded-lg text-2xl font-semibold ${
                showModal ? "absolute" : "hidden"
              }`}
            >
              <span
                className="absolute top-[20px] right-[20px] text-white hover:text-white text-base cursor-pointer"
                onClick={() => showCollectModal(false)}
              >
                <ImCross />
              </span>
              <div className="flex flex-row gap-x-8 justify-center items-center">
                <img src={images.wallet} alt="Wallet" className="h-[150px]" />
                <div className="flex flex-col justify-around h-full">
                  <div>
                    <span className="text-gray-300">Your Balance: </span>
                    <span className="text-blue-500 font-bold ml-2">
                      {proceedsData}
                    </span>
                  </div>
                  <components.Button
                    text="Collect"
                    styles=" py-2 mt-12"
                    onclick={() => handleWithdrawProceeds()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
