import { Button, Loading } from "../../../../components";
import styles from "./Manage.module.scss";
import { icons } from "../../../../assets/";
import {
  addParentClient,
  getParentClient,
  createSmartContractInstance,
} from "../../../../utils/constants/functions";
import { useState, useContext, useEffect } from "react";
import { CurrentContext } from "../../../../utils";

const { CopyIcon } = icons;
const Manage = () => {
  const [parentClient, setParentClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { walletAddress } = useContext(CurrentContext);

  async function onGenerateHandler() {
    setIsLoading(true);
    const res = await addParentClient({
      walletAddress,
      contractAddress: await createSmartContractInstance(),
    });
    if (res?.data?.resData) {
      setParentClient(res.data.resData);
      setIsLoading(false);
    } else window.alert("Unable to generate API Token");
  }
  async function onRouteLoad() {
    setIsLoading(true);
    const res = await getParentClient(walletAddress);
    if (res?.data?.resData) {
      setParentClient(res.data.resData);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    onRouteLoad();
  }, [walletAddress]);
  if (isLoading) return <Loading />;
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h2>Manage</h2>
        <div className={styles.APITokenCard}>
          {parentClient?.APIToken ? (
            <>
              <p>{parentClient?.APIToken}</p>
              <CopyIcon />
              <Button onClick={onGenerateHandler}>Regenerate API Token</Button>
            </>
          ) : (
            <>
              <Button onClick={onGenerateHandler}>Generate API Token</Button>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Manage;
