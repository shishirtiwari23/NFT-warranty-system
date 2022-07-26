import styles from "./API.module.scss";
import { useContext, useState } from "react";
import { CurrentContext } from "../../utils";
import {
  addParentClient,
  addToken,
  addChildClient,
} from "../../utils/constants/functions";

const API = () => {
  const { walletAddress } = useContext(CurrentContext);
  const [childId, setChildId] = useState("");
  const [res, setRes] = useState(null);

  async function createSmartContractInstance() {
    //-------------------------------PARVA
    return "contractAddress";
  }

  async function handleAddChildClient() {
    await createSmartContractInstance(); //-------------------------------PARVA
    const response = await addChildClient({
      walletAddress,
      child: {
        contractAddress: await createSmartContractInstance(),
        id: childId,
        walletAddress: "walletAddress",
      },
    });
    console.log(response.data);
  }

  async function handleAddParentClient() {
    await createSmartContractInstance(); //-------------------------------PARVA
    const response = await addParentClient({
      walletAddress,
      contractAddress: await createSmartContractInstance(), //-------------------------------PARVA
    });
    // console.log(walletAddress, contractAddress);
    setRes(response?.data?.resData);
  }
  async function handleAddToken() {
    const res = await addToken({
      id: childId,
      URI: "https://www.google.com",
      walletAddress,
      contractAddress: await createSmartContractInstance(),
    }); //-------------------------------PARVA
    console.log(res);
  }
  return (
    <div className={styles.container}>
      <h1>API</h1>
      <h4>Create your first API</h4>
      <button onClick={handleAddParentClient}>Create</button>
      {res && (
        <>
          <p>API KEY : {res}</p>
        </>
      )}
      <>
        <input
          type="text"
          value={childId}
          onChange={(e) => setChildId(e.target.value)}
        />
        <button onClick={handleAddChildClient}>Add Child Client</button>
      </>
      <button onClick={handleAddToken}>add token</button>
    </div>
  );
};

export default API;
