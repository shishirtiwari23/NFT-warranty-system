import styles from "./Cards.module.scss";
import { icons } from "../../assets";
import { Button } from "../";

const { verifiedIcon } = icons;

export const NFTCard = ({ id, name, mintedOn, expiresIn }) => {
  return (
    <div className={styles.NFTCard}>
      <p className={styles.id}>
        <span>#AMKD234KJ97S</span>
      </p>
      <p className={styles.name}>
        <span>Macbook Air M1, Spacegrey 8gb, 256gb</span>
      </p>
      <p className={styles.SCID}>
        <span>SCID :#9JJDB234KJ97S</span>
      </p>
      <p className={styles.mintedOn}>
        Minted on <span>11/07/2022</span>{" "}
      </p>
      <p className={styles.expiresIn}>
        Expires in <span>17 days</span>
      </p>
      <div className={styles.buttons}>
        <Button>Raise An Issue</Button>
        <Button variant="secondary">Transfer OwnerShip</Button>
      </div>
    </div>
  );
};

export const CollectionCard = ({ name, id, profileImage, coverImage }) => {
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
