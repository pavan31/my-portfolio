const styles = {
  container: {
    width: "100%",
    boxSizing: "border-box",
    overflowWrap: "anywhere",
  },
  contactInfoContainer: {
    display: "flex",
    boxSizing: "border-box",
    justifyContent: "space-between",
    width: "100%",
  },
  subContainer: {
    height: "100%",
    boxSizing: "border-box",
    marginBottom: "50px",
    paddingTop: "60px"
  },
  title: {
    boxSizing: "border-box",
    fontSize: "60px",
    marginBottom: "50px",
    textTransform: "uppercase",
  },
  contentBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  formArea: {
    height: "100%",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  row: {
    mb: 1,
  },
  rowContainer: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "darkgray",
      },
      "&:hover fieldset": {
        borderColor: "lightgray",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
  inputLabel: {
    color: "white",
  },
  inputText: {
    color: "white",
  },
  sendButton: {
    color: "white",
    borderColor: "white",
    height: "50px",
    fontSize: "20px",
    "&:hover": {
      borderColor: "white",
      backgroundColor: "rgba(255, 255, 255)",
      color: "black",
    },
  },
  icon: {
    color: "white",
    fontSize: "48px",
  },
  text: {
    color: "white",
    fontSize: "24px",
  },
  button: {
    color: "white",
    borderColor: "white",
    "&:hover": {
      borderColor: "lightgray",
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
    padding: "10px 20px",
    fontSize: "1rem",
  },
};

export default styles;
