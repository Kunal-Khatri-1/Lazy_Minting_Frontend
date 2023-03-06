import React from "react";

import NftCard from "./NftCard";

const NftGallery = ({ cardStyles, items }) => {
  return (
    <div className="bg-slate-800 pb-16">
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 max-w-[90vw] mx-auto gap-8`}
      >
        {items ? (
          items[`${Object.keys(items)[0]}`].map((element, index) => {
            const { price, nftAddress, tokenId, seller } = element;
            return (
              <NftCard
                key={index + 1}
                styles={cardStyles}
                price={price}
                nftAddress={nftAddress}
                tokenId={tokenId}
                seller={seller}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default NftGallery;
