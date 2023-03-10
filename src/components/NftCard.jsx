// import { ethers } from "ethers";
// import React, { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import { useContractRead } from "wagmi";
// import { useStateContext } from "../context";
// import images from "../images";

// import { fetchJsonFromIpfs } from "../utils/pinata";

// const NftCard = ({
//   price = "0",
//   styles,
//   style,
//   nftAddress,
//   tokenId,
//   seller = "",
//   defaultImage,
// }) => {
//   price = Math.round(ethers.utils.formatEther(price || 0) * 1000) / 1000;

//   const [nftMetaData, setNftMetaData] = useState({});
//   const { basicNftAbi } = useStateContext();

//   const { data: tokenUri, isLoading: isLoadingNfts } = useContractRead({
//     address: nftAddress,
//     abi: basicNftAbi,
//     functionName: "tokenURI",
//     args: [tokenId],
//     chainId: 5,
//     onSuccess(tokenUri) {
//       (async () => {
//         const metaData = await fetchJsonFromIpfs(tokenUri);
//         if (metaData.image.startsWith("ipfs://")) {
//           metaData.image = metaData.image.replace(
//             "ipfs://",
//             "https://ipfs.io/ipfs/"
//           );
//         }
//         setNftMetaData(metaData);
//       })();
//     },
//   });

//   const navigate = useNavigate();
//   const handleNavigate = ({
//     nftAddress,
//     tokenId,
//     seller,
//     price,
//     description = "",
//     attributes = "",
//     image = defaultImage,
//   }) => {
//     navigate(`/nft-details/${nftAddress}/${tokenId}`, {
//       state: {
//         nftAddress: nftAddress,
//         tokenId: tokenId,
//         seller: seller,
//         image: image,
//         price: price,
//         description: description,
//         attributes: attributes,
//       },
//     });
//   };

//   return !isLoadingNfts ? (
//     <div
//       className={`max-w-[300px] rounded overflow-hidden bg-[#090e1a] transform border-slate-500 border-[1px] cursor-pointer hover:bg-zinc-900 hover:scale-105 transition-all ease-linear ${
//         styles ? styles : ""
//       }`}
//       style={style}
//       onClick={() => {
//         handleNavigate({
//           nftAddress: nftAddress,
//           tokenId: tokenId,
//           seller: seller,
//           price: price,
//           image: nftMetaData.image,
//           description: nftMetaData.description,
//           attributes: nftMetaData.attributes,
//         });
//       }}
//     >
//       <img
//         className="w-full max-h-72 h-3/5 object-cover p-2 rounded-t-md"
//         src={nftMetaData.image || defaultImage}
//         alt={nftMetaData.name}
//       />
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">{nftMetaData.name}</div>
//         <p className="text-gray-400 text-base">{nftMetaData.description}</p>
//       </div>
//       {Boolean(parseInt(price)) && (
//         <div className="px-6 py-4">
//           <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
//             {price} ETH
//           </span>
//         </div>
//       )}
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// };

// export default NftCard;

import React from "react";
import Skeleton from "react-loading-skeleton";
import { ethers } from "ethers";
import { useState } from "react";
import { useStateContext } from "../context";
import { useContractRead } from "wagmi";
import { fetchJsonFromIpfs } from "../utils/pinata";
import { useNavigate } from "react-router";

const NftCard = ({
  price = "0",
  styles,
  style,
  nftAddress,
  tokenId,
  seller = "",
  defaultImage,
}) => {
  price = Math.round(ethers.utils.formatEther(price || 0) * 1000) / 1000;

  const [nftMetaData, setNftMetaData] = useState({});
  const { basicNftAbi } = useStateContext();

  const { data: tokenUri, isLoading: isLoadingNfts } = useContractRead({
    address: nftAddress,
    abi: basicNftAbi,
    functionName: "tokenURI",
    args: [tokenId],
    chainId: 5,
    onSuccess(tokenUri) {
      (async () => {
        const metaData = await fetchJsonFromIpfs(tokenUri);
        if (metaData.image.startsWith("ipfs://")) {
          metaData.image = metaData.image.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          );
        }
        setNftMetaData(metaData);
      })();
    },
  });

  const navigate = useNavigate();
  const handleNavigate = ({
    nftAddress,
    tokenId,
    seller,
    price,
    description = "",
    attributes = "",
    image = defaultImage,
  }) => {
    navigate(`/nft-details/${nftAddress}/${tokenId}`, {
      state: {
        nftAddress: nftAddress,
        tokenId: tokenId,
        seller: seller,
        image: image,
        price: price,
        description: description,
        attributes: attributes,
      },
    });
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
            {price} ETH
          </span>
        </div>
      )}
    </div>
  );
};

export default NftCard;
