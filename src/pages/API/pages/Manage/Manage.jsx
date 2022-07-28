import { Button, Loading, TextInputField } from "../../../../components";
import styles from "./Manage.module.scss";
import { icons } from "../../../../assets/";
import {
  addParentClient,
  getParentClient,
  createSmartContractInstance,
  regenerateAPIToken,
  onValuesChange,
  addChildClient,
} from "../../../../utils/constants/functions";
import { useState, useContext, useEffect } from "react";
import { CurrentContext } from "../../../../utils";

const { CopyIcon } = icons;
const Manage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const { walletAddress, parentClient, setParentClient } =
    useContext(CurrentContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [childClientValues, setChildClientValues] = useState({
    id: "",
    walletAddress: "",
  });

  async function checking() {
    const res = await createSmartContractInstance("Demo COllecection", "DC");
    console.log(res);
  }

  function onChildValuesChange(e) {
    onValuesChange(e, setChildClientValues);
  }
  async function generateHandler() {
    setIsPageLoading(true);

    const res = await addParentClient({
      name: "Flipkart",
      walletAddress,
      contractAddress: "0x69f165ccb0651285b39411230d6e686e7616dbdf",
    });
    if (res?.data?.resData) {
      setParentClient(res.data.resData);
    } else window.alert("Unable to generate API Token");
    setIsPageLoading(false);
  }
  async function onRouteLoad() {
    setIsPageLoading(true);
    const res = await getParentClient(walletAddress);
    if (res?.data?.resData) {
      setParentClient(res.data.resData);
    }
    setIsPageLoading(false);
  }

  async function regenerateHandler() {
    setIsComponentLoading(true);
    const res = await regenerateAPIToken(walletAddress);
    if (res?.data?.resData) {
      setParentClient(res.data.resData);
    }
    setIsComponentLoading(false);
  }

  async function childFormSubmitHandler(e) {
    setIsComponentLoading(true);
    e.preventDefault();
    const { collectionAddress } = await createSmartContractInstance(
      "Demo COllecection",
      "DC"
    );
    console.log(collectionAddress);
    const res = await addChildClient({
      walletAddress,
      child: {
        id: childClientValues?.id,
        walletAddress: childClientValues?.walletAddress,
        contractAddress: collectionAddress,
      },
    });
    setIsComponentLoading(false);
  }

  useEffect(() => {
    onRouteLoad();
  }, [walletAddress]);

  if (isPageLoading) return <Loading />;
  // if (isModalOpen)
  //   return (
  //     <AddParentClientModal
  //       setIsModalOpen={setIsModalOpen}
  //       isPageLoading={isPageLoading}
  //       setIsPageLoading={setIsPageLoading}
  //       setParentClient={setParentClient}
  //       walletAddress={walletAddress}
  //     />
  //   );
  return (
    <main className={styles.container}>
      {isComponentLoading && <Loading type="linear" />}
      <div className={styles.header}>
        <h2>Manage</h2>

        <div className={styles.APITokenCard}>
          {!parentClient?.APIToken ? (
            <Button onClick={generateHandler}>Generate API Token</Button>
          ) : (
            <>
              <p>{parentClient?.APIToken}</p>
              <div
                onClick={() =>
                  navigator.clipboard.writeText(parentClient?.APIToken)
                }
                className={styles.icon}
              >
                {" "}
                <CopyIcon />
              </div>

              <Button onClick={regenerateHandler}>Regenerate API Token</Button>
            </>
          )}
        </div>
      </div>
      {!parentClient?.APIToken && (
        <>
          <h3>Join as Organization to see the content</h3>
          <Button onClick={() => checking()}>Join</Button>
        </>
      )}

      {parentClient?.APIToken && (
        <form
          onSubmit={childFormSubmitHandler}
          className={styles.childClientCard}
        >
          <h4 className={styles.heading}>Enter a sub-client</h4>
          <div className={styles.inputs}>
            <TextInputField
              id="id"
              required
              label={"id"}
              placeholder={"Ex: Distributor id, reseller id "}
              value={childClientValues?.id}
              onChange={onChildValuesChange}
            />
            <TextInputField
              required
              placeholder={"0x000000000000000000000000000000000000000"}
              label={"Wallet Address"}
              id="walletAddress"
              value={childClientValues?.walletAddress}
              onChange={onChildValuesChange}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </main>
  );
};

const AddParentClientModal = ({
  setIsPageLoading,
  isPageLoading,
  setIsModalOpen,
  walletAddress,
  setParentClient,
}) => {
  const [values, setValues] = useState({
    name: "",
  });
  useEffect(() => {
    console.log(values);
  });
  async function generateHandler() {
    setIsPageLoading(true);
    const res = await addParentClient({
      name: values?.name,
      walletAddress,
      contractAddress: await createSmartContractInstance(),
    });
    if (res?.data?.resData) {
      setParentClient(res.data.resData);
    } else window.alert("Unable to generate API Token");
    setIsPageLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    generateHandler();
  }
  if (isPageLoading) return <Loading />;
  return (
    <form onSubmit={handleSubmit} className={styles.modalContainer}>
      <div className={styles.modal}>
        <h3>Join as Organization</h3>
        <div className={styles.imageContainer}>
          {/* <img src={setValues?.image} alt="Organization" /> */}
        </div>
        <div className={styles.inputs}>
          <TextInputField
            value={values?.name}
            required
            id="name"
            label="Name"
            placeholder="Flipkart"
            onChange={(e) => onValuesChange(e, setValues)}
          />
          {/* <input
        accept="images/*"
        type="file"
        id="image"
        label="Organization Image"
        onChange={(e) => onValuesChange(e, setValues, "image")}
      /> */}
        </div>
        <div className={styles.buttons}>
          <Button type="submit">Create</Button>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </div>
      </div>
    </form>
  );
};

export default Manage;
