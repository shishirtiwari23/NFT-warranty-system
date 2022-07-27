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
  const [parentClient, setParentClient] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const { walletAddress } = useContext(CurrentContext);
  const [childClientValues, setChildClientValues] = useState({
    id: "",
    walletAddress: "",
  });

  function onChildValuesChange(e) {
    onValuesChange(e, setChildClientValues);
  }

  async function generateHandler() {
    setIsPageLoading(true);
    const res = await addParentClient({
      walletAddress,
      contractAddress: await createSmartContractInstance(),
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
    const res = await addChildClient({
      walletAddress,
      child: {
        id: childClientValues?.id,
        walletAddress: childClientValues?.walletAddress,
        contractAddress: await createSmartContractInstance(),
      },
    });
    setIsComponentLoading(false);
  }

  useEffect(() => {
    onRouteLoad();
  }, [walletAddress]);

  if (isPageLoading) return <Loading />;
  return (
    <main className={styles.container}>
      {isComponentLoading && <Loading type="linear" />}
      <div className={styles.header}>
        <h2>Manage</h2>
        <div className={styles.APITokenCard}>
          {parentClient?.APIToken ? (
            <>
              <p>{parentClient?.APIToken}</p>
              <CopyIcon />
              <Button onClick={regenerateHandler}>Regenerate API Token</Button>
            </>
          ) : (
            <>
              <Button onClick={generateHandler}>Generate API Token</Button>
            </>
          )}
        </div>
      </div>
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

export default Manage;
