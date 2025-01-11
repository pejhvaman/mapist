import styles from "./Sidebar.module.css";
import AppNav from "../components/AppNav";
import Footer from "./Footer";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <AppNav />
      <p>cities</p>
      <Footer />
    </div>
  );
}

export default Sidebar;
