import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import LargeTitle from "../../components/largeTitle";
import { useTheme } from "../../contexts/themeContext";
import SubmitButton from "../../components/submitButton";
import DropdownField from "../../components/dropdownField";
import { useDispatch, useSelector } from "react-redux";
import { updateSchedule } from "../../redux/actions/defaultsActions";
import TouchableItem from "../../components/touchableItem";
import InputField from "../../components/inputField";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from "date-fns";
import * as Notifications from "expo-notifications";

const Schedule = ({ navigation }) => {
  const { colors } = useTheme();
  const [type, setType] = useState("Forever");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState(5);
  const dispatch = useDispatch();
  const [startSelected, setStartSelected] = useState(true);
  const [startDateValue, setStartDateValue] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDateValue, setEndDateValue] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [duration, setDuration] = useState("");

  const daysOfWeek = [
    {
      day: "M",
      index: "1",
    },
    {
      day: "T",
      index: "2",
    },
    {
      day: "W",
      index: "3",
    },
    {
      day: "T",
      index: "4",
    },
    {
      day: "F",
      index: "5",
    },
    {
      day: "S",
      index: "6",
    },
    {
      day: "S",
      index: "7",
    },
  ];

  const { scheduleType, scheduleInterval, schedule } = useSelector(
    (state) => state.defaultsReducer
  );

  //Dispatch
  const updateScheduleDispatch = (value) => dispatch(updateSchedule(value));

  useEffect(() => {
    setType(scheduleType);
    setInterval(scheduleInterval);
    if (schedule?.days !== undefined) {
      setDuration(schedule?.days);
    }
    if (schedule?.startTime !== undefined && schedule.startTime) {
      setStartDateValue(format(new Date(schedule?.startTime), "H:mm"));
      setStartDate(schedule?.startTime);
    }
    if (schedule?.endTime !== undefined && schedule.endTime) {
      setEndDateValue(format(new Date(schedule?.endTime), "H:mm"));
      setEndDate(schedule?.endTime);
    }
  }, []);

  const saveSchedule = () => {
    setError(null);
    if (type === "Schedule" && duration === "") {
      setError("Please select the days you want to be reminded on.");
      return;
    }

    if (type === "Schedule" && (startDate === null || endDate === null)) {
      setError("Please select a StartTime and EndTime.");
      return;
    }

    let scheduleTemp = {
      scheduleType: type,
      scheduleInterval: interval,
      schedule: {
        days: duration,
        startTime: startDate,
        endTime: endDate,
      },
    };

    Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      updateScheduleDispatch(scheduleTemp);
      setMessage("Success! Your reminder schedule has been updated");
    });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = ({ date }) => {
    setMessage(null);
    setError(null);

    var formattedDate = format(date, "H:mm");
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
    setMessage(null);
    setError(null);

    let durTemp = duration;
    if (durTemp?.includes(value)) {
      //Remove from list
      setDuration(durTemp.replaceAll(value, ""));
    } else {
      //Add to list
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
            title="Run Type"
            placeholder="Please select one"
            value={type}
            items={[
              { label: "Forever", value: "Forever" },
              { label: "Schedule", value: "Schedule" },
              { label: "Interval", value: "Interval" },
            ]}
            onUpdate={(value) => {
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
                    setSelectedDate(new Date(startDate));
                    showDatePicker();
                  }}
                >
                  <InputField
                    title="Start"
                    icon="clock"
                    editable={false}
                    value={startDateValue}
                    extraStyles={{ width: 120 }}
                  />
                </TouchableItem>
                <TouchableItem
                  onPressAction={() => {
                    setStartSelected(false);
                    setSelectedDate(new Date(endDate));
                    showDatePicker();
                  }}
                >
                  <InputField
                    title="End"
                    icon="clock"
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
                {daysOfWeek.map((e, i) => {
                  return (
                    <View
                      key={i}
                      style={[
                        styles.filterOptionWrap,
                        duration?.includes(e.index)
                          ? styles.backgroundDark
                          : null,
                      ]}
                    >
                      <TouchableItem
                        onPressAction={() => updateDuration(e.index)}
                      >
                        <Text
                          style={{ ...styles.filterOption, color: colors.text }}
                        >
                          {e.day}
                        </Text>
                      </TouchableItem>
                    </View>
                  );
                })}
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
          {error && (
            <Text style={{ ...styles.successMessage, color: "red" }}>
              {error}
            </Text>
          )}
        </View>
      </SafeAreaView>
      <DateTimePickerModal
        style={{ color: colors.text }}
        textColor={colors.text}
        isVisible={isDatePickerVisible}
        mode="time"
        locale="en_GB"
        date={selectedDate}
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
