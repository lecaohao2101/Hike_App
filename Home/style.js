import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageBackground: {
    width: width,
    height: height,
    position: "absolute",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 25,
  },

  searchDeleteAll: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 30,
  },

  search: {
    borderWidth: 2,
    height: 45,
    width: 200,
    fontWeight: "bold",
  },

  searchInput: {
    color: "black",
    fontWeight: "bold",
    padding: 5,
    fontSize: 15,
  },

  deleteAll: {
    height: 40,
    width: 150,
    fontWeight: "bold",
    marginLeft: 40,
  },

  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  list: {
    marginTop: 20,
  },

  Text: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: "bold",
  },

  hikeItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  navBar: {
    flexDirection: "row",
    marginTop: 70,
  },

  navButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    padding: 10,
    margin: 2,
  },

  navButtonText: {
    fontSize: 20,
  },
});
export default styles;
