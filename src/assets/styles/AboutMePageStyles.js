import { theme } from "../../theme";

const styles = {
  container: {
    width: "100%",
    boxSizing: "border-box",
    color: theme.colors.black,
    backgroundColor: "whitesmoke",
    padding: "16px 32px",
  },
  title: {
    boxSizing: "border-box",
    fontSize: "32px",
    marginBottom: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: "20px 0px",
  },
  descContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  descText: {
    fontSize: "20px",
    textAlign: "center",
    color: "#333",
  },
  subContainer: {
    height: "100%",
    boxSizing: "border-box",
    margin: "50px 0px",
  },
  subTitle: {
    fontWeight: "600",
    fontSize: "24px",
    textTransform: "Uppercase",
  },
};

export default styles;
