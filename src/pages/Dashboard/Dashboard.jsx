import styles from "./Dashboard.module.scss";
import { MainLayout } from "../../Layouts";
import { useContext, useState } from "react";
import { TextInputField, Button } from "../../components";
import { addToken, mintNFT, onValuesChange } from "../../utils/constants";
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
  });

  async function submitHandler(e) {
    e.preventDefault();
    // const res = await mintNFT({
    //   product: product,
    //   walletAddress: parentClient.walletAddress,
    //   receiverWalletAddress,
    //   contractAddress: parentClient.contractAddress, //For now only parent can create nft
    // });
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
