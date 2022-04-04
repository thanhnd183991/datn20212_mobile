import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  createPost: {
    padding: 8,
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
  },
  textDesc: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  placeholder: {
    color: "gray",
    fontSize: 16,
    marginLeft: 10,
  },
  actions: {
    flexDirection: "row",
    width: "100%",
  },
  button: {
    flex: 1,
  },
});

export default styles;
