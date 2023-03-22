import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-snap-carousel";
import { Pagination } from "react-native-snap-carousel";
import SubmitButton from "../../components/submitButton";
import { globalStyles } from "../../styles/global";
import { useTheme } from "../../contexts/themeContext";
import data from "../shared/data";
import { acceptRegister } from "../../redux/actions/defaultsActions";
import { useDispatch } from "react-redux";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(Dimensions.get("window").width);
export const CONTAINER_WIDTH = Dimensions.get("window").width * 0.6;

const Landing = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors, isDark } = useTheme();
  const isCarousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const acceptRegisterDis = () => dispatch(acceptRegister());

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View style={styles.container} key={index}>
        <Image
          source={item.imgUrl}
          style={{ ...styles.image, borderColor: colors.borderColor }}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={{ ...styles.header, color: colors.text }}
        >
          {item.title}
        </Text>
        <Text style={{ ...styles.body, color: colors.text }}>{item.body}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        ...globalStyles.background,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.landingWrap}>
        <View>
          <Image
            source={
              isDark
                ? require("../../assets/logo-white.png")
                : require("../../assets/logo.png")
            }
            style={styles.icon}
          />
        </View>
        <View style={styles.landingCarouselWrap}>
          <View>
            <Carousel
              ref={isCarousel}
              data={data}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              onSnapToItem={(index) => setActiveSlide(index)}
            />
            <Pagination
              dotsLength={3}
              activeDotIndex={activeSlide}
              dotStyle={{
                width: 15,
                height: 15,
                borderRadius: 5,
                backgroundColor: "#999",
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        </View>
        <View style={styles.landingBottom}>
          <SubmitButton text="Let me in!" onPressAction={acceptRegisterDis} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Landing;

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  landingWrap: {
    height: "100%",
  },
  landingCarouselWrap: {
    flexGrow: 1,
  },
  landingText: {
    marginTop: 25,
    fontFamily: "M-Bold",
    fontSize: 32,
  },
  landingBottom: {
    marginBottom: 30,
  },
  container: {
    borderRadius: 8,
    width: CONTAINER_WIDTH,
    alignSelf: "center",
  },
  image: {
    width: CONTAINER_WIDTH,
    height: CONTAINER_WIDTH,
    alignSelf: "center",
    borderRadius: 15,
    borderWidth: 3,
  },
  header: {
    color: "#222",
    fontSize: 24,
    fontFamily: "M-Bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  body: {
    color: "#222",
    fontSize: 14,
    fontFamily: "M-SBold",
    textAlign: "center",
    width: "90%",
    alignSelf: "center",
  },
});
