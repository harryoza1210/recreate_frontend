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
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  ClipboardDocumentListIcon,
  WalletIcon,
  DocumentCheckIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// images
import Logo from "../../assets/REcREATE.png";
// import loginSVG from "../images/loginSVG.png";
// import signupsvg from "../images/signupSVG.png";

// basically fro tab

const WorkerNav = (prop) => {
  const navigation = useNavigation();

  // useEffect(() => {
  const backAction = () => {
    Alert.alert("Exit App", "Exiting the application", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );
  // }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  //   --------------------------

  return (
    <KeyboardAwareScrollView>
      <View
        style={{
          backgroundColor: "#B9F3FC",
        }}
      >
        <Image
          source={Logo}
          style={{
            height: 90,
            width: 115,
            marginLeft: 20,
          }}
        />

        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            //   backgroundColor: "green",
            height: 60,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("WorkerRequests")}
          >
            <ClipboardDocumentListIcon
              color={prop.fromRequest === true ? "#38b6ff" : "gray"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromRequest === true ? "#38b6ff" : "gray",
              }}
            >
              requests
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("WorkerAccepted")}
          >
            <DocumentCheckIcon
              color={prop.fromAccepted === true ? "#38b6ff" : "gray"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromAccepted === true ? "#38b6ff" : "gray",
              }}
            >
              accepted
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("WorkerPayment")}
          >
            <WalletIcon
              color={prop.fromPayment === true ? "#38b6ff" : "gray"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromPayment === true ? "#38b6ff" : "gray",
              }}
            >
              payments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("WorkerAccount")}
          >
            <UserCircleIcon
              color={prop.fromAccount === true ? "#38b6ff" : "gray"}
              size={33}
            />
            <Text
              style={{
                color: prop.fromAccount === true ? "#38b6ff" : "gray",
              }}
            >
              account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default WorkerNav;
