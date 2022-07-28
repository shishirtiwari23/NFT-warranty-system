import styles from "./Dashboard.module.scss";
import { MainLayout } from "../../Layouts";
import { useContext, useState } from "react";
import { TextInputField, Button } from "../../components";
import { addToken, mintNFT, onValuesChange } from "../../utils/constants";
import { CurrentContext } from "../../utils";

const Dashboard = () => {
  const { parentClient, walletAddress } = useContext(CurrentContext);
  const [receiverWalletAddress, setReceiverWalletAddress] = useState("");
  const [product, setProduct] = useState({
    name: "",
    id: "",
    warrantyDuration: "",
    SCID: "",
    mintedOn: "28 July",
  });

  async function submitHandler(e) {
    e.preventDefault();
    const res = await mintNFT({
      product: product,
      walletAddress: "0x38009e3f71B52569B064d225f984247c378FCE96",
      receiverWalletAddress,
      contractAddress: "0xd8d289F62C800352D5868f666aD8c8f65dae95EC", //For now only parent can create nft
    });
    console.log(res);
    const res2 = await addToken({
      id: "Token Id2fdmksfdsdskddssssssdddss",
      URI: "URI",
      walletAddress: receiverWalletAddress,
      contractAddress: "ContractAddress",
    });
    console.log(res2);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} action="">
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
        <TextInputField
          required
          id="SCID"
          label="Sub Client Id"
          value={product?.SCID}
          onChange={(e) => onValuesChange(e, setProduct)}
        />
        <TextInputField
          required
          id="receiverWalletAddress"
          label="Receiver Wallet Address"
          value={receiverWalletAddress}
          onChange={(e) => setReceiverWalletAddress(e.target.value)}
        />
        <Button type="submit">Mint</Button>
      </form>
    </div>
  );
};

export default Dashboard;
