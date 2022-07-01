import { StyleSheet, Dimensions } from "react-native";

export const globalStyles = StyleSheet.create({
  background: {
    backgroundColor: "#fff",
    height: "100%",
  },
  contentWrap: {
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.8,
    marginTop: 20,
    height: "100%",
  },
  errorMessage: {
    textAlign: "center",
    color: "crimson",
    marginTop: 20,
    fontSize: 14,
    fontFamily: "M-Bold",
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.8,
  },
  anotherChoiceWrap: {
    marginVertical: 50,
    flexDirection: "row",
    alignSelf: "center",
  },
  anotherChoiceText: {
    fontSize: 14,
    fontFamily: "M-Bold",
    marginRight: 3,
  },
  anotherChoice: {
    fontSize: 14,
    fontFamily: "M-Bold",
    color: "#EB984E",
  },
  subHeaderText: {
    fontFamily: "M-SBold",
    fontSize: 16,
    marginBottom: 10,
  },
  headerWrap: {
    flexDirection: "row",
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconWrap: {
    alignSelf: "center",
    paddingRight: 10,
  },
  headerContentWrap: {
    flexGrow: 1,
  },
  headerText: {
    fontFamily: "M-Bold",
    fontSize: 26,
  },
  noResWrap: {
    marginTop: 30,
  },
  noResTitle: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "M-SBold",
  },
  noResText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "M-Medium",
    marginTop: 10,
  },
});
