import { theme } from "../../theme";

const headerStyles = {
  appBar: {
    backgroundColor: theme.colors.primary,
    boxShadow: "none",
    height: "80px",
    position: "fixed",
    zIndex: "100",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 16px",
  },
  logo: {
    height: "100px",
    width: "140px",
    objectFit: "cover",
  },
  menuIcon: {
    fontSize: "50px",
    padding: "0px",
    marginRight: "5px",
  },
  modal: {
    position: "fixed",
    top: "0",
    right: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    zIndex: 1200,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: "50px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  menuItem: {
    color: "white",
    marginBottom: 3,
    cursor: "pointer",
    textAlign: "center",
    "&:hover": { color: "lightgray" },
  },
};

export default headerStyles;
