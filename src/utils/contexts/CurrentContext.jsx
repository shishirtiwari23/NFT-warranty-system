import { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const API_URL_PATH = "https://nft-warranty-system-server.herokuapp.com/api/";

const CurrentContext = createContext({});

export const CurrentContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  async function connectToMetamask() {
    try {
      const user = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }
  async function getUsers() {
    const raw = await fetch(
      API_URL_PATH +
        "parent-clients/0xbEc53EBdf7833B9fdfd87472f2jggj87d578d2sdf3e87"
    );
    const json = await raw.json();
    setUser(json);
  }

  useEffect(() => {
    connectToMetamask();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <CurrentContext.Provider value={{ connectToMetamask }}>
      {children}
    </CurrentContext.Provider>
  );
};
export default CurrentContext;
