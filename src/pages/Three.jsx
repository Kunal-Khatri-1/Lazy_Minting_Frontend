import React from "react";
import { useLocation } from "react-router";
import Components from "../components/index";

const Three = () => {
  const { state } = useLocation();
  const { image, tokenId, price } = state;

  return (
    <div className=" bg-slate-900 pt-20 text-white">
      <Components.ThreeCard image={image} tokenId={tokenId} price={price} />
    </div>
  );
};

export default Three;
