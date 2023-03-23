import React from "react";
import NftCard from "./NftCard";

const NftGallery = ({ cardStyles, items, vouchers }) => {
  return (
    <div className="bg-slate-800 pb-16">
      <div
        className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 max-w-[90vw] mx-auto gap-8`}
      >
        {items &&
          Object.keys(items).map((key, keysIndex) => {
            const subArray = items[key].map((element, index) => {
              const { price, nftAddress, tokenId, seller } = element;
              return (
                <NftCard
                  key={keysIndex.toString() + index.toString() + (1).toString()}
                  styles={cardStyles}
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  seller={seller}
                  uri={null}
                />
              );
            });

            return [...subArray].flat();
          })}
        {vouchers &&
          vouchers.map((element, index) => {
            const {
              _id: id,
              tokenId,
              minPrice: price,
              uri,
              signature,
            } = element;
            return (
              <NftCard
                key={id}
                styles={cardStyles}
                price={price}
                voucherId={id}
                tokenId={tokenId}
                seller={"example.eth"}
                uri={uri}
                nftAddress={null}
                signature={signature}
              />
            );
          })}

        {!vouchers && !items && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default NftGallery;
