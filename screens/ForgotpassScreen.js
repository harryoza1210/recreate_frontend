import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  BackHandler,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { UserIcon, UserGroupIcon } from "react-native-heroicons/outline";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// images
import Logo from "../assets/REcREATE.png";
import loginSVG from "../images/loginSVG.png";
import signupsvg from "../images/signupSVG.png";
import forgotpass from "../images/forgotpass.png";

const ForgotScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const inputColor = "#B9F3FC";

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Login");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);

  if (Platform.OS === "android") {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, margin: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={{
              marginTop: 15,
              marginLeft: 20,
              width: 120,
            }}
          >
            <Image source={Logo} style={{ height: 100, width: 100 }} />
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image source={forgotpass} style={{ height: 280, width: 250 }} />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              paddingBottom: 10,
            }}
          >
            Forgot Password ?
          </Text>

          <View
            style={{
              height: 150,
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 15, letterSpacing: 5 }}>
              Email Address
              <Text style={{ color: "grey" }}>or</Text>
              Name
            </Text>
            <TextInput
              style={{
                backgroundColor: inputColor,
                fontSize: 13,
                borderRadius: 5,
                height: 40,
                color: "#38b6ff",
                fontSize: 15,
                fontWeight: "700",
                padding: 10,
              }}
            />
            <Text style={{ fontSize: 15, letterSpacing: 5 }}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={{
                backgroundColor: inputColor,
                fontSize: 15,
                fontWeight: "700",
                borderRadius: 5,
                height: 40,
                color: "#38b6ff",
                padding: 10,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#38b6ff",
                height: 44,
                borderRadius: 5,
                flex: 0.5,
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>submit</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <>
        <h3>Forgot pass page</h3>
      </>
    );
  }
};

export default ForgotScreen;
