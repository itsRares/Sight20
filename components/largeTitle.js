import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../contexts/themeContext";

const LargeTitle = ({
  text,
  icon,
  textStyles,
  rightIcon,
  rightSecondIcon,
  onPressAction,
  onPressActionRight,
  onPressActionRightSecond,
}) => {
  const { colors, isDark } = useTheme();
  return (
    <View style={styles.titleWrap}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={onPressAction}>
            <View
              style={{
                ...styles.closeButton,
                backgroundColor: colors.secondaryBackground,
              }}
            >
              <Ionicons
                style={styles.closeButtonText}
                name={icon}
                size={26}
                color={colors.text}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.rightIconWrap}>
          <TouchableWithoutFeedback onPress={onPressActionRightSecond}>
            <Ionicons
              style={styles.rightSecondIcon}
              name={rightSecondIcon}
              size={34}
              color={colors.text}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressActionRight}>
            <Ionicons
              style={styles.rightIcon}
              name={rightIcon}
              size={34}
              color={colors.text}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
      {text ? (
        <View>
          <Text
            style={{ ...styles.largeTitle, ...textStyles, color: colors.text }}
          >
            {text}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default LargeTitle;

const styles = StyleSheet.create({
  titleWrap: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
    borderRadius: 30,
    marginBottom: 25,
    marginTop: 10,
  },
  closeButtonText: {
    textAlign: "center",
    padding: 13,
  },
  largeTitle: {
    marginLeft: 10,
    fontSize: 30,
    lineHeight: 32,
    fontFamily: "M-Bold",
  },
  rightIconWrap: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  rightIcon: {
    marginBottom: 10,
    marginRight: 10,
  },
  rightSecondIcon: {
    marginBottom: 10,
    marginRight: 30,
  },
});
