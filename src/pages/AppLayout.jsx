import styles from "./AppLayout.module.css";

import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import User from "../components/User";
import { useState } from "react";

function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleCollapse = () => {
    setIsCollapsed((is) => !is);
  };

  return (
    <div className={styles.app}>
      <Sidebar isCollapsed={isCollapsed} handleCollapse={handleCollapse} />
      <Map isCollapsed={isCollapsed} handleCollapse={handleCollapse} />
      <User />
    </div>
  );
}

export default AppLayout;
