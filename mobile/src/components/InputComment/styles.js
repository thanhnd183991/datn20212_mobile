import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  textInputWrapper: {
    flexDirection: "row",
    marginRight: 10,
    flex: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  sendIcon: { alignSelf: "center" },
  imageIcon: { alignSelf: "center" },
  textInput: {
    fontSize: 16,
    alignSelf: "center",
    flex: 1,
  },
});
export default styles;
