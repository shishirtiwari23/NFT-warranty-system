import styles from "./Navbar.module.scss";
import {
  getWalletAddress,
  addUser,
  getParentClient,
} from "../../utils/constants";
import { CurrentContext } from "../../utils";
import { useEffect, useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../";

const Navbar = () => {
  const { setWalletAddress, walletAddress, windowDetails } =
    useContext(CurrentContext);
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isConnected)
      windowDetails?.provider?.on("accountsChanged", connectToMetamask); // Whenever wallet changes this gets called, but not on mount
    return () => {
      if (isConnected)
        windowDetails?.provider?.removeListener(
          "accountsChanged",
          connectToMetamask
        );
    };
  });

  async function connectToMetamask() {
    const newWalletAddress = await getWalletAddress(windowDetails.provider);
    // const balanace = await getWalletBalance(walletAddress);

    if (newWalletAddress !== undefined) {
      setWalletAddress(newWalletAddress);
      setIsConnected(true);
      // navigate("/dashboard");
    } else if (newWalletAddress === "") {
      setIsConnected(false);
      onLogout();
    }
  }

  function onLogout() {
    setWalletAddress("");
    setIsConnected(false);
  }

  useEffect(() => {
    addUser(walletAddress);
  }, [walletAddress]);

  useEffect(() => {
    console.log(walletAddress, isConnected);
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.logo}>
          Logo
        </NavLink>
      </div>
      {walletAddress && (
        <div className={styles.middle}>
          <NavLink
            to="/"
            className={(item) =>
              item.isActive && styles.active ? styles.active : {}
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={(item) =>
              item.isActive && styles.active ? styles.active : {}
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/collections"
            className={(item) =>
              item.isActive && styles.active ? styles.active : {}
            }
          >
            Collections
          </NavLink>
          <NavLink
            to="/services"
            className={(item) =>
              item.isActive && styles.active ? styles.active : {}
            }
          >
            Services
          </NavLink>
        </div>
      )}
      <div className={styles.right}>
        {windowDetails?.isMetamaskInstalled ? (
          walletAddress ? (
            <p>Wallet Address: {walletAddress}</p>
          ) : (
            <Button onClick={connectToMetamask}>Connect Wallet</Button>
          )
        ) : (
          <Button>
            <a href="https://metamask.io">Download Metamask</a>{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
