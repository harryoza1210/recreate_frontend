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
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { userData } from "../../services/UserData.reducer";
import {
  CreditCardIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  PowerIcon,
  UserIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  QueueListIcon,
  PencilIcon,
  PencilSquareIcon,
  NewspaperIcon,
  EyeSlashIcon,
  EyeIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { XMarkIcon } from "react-native-heroicons/solid";
import { editUserPassService } from "../../services/Oneforall";

// basically fro tab

const UserAccount = () => {
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

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const name = useSelector((state) => state.user).name;
  console.log("name: ", name);
  const phone = useSelector((state) => state.user).phone;
  console.log("phone: ", phone);
  const address = useSelector((state) => state.user).address;
  const city = useSelector((state) => state.user).city;
  const pincode = useSelector((state) => state.user).pincode;
  const email = useSelector((state) => state.user).email;
  const _id = useSelector((state) => state.user)._id;

  // edit loader state
  const [editLoader, setEditLoad] = useState(false);

  // edit pass
  const [newPass, setNewPass] = useState("");
  const [editPassModal, setEditPassModal] = useState(false);
  const [pwd, showPwd] = useState(true);

  // edit user
  const [editData, setEditData] = useState({
    name,
    phone: phone.toString(),
    address,
    city,
    pincode: pincode.toString(),
  });
  const [editDataModal, setEditDataModal] = useState(false);

  console.log("editData: ", editData);

  const logOut = () => {
    const onClickOk = () => {
      const token = "";
      const _id = "";
      const address = "";
      const city = "";
      const email = "";
      const name = "";
      const phone = "";
      const pincode = "";
      const type = "";

      const user = { _id, address, city, email, name, phone, pincode, type };

      dispatch(userData({ user, token }));
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

    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const result = await editUserPassService({ _id, headers, newPass });

    const { updated, error } = result;

    if (error) {
      setEditLoad(false);
      setNewPass("");

      return ToastAndroid.show(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (updated) {
      setEditLoad(false);
      setEditPassModal(false);
      setNewPass("");

      const token = userToken;
      const { _id, address, city, email, name, phone, pincode, type } = updated;

      const user = { _id, address, city, email, name, phone, pincode, type };

      dispatch(userData({ user, token }));

      return ToastAndroid.show(
        `password updated successfully!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const editUser = async () => {
    console.log("editData: ", editData);
  };

  if (userToken !== "") {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView style={{ marginBottom: 120 }}>
          <View
            style={{
              backgroundColor: "#B9F3FC",
              padding: 25,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "black",
                fontWeight: "500",
              }}
            >
              My Account
            </Text>
          </View>
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
                  <Text style={{ fontSize: 15 }}>{name}</Text>
                  <Text style={{ fontSize: 15 }}>{phone}</Text>
                  <Text style={{ fontSize: 15 }}>{address}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      width: 180,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{city}</Text>
                    <Text style={{ fontSize: 15 }}>{pincode}</Text>
                  </View>
                  <Text style={{ fontSize: 15 }}>{email}</Text>

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
                      onPress={() => setEditDataModal(true)}
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
                  onPress={() =>
                    navigation.navigate("FunctionalPage", {
                      pageName: "Terms and Conditions",
                    })
                  }
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
                  onPress={() => navigation.navigate("UserSupport")}
                >
                  <Text style={{ fontSize: 16, color: "black" }}>
                    Customer support
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
                onPress={() =>
                  navigation.navigate("FunctionalPage", {
                    pageName: "About",
                  })
                }
              >
                <InformationCircleIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>About</Text>
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
                onPress={() =>
                  navigation.navigate("FunctionalPage", {
                    pageName: "User orders",
                  })
                }
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
                onPress={() =>
                  navigation.navigate("FunctionalPage", {
                    pageName: "User payments",
                  })
                }
              >
                <CreditCardIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>
                  My Payments
                </Text>
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
                onPress={() =>
                  navigation.navigate("FunctionalPage", {
                    pageName: "Privacy Policy",
                  })
                }
              >
                <QueueListIcon color={"white"} size={33} />
                <Text style={{ fontSize: 16, color: "black" }}>
                  Privacy policy
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

        {/* edit User model */}
        {editDataModal ? (
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
                  height: 470,
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
                    onPress={() => setEditDataModal(false)}
                  >
                    <XMarkIcon color={"#30E3DF"} size={40} />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 380,
                    width: 270,
                    justifyContent: "space-around",
                    alignItems: "center",
                    // backgroundColor: "green",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                    }}
                  >
                    Update Profile
                  </Text>
                  <View
                    style={{
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
                        margin: 5,
                        textAlign: "center",
                        color: "black",
                      }}
                      placeholder={editData.name}
                      value={editData.name}
                      onChangeText={(text) => setEditData({ name : text })}
                    />

                    <TextInput
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        height: 60,
                        width: 200,
                        borderRadius: 3,
                        borderColor: "#30E3DF",
                        borderWidth: 2,
                        margin: 5,
                        textAlign: "center",
                      }}
                      placeholder={editData.address}
                      value={editData.address}
                      onChangeText={(text) => setEditData({ address: text })}
                    />

                    <TextInput
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        height: 40,
                        width: 200,
                        borderRadius: 3,
                        borderColor: "#30E3DF",
                        borderWidth: 2,
                        margin: 5,
                        textAlign: "center",
                      }}
                      placeholder={editData.phone}
                      value={editData.phone}
                      onChangeText={(text) =>
                        setEditData({ phone: Number(text) })
                      }
                    />

                    <TextInput
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        height: 40,
                        width: 200,
                        borderRadius: 3,
                        borderColor: "#30E3DF",
                        borderWidth: 2,
                        margin: 5,
                        textAlign: "center",
                      }}
                      placeholder={editData.city}
                      value={editData.city}
                      onChangeText={(text) => setEditData({ city: text })}
                    />

                    <TextInput
                      style={{
                        backgroundColor: "white",
                        padding: 10,
                        height: 40,
                        width: 200,
                        borderRadius: 3,
                        borderColor: "#30E3DF",
                        borderWidth: 2,
                        margin: 5,
                        textAlign: "center",
                      }}
                      placeholder={editData.pincode}
                      value={editData.pincode}
                      onChangeText={(text) =>
                        setEditData({ pincode: Number(text) })
                      }
                    />
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
                      margin: 5,
                    }}
                    onPress={() => editUser()}
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
                        update!
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
  } else {
    return (
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View
            style={{
              backgroundColor: "#B9F3FC",
              padding: 25,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: "black",
                fontWeight: "500",
              }}
            >
              My Account
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: 25,
              //   backgroundColor: "green",
              margin: 15,
              height: 630,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-around",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
                  pageName: "About",
                })
              }
            >
              <InformationCircleIcon color={"white"} size={33} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                About
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
                  pageName: "Terms and Conditions",
                })
              }
            >
              <NewspaperIcon color={"white"} size={33} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
                  pageName: "Customer Support",
                })
              }
            >
              <ChatBubbleLeftRightIcon color={"white"} size={33} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Customer support
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
              onPress={() =>
                navigation.navigate("FunctionalPage", {
                  pageName: "Privacy Policy",
                })
              }
            >
              <QueueListIcon color={"white"} size={33} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                Privacy policy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#30E3DF",
                height: 70,
                width: 300,
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 8,
                // padding: 15,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              <PowerIcon color={"white"} size={40} />
              <Text
                style={{
                  fontSize: 19,
                  color: "white",
                  //   backgroundColor: "pink",
                  width: 200,
                }}
              >
                login
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
};

export default UserAccount;
