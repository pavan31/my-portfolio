import { theme } from "../../theme";

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0px 20px",
  },
  title: {
    boxSizing: "border-box",
    fontSize: "100px",
    marginBottom: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: "15px 0px",
    letterSpacing: "1.5px",
  },
  icon: {
    color: "white",
    fontSize: "32px",
  },
  text: {
    color: "white",
    fontSize: "48px",
    letterSpacing: "1.5px",
    textAlign: "center",
    marginBottom: "15px",
  },
  desc: {
    color: "white",
    fontSize: "24px",
    letterSpacing: "1.5px",
    marginBottom: "20px",
    textAlign: "center",
  },
  button: {
    color: "white",
    borderColor: "white",
    "&:hover": {
      borderColor: "white",
      backgroundColor: "rgba(255, 255, 255)",
      color: "black",
    },
    padding: "10px 30px",
    fontSize: "1rem",
  },
};

export default styles;
