import React from "react";

const Button = ({ text, onclick, styles, btnType }) => {
  return (
    <button
      type={btnType}
      className={` flex flex-row justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-md cursor-pointer ${styles}`}
      onClick={onclick}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
