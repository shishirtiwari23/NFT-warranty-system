import styles from "./Cards.module.scss";
import { icons } from "../../assets";
import { Button } from "../";
import { TextInputField } from "../";
import { useContext, useEffect, useState } from "react";
import {
  transferNFT,
  issueComplaint,
  transferOwnershipInDB,
  issueComplaintInDB,
  viewWarranty,
  viewComplaintStatus,
  statusOptions,
} from "../../utils/constants";
import { CurrentContext } from "../../utils";

const { verifiedIcon, close } = icons;

export const NFTCard = ({
  NFT,
  tokenId,
  URI,
  clientWalletAddress,
  contractAddress,
  issue,
  ...remaining
}) => {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isViewStatusModalOpen, setIsViewStatusModalOpen] = useState(false);
  const { walletAddress } = useContext(CurrentContext);
  const [complaintStatus, setComplaintStatus] = useState("");

  const [warrantyDuration, setWarrantyDuration] = useState(0);
  const { date, id, name } = NFT;

  function transferHandler() {
    setIsTransferModalOpen(true);
  }
  async function viewStatusHandler() {
    setIsViewStatusModalOpen(true);
    const res = await viewComplaintStatus({
      complaintId: issue?.complaintId,
      contractAddress,
    });
    if (res?.complaintStatus) setComplaintStatus(res?.complaintStatus);
  }
  function issueHandler() {
    setIsIssueModalOpen(true);
  }
  useEffect(() => {
    checkWarrantyDuration();
  });
  async function checkWarrantyDuration() {
    const res = await viewWarranty({ tokenId, contractAddress });
    if (res?.timeLeft) setWarrantyDuration(res.timeLeft);
  }
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
        {issue ? (
          <Button
            style={{ background: "green", border: "2px solid green" }}
            onClick={viewStatusHandler}
          >
            View Complaint Status
          </Button>
        ) : (
          <Button onClick={issueHandler}>Raise An Issue</Button>
        )}
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
          parentWalletAddress={clientWalletAddress}
          walletAddress={walletAddress}
        />
      )}
      {isViewStatusModalOpen && (
        <ViewStatusModal
          setIsViewStatusModalOpen={setIsViewStatusModalOpen}
          complaintStatus={complaintStatus}
          complaintId={issue?.complaintId}
        />
      )}
    </div>
  );
};

const ViewStatusModal = ({
  setIsViewStatusModalOpen,
  complaintStatus,
  complaintId,
}) => {
  const statusMap = statusOptions.map((item) => item.name);
  useEffect(() => {
    console.log(parseInt(complaintStatus.complaintStatus));
  });
  return (
    <div className={styles.viewStatusModalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Complaint Status</h2>
          <div
            onClick={() => setIsViewStatusModalOpen(false)}
            className={styles.image}
          >
            <img src={close} alt="Close" />
          </div>
        </div>
        <p>
          Complaint Id: <span>{complaintId}</span>{" "}
        </p>
        <p>
          Complaint Status:{" "}
          <span>{statusMap[parseInt(complaintStatus.complaintStatus)]}</span>
        </p>
      </div>
    </div>
  );
};

const IssueModal = ({
  id,
  contractAddress,
  setIsIssueModalOpen,
  walletAddress,
  parentWalletAddress,
}) => {
  const [description, setDescription] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setIsIssueModalOpen(false);
    const res1 = await issueComplaint({
      contractAddress,
      id,
      description,
    });

    const { complaintId } = res1;
    console.log(res1);
    if (res1?.complaintId) {
      const res2 = await issueComplaintInDB({
        description,
        tokenId: id,
        walletAddress,
        parentWalletAddress,
        complaintId,
        contractAddress,
      });
      console.log(res2);
    }
  }

  return (
    <form onSubmit={submitHandler} className={styles.issueModalContainer}>
      <div className={styles.modal}>
        <TextInputField
          required
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
    setIsTransferModalOpen(false);
    e.preventDefault();
    const res = await transferNFT({
      contractAddress,
      id,
      receiverWalletAddress,
    });
    let res2;
    if (res?.status == 1) {
      res2 = await transferOwnershipInDB({
        receiverWalletAddress,
        clientWalletAddress,
        URI,
        id,
        contractAddress,
        senderWalletAddress,
      });
    }
    console.log(res2);
  }
  return (
    <form onSubmit={submitHandler} className={styles.transferModalContainer}>
      <div className={styles.modal}>
        <TextInputField
          required
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
      {/* <div className={styles.coverImage}>
        <img src="" alt="" />
      </div> */}
      <div className={styles.info}>
        <div className={styles.profileImage}>{/* <img src="" alt="" /> */}</div>
        <p className={styles.organization}>
          {name || "Organization Name"}
          <img src={verifiedIcon} alt="Verified" />
        </p>
      </div>
    </div>
  );
};
