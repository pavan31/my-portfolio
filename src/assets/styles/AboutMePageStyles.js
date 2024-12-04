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
    fontSize: "40px",
    marginBottom: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: "20px 0px",
    letterSpacing: "1.5px",
  },
  descContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  descText: {
    fontSize: "24px",
    textAlign: "center",
    color: "#333",
  },
  subContainer: {
    height: "100%",
    boxSizing: "border-box",
    margin: "50px 0px 20px 0px",
  },
  subTitle: {
    fontWeight: "600",
    fontSize: "28px",
    textTransform: "Uppercase",
    marginBottom: "20px",
  },
  aboutText: {
    fontSize: "18px",
    width: "90%",
    lineHeight: "30px",
    color: "#222",
    marginBottom: "20px",
  },
  card: {
    background: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    textAlign: "center",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  icon: {
    fontSize: "3rem",
    color: "#007bff",
    marginBottom: "10px",
  },
  text: {
    fontSize: "1.2rem",
    fontWeight: "500",
    margin: 0,
  },
};

export default styles;
