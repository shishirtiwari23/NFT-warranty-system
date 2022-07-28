import styles from "./Dashboard.module.scss";
import { MainLayout } from "../../Layouts";
import { useContext, useState } from "react";
import { TextInputField, Button } from "../../components";
import { mintNFT, onValuesChange } from "../../utils/constants";
import { CurrentContext } from "../../utils";

const Dashboard = () => {
  const { parentClient } = useContext(CurrentContext);
  const [receiverWalletAddress, setReceiverWalletAddress] = useState("");
  const [product, setProduct] = useState({
    name: "",
    id: "",
    mintedOn: "",
    warrantyDuration: "",
    SCID: "",
    mintedOn: "28 July",
  });

  async function submitHandler(e) {
    e.preventDefault();
    const res = await mintNFT({
      product: product,
      walletAddress: "0xf3F0e684564878b90c35d803A5103cFAB7eE0D35",
      receiverWalletAddress,
      contractAddress: "0xe911f9F65866558a00412A925dabc8Bac0a867dE", //For now only parent can create nft
    });
    console.log(res);
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
