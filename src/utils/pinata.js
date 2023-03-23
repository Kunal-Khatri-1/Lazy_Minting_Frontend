import axios from "axios";

const apiKey = "cc37ec21d765596c9d3b";
const apiSecret =
  "8f2c1fb83d14dbc2be2e06ac222f8dde98a41c53a43925452113b993978a3048";

export const uploadFileToPinata = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
        "Content-Type": "multipart/form-data",
      },
    });

    const ipfsLink = `ipfs://${resFile.data.IpfsHash}`;
    const ipfsGatewayLink = `https://gateway.ipfscdn.io/ipfs/${resFile.data.IpfsHash}`;

    return ipfsGatewayLink;
  } catch (error) {
    console.log(error);
  }
};

export const uploadJsonToPinata = async (file) => {
  try {
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: file,
      headers: {
        pinata_api_key: apiKey,
        pinata_secret_api_key: apiSecret,
        "Content-Type": "application/json",
      },
    });

    const ipfsLink = `ipfs://${resFile.data.IpfsHash}`;
    const ipfsGatewayLink = `https://gateway.ipfscdn.io/ipfs/${resFile.data.IpfsHash}`;
    console.log(ipfsLink);

    return ipfsGatewayLink;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJsonFromIpfs = async (link) => {
  try {
    if (link.startsWith("ipfs://")) {
      link = link.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    const response = await axios({
      method: "get",
      url: link,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
