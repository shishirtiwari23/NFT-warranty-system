import styles from "./Cards.module.scss";
import { icons } from "../../assets";
import { Button } from "../";

const { verifiedIcon } = icons;

export const NFTCard = ({ NFT, ...remaining }) => {
  const { date, id, name, warrantyDuration } = NFT;
  return (
    <div {...remaining} className={styles.NFTCard}>
      <p className={styles.id}>
        <span>{id}</span>
      </p>
      <p className={styles.name}>
        <span>{name}</span>
      </p>
      <p className={styles.mintedOn}>
        Minted on <span>{date}</span>{" "}
      </p>
      <p className={styles.expiresIn}>
        Expires in <span>{warrantyDuration} Seconds</span>
      </p>
      <div className={styles.buttons}>
        <Button>Raise An Issue</Button>
        <Button variant="secondary">Transfer OwnerShip</Button>
      </div>
    </div>
  );
};

export const CollectionCard = ({ collection, ...remaining }) => {
  const { name, id, profileImage, coverImage } = collection;
  return (
    <div {...remaining} className={styles.collectionCard}>
      <div className={styles.coverImage}>
        <img src="" alt="" />
      </div>
      <div className={styles.info}>
        <div className={styles.profileImage}>
          <img src="" alt="" />
        </div>
        <p className={styles.organization}>
          {name || "Organization Name"}
          <img src={verifiedIcon} alt="Verified" />
        </p>
      </div>
    </div>
  );
};
