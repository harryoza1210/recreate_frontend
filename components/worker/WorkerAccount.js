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
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  CreditCardIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PowerIcon,
  UserIcon,
  CheckBadgeIcon,
  ChatBubbleLeftRightIcon,
  QueueListIcon,
} from "react-native-heroicons/solid";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WorkerNav from "./WorkerNav";
import { workerData } from "../../services/WorkerData.reducer";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import {
  EyeIcon,
  EyeSlashIcon,
  FolderIcon,
  NewspaperIcon,
  PencilIcon,
  PencilSquareIcon,
  StarIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { editWorkerPassService } from "../../services/Oneforall";

// basically fro tab

const WorkerAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const _id = useSelector((state) => state.worker)._id;
  const workerName = useSelector((state) => state.worker).name;
  const workerEmail = useSelector((state) => state.worker).email;
  const workerCity = useSelector((state) => state.worker).city;
  const workerPhone = useSelector((state) => state.worker).phone;
  const workerPincode = useSelector((state) => state.worker).pincode;
  const workerProfession = useSelector((state) => state.worker).profession;
  const workerExperience = useSelector(
    (state) => state.worker
  ).workerExperience;
  // token
  const workerToken = useSelector((state) => state.worker).token;

  // edit loader state
  const [editLoader, setEditLoad] = useState(false);

  // edit pass
  const [newPass, setNewPass] = useState("");
  const [editPassModal, setEditPassModal] = useState(false);
  const [pwd, showPwd] = useState(true);

  const logOut = () => {
    const onClickOk = () => {
      const _id = "";
      const city = "";
      const email = "";
      const name = "";
      const phone = "";
      const state = "";
      const pincode = "";
      const type = "";
      const profession = "";
      const workerExperience = "";

      const token = "";

      const user = {
        _id,
        city,
        email,
        name,
        phone,
        pincode,
        type,
        profession,
        workerExperience,
        state,
      };

      dispatch(workerData({ user, token }));

      ToastAndroid.show(
        `Log out Successfull!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );

      navigation.navigate("Login");
    };

    Alert.alert("Log out", "Are you sure , you want to log out ?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => onClickOk(),
      },
    ]);
  };

  const editPass = async () => {
    console.log("newPass: ", newPass);

    if (newPass === "") {
      return ToastAndroid.show(
        `no password added!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setEditLoad(true);

    console.log("_id: ", _id);

    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };
    console.log("headers: ", headers);

    const result = await editWorkerPassService({ _id, headers, newPass });
    console.log("result: ", result);

    const { updated, error } = result;
    console.log("updated: ", updated);

    if (error) {
      setEditLoad(false);
      setNewPass("");

      return ToastAndroid.show(
        `${error.message}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (updated) {
      setEditLoad(false);
      setEditPassModal(false);
      setNewPass("");

      const token = workerToken;
      const { _id, address, city, email, name, phone, pincode, type } = updated;

      const worker = { _id, address, city, email, name, phone, pincode, type };

      dispatch(workerData({ worker, token }));

      return ToastAndroid.show(
        `password updated successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={{ marginBottom: 100 }}>
        {/* main container */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* conatiner 1 */}
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                height: 690,
              }}
            >
              <View
                style={{
                  backgroundColor: "#30E3DF",
                  height: 430,
                  width: 200,
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                <Text style={{ fontSize: 15 }}>{workerName}</Text>
                <Text style={{ fontSize: 15 }}>{workerEmail}</Text>
                <Text style={{ fontSize: 15 }}>{workerPhone}</Text>
                <Text style={{ fontSize: 15 }}>{workerCity}</Text>
                <Text style={{ fontSize: 15 }}>
                  {workerExperience} Years of Experience
                </Text>
                <Text style={{ fontSize: 15 }}>{workerProfession}</Text>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    height: 50,
                    width: 180,
                    flexDirection: "row",

                    justifyContent: "space-evenly",
                    alignItems: "center",
                    borderRadius: 8,
                  }}
                  onPress={() => setEditPassModal(true)}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: 16,
                    }}
                  >
                    Change Password
                  </Text>
                  <PencilIcon size={22} color={"#30E3DF"} />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    width: 200,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 50,
                      width: 95,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderRadius: 8,
                    }}
                    onPress={() => logOut()}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Logout
                    </Text>
                    <PowerIcon color={"#30E3DF"} size={25} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 50,
                      width: 74,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 16,
                      }}
                    >
                      Edit
                    </Text>
                    <PencilSquareIcon color={"#30E3DF"} size={25} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#30E3DF",
                  height: 95,
                  width: 200,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 10,
                }}
                onPress={() => navigation.navigate("Termsandcondtions")}
              >
                <Text style={{ fontSize: 16, color: "black" }}>
                  Terms & Conditions
                </Text>
                <NewspaperIcon color={"white"} size={33} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#30E3DF",
                  height: 95,
                  width: 200,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 8,
                  shadowColor: "black",
                  elevation: 10,
                }}
                onPress={() => navigation.navigate("WorkerSupport")}
              >
                <Text style={{ fontSize: 16, color: "black" }}>
                  Worker support
                </Text>
                <ChatBubbleLeftRightIcon color={"white"} size={33} />
              </TouchableOpacity>
            </View>
          </View>
          {/* conatiner 2 */}
          <View style={{ height: 690, justifyContent: "space-around" }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 120,
                width: 145,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "black",
                elevation: 15,
              }}
            >
              <StarIcon color={"white"} size={33} />
              <Text style={{ fontSize: 16, color: "black" }}>My Ratings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 120,
                width: 145,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "black",
                elevation: 15,
              }}
              onPress={() => navigation.navigate("WorkerMyOrder")}
            >
              <ClipboardDocumentListIcon color={"white"} size={33} />
              <Text style={{ fontSize: 16, color: "black" }}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 120,
                width: 145,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "black",
                elevation: 15,
              }}
              onPress={() => navigation.navigate("WorkerWallet")}
            >
              <FolderIcon color={"white"} size={33} />
              <Text style={{ fontSize: 16, color: "black" }}>My Wallet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 120,
                width: 145,
                justifyContent: "space-around",
                alignItems: "center",
                borderRadius: 8,
                shadowColor: "black",
                elevation: 15,
              }}
            >
              <CheckBadgeIcon color={"white"} size={33} />
              <Text style={{ fontSize: 16, color: "black" }}>
                Verifications
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* edit password model */}
      {editPassModal ? (
        <Modal
          transparent={true}
          style={{ justifyContent: "space-around", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFFaa",
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#B9F3FC",
                height: 270,
                width: 300,
                justifyContent: "space-around",
                alignItems: "center",
                // flexDirection: "row",
                borderRadius: 5,
                borderColor: "#30E3DF",
                borderWidth: 2,
              }}
            >
              <View
                style={{
                  width: 270,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{ backgroundColor: "white", borderRadius: 3 }}
                  onPress={() => setEditPassModal(false)}
                >
                  <XMarkIcon color={"#30E3DF"} size={40} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: 180,
                  width: 270,
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "400",
                  }}
                >
                  New Password
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 280,
                  }}
                >
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      height: 40,
                      width: 200,
                      borderRadius: 3,
                      borderColor: "#30E3DF",
                      borderWidth: 2,
                    }}
                    value={newPass}
                    secureTextEntry={pwd}
                    onChangeText={(text) => setNewPass(text)}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      borderRadius: 3,
                      height: 40,
                      width: 40,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() =>
                      pwd === false ? showPwd(true) : showPwd(false)
                    }
                  >
                    {pwd === false ? (
                      <EyeSlashIcon size={35} color={"#30E3DF"} />
                    ) : (
                      <EyeIcon size={35} color={"#30E3DF"} />
                    )}
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    backgroundColor: "white",
                    width: 90,
                    height: 40,
                    borderRadius: 3,
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderColor: "#30E3DF",
                    borderWidth: 2,
                  }}
                  onPress={() => editPass()}
                >
                  {editLoader ? (
                    <ActivityIndicator color={"#30E3DF"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                      }}
                    >
                      done!
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        ""
      )}
    </KeyboardAwareScrollView>
  );
};

export default WorkerAccount;
