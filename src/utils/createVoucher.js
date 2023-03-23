export const createVoucher = async (
  tokenId,
  uri,
  minPrice,
  signer,
  LazyNftAddress
) => {
  const SIGNING_DOMAIN = "LazyNFT-Voucher";
  const SIGNATURE_VERSION = "1";

  const domain = {
    name: SIGNING_DOMAIN,
    version: SIGNATURE_VERSION,
    verifyingContract: LazyNftAddress,
    chainId: 5,
  };

  const voucher = { tokenId, uri, minPrice };

  const types = {
    NFTVoucher: [
      { name: "tokenId", type: "uint256" },
      { name: "minPrice", type: "uint256" },
      { name: "uri", type: "string" },
    ],
  };

  const signature = await signer._signTypedData(domain, types, voucher);
  console.log(signature);

  return {
    ...voucher,
    signature,
  };
};
