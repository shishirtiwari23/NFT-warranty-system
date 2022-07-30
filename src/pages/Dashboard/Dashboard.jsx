import styles from "./Dashboard.module.scss";
import { MainLayout } from "../../Layouts";
import { useContext, useEffect, useState } from "react";
import { TextInputField, Button } from "../../components";
import {
  addToken,
  mintNFT,
  onValuesChange,
  getContractAddress,
} from "../../utils/constants";
import { CurrentContext } from "../../utils";

const Dashboard = () => {
  const { parentClient, walletAddress } = useContext(CurrentContext);
  const [receiverWalletAddress, setReceiverWalletAddress] = useState("");
  const [product, setProduct] = useState({
    name: "",
    id: "",
    warrantyDuration: "",
    mintedOn: "28 July",
    APIToken: "",
  });
  useEffect(() => {
    console.log(parentClient);
  });
  async function submitHandler(e) {
    e.preventDefault();
    let contractAddress = "";
    const res1 = await getContractAddress(walletAddress);
    if (res1?.data?.resData) contractAddress = res1.data.resData;
    const res2 = await mintNFT({
      product: product,
      walletAddress,
      receiverWalletAddress,
      contractAddress, //For now only parent can create nft
    });
    if (!res2) return;
    const { id, URI } = res2;
    const res3 = await addToken({
      id,
      URI,
      walletAddress: receiverWalletAddress,
      contractAddress,
      APIToken: parentClient?.APIToken,
    });
    console.log(res3);
    // console.log(res2);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} action="">
        <div className={styles.header}>
          <h2>Mint NFT</h2>
        </div>
        <div className={styles.inputs}>
          <TextInputField
            id="id"
            required
            label="Product Serial No"
            value={product?.id}
            onChange={(e) => onValuesChange(e, setProduct)}
          />
          <TextInputField
            required
            id="name"
            label="Product Name"
            value={product?.name}
            onChange={(e) => onValuesChange(e, setProduct)}
          />
          <TextInputField
            required
            id="warrantyDuration"
            label="Warranty Duration"
            value={product?.warrantyDuration}
            onChange={(e) => onValuesChange(e, setProduct)}
          />
          {/* <TextInputField
          required
          id="SCID"
          label="Sub Client Id"
          value={product?.SCID}
          onChange={(e) => onValuesChange(e, setProduct)}
        /> */}
          <TextInputField
            required
            id="receiverWalletAddress"
            label="Receiver Wallet Address"
            value={receiverWalletAddress}
            onChange={(e) => setReceiverWalletAddress(e.target.value)}
          />
          <Button type="submit">Mint</Button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
