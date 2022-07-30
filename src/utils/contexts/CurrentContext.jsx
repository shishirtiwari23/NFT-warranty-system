import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { detectProvider, getWalletAddress, addUser } from "../constants";

export const HOST_URL = "https://nft-warranty-system-server.herokuapp.com";

export const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const apiForURI = axios.create({
  baseURL: "https://gateway.pinata.cloud/ipfs/",
});

const CurrentContext = createContext({});

export const CurrentContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [parentClient, setParentClient] = useState(null);
  const [windowDetails, setWindowDetails] = useState({
    provider: window.ethereum,
    isMetamaskInstalled: false,
  });
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    console.log(walletAddress, parentClient);
  });
  useEffect(() => {
    const newProvider = detectProvider();
    setWindowDetails((prev) => {
      return { ...prev, provider: newProvider };
    });
  }, []);

  useEffect(() => {
    if (windowDetails.provider) {
      if (windowDetails.provider !== window.ethereum) {
        window.alert(
          "Provider is not window.ethereum, this likely happened beacause of multiple wallet extensions"
        );
      } else
        setWindowDetails((prev) => {
          return { ...prev, isMetamaskInstalled: true };
        });
    }
  }, [windowDetails.provider]);

  return (
    <CurrentContext.Provider
      value={{
        walletAddress,
        HOST_URL,
        parentClient,
        setParentClient,
        setWalletAddress,
        api,
        windowDetails,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </CurrentContext.Provider>
  );
};
export default CurrentContext;
