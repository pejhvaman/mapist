import styles from "./Sidebar.module.css";

import Logo from "./Logo";
import AppNav from "../components/AppNav";
import Button from "./Button";
import { Outlet } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function Sidebar({ isCollapsed, handleCollapse }) {
  return (
    <div
      className={`${styles.sidebar} ${
        isCollapsed ? styles.collapsedSidebar : ""
      }`}
    >
      <Logo />
      <AppNav />
      <Outlet />
      <Button type="collapse" onClick={handleCollapse}>
        {isCollapsed ? "↓" : "↑"}
      </Button>
    </div>
  );
}

export default Sidebar;
