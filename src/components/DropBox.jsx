import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { BsImage } from "react-icons/bs";

import utils from "../utils/index";

const DropBox = ({ setForm, form, setIsLoading }) => {
  const [image, setImage] = useState();

  const onDrop = useCallback(
    async (acceptedImage) => {
      setIsLoading(true);
      const imagePreview = Object.assign(acceptedImage, {
        preview: URL.createObjectURL(acceptedImage[0]),
      });

      setImage(imagePreview);

      const gatewayLinkImage = await utils.uploadFileToPinata(acceptedImage[0]);

      setForm({
        ...form,
        ["image"]: gatewayLinkImage,
      });

      setIsLoading(false);
    },
    [image]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-white hover:border-blue-500 hover:text-blue-500 bg-transparent text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] w-4/6 max-w-[500px] h-60 cursor-pointer mt-[10px] flex items-center justify-center"
      >
        <input {...getInputProps()} />
        <p className="flex flex-col justify-center items-center">
          <span> Drag 'n' drop image here, or click to select files</span>
          <BsImage className=" w-full h-28 mt-8" />
        </p>
      </div>
      {/* Image Preview */}
      <aside className="flex flex-row flex-wrap mt-4">
        {image && (
          <div
            className=" inline-flex rounded-md border-[2px] border-blue-500 mb-2 mr-2 w-[100px] h-[100px] p-1"
            key={image.name}
          >
            <div className="flex min-w-0 overflow-hidden">
              <img
                className="block w-auto h-full"
                src={image.preview}
                alt="Image"
                onLoad={() => {
                  URL.revokeObjectURL(image.preview);
                }}
              />
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default DropBox;
