import styles from "./API.module.scss";
import { useContext, useState } from "react";
import { CurrentContext } from "../../utils";
import {
  addParentClient,
  addToken,
  addChildClient,
} from "../../utils/constants/functions";
import { NavLink, Route, Routes } from "react-router-dom";
import { GettingStarted, Manage, Reports } from "./pages";
import { icons } from "../../assets";

const { DocumentIcon, ManageIcon, ReportsIcon } = icons;

const API = () => {
  const { walletAddress } = useContext(CurrentContext);
  const [childId, setChildId] = useState("");
  const [res, setRes] = useState(null);

  async function createSmartContractInstance() {
    //-------------------------------PARVA
    return "contractAddress";
  }

  async function handleAddChildClient() {
    await createSmartContractInstance(); //-------------------------------PARVA
    const response = await addChildClient({
      walletAddress,
      child: {
        contractAddress: await createSmartContractInstance(),
        id: childId,
        walletAddress: "walletAddress",
      },
    });
    console.log(response.data);
  }

  async function handleAddParentClient() {
    await createSmartContractInstance(); //-------------------------------PARVA
    const response = await addParentClient({
      walletAddress,
      contractAddress: await createSmartContractInstance(), //-------------------------------PARVA
    });
    // console.log(walletAddress, contractAddress);
    setRes(response?.data?.resData);
  }
  async function handleAddToken() {
    const res = await addToken({
      id: childId,
      URI: "https://www.google.com",
      walletAddress,
      contractAddress: await createSmartContractInstance(),
    }); //-------------------------------PARVA
    console.log(res);
  }
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="manage" element={<Manage />} />
        <Route path="reports" element={<Reports />} />
      </Routes>

      <SideMenu />
    </div>
  );
};

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <NavLink
        className={(item) => (item.isActive ? styles.active : {})}
        to="/services/api/getting-started"
      >
        <DocumentIcon />
        <span>Getting Started</span>
      </NavLink>
      <NavLink
        className={(item) => (item.isActive ? styles.active : {})}
        to="/services/api/manage"
      >
        <ManageIcon />
        <span>Manage API</span>
      </NavLink>
      <NavLink
        className={(item) => (item.isActive ? styles.active : {})}
        to="/services/api/reports"
      >
        <ReportsIcon />
        <span>Reports</span>
      </NavLink>
    </div>
  );
};

export default API;
