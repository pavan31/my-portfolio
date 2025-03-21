import { Outlet } from "react-router-dom";
import styles from "../assets/styles/layoutStyles";

const Layout = () => {
  return (
    <div style={styles.container}>
        <Outlet />
    </div>
  );
};

export default Layout;
