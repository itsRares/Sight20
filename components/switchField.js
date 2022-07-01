import React from "react";
import { Dimensions, StyleSheet, Text, Switch, View } from "react-native";
import { useTheme } from "../contexts/themeContext";

const SwitchField = ({ title, description, onValueChange, value }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.notiWrap}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...styles.prefTitle, color: colors.text }}>{title}</Text>
        <Switch value={value} onValueChange={onValueChange} />
      </View>
      <View>
        <Text style={{ ...styles.prefHelperText, color: colors.text }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default SwitchField;

const styles = StyleSheet.create({
  notiWrap: {
    width: Dimensions.get("window").width * 0.8,
    alignSelf: "center",
    marginBottom: 30,
  },
  prefTitle: {
    fontSize: 18,
    fontFamily: "M-SBold",
    flex: 1,
    alignSelf: "center",
  },
  prefHelperText: {
    fontSize: 12,
    fontFamily: "M-Medium",
    marginTop: 15,
    color: "#797D7F",
  },
});
