import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const SubmitButton = ({ text, onPressAction, extraStyles }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonWrap, ...extraStyles }}
      onPress={onPressAction}
      activeOpacity={1}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  buttonWrap: {
    marginTop: 15,
    alignSelf: "center",
  },
  button: {
    justifyContent: "flex-start",
    backgroundColor: "#D4E6F1",
    padding: 18,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "M-Bold",
    color: "#154360",
    fontSize: 18,
    fontWeight: "500",
  },
});
