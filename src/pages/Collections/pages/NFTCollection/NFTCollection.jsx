import styles from "./NFTCollection.module.scss";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../../../../utils";
import {
  getAllContractAddresses,
  getAllUserTokensByClientId,
  fetchDataFromURI,
} from "../../../../utils/constants/functions";
import { Loading, NFTCard } from "../../../../components";

const NFTCollection = () => {
  const [collection, setCollection] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { walletAddress } = useContext(CurrentContext);
  const { parentWalletAddress } = useParams();
  const [NFTData, setNFTData] = useState([]);

  async function fetchCollection() {
    if (!walletAddress) setCollection([]);
    else {
      const res1 = await getAllUserTokensByClientId({
        walletAddress,
        parentWalletAddress,
      });

      if (res1?.data?.resData) setCollection(res1.data.resData);
    }
  }

  async function fetchNFTs() {
    const res2 = await fetchDataFromURI(collection);
    if (res2) {
      setNFTData(res2);
      setIsPageLoading(false);
    }
  }

  useEffect(() => {
    fetchCollection();
  }, [parentWalletAddress, walletAddress]);

  useEffect(() => {
    fetchNFTs();
  }, [collection, walletAddress]);

  useEffect(() => {
    console.log(collection, walletAddress);
  });

  if (isPageLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {NFTData?.map((NFT, index) => {
          return (
            <NFTCard
              clientWalletAddress={parentWalletAddress}
              URI={collection[index]?.URI}
              tokenId={collection[index]?.id}
              contractAddress={collection[index]?.contractAddress}
              issue={collection[index]?.issue}
              NFT={NFT}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NFTCollection;
