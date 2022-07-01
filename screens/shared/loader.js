import React from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { useTheme } from "../../contexts/themeContext";

const Loader = ({ visible }) => {
  const { colors } = useTheme();
  return (
    <Modal visible={visible}>
      <View style={{ ...styles.centered, backgroundColor: colors.background }}>
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={colors.text}
        />
        <Text style={{ ...styles.loadingText, color: colors.text }}>
          Loading...
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "M-Medium",
  },
});

export default Loader;
