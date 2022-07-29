import styles from "./Cards.module.scss";
import { icons } from "../../assets";
import { Button } from "../";
import { TextInputField } from "../";
import { useContext, useEffect, useState } from "react";
import {
  transferNFT,
  issueComplaint,
  transferOwnershipInDB,
} from "../../utils/constants";
import { CurrentContext } from "../../utils";

const { verifiedIcon } = icons;

export const NFTCard = ({
  NFT,
  tokenId,
  URI,
  clientWalletAddress,
  contractAddress,
  ...remaining
}) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const { walletAddress } = useContext(CurrentContext);
  const { date, id, name, warrantyDuration } = NFT;

  async function transferHandler(e) {
    e.preventDefault();
    setIsTransferModalOpen(true);
  }
  async function issueHandler(e) {
    e.preventDefault();
    setIsIssueModalOpen(true);
  }
  // useEffect(() => {
  //   console.log();
  // });

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
        <Button onClick={issueHandler}>Raise An Issue</Button>
        <Button onClick={transferHandler} variant="secondary">
          Transfer OwnerShip
        </Button>
      </div>
      {isTransferModalOpen && (
        <TransferModal
          setIsTransferModalOpen={setIsTransferModalOpen}
          transferHandler={transferHandler}
          id={tokenId}
          clientWalletAddress={clientWalletAddress}
          senderWalletAddress={walletAddress}
          URI={URI}
          contractAddress={contractAddress}
        />
      )}
      {isIssueModalOpen && (
        <IssueModal
          setIsIssueModalOpen={setIsIssueModalOpen}
          issueHandler={issueHandler}
          id={tokenId}
          contractAddress={contractAddress}
        />
      )}
    </div>
  );
};

export const IssueModal = ({ id, contractAddress, setIsIssueModalOpen }) => {
  const [description, setDescription] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    const res = await issueComplaint({
      contractAddress,
      id,
      description,
    });
    console.log(res);
  }
  return (
    <form onSubmit={submitHandler} className={styles.issueModalContainer}>
      <div className={styles.modal}>
        <TextInputField
          variant="large"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label={"Describe the issue"}
        />
        <div className={styles.buttons}>
          <Button type="submit">Send</Button>
          <Button
            onClick={() => setIsIssueModalOpen(false)}
            style={{ background: "red", border: "2px solid red" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export const TransferModal = ({
  id,
  contractAddress,
  setIsTransferModalOpen,
  URI,
  senderWalletAddress,
  clientWalletAddress,
}) => {
  const [receiverWalletAddress, setReceiverWalletAddress] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    const res = await transferNFT({
      contractAddress,
      id,
      receiverWalletAddress,
    });
    const res2 = await transferOwnershipInDB({
      receiverWalletAddress,
      clientWalletAddress,
      URI,
      id,
      contractAddress,
      senderWalletAddress,
    });
    console.log(res2);
  }
  return (
    <form onSubmit={submitHandler} className={styles.transferModalContainer}>
      <div className={styles.modal}>
        <TextInputField
          placeholder="0x00000000000000000000000000000"
          value={receiverWalletAddress}
          onChange={(e) => setReceiverWalletAddress(e.target.value)}
          label={"Receiver's Wallet Address"}
        />
        <div className={styles.buttons}>
          <Button type="submit">Transfer</Button>
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
