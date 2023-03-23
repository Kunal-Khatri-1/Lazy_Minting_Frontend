const lazyNftAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "nftCollectionName",
        type: "string",
      },
      {
        internalType: "string",
        name: "nftCollectionSymbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "LazyNFT__InsufficientFundsSent",
    type: "error",
  },
  {
    inputs: [],
    name: "LazyNFT__InvalidTokenId",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "NftMinted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getExpectedTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "redeemer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minPrice",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "uri",
            type: "string",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct LazyNFT.NFTVoucher",
        name: "voucher",
        type: "tuple",
      },
    ],
    name: "redeem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const basicNftAbi = [
  { type: "constructor", payable: false, inputs: [] },
  {
    type: "event",
    anonymous: false,
    name: "Approval",
    inputs: [
      { type: "address", name: "owner", indexed: true },
      { type: "address", name: "approved", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "ApprovalForAll",
    inputs: [
      { type: "address", name: "owner", indexed: true },
      { type: "address", name: "operator", indexed: true },
      { type: "bool", name: "approved", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "BirdieMinted",
    inputs: [{ type: "uint256", indexed: false }],
  },
  {
    type: "event",
    anonymous: false,
    name: "Transfer",
    inputs: [
      { type: "address", name: "from", indexed: true },
      { type: "address", name: "to", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
    ],
  },
  {
    type: "function",
    name: "TOKEN_URI",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "approve",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "to" },
      { type: "uint256", name: "tokenId" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "balanceOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "owner" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "getApproved",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "uint256", name: "tokenId" }],
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "getTokenCounter",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "isApprovedForAll",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [
      { type: "address", name: "owner" },
      { type: "address", name: "operator" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "mintNft",
    constant: false,
    payable: false,
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "name",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "ownerOf",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "uint256", name: "tokenId" }],
    outputs: [{ type: "address" }],
  },
  {
    type: "function",
    name: "safeTransferFrom",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "from" },
      { type: "address", name: "to" },
      { type: "uint256", name: "tokenId" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "safeTransferFrom",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "from" },
      { type: "address", name: "to" },
      { type: "uint256", name: "tokenId" },
      { type: "bytes", name: "data" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "setApprovalForAll",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "operator" },
      { type: "bool", name: "approved" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "supportsInterface",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "bytes4", name: "interfaceId" }],
    outputs: [{ type: "bool" }],
  },
  {
    type: "function",
    name: "symbol",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "tokenURI",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "uint256", name: "tokenId" }],
    outputs: [{ type: "string" }],
  },
  {
    type: "function",
    name: "transferFrom",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "from" },
      { type: "address", name: "to" },
      { type: "uint256", name: "tokenId" },
    ],
    outputs: [],
  },
];

const marketplaceAbi = [
  {
    type: "error",
    name: "NftMarketPlace__AlreadyListed",
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
    ],
  },
  {
    type: "error",
    name: "NftMarketPlace__NotApprovedForMarketPlace",
    inputs: [],
  },
  {
    type: "error",
    name: "NftMarketPlace__NotListed",
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
    ],
  },
  { type: "error", name: "NftMarketPlace__NotOwner", inputs: [] },
  { type: "error", name: "NftMarketPlace__PriceMustBeAboveZero", inputs: [] },
  { type: "error", name: "NftMarketplace__NotProceeds", inputs: [] },
  {
    type: "error",
    name: "NftMarketplace__PriceNotMet",
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
      { type: "uint256", name: "listedPrice" },
    ],
  },
  { type: "error", name: "NftMarketplace__TransferFailed", inputs: [] },
  {
    type: "event",
    anonymous: false,
    name: "ItemBought",
    inputs: [
      { type: "address", name: "buyer", indexed: true },
      { type: "address", name: "nftAddress", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
      { type: "uint256", name: "price", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "ItemCanceled",
    inputs: [
      { type: "address", name: "seller", indexed: true },
      { type: "address", name: "nftAddress", indexed: true },
      { type: "uint256", name: "tokenId", indexed: false },
    ],
  },
  {
    type: "event",
    anonymous: false,
    name: "ItemListed",
    inputs: [
      { type: "address", name: "seller", indexed: true },
      { type: "address", name: "nftAddress", indexed: true },
      { type: "uint256", name: "tokenId", indexed: true },
      { type: "uint256", name: "price", indexed: false },
    ],
  },
  {
    type: "function",
    name: "buyItem",
    constant: false,
    stateMutability: "payable",
    payable: true,
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "cancelListing",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "getListing",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
    ],
    outputs: [
      {
        type: "tuple",
        components: [
          { type: "uint256", name: "price" },
          { type: "address", name: "seller" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "getProceeds",
    constant: true,
    stateMutability: "view",
    payable: false,
    inputs: [{ type: "address", name: "seller" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "listItem",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
      { type: "uint256", name: "price" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "updateListing",
    constant: false,
    payable: false,
    inputs: [
      { type: "address", name: "nftAddress" },
      { type: "uint256", name: "tokenId" },
      { type: "uint256", name: "newPrice" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "withdrawProceeds",
    constant: false,
    payable: false,
    inputs: [],
    outputs: [],
  },
];

export const contractDetails = {
  5: {
    basicNft: {
      abi: basicNftAbi,
    },

    nftMarketplace: {
      address: "0xb2EC00351D992E2a7371CB0C019d25D2a27c000D",
      abi: marketplaceAbi,
    },
    lazyNft: {
      address: "0x9f3063c5E25d3a25AB709E46B696bb6BA46225AF",
      abi: lazyNftAbi,
    },
  },
};
