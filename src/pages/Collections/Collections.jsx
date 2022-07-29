import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CollectionCard, Loading } from "../../components";
import { MainLayout } from "../../Layouts";
import { CurrentContext } from "../../utils";
import { getUserCollections } from "../../utils/constants";
import styles from "./Collections.module.scss";

const Collections = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { walletAddress } = useContext(CurrentContext);

  async function getUserCollectionsHandler() {
    if (!walletAddress) setCollections([]);
    else {
      const res = await getUserCollections(walletAddress);
      if (res?.data?.resData) setCollections(res.data.resData);
    }
    setIsPageLoading(false);
  }

  useEffect(() => {
    getUserCollectionsHandler();
  }, [walletAddress]);

  useEffect(() => {
    console.log(collections);
  });
  if (isPageLoading) return <Loading />;
  return (
    <div className={styles.container}>
      {collections?.map((collection, index) => {
        return (
          <CollectionCard
            collection={collection}
            key={index}
            onClick={() =>
              navigate("/collections/" + collection?.walletAddress)
            }
          />
        );
      })}
    </div>
  );
};

export default Collections;
