import { useState } from "react";

import Button from "./Button";

function AddNftProperties({ form, setForm }) {
  const [properties, setProperties] = useState([]);

  const handleAddProperty = () => {
    setProperties([...properties, ["", ""]]);
    setForm({ ...form, ["properties"]: [...properties, ["", ""]] });
  };

  const handlePropertyChange = (index, key, value) => {
    const updatedProperties = [...properties];
    updatedProperties[index] = [key, value];
    setProperties(updatedProperties);
    setForm({ ...form, ["properties"]: updatedProperties });
  };
  return (
    <div>
      {properties.map((property, index) => (
        <div
          key={index}
          className="mb-4 flex justify-between w-4/6 max-w-[500px]"
        >
          <input
            type="text"
            placeholder="Property Key"
            className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-5/12 max-w-[220px] hover:border-blue-500 focus:border-blue-500"
            value={property[0]}
            onChange={(e) =>
              handlePropertyChange(index, e.target.value, property[1])
            }
          />
          <input
            type="text"
            placeholder="Property Value"
            className="mt-2 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white bg-transparent text-white text-[14px] placeholder:text-gray-400 rounded-[10px] w-5/12 max-w-[220px] hover:border-blue-500 focus:border-blue-500"
            value={property[1]}
            onChange={(e) =>
              handlePropertyChange(index, property[0], e.target.value)
            }
          />
        </div>
      ))}
      <Button
        btnType="button"
        text="Add Property"
        onclick={handleAddProperty}
        style="bg-blue-500 hover:bg-blue-600 text-white px-4 text-md font-normal w-[150px] mt-8 mb-24 py-1"
      />
    </div>
  );
}

export default AddNftProperties;
