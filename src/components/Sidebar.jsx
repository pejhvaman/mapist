import styles from "./Sidebar.module.css";

import Logo from "./Logo";
import AppNav from "../components/AppNav";
import Footer from "./Footer";
import Button from "./Button";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((is) => !is);
  };

  return (
    <div
      className={`${styles.sidebar} ${
        isCollapsed ? styles.collapsedSidebar : ""
      }`}
    >
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
      <Button type="collapse" onClick={handleCollapse}>
        {isCollapsed ? "↓" : "↑"}
      </Button>
    </div>
  );
}

export default Sidebar;
