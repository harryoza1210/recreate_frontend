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
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// images
import Logo from "../assets/REcREATE.png";
import loginSVG from "../images/loginSVG.png";
import signupsvg from "../images/signupSVG.png";
import { useDispatch } from "react-redux";
import { workerSignupServices } from "../services/Oneforall";
import { Picker } from "@react-native-picker/picker";
import { workerData } from "../services/WorkerData.reducer";

const WorkerSignupScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [onLoad, setLoader] = useState(false);
  const [showPwd, setShowPwd] = useState(true);
  const [register, setRegistration] = useState({
    city: "",
    email: "",
    name: "",
    phone: "",
    pincode: "",
    type: "worker",
    state: "",
    profession: "",
    workerExperience: "",
    gender: "male",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  if (Platform.OS === "android") {
    useEffect(() => {
      const backAction = () => {
        navigation.navigate("Signup");
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
    }, []);
  }

  const inputColor = "#B9F3FC";

  const setFields = (value, name) => {
    setRegistration({ ...register, [name]: value });
  };

  const signUp = async () => {
    console.log("register: ", register);

    setLoader(true);

    if (
      register.address === "" ||
      register.city === "" ||
      register.email === "" ||
      register.name === "" ||
      register.password === "" ||
      register.phone === "" ||
      register.pincode === "" ||
      register.profession === "" ||
      register.state === "" ||
      register.workerExperience === ""
    ) {
      ToastAndroid.show(
        "please enter all details",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      setLoader(false);
    } else {
      const reply = await workerSignupServices(register);
      console.log("reply: ", reply);

      const { response, error } = reply;
      console.log("response: ", response);

      if (response) {
        setLoader(false);
        ToastAndroid.show(
          `Registartion Successfull!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );

        const { token, worker } = response;

        const user = worker;

        dispatch(workerData({ user, token }));
        navigation.navigate("WorkerNav");

        setRegistration({
          city: "",
          email: "",
          name: "",
          phone: "",
          pincode: "",
          type: "worker",
          state: "",
          profession: "",
          workerExperience: "",
          gender: "male",
        });
      } else if (error) {
        ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        setLoader(false);
      }
    }
  };

  if (Platform.OS === "android") {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: inputColor }}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Image source={Logo} style={{ height: 110, width: 110 }} />
          </View>

          <View
            style={{
              // margin: 20,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text style={{ fontSize: 20, marginBottom: 10 }}>
              Sign up as a{" "}
              <Text
                style={{ color: "#38b6ff", fontSize: 25, fontWeight: "700" }}
              >
                Worker
              </Text>
            </Text>
            <View>
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Name
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
                placeholder="eg: John Doe..."
                onChangeText={(text) => setFields(text, "name")}
              />
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
                placeholder="eg: johndoe@gmail.com..."
                onChangeText={(text) => setFields(text, "email")}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                    Phone
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      fontSize: 13,
                      borderRadius: 5,
                      height: 40,
                      color: "#38b6ff",
                      fontSize: 15,
                      fontWeight: "700",
                      padding: 10,
                      width: 130,
                    }}
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={(text) => setFields(text, "phone")}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                    Gender
                  </Text>
                  <Picker
                    selectedValue={register.gender}
                    onValueChange={(text) => setFields(text, "gender")}
                    mode="dropdown" // Android only
                    style={{
                      width: 150,
                      height: 40,
                      color: "#000",
                      backgroundColor: "white",
                    }}
                  >
                    <Picker.Item label="select" value="male" />
                    <Picker.Item label="male" value="male" />
                    <Picker.Item label="female" value="female" />
                  </Picker>
                </View>
              </View>
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Password
              </Text>
              <View
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={{
                    backgroundColor: "white",
                    fontSize: 13,
                    borderRadius: 5,
                    height: 40,
                    color: "#38b6ff",
                    fontSize: 15,
                    fontWeight: "700",
                    padding: 10,
                    width: 260,
                  }}
                  onChangeText={(text) => setFields(text, "password")}
                  secureTextEntry={showPwd}
                />
                <TouchableOpacity
                  onPress={() =>
                    showPwd === false ? setShowPwd(true) : setShowPwd(false)
                  }
                >
                  {showPwd === true ? (
                    <EyeIcon size={30} color={"#38b6ff"} />
                  ) : (
                    <EyeSlashIcon size={30} color={"#38b6ff"} />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                Pincode
              </Text>
              <TextInput
                style={{
                  backgroundColor: "white",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  color: "#38b6ff",
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                }}
                maxLength={6}
                keyboardType="numeric"
                onChangeText={(text) => setFields(text, "pincode")}
              />
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                    Experience
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      fontSize: 13,
                      borderRadius: 5,
                      height: 40,
                      color: "#38b6ff",
                      fontSize: 15,
                      fontWeight: "700",
                      padding: 10,
                      width: 80,
                    }}
                    maxLength={2}
                    keyboardType="numeric"
                    onChangeText={(text) => setFields(text, "workerExperience")}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                    Profession
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      fontSize: 13,
                      borderRadius: 5,
                      height: 40,
                      color: "#38b6ff",
                      fontSize: 15,
                      fontWeight: "700",
                      padding: 10,
                      width: 210,
                    }}
                    onChangeText={(text) => setFields(text, "profession")}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                    City
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      fontSize: 13,
                      borderRadius: 5,
                      height: 40,
                      color: "#38b6ff",
                      fontSize: 15,
                      fontWeight: "700",
                      padding: 10,
                      width: 130,
                    }}
                    onChangeText={(text) => setFields(text, "city")}
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 15, marginTop: 8, marginBottom: 8 }}>
                    State
                  </Text>
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      fontSize: 13,
                      borderRadius: 5,
                      height: 40,
                      color: "#38b6ff",
                      fontSize: 15,
                      fontWeight: "700",
                      padding: 10,
                      width: 160,
                    }}
                    onChangeText={(text) => setFields(text, "state")}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "#38b6ff",
                  fontSize: 13,
                  borderRadius: 5,
                  height: 40,
                  fontSize: 15,
                  fontWeight: "700",
                  padding: 10,
                  width: 300,
                  marginTop: 20,
                  marginBottom: 20,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
                onPress={() => signUp()}
              >
                {onLoad ? (
                  <ActivityIndicator size={30} color={"white"} />
                ) : (
                  <Text style={{ color: "white" }}>Create Account</Text>
                )}
              </TouchableOpacity>
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
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
    return (
      <div>
        <h3>Worker Signup page</h3>
      </div>
    );
  }
};

export default WorkerSignupScreen;
