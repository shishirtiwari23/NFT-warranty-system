import { useContext, useEffect, useState } from "react";
import { Button, TextInputField } from "../../../../components";
import { CurrentContext } from "../../../../utils";
import { updateComplaint, updateStatusInDB } from "../../../../utils/constants";
import styles from "./Reports.module.scss";

const Reports = () => {
  const [issues, setIssues] = useState([]);
  const { parentClient } = useContext(CurrentContext);

  async function updateIssues() {
    setIssues(parentClient?.issues);
  }
  useEffect(() => {
    updateIssues();
  }, [parentClient]);

  return (
    <div className={styles.container}>
      <h3>Issues</h3>
      {issues?.map((issue) => {
        return <Issue issue={issue} />;
      })}
    </div>
  );
};

const Issue = ({ issue }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState();
  return (
    <div className={styles.issue}>
      <p>
        CompaintId: <span>{issue?.complaintId}</span>
      </p>
      <p>
        Wallet Address: <span>{issue?.walletAddress}</span>
      </p>
      <p>
        Description: <span>{issue?.description}</span>
      </p>
      <p>
        Token Id: <span>{issue?.tokenId}</span>
      </p>
      <Button onClick={() => setIsUpdateModalOpen(true)}>Update Issue</Button>
      {isUpdateModalOpen && (
        <UpdateStatus
          setIsUpdateModalOpen={setIsUpdateModalOpen}
          issue={issue}
        />
      )}
    </div>
  );
};

const UpdateStatus = ({ issue, setIsUpdateModalOpen }) => {
  const [newStatus, setNewStatus] = useState("");
  const { walletAddress } = useContext(CurrentContext);
  async function submitHandler(e) {
    e.preventDefault();
    const res1 = await updateComplaint({
      newStatus,
      complaintId: issue.complaintId,
      contractAddress: issue.contractAddress,
    });
    console.log(res1);
    if (res1?.status === 1) {
      const res2 = await updateStatusInDB({
        walletAddress: issue.walletAddress,
        parentWalletAddress: walletAddress,
        complaintId: issue.complaintId,
        newStatus,
      });
      console.log(res2);
    }
  }
  return (
    <form onSubmit={submitHandler} className={styles.modalContainer}>
      <div className={styles.modal}>
        <TextInputField
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
        <Button type="submit">Update</Button>
        <Button
          style={{ background: "red", border: "2px solid red" }}
          onClick={() => setIsUpdateModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default Reports;
