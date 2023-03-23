import React, { useEffect } from "react";
import { ethers } from "ethers";
import { useState } from "react";
import { useStateContext } from "../context";
import { fetchJsonFromIpfs } from "../utils/pinata";
import { useNavigate } from "react-router";
import { readContract } from "@wagmi/core";

const NftCard = ({
  price: priceInWei,
  styles,
  style,
  nftAddress,
  tokenId,
  seller = "",
  defaultImage,
  uri,
  voucherId,
  signature,
}) => {
  const [nftMetaData, setNftMetaData] = useState({});
  const [price, setPrice] = useState(priceInWei);

  const [isLoading, setIsLoading] = useState(true);

  const { basicNftAbi } = useStateContext();

  const addGatewayForImage = async (tokenUri) => {
    const metaData = await fetchJsonFromIpfs(tokenUri);
    if (metaData.image.startsWith("ipfs://")) {
      metaData.image = metaData.image.replace(
        "ipfs://",
        "https://ipfs.io/ipfs/"
      );
    }
    setNftMetaData(metaData);
  };

  const getTokenUri = async () => {
    const tokenUri = await readContract({
      address: nftAddress,
      abi: basicNftAbi,
      functionName: "tokenURI",
      args: [tokenId],
      chainId: 5,
    });

    await addGatewayForImage(tokenUri);
  };

  useEffect(() => {
    if (uri == null) {
      getTokenUri();
      setPrice(
        (prevVal) =>
          Math.round(ethers.utils.formatEther(prevVal || "0") * 10000) / 10000
      );
    } else {
      addGatewayForImage(uri);
    }
    setIsLoading(false);
  }, [uri]);

  const navigate = useNavigate();
  const handleNavigate = ({
    nftAddress,
    tokenId,
    seller,
    price,
    description = "",
    attributes = "",
    image = defaultImage,
    voucherId,
    signature,
    uri,
  }) => {
    if (nftAddress !== null && nftAddress !== undefined) {
      navigate(`/nft-details/${nftAddress}/${tokenId}`, {
        state: {
          nftAddress: nftAddress,
          voucherId: null,
          tokenId: tokenId,
          seller: seller,
          image: image,
          price: price,
          description: description,
          attributes: attributes,
        },
      });
    } else {
      navigate(`/nft-details/${voucherId}/${tokenId}`, {
        state: {
          nftAddress: null,
          voucherId: voucherId,
          tokenId: tokenId,
          seller: seller,
          image: image,
          price: price,
          description: description,
          attributes: attributes,
          signature: signature,
          uri: uri,
        },
      });
    }
  };

  return (
    <div
      className={`max-w-[300px] rounded overflow-hidden bg-[#090e1a] transform border-slate-500 border-[1px] cursor-pointer hover:bg-zinc-900 hover:scale-105 transition-all ease-linear ${
        styles ? styles : ""
      }`}
      style={style}
      onClick={() => {
        handleNavigate({
          nftAddress: nftAddress,
          tokenId: tokenId,
          seller: seller,
          price: price,
          image: nftMetaData.image,
          description: nftMetaData.description,
          attributes: nftMetaData.attributes,
          voucherId: voucherId,
          signature: signature,
          uri: uri,
        });
      }}
    >
      <img
        className="w-full max-h-72 h-3/5 object-cover p-2 rounded-t-md"
        src={nftMetaData.image || defaultImage}
        alt={nftMetaData.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nftMetaData.name}</div>
        <p className="text-gray-400 text-base">{nftMetaData.description}</p>
      </div>
      {Boolean(parseInt(price)) && (
        <div className="px-6 py-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {!isLoading ? `${price} ETH` : "..."}
          </span>
        </div>
      )}
    </div>
  );
};

export default NftCard;
