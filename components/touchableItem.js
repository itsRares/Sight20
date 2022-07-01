import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const TouchableItem = ({ children, onPressAction }) => {
  if (Platform.OS === "ios") {
    return (
      <TouchableWithoutFeedback onPress={onPressAction}>
        {children}
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <TouchableOpacity activeOpacity={1.0} onPress={onPressAction}>
        {children}
      </TouchableOpacity>
    );
  }
};

export default TouchableItem;

const styles = StyleSheet.create({});
