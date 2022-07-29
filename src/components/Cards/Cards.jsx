import styles from "./Cards.module.scss";
import { icons } from "../../assets";
import { Button } from "../";
import { TextInputField } from "../";
import { useState } from "react";

const { verifiedIcon } = icons;

export const NFTCard = ({ NFT, ...remaining }) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [receiversWalletAddress, setReceiversWalletAddress] = useState("");

  async function transferHandler(e) {
    e.preventDefault();
    setIsTransferModalOpen(true);
  }

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
        <Button onClick={transferHandler} variant="secondary">
          Transfer OwnerShip
        </Button>
      </div>
      {isTransferModalOpen && (
        <TransferModal
          receiversWalletAddress={receiversWalletAddress}
          setIsTransferModalOpen={setIsTransferModalOpen}
          setReceiversWalletAddress={setReceiversWalletAddress}
          transferHandler={transferHandler}
        />
      )}
    </div>
  );
};

export const TransferModal = ({
  receiversWalletAddress,
  setReceiversWalletAddress,
  transferHandler,
  setIsTransferModalOpen,
}) => {
  return (
    <form onSubmit={transferHandler} className={styles.transferModalContainer}>
      <div className={styles.modal}>
        <TextInputField
          placeholder="0x00000000000000000000000000000"
          value={receiversWalletAddress}
          onChange={(e) => setReceiversWalletAddress(e.target.value)}
          label={"Receiver's Wallet Address"}
        />
        <div className={styles.buttons}>
          <Button>Transfer</Button>
          <Button
            onClick={() => setIsTransferModalOpen(false)}
            style={{ background: "red", border: "2px solid red" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
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
