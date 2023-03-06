import React, { useState } from "react";

const Toggle = () => {
  const [nightMode, setNightMode] = useState(true);

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div
      className={`flex flex-row items-center ${
        nightMode ? "justify-end bg-indigo-500" : "justify-start bg-slate-500"
      } w-16 h-8 rounded-full cursor-pointer`}
      onClick={toggleNightMode}
    >
      <div className="w-6 h-6 rounded-full bg-white mx-2"></div>
    </div>
  );
};

export default Toggle;
