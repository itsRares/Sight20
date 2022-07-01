import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useTheme } from "../contexts/themeContext";

const SettingItem = ({ onPressAction, Licon, Ricon, title }) => {
  const { colors, isDark } = useTheme();
  return (
    <TouchableNativeFeedback onPress={onPressAction}>
      <View style={styles.listItem}>
        <View style={styles.moreItemWrap}>
          <View style={styles.textWrap}>
            <FontAwesome5
              name={Licon}
              size={28}
              style={{ ...styles.leftIcon, color: colors.text }}
            />
            <Text style={{ ...styles.infoText, color: colors.text }}>
              {title}
            </Text>
          </View>
          <FontAwesome5
            style={{ ...styles.textArrow, color: colors.text }}
            name={Ricon}
            size={24}
          />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  textWrap: {
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1c1e21",
    marginLeft: 15,
    fontFamily: "M-SBold",
  },
  moreItemWrap: {
    width: Dimensions.get("window").width * 0.8,
  },
  textArrow: {
    position: "absolute",
    right: 0,
  },
  leftIcon: {
    width: 30,
  },
});
