import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-center items-center">
        <input
          type="text"
          className={`outline-none bg-gray-600 rounded-l-md px-2 text-lg h-12 w-[500px] max-w-[50vw] hover:border-blue-500 hover:border-[1px] ${
            isActive ? "border-blue-500 border-[1px]" : ""
          }`}
          placeholder="Search your NFT"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        />
        <div className=" bg-blue-500 hover:bg-blue-600 cursor-pointer h-12 flex flex-row items-center justify-center px-4 rounded-r-md">
          <BiSearchAlt2 className=" text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
