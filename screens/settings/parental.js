import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import LargeTitle from "../../components/largeTitle";
import SwitchField from "../../components/switchField";
import { useTheme } from "../../contexts/themeContext";
import { CheckBox } from "@rneui/themed";
import SubmitButton from "../../components/submitButton";
import {
  updatedParentalLock,
  updateHideSchedule,
  updateHideStop,
} from "../../redux/actions/defaultsActions";
import { useDispatch, useSelector } from "react-redux";
import { deleteSecurePin } from "../../helpers/access";

const ParentalControls = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { parentalLock, hideStop, hideSchedule } = useSelector(
    (state) => state.defaultsReducer
  );

  //Dispatch
  const updatedParentalLockDispatch = (value) =>
    dispatch(updatedParentalLock(value));
  const updateHideStopDispatch = (value) => dispatch(updateHideStop(value));
  const updateHideScheduleDispatch = (value) =>
    dispatch(updateHideSchedule(value));

  return (
    <ScrollView
      style={{
        ...globalStyles.background,
        backgroundColor: colors.background,
      }}
      keyboardShouldPersistTaps="always"
    >
      <SafeAreaView style={{ marginBottom: 100 }}>
        <LargeTitle
          icon="chevron-back-sharp"
          onPressAction={() => navigation.pop()}
          text={"Parental Controls"}
        />
        <View style={globalStyles.contentWrap}>
          <SwitchField
            title="Parental Lock"
            description="Set it so you can schedule reminders and make sure no one messes with the settings or stops it!"
            value={parentalLock}
            onValueChange={() => {
              let tempLock = !parentalLock;
              updatedParentalLockDispatch(tempLock);
              if (tempLock) {
                navigation.navigate("SetPin", {
                  enterCode: false,
                });
              } else {
                deleteSecurePin("user_pin").then((e) => {
                  console.log("Deleted Pin!");
                });
              }
            }}
          />
          {parentalLock && (
            <>
              <CheckBox
                title="Hide Stop Button"
                iconType="material"
                checkedIcon="check-box"
                uncheckedIcon="check-box-outline-blank"
                checkedColor={colors.text}
                uncheckedColor={colors.text}
                checked={hideStop}
                containerStyle={{
                  ...styles.checkBox,
                  backgroundColor: colors.background,
                }}
                activeOpacity={1}
                size={26}
                textStyle={{
                  fontFamily: "M-SBold",
                  paddingLeft: 5,
                  color: colors.text,
                  fontSize: 18,
                }}
                onPress={() => {
                  updateHideStopDispatch(!hideStop);
                }}
              />
              <CheckBox
                title="Hide Schedule Menu"
                iconType="material"
                checkedIcon="check-box"
                uncheckedIcon="check-box-outline-blank"
                checkedColor={colors.text}
                uncheckedColor={colors.text}
                checked={hideSchedule}
                containerStyle={{
                  ...styles.checkBox,
                  backgroundColor: colors.background,
                  marginBottom: 30,
                }}
                activeOpacity={1}
                size={26}
                textStyle={{
                  fontFamily: "M-SBold",
                  paddingLeft: 5,
                  color: colors.text,
                  fontSize: 18,
                }}
                onPress={() => updateHideScheduleDispatch(!hideSchedule)}
              />
              <SubmitButton
                text="Update Pin"
                extraStyles={{ alignSelf: "flex-start", marginTop: -10 }}
                onPressAction={() => {
                  navigation.navigate("SetPin", {
                    enterCode: false,
                  });
                }}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ParentalControls;

const styles = StyleSheet.create({
  checkBox: {
    backgroundColor: "#fff",
    borderWidth: 0,
    width: Dimensions.get("window").width * 0.85,
    alignSelf: "center",
    padding: 10,
    paddingRight: 30,
    marginTop: -10,
    marginBottom: 10,
  },
});
