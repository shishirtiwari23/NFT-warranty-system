import styles from "./NFTCollection.module.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CurrentContext } from "../../../../utils";
import {
  getAllContractAddresses,
  getAllUserTokensByClientId,
} from "../../../../utils/constants/functions";

const NFTCollection = () => {
  const { walletAddress } = useContext(CurrentContext);
  const { parentWalletAddress } = useParams();

  async function fetchNFTs() {
    const res = await getAllContractAddresses(parentWalletAddress);
    // const res2=await getAllUserTokensByClientId({
    //     getAllContractAddresses
    // })
    const allContractAddresses = res?.data?.resData;
    const res2 = await getAllUserTokensByClientId({
      walletAddress,
      allContractAddresses,
    });
    console.log(res2);
  }

  useEffect(() => {
    fetchNFTs();
  }, [parentWalletAddress]);

  return <div>NFTCollection</div>;
};

export default NFTCollection;
