import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import LargeTitle from "../../components/largeTitle";
import SwitchField from "../../components/switchField";
import { useTheme } from "../../contexts/themeContext";
import { CheckBox } from "@rneui/themed";
import SubmitButton from "../../components/submitButton";
import DropdownField from "../../components/dropdownField";
import { useDispatch, useSelector } from "react-redux";
import { updateSchedule } from "../../redux/actions/defaultsActions";
import TouchableItem from "../../components/touchableItem";
import InputField from "../../components/inputField";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";

const Schedule = ({ navigation }) => {
  const { colors } = useTheme();
  const [type, setType] = useState("Forever");
  const [message, setMessage] = useState(null);
  const [interval, setInterval] = useState(5);
  const dispatch = useDispatch();
  const [startSelected, setStartSelected] = useState(true);
  const [startDateValue, setStartDateValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDateValue, setEndDateValue] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [duration, setDuration] = useState("M");

  const { scheduleType, scheduleInterval, schedule } = useSelector(
    (state) => state.defaultsReducer
  );

  //Dispatch
  const updateScheduleDispatch = (value) => dispatch(updateSchedule(value));

  useEffect(() => {
    setType(scheduleType);
    setInterval(scheduleInterval);
    setDuration(schedule?.days);
    if (schedule?.startTime !== undefined) {
      setStartDateValue(format(schedule?.startTime, "H:m"));
      setStartDate(schedule?.startTime);
    }
    if (schedule?.endTime !== undefined) {
      setEndDateValue(format(schedule?.endTime, "H:m"));
      setEndDate(schedule?.endTime);
    }
  }, []);

  const saveSchedule = () => {
    let scheduleTemp = {
      scheduleType: type,
      scheduleInterval: interval,
      schedule: {
        days: duration,
        startTime: startDate,
        endTime: endDate,
      },
    };
    updateScheduleDispatch(scheduleTemp);
    setMessage("Success! Your reminder schedule has been updated");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = ({ date }) => {
    var formattedDate = format(date, "H:m");
    if (startSelected) {
      setStartDateValue(formattedDate);
      setStartDate(date);
    } else {
      setEndDateValue(formattedDate);
      setEndDate(date);
    }
    hideDatePicker();
  };

  const updateDuration = (value) => {
    let durTemp = duration;
    if (durTemp?.includes(value)) {
      setDuration(durTemp.replaceAll(value, ""));
    } else {
      setDuration((durTemp += value));
    }
  };

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
          text={"Schedule"}
        />
        <View style={globalStyles.contentWrap}>
          <DropdownField
            title="Run Amount"
            placeholder="Please select one"
            value={type}
            items={[
              { label: "Forever", value: "Forever" },
              { label: "Schedule", value: "Schedule" },
              { label: "Interval", value: "Interval" },
            ]}
            onUpdate={(value) => {
              setMessage(null);
              setType(value);
            }}
          />
          {type === "Interval" && (
            <DropdownField
              title="Interval"
              placeholder="Please select one"
              value={interval}
              items={[
                { label: "5", value: 5 },
                { label: "10", value: 10 },
                { label: "20", value: 20 },
              ]}
              onUpdate={(value) => {
                setMessage(null);
                setInterval(value);
              }}
            />
          )}
          {type === "Schedule" && (
            <View
              style={{
                ...styles.scheduleWrap,
                borderColor: colors.borderColor,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <TouchableItem
                  onPressAction={() => {
                    setStartSelected(true);
                    showDatePicker();
                  }}
                >
                  <InputField
                    title="Start"
                    icon="calendar"
                    editable={false}
                    value={startDateValue}
                    extraStyles={{ width: 120 }}
                  />
                </TouchableItem>
                <TouchableItem
                  onPressAction={() => {
                    setStartSelected(false);
                    showDatePicker();
                  }}
                >
                  <InputField
                    title="End"
                    icon="calendar"
                    editable={false}
                    value={endDateValue}
                    extraStyles={{ width: 120 }}
                  />
                </TouchableItem>
              </View>
              <View
                style={{
                  ...styles.filterWrap,
                  backgroundColor: colors.secondaryBackground,
                }}
              >
                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("1") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("1")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      M
                    </Text>
                  </TouchableItem>
                </View>

                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("2") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("2")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      T
                    </Text>
                  </TouchableItem>
                </View>

                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("3") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("3")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      W
                    </Text>
                  </TouchableItem>
                </View>

                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("4") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("4")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      T
                    </Text>
                  </TouchableItem>
                </View>

                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("5") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("5")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      F
                    </Text>
                  </TouchableItem>
                </View>

                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("6") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("6")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      S
                    </Text>
                  </TouchableItem>
                </View>
                <View
                  style={[
                    styles.filterOptionWrap,
                    duration?.includes("7") ? styles.backgroundDark : null,
                  ]}
                >
                  <TouchableItem onPressAction={() => updateDuration("7")}>
                    <Text
                      style={{ ...styles.filterOption, color: colors.text }}
                    >
                      S
                    </Text>
                  </TouchableItem>
                </View>
              </View>
            </View>
          )}
          <SubmitButton text="Save Schedule" onPressAction={saveSchedule} />
          {message && (
            <Text
              style={{ ...styles.successMessage, color: colors.secondaryText }}
            >
              {message}
            </Text>
          )}
        </View>
      </SafeAreaView>
      <DateTimePickerModal
        style={{ color: colors.text }}
        textColor={colors.text}
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={(date) => handleConfirm({ date: date })}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  scheduleWrap: {
    borderRadius: 15,
    borderWidth: 3,
    padding: 10,
    marginBottom: 20,
  },
  successMessage: {
    fontFamily: "M-SBold",
    fontSize: 14,
    textAlign: "center",
    width: 250,
    alignSelf: "center",
    marginTop: 30,
  },
  filterWrap: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 5,
  },
  filterOptionWrap: {
    width: "14.3%",
    textAlign: "center",
    borderRadius: 10,
  },
  filterOption: {
    fontFamily: "M-SBold",
    fontSize: 18,
    textAlign: "center",
    padding: 10,
  },
  backgroundDark: {
    backgroundColor: "#66C13B80",
  },
});
