import React, { useContext, createContext } from "react";

import { contractDetails } from "../constants/index";
import { useContractRead, useAccount, useBalance } from "wagmi";

import { useQuery, gql } from "@apollo/client";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { prepareWriteContract, writeContract } from "@wagmi/core";
import { ethers } from "ethers";

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

const StateContext = createContext();

const {
  ["1337"]: {
    lazyNft: { address: lazyNftAddress },
  },
  ["1337"]: {
    lazyNft: { abi: lazyNftAbi },
  },
  ["5"]: {
    nftMarketplace: { address: nftMarketplaceAddress },
  },
  ["5"]: {
    nftMarketplace: { abi: nftMarketplaceAbi },
  },
  ["5"]: {
    basicNft: { address: basicNftAddress },
  },
  ["5"]: {
    basicNft: { abi: basicNftAbi },
  },
} = contractDetails;

export const StateContextProvider = ({ children }) => {
  const { isConnected, address: connectedAddress } = useAccount();
  const connectedAddressBalance = useBalance({ address: connectedAddress });

  const GET_COLLECTED_ITEMS = gql`
  {
  itemBoughts(first: 100, where: {buyer: "${connectedAddress}"}) {
    id
    buyer
    nftAddress
    tokenId
    price
  }
}
`;

  const GET_CREATED_ITEMS = gql`
{
  activeItems(
    first: 100
    where: { seller: "${connectedAddress}" }
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

  const { openConnectModal } = useConnectModal();

  const approveAndList = async (nftAddress, tokenId, price) => {
    const approveConfig = await prepareWriteContract({
      address: nftAddress,
      abi: basicNftAbi,
      functionName: "approve",
      args: [nftMarketplaceAddress, tokenId],
    });

    const approveData = await writeContract(approveConfig);
    await approveData.wait(1);

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

  const buyNft = async (nftAddress, tokenId, price) => {
    if (connectedAddressBalance > price) {
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
    args: [connectedAddress],
    chainId: 5,
    watch: true,
  });

  const withdrawProceeds = async () => {
    const proceedsConfig = await prepareWriteContract({
      address: nftMarketplaceAddress,
      abi: nftMarketplaceAbi,
      functionName: "getProceeds",
      chainId: 5,
    });

    const proceedsData = await writeContract(proceedsConfig);
    await proceedsData.wait(1);
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
        proceedsData: ethers.utils.formatEther(proceedsData),
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

//   const { data } = useContractRead(address, abi, "getExpectedTokenId", []);
