import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AppState,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import { useTheme } from "../../contexts/themeContext";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import SubmitButton from "../../components/submitButton";
import ModalSheet from "../../components/modalSheet";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import * as WebBrowser from "expo-web-browser";
import { useSelector } from "react-redux";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const facts = [
  "Your eyes focus on 50 different objects every second",
  "The only organ more complex than the eye is the brain.",
  "Your eyes can distinguish approximately 10 million different colors.",
  "It is impossible to sneeze with your eyes open.",
  "Ommatophobia is a fear of the eyes.",
  "80 percent of all learning comes through the eyes.",
  "Your eyes can detect a candle flame 1.7 miles away.",
  "Your iris has 256 unique characteristics; your fingerprint has just 40.",
  "Heterochromia is the medical term for having two different colored eyes.",
  "Only 1/6 of your eyeball is visible.",
  "The average person blinks 12 times a minute ",
  "The shark cornea is nearly identical to the human cornea, and has even been used in human eye surgery!",
  "The optic nerve contains more than one million nerve cells.",
  "Your eye is the fastest contracting muscle in the body, contracting in less than 1/100th of a second.",
  "Eyelashes have an average lifespan of five months.",
  "The space between your eyebrows is called the Glabella.",
  "About half of the human brain is dedicated to vision and seeing.",
  "Dogs can’t distinguish between red and green.",
  "The human eye can see 500 shades of grey.",
  "80% of vision impairment worldwide is curable.",
  "Everyone has one eye that is slightly stronger than the other.",
  "Oily fish, vitamin A and vitamin C can all help to preserve good eyesight",
  "You see things upside down - it is your brain which turns the image the right way up",
  "A blink typically lasts 100-150 milliseconds.",
  "If the human eye was a digital camera, it would have 576 megapixels.",
  "The world’s most common eye colour is brown.",
];

