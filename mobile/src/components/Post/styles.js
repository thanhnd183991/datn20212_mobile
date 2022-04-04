import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  postWrapper: {
    marginBottom: 10,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  descHeader: {
    flexDirection: "column",
  },
  span: {
    fontWeight: "bold",
  },
  date: {
    color: "gray",
  },
  content: {
    marginBottom: 10,
    marginLeft: 10,
  },
  calCurrentImage: {
    position: "absolute",
    top: 10,
    right: 10,
    color: "white",
    fontSize: 13,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  buttonWrapper: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
});
export default styles;
