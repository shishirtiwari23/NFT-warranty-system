import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NFTCard, CollectionCard } from "../../components";
import { MainLayout } from "../../Layouts";
import { CurrentContext } from "../../utils";
import styles from "./Collections.module.scss";

const Collections = () => {
  const navigate = useNavigate();
  const { walletAddress } = useContext(CurrentContext);
  const parentClientWalletAddress =
    "0x38009e3f71B52569B064d225f984247c378FCE96";
  return (
    <div className={styles.container}>
      <CollectionCard
        onClick={() => navigate("/collections/" + parentClientWalletAddress)}
      />
      <NFTCard />
    </div>
  );
};

export default Collections;
