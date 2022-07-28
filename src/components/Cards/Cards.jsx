import styles from "./Cards.module.scss";
import { icons } from "../../assets";

const { verifiedIcon } = icons;

export const NFTCard = () => {
  return (
    <div className={styles.NFTCard}>
      <p className={styles.id}>
        <span>Product Serial No :#AMKD234KJ97S</span>
      </p>
      <p className={styles.id}>
        <span>Product Name</span>
      </p>
      <p className={styles.mindtedOn}>
        Minted on: <span>11/07/2022</span>{" "}
      </p>
      <p className={styles.expiresIn}>
        Expires in : <span>17 days</span>
      </p>
    </div>
  );
};

export const CollectionCard = () => {
  return (
    <div className={styles.collectionCard}>
      <div className={styles.coverImage}>
        <img src="" alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.profileImage}>
          <img src="" alt="" />
        </div>
        <p className={styles.organization}>
          Flipkart <img src={verifiedIcon} alt="Verified" />
        </p>
      </div>
    </div>
  );
};