const Home = ({ navigation }) => {
  const refRBSheet = useRef();
  const { colors, isDark } = useTheme();
  const [counter, setCounter] = useState(1200);
  const [fact, setFact] = useState("");
  const [startCountdown, setStartCountdown] = useState(false);

  const { hideStop, scheduleType } = useSelector(
    (state) => state.defaultsReducer
  );

  useEffect(() => {
    var item = facts[Math.floor(Math.random() * facts.length)];
    setFact(item);
    if (startCountdown) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

      return () => clearInterval(timer);
    }
    registerForPushNotificationsAsync().then(() =>
      console.log("Permissions checked")
    );
  }, [counter, startCountdown]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        var item = facts[Math.floor(Math.random() * facts.length)];
        setFact(item);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
    } else {
      console.log("Must use physical device for Push Notifications");
    }

    return token;
  };

  const format = (time) => {
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    var ret = "00:";
    ret += (mins < 10 ? "0" : "") + mins;
    ret += ":" + (secs < 10 ? "0" : "") + secs;
    return ret;
  };

  const getAsset = () => {
    if (startCountdown) {
      return isDark
        ? require("../../assets/logo-white.png")
        : require("../../assets/logo.png");
    } else {
      return isDark
        ? require("../../assets/logo-closed-white.png")
        : require("../../assets/logo-closed.png");
    }
  };

  const _openLink = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setCounter(10);
      setStartCountdown(true);
    }

    return (
      <>
        <Text style={styles.monthAmountText}>{remainingTime}</Text>
        <Text style={{ ...styles.monthText, color: colors.text }}>Seconds</Text>
        <Text style={{ ...styles.monthText, color: colors.text }}>
          Remaining
        </Text>
      </>
    );
  };

  return (
    <View
      style={{
        ...globalStyles.background,
        backgroundColor: colors.background,
      }}
      keyboardShouldPersistTaps="always"
    >
      <SafeAreaView style={{ marginBottom: 100 }}>
        <View style={globalStyles.contentWrap}>
          <View style={styles.headerWrap}>
            <View style={{ flexGrow: 1 }}></View>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Settings")}
            >
              <View>
                <Ionicons
                  style={styles.rightSecondIcon}
                  name="cog"
                  size={40}
                  color={colors.text}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {counter !== 0 ? (
            <>
              <View style={styles.monthlyWrap}>
                <View style={styles.iconWrap}>
                  <Image source={getAsset()} style={styles.icon} />
                </View>
                <Text style={{ ...styles.monthAmountText }}>
                  {format(counter)}
                </Text>
                <Text style={{ ...styles.monthText, color: colors.text }}>
                  {startCountdown
                    ? "Remaining "
                    : [
                        scheduleType === "Schedule"
                          ? "Wait to Start"
                          : "Press to start",
                      ]}
                </Text>
              </View>
              <View style={styles.infoWrap}>
                <View style={styles.progressWrap}>
                  <View
                    style={{
                      ...styles.progress,
                      width: (counter / 1200) * 100 + "%",
                    }}
                  ></View>
                </View>
                <Text
                  style={{ ...styles.didYouKnow, color: colors.secondaryText }}
                >
                  <Text style={{ fontFamily: "M-Bold" }}>Did You know:</Text>
                  <Text> {fact}</Text>
                </Text>
              </View>
            </>
          ) : (
            <View style={{ ...styles.monthlyWrap, alignItems: "center" }}>
              <CountdownCircleTimer
                isPlaying
                duration={20}
                strokeWidth={15}
                colors={["#0B5345"]}
              >
                {renderTime}
              </CountdownCircleTimer>
              <Text style={{ ...styles.breakText, color: colors.text }}>
                Give your eyes a break!{"\n"} Look away about 20 feet (6m)
              </Text>
            </View>
          )}

          {!hideStop && scheduleType !== "Schedule" && (
            <SubmitButton
              text={startCountdown ? "Stop" : "Start"}
              onPressAction={() => {
                setStartCountdown(!startCountdown);
                if (startCountdown) {
                  setCounter(1200);
                }
              }}
            />
          )}

          {scheduleType === "Schedule" && (
            <Text style={styles.scheduledReminder}>
              Your reminders are scheduled! Check your preferences in settings.
            </Text>
          )}

          <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
            <View style={styles.bottomHelp}>
              <Ionicons
                style={{ ...styles.bottomText, fontSize: 30 }}
                name="help-circle-outline"
                color={colors.text}
              />
              <Text style={styles.bottomText}>What is the 20 20 20 Rule</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ModalSheet
          height={Dimensions.get("screen").height / 2.2}
          refRBSheet={refRBSheet}
          modalTitle="What is it?"
        >
          <View style={{ marginBottom: 120 }}>
            <Text style={{ ...styles.bottomHelpText, color: colors.text }}>
              Screen time is a big issue these days. Looking at screens too much
              can lead to eye strain.
              {"\n"}
              {"\n"}
              Every 20 minutes spent using a screen, you should try to look away
              at something that is 20 feet (6m) away from you for a total of 20
              seconds.
            </Text>
            <SubmitButton
              text="Learn more"
              onPressAction={() =>
                _openLink(
                  "https://www.healthline.com/health/eye-health/20-20-20-rule"
                )
              }
            />
          </View>
        </ModalSheet>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerWrap: {
    flexDirection: "row",
  },
  icon: {
    width: 110,
    height: 110,
  },
  headerContentWrap: {
    flexGrow: 1,
  },
  iconWrap: {
    alignSelf: "center",
  },
  monthlyWrap: {
    marginVertical: 30,
    marginBottom: 15,
  },
  monthAmountText: {
    fontFamily: "M-Bold",
    fontSize: 50,
    textAlign: "center",
    marginTop: -15,
    color: "#16A085",
  },
  monthText: {
    fontFamily: "M-Bold",
    fontSize: 15,
    textAlign: "center",
  },
  bottomHelp: {
    marginTop: 150,
  },
  bottomText: {
    fontFamily: "M-Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#21618C",
  },
  bottomHelpText: {
    fontFamily: "M-SBold",
    fontSize: 16,
    marginBottom: 20,
  },
  infoWrap: {
    marginBottom: 30,
  },
  progressWrap: {
    width: 280,
    alignSelf: "center",
    borderRadius: 7,
    borderWidth: 3,
  },
  progress: {
    alignSelf: "flex-start",
    borderRadius: 4,
    padding: 7,
    backgroundColor: "#0B5345",
  },
  didYouKnow: {
    width: 280,
    alignSelf: "center",
    fontFamily: "M-Medium",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  breakText: {
    textAlign: "center",
    fontFamily: "M-SBold",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 30,
  },
  scheduledReminder: {
    fontFamily: "M-SBold",
    fontSize: 14,
    textAlign: "center",
    width: 270,
    alignSelf: "center",
    marginTop: 30,
  },
});
