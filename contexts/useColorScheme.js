import { Appearance } from "react-native";
import { useEffect, useCallback, useState } from "react";
import _ from "lodash";

export default function useColorScheme(delay = 250) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const onColorSchemeChange = useCallback(
    _.throttle(
      ({ colorScheme }) => {
        setColorScheme(colorScheme);
      },
      delay,
      {
        leading: false,
      }
    ),
    []
  );
  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);
    return () => {
      onColorSchemeChange.cancel();
      Appearance.removeChangeListener(onColorSchemeChange);
    };
  }, []);
  return colorScheme;
}
