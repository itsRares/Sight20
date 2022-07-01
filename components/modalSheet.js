import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useTheme } from "../contexts/themeContext";

const ModalSheet = ({ children, height, modalTitle, refRBSheet }) => {
  const { colors } = useTheme();

  return (
    <RBSheet
      ref={refRBSheet}
      height={height}
      openDuration={250}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgba(0,0,0,0.3)",
        },
        draggableIcon: {
          backgroundColor: colors.navBackground,
        },
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 5,
          paddingHorizontal: 30,
          backgroundColor: colors.secondaryDarkBackground,
        },
      }}
    >
      <Text style={{ ...styles.modalText, color: colors.text }}>
        {modalTitle}
      </Text>
      {children}
    </RBSheet>
  );
};

export default ModalSheet;

const styles = StyleSheet.create({
  modalText: {
    fontFamily: "M-Bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
