import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { useTheme } from "../contexts/themeContext";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const InputField = ({
  children,
  title,
  placeholder,
  onChangeText,
  value,
  secure,
  error,
  multiline,
  extraStyles,
  extraTextStyles,
  textContentType,
  editable,
  keyboardType,
  autoCompleteType,
  icon,
}) => {
  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrap}>
          <View style={styles.inputInnerWrap}>
            <View>
              {title && (
                <Text
                  style={{
                    ...styles.inputTitle,
                    color: colors.text,
                    ...extraTextStyles,
                  }}
                >
                  {title}
                </Text>
              )}
              <View style={{ flexDirection: "row" }}>
                {children ? (
                  children
                ) : (
                  <TextInput
                    textContentType={textContentType}
                    autoCapitalize="none"
                    style={{
                      ...styles.input,
                      ...extraStyles,
                      backgroundColor: colors.secondaryLightBackground,
                      color: colors.text,
                      borderColor: colors.borderColor,
                    }}
                    keyboardType={keyboardType}
                    placeholder={placeholder}
                    placeholderTextColor={colors.secondaryText}
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={secure}
                    multiline={multiline}
                    editable={editable}
                    autoCompleteType={autoCompleteType}
                  />
                )}
                <FontAwesome5
                  style={styles.inputIcon}
                  name={icon}
                  size={22}
                  color={colors.text}
                />
              </View>
            </View>
          </View>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: "center",
  },
  inputWrap: {
    justifyContent: "flex-start",
    marginVertical: 5,
  },
  inputInnerWrap: {
    flexDirection: "row",
  },
  inputIcon: {
    position: "absolute",
    right: 15,
    top: 17,
  },
  input: {
    fontSize: 18,
    borderWidth: 3,
    borderColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.8,
    fontFamily: "M-Medium",
    padding: 15,
    paddingTop: 15,
  },
  errorText: {
    color: "#E53935",
    marginTop: 3,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: "M-SBold",
  },
  inputTitle: {
    fontFamily: "M-SBold",
    fontSize: 16,
    marginLeft: 5,
    marginBottom: 7,
  },
});
