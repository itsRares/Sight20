import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { globalStyles } from "../../styles/global";
import SettingItem from "../../components/settingsItem";
import { useTheme } from "../../contexts/themeContext";
import LargeTitle from "../../components/largeTitle";
import { useSelector } from "react-redux";
import { getSecurePin } from "../../helpers/access";

const Settings = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const version = Constants.manifest.version;
  const { hideSchedule } = useSelector((state) => state.defaultsReducer);

  const _openLink = async (url) => {
    await WebBrowser.openBrowserAsync(url);
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
          text="Settings"
        />
        <View style={globalStyles.contentWrap}>
          {!hideSchedule && (
            <SettingItem
              title={"Schedule"}
              Licon={"clock"}
              Ricon={"chevron-right"}
              onPressAction={() => navigation.navigate("Schedule")}
            />
          )}
          <SettingItem
            title={"Parental Controls"}
            Licon={"lock"}
            Ricon={"chevron-right"}
            onPressAction={async () => {
              let securePin = await getSecurePin("user_pin");
              if (securePin === null) {
                navigation.navigate("ParentalControls");
              } else {
                navigation.navigate("SetPin", {
                  enterCode: true,
                  hideBack: true,
                });
              }
            }}
          />
          <View style={styles.seperator}></View>
          <SettingItem
            title={"Give Feedback"}
            Licon={"heart"}
            Ricon={"external-link-alt"}
            onPressAction={() => _openLink("https://ahhzo.me/contact")}
          />
          <SettingItem
            title={"Terms of Use"}
            Licon={"file-alt"}
            Ricon={"external-link-alt"}
            onPressAction={() => _openLink("https://ahhzo.me/projects/terms")}
          />
          <SettingItem
            title={"Privacy Policy"}
            Licon={"shield-alt"}
            Ricon={"external-link-alt"}
            onPressAction={() =>
              _openLink("https://ahhzo.me/projects/sight20/privacy")
            }
          />
          <Text style={styles.versionText}>v{version}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  seperator: {
    height: 2,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#C4C4C4",
    marginVertical: 20,
  },
  versionText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "M-SBold",
    marginTop: 30,
    color: "#A6ACAF",
  },
});
