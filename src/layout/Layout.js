import { Outlet } from "react-router-dom";
import styles from "../assets/styles/layoutStyles";
import HeaderComponent from "../components/HeaderComponent";

const Layout = () => {
  return (
    <div style={styles.container}>
      <HeaderComponent />
      <div style={styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
