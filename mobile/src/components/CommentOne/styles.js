import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  contentText: {},
  commentContentWrapper: {
    flex: 1,
  },
  commentContent: {
    marginBottom: 2,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 10,
    maxWidth: "75%",
  },
  commentActions: {
    flexDirection: "row",
  },
  textAction: {
    color: "gray",
    marginRight: 10,
    fontSize: 13,
  },
});
export default styles;
