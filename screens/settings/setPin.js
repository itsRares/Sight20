import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from "../../contexts/themeContext";
import { globalStyles } from "../../styles/global";
import { getSecurePin, setSecurePin } from "../../helpers/access";
import LargeTitle from "../../components/largeTitle";
import SubmitButton from "../../components/submitButton";

const CODE_LENGTH = 4;

const SetPin = ({ route, navigation }) => {
  const { colors, isDark } = useTheme();
  const { enterCode } = route.params;
  const [code, setCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [containerIsFocused, setContainerIsFocused] = useState(false);
  const codeDigitsArray = [null, null, null, null];
  const ref = useRef(null);

  useEffect(() => {
    navigation.getParent().setOptions({
      tabBarStyle: { display: "none" },
    });
  }, []);

  const goBack = () => {
    navigation.getParent().setOptions({
      tabBarStyle: {
        display: "flex",
        ...globalStyles.tabBarStyle,
        backgroundColor: colors.navBackground,
      },
    });
    navigation.pop();
  };

  const handleOnPress = () => {
    setContainerIsFocused(true);
    ref?.current?.focus();
  };

  const handleOnBlur = () => {
    setContainerIsFocused(false);
  };

  const handleConfirm = async () => {
    if (confirmCode === code) {
      await setSecurePin("user_pin", code);
      return true;
    } else {
      setConfirmCode("");
      setCode("");
      alertBadPin();
      return false;
    }
  };

  const alertBadPin = () => {
    Alert.alert(
      "Pin doesn't match",
      "Your pins don't match, please try again",
      [
        {
          text: "Ok",
        },
      ],
      { cancelable: false }
    );
  };

  const wrongPin = () => {
    setCode("");
    Alert.alert(
      "Incorrect Pin",
      "The pin you provided was incorrect, Please try again",
      [
        {
          text: "Ok",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const toDigitInput = (_value, idx) => {
    const emptyInputChar = " ";
    const digit = code[idx] || emptyInputChar;

    const isCurrentDigit = idx === code.length;
    const isLastDigit = idx === CODE_LENGTH - 1;
    const isCodeFull = code.length === CODE_LENGTH;

    const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);

    if (isLastDigit && isCodeFull && !enterCode) {
      if (confirmCode.length === CODE_LENGTH) {
        handleConfirm().then((e) => {
          if (e) {
            goBack();
          }
        });
      } else {
        setConfirmCode(code);
        setCode("");
      }
    }

    if (isLastDigit && isCodeFull && enterCode) {
      getSecurePin("user_pin").then((e) => {
        if (e === code) {
          navigation.replace("ParentalControls");
        } else {
          wrongPin();
        }
      });
    }

    const containerStyle =
      containerIsFocused && isFocused
        ? { ...style.inputContainer, ...style.inputContainerFocused }
        : style.inputContainer;

    return (
      <View key={idx} style={containerStyle}>
        <Text style={{ ...style.inputText, color: colors.text }}>{digit}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Image
          source={
            isDark
              ? require("../../assets/logo-white.png")
              : require("../../assets/logo.png")
          }
          style={style.icon}
        />
      </View>
      {enterCode ? (
        <Text style={{ ...style.helperText, color: colors.text }}>
          Enter your PIN
        </Text>
      ) : (
        [
          confirmCode ? (
            <Text style={{ ...style.helperText, color: colors.text }}>
              Confirm your new PIN
            </Text>
          ) : (
            <Text style={{ ...style.helperText, color: colors.text }}>
              Enter your new PIN
            </Text>
          ),
        ]
      )}
      <Pressable style={style.inputsContainer} onPress={handleOnPress}>
        {codeDigitsArray.map(toDigitInput)}
      </Pressable>
      <TextInput
        ref={ref}
        value={code}
        onChangeText={setCode}
        onSubmitEditing={handleOnBlur}
        keyboardType="number-pad"
        returnKeyType="done"
        textContentType="oneTimeCode"
        maxLength={CODE_LENGTH}
        style={style.hiddenCodeInput}
      />
      {enterCode && (
        <View style={{ marginTop: 50 }}>
          <SubmitButton text="Go Back" onPressAction={() => navigation.pop()} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SetPin;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputsContainer: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputContainer: {
    borderColor: "#C4C4C4",
    borderWidth: 3,
    borderRadius: 10,
    padding: 15,
    width: "22%",
    marginBottom: 20,
  },
  inputContainerFocused: {
    borderColor: "#0B5345",
  },
  inputText: {
    fontSize: 23,
    fontFamily: "M-SBold",
    alignSelf: "center",
  },
  hiddenCodeInput: {
    position: "absolute",
    height: 1,
    width: 1,
  },
  helperText: {
    fontSize: 17,
    fontFamily: "M-SBold",
    marginBottom: 25,
    marginTop: 30,
  },
  icon: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },
});
