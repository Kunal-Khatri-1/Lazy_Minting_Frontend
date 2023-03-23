import React from "react";

const Button = ({ text, onclick, styles, btnType, disabled }) => {
  return (
    <button
      type={btnType}
      className={` flex flex-row disabled:bg-gray-600 justify-center items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-md cursor-pointer ${styles}`}
      onClick={onclick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
};

export default Button;
