import { useContext, useEffect, useState } from "react";
import { Button, TextInputField, InputSelect } from "../../../../components";
import { CurrentContext } from "../../../../utils";
import {
  onValuesChange,
  statusOptions,
  updateComplaint,
  updateStatusInDB,
} from "../../../../utils/constants";
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
      <h2>Issues</h2>
      <div className={styles.issues}>
        {issues?.map((issue, index) => {
          return <Issue issue={issue} key={index} />;
        })}
      </div>
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
      <div className={styles.buttons}>
        <Button onClick={() => setIsUpdateModalOpen(true)}>Update Issue</Button>
      </div>
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
  const [newStatus, setNewStatus] = useState(issue?.status);
  const { walletAddress } = useContext(CurrentContext);
  useEffect(() => {
    console.log(issue);
  });
  async function submitHandler(e) {
    e.preventDefault();
    setIsUpdateModalOpen(false);
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
        <div className={styles.select}>
          <InputSelect
            required
            value={newStatus}
            label={"New Status"}
            options={statusOptions}
            name={"newStatus"}
            onChange={(e) => {
              setNewStatus(e.target.value);
            }}
          />
        </div>
        <div className={styles.buttons}>
          <Button type="submit">Update</Button>
          <Button
            style={{ background: "red", border: "2px solid red" }}
            onClick={() => setIsUpdateModalOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Reports;
