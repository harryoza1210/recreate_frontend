import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

// basically fro tab

const OnboardScreen = () => {
  const navigation = useNavigation();
  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label) => {
    return (
      <View
        style={{
          padding: 13,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600" }}>{label}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      navigation.navigate("Onboard");
    } else if (Platform.OS === "web") {
      navigation.navigate("Login");
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const slides = [
    {
      id: 1,
      title: "Discover Service Provider near you",
      description:
        "Services like Carpenting , Plumbing , Painting etc  in this app at your door step!",
      image: require("../images/slide1.gif"),
    },
    {
      id: 2,
      title: "Become a Service Provider",
      description:
        "Provide your services through our application and generate revenue.",
      image: require("../images/slide2.gif"),
    },
    {
      id: 3,
      title: "Pay Per Use",
      description: "Just Book our Services and pay after the work is done. ",
      image: require("../images/slide3.gif"),
    },
  ];

  return (
    <AppIntroSlider
      data={slides}
      style={{
        backgroundColor: "#B9F3FC",
      }}
      renderItem={({ item }) => {
        return (
          <>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                padding: 20,
                paddingTop: 200,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 400,
                  height: 280,
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  // backgroundColor: "white",
                  marginTop: 30,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  // backgroundColor: "white",
                  marginTop: 30,
                  width: 250,
                  textAlign: "center",
                }}
              >
                {item.description}
              </Text>
            </View>
          </>
        );
      }}
      activeDotStyle={{
        backgroundColor: "white",
        width: 23,
        height: 8,
      }}
      renderNextButton={() => buttonLabel("Next")}
      showSkipButton
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Get Started")}
      onDone={() => navigation.navigate("Login")}
      onSkip={() => navigation.navigate("UserNav")}
    />
  );
};

export default OnboardScreen;
