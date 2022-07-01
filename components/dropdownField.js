import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import InputField from "./inputField";
import RNPickerSelect from "react-native-picker-select";
import { useTheme } from "../contexts/themeContext";

const DropdownField = ({
  items,
  title,
  placeholder,
  error,
  onUpdate,
  onDone,
  value,
  extraStyles,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <InputField title={title} icon="chevron-down" error={error}>
        <RNPickerSelect
          onDonePress={onDone}
          value={value}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: placeholder,
            value: null,
          }}
          style={{
            inputIOS: {
              fontSize: 18,
              borderWidth: 3,
              borderColor: colors.borderColor,
              backgroundColor: colors.secondaryLightBackground,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.8,
              fontFamily: "M-Medium",
              padding: 15,
              color: colors.text,
              paddingTop: 15,
              ...extraStyles,
            },
            inputAndroid: {
              fontSize: 18,
              borderWidth: 3,
              borderColor: colors.borderColor,
              backgroundColor: colors.secondaryLightBackground,
              borderRadius: 10,
              width: Dimensions.get("window").width * 0.8,
              fontFamily: "M-Medium",
              padding: 15,
              paddingTop: 15,
              color: colors.text,
              ...extraStyles,
            },
          }}
          onValueChange={onUpdate}
          items={items}
        />
      </InputField>
    </>
  );
};

export default DropdownField;

const styles = StyleSheet.create({
  modalText: {
    fontFamily: "M-Bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
