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
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Default responsive
    width: "100%",
    padding: 24, // Reduced padding
    perspective: "1000px",
    boxSizing: "border-box",
  },
  cardContainer: {
    width: "100%",
    height: "350px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  card: {
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
  },
  cardFront: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#061c43",
    color: "#fff",
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    fontSize: "3rem",
    fontWeight: "bold",
    backfaceVisibility: "hidden",
    boxSizing: "border-box",
    border: "1px solid white",
  },
  outlinedText: {
    fontSize: "80px",
    fontWeight: "bold",
    width: "100%",
    paddingLeft: 16,
  },
  numberText: {
    width: "100%",
    textAlign: "right",
    fontWeight: "bolder",
    color: "transparent",
    WebkitTextStroke: "2px white",
    fontSize: "200px",
  },
  cardBack: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#2ecc71",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden",
  },
  // Media Queries
  "@media (min-width: 1024px)": {
    gridContainer: {
      gridTemplateColumns: "repeat(3, 1fr)", // Max 3 items in a row
    },
  },
  "@media (max-width: 600px)": {
    gridContainer: {
      padding: 12, // Reduce padding on mobile
    },
  },
};

export default styles;
