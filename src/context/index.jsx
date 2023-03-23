import React, { useContext, createContext, useState, useEffect } from "react";

import { contractDetails } from "../constants/index";
import { useContractRead, useAccount, useBalance } from "wagmi";

import { useQuery, gql } from "@apollo/client";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { prepareWriteContract, writeContract, readContract } from "@wagmi/core";
import { ethers } from "ethers";
import axios from "axios";

const GET_ACTIVE_ITEM = gql`
  {
    activeItems(
      first: 100
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

const GET_NOTABLE_ITEMS = gql`
  {
    activeItems(
      first: 8
      where: { buyer: "0x0000000000000000000000000000000000000000" }
    ) {
      id
      buyer
      seller
      nftAddress
      tokenId
      price
    }
  }
`;

const StateContext = createContext();

const {
  ["5"]: {
    lazyNft: { address: lazyNftAddress, abi: lazyNftAbi },
  },
  ["5"]: {
    nftMarketplace: { address: nftMarketplaceAddress, abi: nftMarketplaceAbi },
  },
  ["5"]: {
    basicNft: { address: basicNftAddress, abi: basicNftAbi },
  },
} = contractDetails;

export const StateContextProvider = ({ children }) => {
  const { isConnected, address: connectedAddress } = useAccount();
  const connectedAddressBalance = useBalance({ address: connectedAddress });

  const GET_COLLECTED_ITEMS = gql`
  {
    
  itemBoughts(first: 100 where:{buyer: "${connectedAddress}"}) {
    id
    buyer
    nftAddress
    tokenId
  }
  itemCanceleds(first: 100 where:{seller: "${connectedAddress}"}) {
    id
    seller
    nftAddress
    tokenId
  }

}
`;

  const GET_CREATED_ITEMS = gql`
{
  activeItems(
    first: 100
    where: { seller: "${connectedAddress}" buyer_not: "0x000000000000000000000000000000000000dEaD"}
  ) {
    id
    buyer
    seller
    nftAddress
    tokenId
    price
  }
}
`;

  const {
    loading: collectedItemsLoading,
    error: collectedItemsError,
    data: collectedItems,
  } = useQuery(GET_COLLECTED_ITEMS);

  const {
    loading: createdItemsLoading,
    error: createdItemsError,
    data: createdItems,
  } = useQuery(GET_CREATED_ITEMS);

  const {
    loading: activeItemsLoading,
    error: activeItemsError,
    data: activeItems,
  } = useQuery(GET_ACTIVE_ITEM);

  const {
    loading: notableItemsLoading,
    error: notableItemsError,
    data: notableItems,
  } = useQuery(GET_NOTABLE_ITEMS);

  const { openConnectModal } = useConnectModal();

  const listNft = async (nftAddress, tokenId, price) => {
    const listConfig = await prepareWriteContract({
      address: nftMarketplaceAddress,
      abi: nftMarketplaceAbi,
      functionName: "listItem",
      args: [
        nftAddress,
        tokenId,
        ethers.utils.parseUnits(price, "ether").toString(),
      ],
    });

    const listData = await writeContract(listConfig);
    await listData.wait(1);
  };

  const cancelListedNft = async (nftAddress, tokenId) => {
    const cancelConfig = await prepareWriteContract({
      address: nftMarketplaceAddress,
      abi: nftMarketplaceAbi,
      functionName: "cancelListing",
      args: [nftAddress, tokenId],
    });

    const cancelData = await writeContract(cancelConfig);
    await cancelData.wait(1);
  };

  const approveAndList = async (nftAddress, tokenId, price) => {
    const approveConfig = await prepareWriteContract({
      address: nftAddress,
      abi: basicNftAbi,
      functionName: "approve",
      args: [nftMarketplaceAddress, tokenId],
    });

    const approveData = await writeContract(approveConfig);
    await approveData.wait(1);

    await listNft(nftAddress, tokenId, price);
  };

  const buyNft = async (nftAddress, tokenId, price) => {
    if (connectedAddressBalance.data.formatted > price) {
      const buyNftConfig = await prepareWriteContract({
        address: nftMarketplaceAddress,
        abi: nftMarketplaceAbi,
        functionName: "buyItem",
        args: [nftAddress, tokenId],
        chainId: 5,
        overrides: {
          from: connectedAddress,
          value: ethers.utils.parseEther(price.toString()).toString(),
        },
      });
      const buyNftData = await writeContract(buyNftConfig);

      await buyNftData.wait(1);
    }
  };

  const { data: proceedsData } = useContractRead({
    address: nftMarketplaceAddress,
    abi: nftMarketplaceAbi,
    functionName: "getProceeds",
    args: [connectedAddress || "0x0000000000000000000000000000000000000000"],
    chainId: 5,
    watch: true,
  });

  const withdrawProceeds = async () => {
    if (connectedAddressBalance > 0) {
      const proceedsConfig = await prepareWriteContract({
        address: nftMarketplaceAddress,
        abi: nftMarketplaceAbi,
        functionName: "getProceeds",
        args: [connectedAddress],
        chainId: 5,
      });

      const proceedsData = await writeContract(proceedsConfig);
      await proceedsData.wait(1);
    }
  };

  const { data: expectedTokenId } = useContractRead({
    address: lazyNftAddress,
    abi: lazyNftAbi,
    functionName: "getExpectedTokenId",
    args: [],
    chainId: 5,
    watch: true,
  });

  const getActiveVouchers = async () => {
    const activeVouchers = await axios({
      method: "Get",
      url: "http://localhost:8000/vouchers",
    });

    return activeVouchers;
  };

  const redeemVoucher = async (tokenId, price, uri, signature, voucherId) => {
    if (connectedAddressBalance.data.formatted > price) {
      const voucher = {
        tokenId: tokenId,
        minPrice: ethers.utils.parseEther(price.toString()),
        uri: uri,
        signature: signature,
      };

      const redeemConfig = await prepareWriteContract({
        address: lazyNftAddress,
        abi: lazyNftAbi,
        functionName: "redeem",
        args: [connectedAddress, voucher],
        chainId: 5,
        overrides: {
          from: connectedAddress,
          value: voucher.minPrice,
        },
      });

      const redeemData = await writeContract(redeemConfig);
      await redeemData.wait(1);

      await approveAndList(lazyNftAddress, tokenId, ethers.BigNumber.from("1"));
      await buyNft(lazyNftAddress, tokenId);

      const boughtVoucher = await axios({
        method: "delete",
        url: `http://localhost:8000/vouchers/${voucherId}`,
      });

      return boughtVoucher;
    }
  };

  const importNft = async (nftAddress, tokenId, price = "0.1") => {
    const isOwner = await readContract({
      address: nftAddress,
      abi: basicNftAbi,
      functionName: "ownerOf",
      args: [tokenId],
      chainId: 5,
    });

    if (isOwner) {
      await approveAndList(nftAddress, tokenId, price);
      await cancelListedNft(nftAddress, tokenId);
    }
  };

  const [profileImages, setProfileImages] = useState();

  const getProfileImages = async () => {
    try {
      if (!isConnected) {
        openConnectModal();
      }
      const profileImagesResponse = await axios({
        method: "get",
        url: `http://localhost:8000/profile/${connectedAddress}`,
      });

      setProfileImages(profileImagesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileImages();
  }, [connectedAddress]);

  const updateProfileImage = async (profileImage, newImageLink) => {
    try {
      const data = {
        [profileImage]: newImageLink,
      };
      const profileImagesResponse = await axios({
        method: "patch",
        url: `http://localhost:8000/profile/${connectedAddress}`,
        data: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setProfileImages(profileImagesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        isConnected,
        lazyNftAddress,
        lazyNftAbi,
        basicNftAbi,
        basicNftAddress,
        activeItems,
        activeItemsLoading,
        nftMarketplaceAbi,
        nftMarketplaceAddress,
        openConnectModal,
        //
        approveAndList,
        connectedAddress,
        buyNft,
        collectedItemsLoading,
        createdItemsLoading,
        collectedItems,
        createdItems,
        withdrawProceeds,
        proceedsData: ethers.utils.formatEther(proceedsData || "0"),
        expectedTokenId,
        notableItems,
        notableItemsLoading,
        getActiveVouchers,
        redeemVoucher,
        cancelListedNft,
        importNft,
        getProfileImages,
        profileImages,
        updateProfileImage,
        GET_ACTIVE_ITEM,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
