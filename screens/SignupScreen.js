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

const SignupScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const inputColor = "#B9F3FC";

  if (Platform.OS === "android") {
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

    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, margin: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Image source={signupsvg} style={{ height: 290, width: 380 }} />
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "#38b6ff",
              }}
            >
              Sign up as a:
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
              // backgroundColor: "green",
              height: 300,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#B9F3FC",
                height: 180,
                width: 160,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
              }}
              onPress={() => navigation.navigate("UserSignup")}
            >
              <UserIcon color={"#38b6ff"} size={70} />
              <Text
                style={{
                  fontSize: 18,
                  color: "#38b6ff",
                }}
              >
                User
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#B9F3FC",
                height: 180,
                width: 160,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "#38b6ff",
              }}
              onPress={() => navigation.navigate("WorkerSignup")}
            >
              <UserGroupIcon color={"#38b6ff"} size={70} />
              <Text
                style={{
                  fontSize: 18,
                  color: "#38b6ff",
                }}
              >
                Worker
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              // backgroundColor: "green",
              // width: 225,
            }}
          >
            <Text>Already a member ?</Text>
            <TouchableOpacity
              style={{
                height: 25,
                width: 60,
                justifyContent: "space-around",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ color: "grey" }}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <div>
        <h3>Signup page</h3>
      </div>
    );
  }
};

export default SignupScreen;
