export const styles = {
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
    position: "relative",
  },
  portal: {
    position: "absolute",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0, 153, 255, 0.8), transparent)",
    boxShadow: "0 0 20px 10px rgba(0, 153, 255, 0.8)",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  },
  heroTitle: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    zIndex: 1,
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    marginTop: "10px",
    opacity: 0.8,
    zIndex: 1,
  },
};
