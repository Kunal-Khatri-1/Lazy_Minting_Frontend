import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { ImCross } from "react-icons/im";

import images from "../images/index";

import components from "../components/index";

import { useStateContext } from "../context";

import { FiPlus } from "react-icons/fi";

import { uploadFileToPinata } from "../utils/pinata";

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
    importNft,
    getProfileImages,
    profileImages,
    updateProfileImage,
  } = useStateContext();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!connectedAddress) {
      openConnectModal();
    }
  }, [isConnected]);

  useEffect(() => {
    if (!collectedItemsLoading && !createdItemsLoading && profileImages) {
      setIsLoading(false);
    } else {
      getProfileImages();
    }
  }, [collectedItemsLoading, createdItemsLoading, connectedAddress]);

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

  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [form, setForm] = useState({
    nftAddress: "",
    tokenId: "",
  });

  const handleShowModal = (showVal, modal) => {
    if (showVal === true) {
      if (modal === "collect") {
        setShowCollectModal(true);
        setShowImportModal(false);
      } else {
        setShowImportModal(true);
        setShowCollectModal(false);
      }
    } else {
      if (modal == "collect") {
        setShowCollectModal(false);
        setShowImportModal(false);
      } else {
        setShowImportModal(false);
        setShowCollectModal(false);
      }
    }
  };

  const handleFormFieldChange = (fieldName, value) => {
    setForm({ ...form, [fieldName]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await importNft(form.nftAddress, form.tokenId);
  };

  const handleWithdrawProceeds = async () => {
    await withdrawProceeds();
  };

  return (
    <div
      className={`bg-slate-800 pt-20 text-white overflow-x-hidden ${
        showCollectModal || showImportModal ? "h-screen overflow-y-hidden" : ""
      }`}
    >
      {!isLoading ? (
        <div>
          <div>
            {/* Banner */}
            <div className=" w-screen h-80 md:h-96 bg-black relative">
              <div className="h-full w-full group">
                <img
                  src={profileImages.profileBackground}
                  alt="Profile Background"
                  className=" h-80 md:h-96 w-screen object-cover"
                />

                <label
                  htmlFor="backgroundPicture"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 bg-opacity-50 group-hover:flex hidden justify-center items-center w-full h-full backdrop-blur-sm cursor-pointer"
                >
                  <FiPlus className=" text-white text-8xl font-extrabold" />
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="backgroundPicture"
                  id="backgroundPicture"
                  accept="image/*"
                  onChange={async (e) => {
                    const image = e.target.files[0];
                    if (image) {
                      const imageLink = await uploadFileToPinata(image);
                      await updateProfileImage("profileBackground", imageLink);
                    }
                  }}
                />
              </div>

              {/* Profile Picture */}
              <div className="absolute w-40 h-40 bg-red-300 rounded-full border-white border-[4px] -bottom-16 left-8 md:left-16 overflow-hidden group">
                <img
                  src={profileImages.profilePicture}
                  alt="Profile Image"
                  className=" object-cover"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 bg-opacity-50 group-hover:flex hidden justify-center items-center w-full h-full backdrop-blur-sm cursor-pointer"
                >
                  <FiPlus className=" text-white text-6xl font-bold" />
                </label>

                <input
                  className="hidden"
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  accept="image/*"
                  onChange={async (e) => {
                    const image = e.target.files[0];
                    if (image) {
                      const imageLink = await uploadFileToPinata(image);
                      await updateProfileImage("profilePicture", imageLink);
                    }
                  }}
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
                  Listed
                </div>
              </Link>
              <div
                className={`text-center font-semibold cursor-pointer bg-blue-500 rounded-md hover:bg-white hover:text-blue-500 px-4 py-4 text-xl transition-all ease-linear duration-100 `}
                onClick={() => handleShowModal(true, "collect")}
              >
                Withdraw
              </div>
              <div>
                <components.SearchBar />
              </div>
            </div>
            <Outlet />
          </div>
          {/* Import Tokens  */}
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className=" text-gray-300">Don't see your NFT?</p>
            <components.Button
              text="Import NFTs"
              btnType="button"
              styles="px-2 py-1 mb-32"
              onclick={() => handleShowModal(true, "import")}
            />
          </div>
          {/* Collect Modal and Import NFTs Modal */}
          <div
            className={`w-screen h-screen backdrop-blur-lg top-0 left-0 ${
              showCollectModal || showImportModal ? "absolute" : "hidden"
            }`}
          >
            <div
              className={`top-1/2 -translate-y-1/2 left-1/3 z-50 shadow-lg border-gray-300 border-[1px] bg-slate-900 px-8 py-16 rounded-lg text-2xl font-semibold ${
                showCollectModal || showImportModal ? "absolute" : "hidden"
              }`}
            >
              <span
                className="absolute top-[20px] right-[20px] text-white hover:text-white text-base cursor-pointer"
                onClick={() => handleShowModal(false, "collect")}
              >
                <ImCross />
              </span>

              {showCollectModal && (
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
              )}

              {showImportModal && (
                <div>
                  <h1 className="text-3xl">Import Token</h1>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="mt-8">
                        <h3 className="text-xl">NFT Address *</h3>
                        <input
                          required
                          placeholder="0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"
                          className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-[400px] hover:border-blue-500 focus:border-blue-500"
                          value={form.nftAddress}
                          onChange={(e) =>
                            handleFormFieldChange("nftAddress", e.target.value)
                          }
                        />
                      </div>

                      <div className="mt-8">
                        <h3 className="text-xl">Token Id *</h3>
                        <input
                          required
                          placeholder="2"
                          step="1"
                          className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-[400px] hover:border-blue-500 focus:border-blue-500"
                          value={form.tokenId}
                          onChange={(e) =>
                            handleFormFieldChange("tokenId", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <components.Button
                          text="Submit"
                          styles=" w-full py-2 mt-12"
                          btnType="submit"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              )}
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
