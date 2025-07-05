import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import Button from "./Button";
import styles from "./User.module.css";
import { useState } from "react";

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapse] = useState(true);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <span
        onClick={() => setIsCollapse((is) => !is)}
        className={styles.collapseBtn}
      >
        {isCollapsed ? "<" : ">"}
      </span>
      <img src={user.avatar} alt={user.name} />
      <span>
        {isCollapsed ? "" : "Welcome,"} {user.name}
      </span>
      {isCollapsed ? null : <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
}

export default User;
