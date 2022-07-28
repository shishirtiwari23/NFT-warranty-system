import { ethers } from "ethers";
import { api } from "../contexts/CurrentContext";
import Web3 from "web3";
import { CollectionFactory_abi } from "./contractABI/CollectionFactory";
import { Collection_abi } from "./contractABI/Collection";
const axios = require("axios");

const web3 = new Web3(detectProvider());

const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

// export async function getWalletBalance(walletAddress) {
//   // const Web3js me banana hai abhi
// }

export async function getWalletBalance(walletAddress) {
  try {
    if (!walletAddress) return "";
    const nonStringBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [walletAddress?.toString(), "latest"],
    });
    const balance = ethers.utils.formatEther(nonStringBalance);
    console.log(balance);
    return balance;
  } catch (error) {
    // console.log(error);
  }
}

export async function getWalletAddress(provider) {
  try {
    const w3 = new Web3(detectProvider());
    const accounts = await w3.eth.getAccounts();
    if (accounts?.length === 0) {
      console.error(
        "No wallet detected,this likely happens when the metamask account is locked"
      );
    } else {
      return accounts[0];
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function getWalletAddress(){
// try {
//   const accounts = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });
//   return accounts[0];
// } catch (error) {
//   console.log(error);
// }
// }

export function detectProvider() {
  let provider;
  if (window.ethereum) {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else {
    console.warn("No ethereum browser detected, Install Metamask");
  }
  return provider;
}

export function onValuesChange(e, setValues, type) {
  if (type === "file") {
    const { id, files } = e.target;
    setValues((prev) => {
      return { ...prev, [id]: URL.createObjectURL(files[0]) };
    });
  }
  const { id, value, name } = e.target;
  // console.log(id, value, name);
  setValues((prev) => {
    return {
      ...prev,
      [name ? name : id]: value,
    };
  });
}

//API Calls --------------------------------------------------------------------------------------->

export async function addUser(walletAddress) {
  if (!walletAddress) return; // To not send empty string
  const res = await api.post("/add-user", {
    walletAddress,
  });
  return res;
}

export async function addParentClient(req) {
  if (!req) return;
  const { walletAddress, contractAddress, name } = req;
  if (!walletAddress || !contractAddress || !name) return;
  const res = await api.post("/add-parent-client", req);
  return res;
}

export async function addChildClient(req) {
  if (!req) return;
  const { walletAddress, child } = req;
  if (!walletAddress || !child) return;
  const { contractAddress, id, walletAddress: childWalletAddress } = child;
  if (!contractAddress || !id || !childWalletAddress) return;
  const res = await api.post("/add-child-client", req);
  return res;
}

export async function getParentClient(walletAddress) {
  if (!walletAddress) return;
  const res = await api.get("/parent-clients/" + walletAddress);
  return res;
}

export async function addToken(req) {
  if (!req) return;
  const { id, URI, walletAddress, contractAddress } = req;
  if (!id || !URI || !walletAddress || !contractAddress) return;
  const res = await api.post("/add-token", req);
  return res;
}

export async function regenerateAPIToken(walletAddress) {
  if (!walletAddress) return;
  console.log("jhfjkd");
  const res = await api.post("/parent-client/regenerate-api-token", {
    walletAddress,
  });
  console.log(res);
  return res;
}

//-------------------------------Web3 Functions
const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export async function mintNFT({
  walletAddress,
  receiverWalletAddress,
  product,
  contractAddress,
}) {
  console.log({
    walletAddress,
    receiverWalletAddress,
    product,
    contractAddress,
  });
  if (!walletAddress || !receiverWalletAddress || !product || !contractAddress)
    return;
  const { name, id, mintedOn, warrantyDuration } = product;
  if (!name || !id || !mintedOn || !warrantyDuration) return;

  //Do your thing
  //make metadata
  const metadata = new Object();
  metadata.id = id;
  metadata.name = name;
  metadata.date = mintedOn;
  metadata.warrantyDuration = warrantyDuration;

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata);
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    };
  }
  const tokenURI = pinataResponse.pinataUrl;

  const contractCollection = await new web3.eth.Contract(
    Collection_abi,
    contractAddress
  );

  const receipt = await contractCollection.methods
    .safeMint(receiverWalletAddress, tokenURI, warrantyDuration)
    .send({ from: walletAddress });
  console.log(receipt);
  console.log("NFT Minted!!");

  const event = receipt.events.Transfer.returnValues;

  return {
    status: 1,
    id: event.tokenId, //Token Id
    URI: tokenURI,
  };
}

// export async function mintNFT({ walletAddress, contractAddress }) {
//   return {
//     status: 1,
//     id: "id", //Token Id
//     URI: "URI",
//   };
// }

export async function burnNFT({ contractAddress, id }) {
  //Here id is token id
}

export async function issueComplaint({ id, description, contractAddress }) {
  //Here id is token id
  return {
    status: 1,
    complaintId: "id",
  };
}

export async function updateComplaint({
  status,
  complaintId,
  contractAddress,
}) {
  return {
    status: 1,
  };
}

export async function transferNFT({
  contractAddress,
  tokenId,
  receiverWalletAddress,
}) {
  return {
    status: 1,
  };
}

export async function viewWarranty({ tokenId, contractAddress }) {
  return {
    status: 1,
    timeLeft: 3223, //Time in seconds
  };
}

export async function viewComplaintStatus({ comaplaintId, contractAddress }) {
  return {
    status: 0,
    description: "",
  };
}

export async function createSmartContractInstance(name, symbol) {
  const contractCreateCollection = new web3.eth.Contract(
    CollectionFactory_abi,
    "0x69f165ccb0651285b39411230d6e686e7616dbdf"
  );
  const accounts = await web3.eth.getAccounts();
  const tx = await contractCreateCollection.methods
    .createCollection(name, symbol)
    .send({ from: accounts[0] });
  console.log("Collection Created!!");
  const eventEmitted = tx.events.CollectionCreated.returnValues;
  const res = {
    status: 1,
    collectionAddress: eventEmitted.collectionAddress,
    collectionId: eventEmitted.collectionId,
  };
  return res;
}
