import styles from "./NFTCollection.module.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../../../../utils";
import {
  getAllContractAddresses,
  getAllUserTokensByClientId,
} from "../../../../utils/constants/functions";
import { Loading, NFTCard } from "../../../../components";

const NFTCollection = () => {
  const [collection, setCollection] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { walletAddress } = useContext(CurrentContext);
  const { parentWalletAddress } = useParams();

  async function fetchNFTs() {
    if (!walletAddress) setCollection([]);
    else {
      const res1 = await getAllUserTokensByClientId({
        walletAddress,
        parentWalletAddress,
      });

      if (res1?.data?.resData) setCollection(res1.data.resData);
    }
    //Here use the URI for every token to fetch nft
    //And then map that nft
    setIsPageLoading(false);
  }

  useEffect(() => {
    fetchNFTs();
  }, [parentWalletAddress]);

  if (isPageLoading) return <Loading />;
  return (
    <div>
      {collection?.map((nft, index) => {
        return <NFTCard key={index} />;
      })}
    </div>
  );
};

export default NFTCollection;
