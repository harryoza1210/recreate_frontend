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
  RefreshControl,
  Modal,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import {
  AtSymbolIcon,
  PencilSquareIcon,
  PhoneArrowUpRightIcon,
  XMarkIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WorkerNav from "./WorkerNav";
import Logo from "../../assets/REcREATE.png";
import { useSelector } from "react-redux";
import {
  acceptUserOrder,
  getWorkerAcceptedOrder,
  verifyOtpServices,
  workDoneApi,
} from "../../services/Oneforall";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// basically fro tab

const WorkerAcceptedRequests = () => {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  const [orders, setOrders] = useState([]); // orders

  const [checkOtp, setCheckedOtp] = useState(""); //otp

  const [modalState, setModalState] = useState(false); // modal state
  const [modalInfo, setModalInfo] = useState("");
  const [visitDate, setVisitDate] = useState({
    vDate: "",
    vd: "",
    vm: "",
    vy: "",
  });

  const [doneLoader, setDoneLoader] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    myOrders();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerBackVisible: false,
      headerStyle: {
        backgroundColor: "#B9F3FC",
      },
      headerTitleStyle: {
        color: "black",
        fontWeight: "500",
      },
    });
  });

  const workerToken = useSelector((state) => state.worker).token;

  const myOrders = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };
    const result = await getWorkerAcceptedOrder({ headers });
    console.log("result: ", result);

    const { workerOrders, error } = result;

    if (error) {
      ToastAndroid.show(
        `${error.message}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    workerOrders ? setLoader(false) : setLoader(false);
    workerOrders ? setOrders(workerOrders) : setOrders([]);
  };

  const cdate = new Date();

  console.log("checkOtp: ", checkOtp);
  const verifyOtp = async (orderid, userid) => {
    if (checkOtp === "") {
      return ToastAndroid.show(
        `Enter Otp first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setDoneLoader(true);
    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };
    const result = await verifyOtpServices({
      orderid,
      userid,
      checkOtp,
      headers,
    });

    const { verified, error } = result;
    console.log("error: ", error);
    console.log("verified: ", verified);

    if (error) {
      setCheckedOtp("");
      setDoneLoader(false);

      return ToastAndroid.show(
        `${error.message}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (verified) {
      setDoneLoader(false);
      setModalState(false);
      setCheckedOtp("");
      myOrders();
      return ToastAndroid.show(
        `${verified}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const editVisitDate = async (date) => {
    const onClickOk = async () => {
      console.log("visit date accept order:", date);

      const vDate = date.setDate(date.getDate() + 1);
      console.log("vDate: ", new Date(vDate));

      setLoader(true);
      const headers = {
        headers: { Authorization: `Bearer ${workerToken}` },
      };
      const id = modalInfo._id;
      const visitDate = new Date(vDate);
      const result = await acceptUserOrder({ headers, id, visitDate });
      const { error, acceptOrder } = result;

      if (error) {
        ToastAndroid.show(
          `something went wrong in acceptinf order!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      setModalState(false);
      myOrders();
    };

    Alert.alert(
      "Accept Order",
      "Are you sure , you want to edit Visit date ?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => onClickOk(),
        },
      ]
    );
  };

  const orderCompleted = async (id) => {
    console.log("order funciton called ");

    const onClickOk = async () => {
      setDoneLoader(true);

      const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

      const orderStatus = "done";

      const result = await workDoneApi({ headers, id, orderStatus });

      const { error, acceptOrder } = result;

      if (error) {
        ToastAndroid.show(
          `$soemhting went wrong in work submission!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      acceptOrder ? setDoneLoader(false) : setDoneLoader(false);
      setModalState(false);

      myOrders();
    };

    Alert.alert(
      "Completed Work",
      "Are you sure , you have completed this Order ?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Ok",
          onPress: () => onClickOk(),
        },
      ]
    );
  };

  const setOntheWay = async (modalInfo) => {
    // const onClickOk = async () => {
    navigation.navigate("ViewMap", {
      item: modalInfo,
    });
    // };

    // Alert.alert(
    //   "Accept Order",
    //   `Are you moving to this address to do the service ?`,
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel",
    //     },
    //     {
    //       text: "Ok",
    //       onPress: () => onClickOk(),
    //     },
    //   ]
    // );
  };

  console.log("modalInfo.bookedDate: ", modalInfo.bookedDate);

  let notDone = 0;
  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => myOrders()} />
      }
    >
      <SafeAreaView style={{ marginBottom: 100, marginTop: -25 }}>
        {/* container */}
        {loader ? (
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
                  height: 70,
                  width: 70,
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "row",
                  borderRadius: 5,
                  borderColor: "#30E3DF",
                  borderWidth: 2,
                }}
              >
                <ActivityIndicator size={30} color={"white"} />
              </View>
            </View>
          </Modal>
        ) : (
          <View style={{ margin: 15 }}>
            {orders.length !== 0 ? (
              orders.map((item, index) => {
                console.log("item all orders: ", item);
                console.log("_---------------------------------------------");

                const vdate = new Date(item.visitDate);

                const vd = vdate.getDate();
                const vm = vdate.getMonth();
                const vy = vdate.getFullYear();

                if (item.orderStatus !== "done") {
                  if (item.service) {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#30E3DF",
                          marginTop: 10,
                          marginBottom: 10,
                          borderRadius: 5,
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          height: 80,
                          shadowColor: "black",
                          elevation: 10,
                        }}
                      >
                        <Image
                          source={{
                            uri: item.service.launchedService
                              .launchedServiceImage[0],
                          }}
                          style={{ height: 60, width: 60 }}
                        />
                        <View
                          style={{
                            // backgroundColor: "white",
                            width: 180,
                            margin: 5,
                            minHeight: 70,
                            maxHeight: "auto",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 15,
                            }}
                          >
                            {item.service.launchedService.launchedServiceName}
                          </Text>
                          {/* dates */}
                          {cdate.getDate() > vdate.getDate() &&
                          cdate.getMonth() > vdate.getMonth() &&
                          cdate.getFullYear() > vdate.getFullYear() ? (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "red",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          ) : cdate.getDate() === vdate.getDate() &&
                            cdate.getMonth() === vdate.getMonth() &&
                            cdate.getFullYear() === vdate.getFullYear() ? (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          ) : cdate.getDate() <= vdate.getDate() &&
                            cdate.getMonth() <= vdate.getMonth() &&
                            cdate.getFullYear() <= vdate.getFullYear() ? (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "red",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          )}

                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 15,
                              color: "white",
                            }}
                          >
                            {item.orderStatus}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "white",
                            height: 40,
                            width: 60,
                            borderRadius: 3,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setVisitDate({
                              vDate: vdate,
                              vd,
                              vm,
                              vy,
                            });
                            setModalState(true), setModalInfo(item);
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>view</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  } else if (item.request) {
                    return (
                      <View
                        key={index}
                        style={{
                          backgroundColor: "#30E3DF",
                          marginTop: 10,
                          marginBottom: 10,
                          borderRadius: 5,
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          minHeight: 70,
                          maxHeight: "auto",
                          shadowColor: "black",
                          elevation: 10,
                        }}
                      >
                        <Image
                          source={Logo}
                          style={{
                            height: 60,
                            width: 60,
                            backgroundColor: "white",
                            borderRadius: 3,
                          }}
                        />
                        <View
                          style={{
                            // backgroundColor: "white",
                            width: 180,
                            margin: 5,
                            minHeight: 70,
                            maxHeight: "auto",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 15,
                            }}
                          >
                            {item.request}
                          </Text>

                          {/* dates */}
                          {cdate.getDate() > vdate.getDate() &&
                          cdate.getMonth() > vdate.getMonth() &&
                          cdate.getFullYear() > vdate.getFullYear() ? (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "red",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          ) : cdate.getDate() === vdate.getDate() &&
                            cdate.getMonth() === vdate.getMonth() &&
                            cdate.getFullYear() === vdate.getFullYear() ? (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          ) : cdate.getDate() <= vdate.getDate() &&
                            cdate.getMonth() <= vdate.getMonth() &&
                            cdate.getFullYear() <= vdate.getFullYear() ? (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "grey",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                textTransform: "capitalize",
                                fontSize: 15,
                                color: "red",
                                fontWeight: "500",
                              }}
                            >
                              visit dt . {`${vd}-${vm}-${vy}`}
                            </Text>
                          )}
                          {/* dates */}
                          <Text
                            style={{
                              textTransform: "capitalize",
                              fontSize: 15,
                              color: "white",
                            }}
                          >
                            {item.orderStatus}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "white",
                            height: 40,
                            width: 60,
                            borderRadius: 3,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setVisitDate({
                              vDate: vdate,
                              vd,
                              vm,
                              vy,
                            });

                            setModalState(true), setModalInfo(item);
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>view</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                } else {
                  notDone = notDone + 1;
                }

                if (notDone === orders.length) {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: 40,
                      }}
                    >
                      <Text
                        style={{
                          color: "grey",
                          fontSize: 17,
                          fontWeight: "500",
                        }}
                      >
                        Please Accept some More Orders!
                      </Text>
                    </View>
                  );
                }
              })
            ) : (
              <View
                style={{
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginTop: 40,
                }}
              >
                <Text
                  style={{
                    color: "grey",
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  No Orders Accepted Yet!
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  Please Accept some Orders!
                </Text>
              </View>
            )}

            {/* no bookings */}
          </View>
        )}

        {/* modal info */}
        {console.log("modal info : ", modalInfo)}
        {modalState == true ? (
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
                  minHeight: 500,
                  maxHeight: 700,
                  width: 330,
                  justifyContent: "space-around",
                  alignItems: "center",
                  flexDirection: "column",
                  borderRadius: 5,
                  borderColor: "#30E3DF",
                  borderWidth: 2,
                  padding: 8,
                }}
              >
                {/* xmarkicon */}

                <View
                  style={{
                    // backgroundColor: "green",
                    width: 300,
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 40,
                      width: 40,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setModalState(false);
                    }}
                  >
                    <XMarkIcon color={"#30E3DF"} size={30} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    // backgroundColor: "pink",
                    minHeight: 450,
                    maxHeight: "auto",
                    width: 300,
                  }}
                >
                  {/* user details */}
                  <View
                    style={{
                      justifyContent: "space-around",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 16,
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 4,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#30E3DF",
                        borderRadius: 4,
                        height: 100,
                        width: 100,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                    >
                      <UserIcon size={65} color={"white"} />
                    </View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                        minHeight: 100,
                        minWidth: 150,
                        // backgroundColor: "green",
                        padding: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontWeight: "500",
                          margin: 3,
                        }}
                      >
                        {modalInfo.user.name}
                      </Text>
                      <Text
                        style={{
                          width: 125,
                          // backgroundColor: "pink",
                          color: "black",
                          fontSize: 16,
                          fontWeight: "450",
                          margin: 3,
                        }}
                      >
                        {modalInfo.user.address}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontWeight: "500",
                          margin: 3,
                        }}
                      >
                        {modalInfo.user.city}
                      </Text>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontWeight: "500",
                          margin: 3,
                        }}
                      >
                        {modalInfo.user.pincode}
                      </Text>
                    </View>
                  </View>

                  {/* dates */}
                  <View
                    style={{
                      justifyContent: "space-around",
                      alignItems: "center",

                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 4,
                      marginTop: 10,
                      height: 50,
                    }}
                  >
                    {/* dates */}
                    {cdate.getDate() > visitDate.vd &&
                    cdate.getMonth() > visitDate.vm &&
                    cdate.getFullYear() > visitDate.vy ? (
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 15,
                          color: "red",
                          fontWeight: "500",
                        }}
                      >
                        change visit date .
                        {`${visitDate.vd} - ${visitDate.vm} - ${visitDate.vy}`}
                      </Text>
                    ) : cdate.getDate() === visitDate.vd &&
                      cdate.getMonth() === visitDate.vm &&
                      cdate.getFullYear() === visitDate.vy ? (
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 15,
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        visit date .{" "}
                        {`${visitDate.vd} - ${visitDate.vm} - ${visitDate.vy}`}
                      </Text>
                    ) : cdate.getDate() <= visitDate.vd &&
                      cdate.getMonth() <= visitDate.vm &&
                      cdate.getFullYear() <= visitDate.vy ? (
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 15,
                          color: "grey",
                          fontWeight: "500",
                        }}
                      >
                        visit date .{" "}
                        {`${visitDate.vd} - ${visitDate.vm} - ${visitDate.vy}`}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 15,
                          color: "red",
                          fontWeight: "500",
                        }}
                      >
                        change visit date .
                        {`${visitDate.vd} - ${visitDate.vm} - ${visitDate.vy}`}
                      </Text>
                    )}
                    {/* dates */}
                  </View>

                  {/* otp verify */}
                  {cdate.getDate() > visitDate.vd &&
                  cdate.getMonth() > visitDate.vm &&
                  cdate.getFullYear() > visitDate.vy ? (
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        // flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 15,
                          color: "black",
                          fontWeight: "500",

                          backgroundColor: "white",
                          borderRadius: 4,
                          marginTop: 10,
                          height: 50,
                          width: 300,
                          textAlign: "center",
                          paddingTop: 15,
                        }}
                      >
                        {modalInfo.orderStatus}
                      </Text>
                    </View>
                  ) : cdate.getDate() === visitDate.vd &&
                    cdate.getMonth() === visitDate.vm &&
                    cdate.getFullYear() === visitDate.vy ? (
                    // green
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {modalInfo.orderStatus === "accepted" ? (
                        <>
                          <Text
                            style={{
                              textTransform: "uppercase",
                              fontSize: 15,
                              color: "black",
                              fontWeight: "500",

                              backgroundColor: "white",
                              // padding: 10,
                              borderRadius: 4,
                              marginTop: 10,
                              height: 50,
                              width: 150,
                              textAlign: "center",
                              paddingTop: 15,
                            }}
                          >
                            {modalInfo.orderStatus}
                          </Text>
                          <TextInput
                            style={{
                              textTransform: "uppercase",
                              fontSize: 17,
                              color: "black",
                              fontWeight: "500",
                              backgroundColor: "white",
                              padding: 10,
                              borderRadius: 4,
                              marginTop: 10,
                              height: 50,
                              width: 130,
                            }}
                            maxLength={6}
                            keyboardType="number-pad"
                            placeholder="OTP..."
                            value={checkOtp}
                            onChangeText={(text) => setCheckedOtp(text)}
                          />
                        </>
                      ) : (
                        <Text
                          style={{
                            textTransform: "uppercase",
                            fontSize: 15,
                            color: "black",
                            fontWeight: "500",

                            backgroundColor: "white",
                            // padding: 10,
                            borderRadius: 4,
                            marginTop: 10,
                            height: 50,
                            width: 300,
                            textAlign: "center",
                            paddingTop: 15,
                          }}
                        >
                          {modalInfo.orderStatus}
                        </Text>
                      )}
                    </View>
                  ) : cdate.getDate() <= visitDate.vd &&
                    cdate.getMonth() <= visitDate.vm &&
                    cdate.getFullYear() <= visitDate.vy ? (
                    // green
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      {modalInfo.orderStatus === "accepted" ? (
                        <>
                          <Text
                            style={{
                              textTransform: "uppercase",
                              fontSize: 15,
                              color: "black",
                              fontWeight: "500",

                              backgroundColor: "white",
                              // padding: 10,
                              borderRadius: 4,
                              marginTop: 10,
                              height: 50,
                              width: 150,
                              textAlign: "center",
                              paddingTop: 15,
                            }}
                          >
                            {modalInfo.orderStatus}
                          </Text>
                          <TextInput
                            style={{
                              textTransform: "uppercase",
                              fontSize: 17,
                              color: "black",
                              fontWeight: "500",
                              backgroundColor: "white",
                              padding: 10,
                              borderRadius: 4,
                              marginTop: 10,
                              height: 50,
                              width: 130,
                            }}
                            maxLength={6}
                            keyboardType="number-pad"
                            placeholder="OTP..."
                            value={checkOtp}
                            onChangeText={(text) => setCheckedOtp(text)}
                          />
                        </>
                      ) : (
                        <Text
                          style={{
                            textTransform: "uppercase",
                            fontSize: 15,
                            color: "black",
                            fontWeight: "500",

                            backgroundColor: "white",
                            // padding: 10,
                            borderRadius: 4,
                            marginTop: 10,
                            height: 50,
                            width: 300,
                            textAlign: "center",
                            paddingTop: 15,
                          }}
                        >
                          {modalInfo.orderStatus}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        // flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          textTransform: "uppercase",
                          fontSize: 15,
                          color: "black",
                          fontWeight: "500",

                          backgroundColor: "white",
                          borderRadius: 4,
                          marginTop: 10,
                          height: 50,
                          width: 300,
                          textAlign: "center",
                          paddingTop: 15,
                        }}
                      >
                        {modalInfo.orderStatus}
                      </Text>
                    </View>
                  )}

                  {/* touchable opacity 3 buttons */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {/* call  or edit visit data or view map */}
                    {/* call */}
                    <TouchableOpacity
                      style={{
                        marginTop: 13,
                        backgroundColor: "#30E3DF",
                        padding: 15,
                        borderRadius: 4,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        Linking.openURL(`tel:${modalInfo.user.phone}`);
                      }}
                    >
                      <PhoneArrowUpRightIcon color={"white"} size={25} />
                    </TouchableOpacity>

                    {/* view in map */}
                    {cdate.getDate() > visitDate.vd &&
                    cdate.getMonth() > visitDate.vm &&
                    cdate.getFullYear() > visitDate.vy ? (
                      <TouchableOpacity
                        style={{
                          marginTop: 13,
                          backgroundColor: "#30E3DF",
                          padding: 15,
                          borderRadius: 4,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          ToastAndroid.show(
                            `Enter Otp first!`,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                          );
                        }}
                      >
                        <Text style={{ fontSize: 17, color: "white" }}>
                          View in Map
                        </Text>
                      </TouchableOpacity>
                    ) : cdate.getDate() === visitDate.vd &&
                      cdate.getMonth() === visitDate.vm &&
                      cdate.getFullYear() === visitDate.vy ? (
                      // green
                      <TouchableOpacity
                        style={{
                          marginTop: 13,
                          backgroundColor: "#30E3DF",
                          padding: 15,
                          borderRadius: 4,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setOntheWay(modalInfo);
                          setModalState(false);
                        }}
                      >
                        <Text style={{ fontSize: 17, color: "white" }}>
                          View in Map
                        </Text>
                      </TouchableOpacity>
                    ) : cdate.getDate() <= visitDate.vd &&
                      cdate.getMonth() <= visitDate.vm &&
                      cdate.getFullYear() <= visitDate.vy ? (
                      // green
                      <TouchableOpacity
                        style={{
                          marginTop: 13,
                          backgroundColor: "#30E3DF",
                          padding: 15,
                          borderRadius: 4,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          setOntheWay(modalInfo);
                          setModalState(false);
                        }}
                      >
                        <Text style={{ fontSize: 17, color: "white" }}>
                          View in Map
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          marginTop: 13,
                          backgroundColor: "#30E3DF",
                          padding: 15,
                          borderRadius: 4,
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          ToastAndroid.show(
                            `Edit visit date first!`,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                          );
                        }}
                      >
                        <Text style={{ fontSize: 17, color: "white" }}>
                          View in Map
                        </Text>
                      </TouchableOpacity>
                    )}

                    {/* edit date */}
                    <TouchableOpacity
                      style={{
                        marginTop: 13,
                        backgroundColor: "#30E3DF",
                        padding: 15,
                        borderRadius: 4,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setDatePickerVisibility(true);
                      }}
                    >
                      <Text style={{ fontSize: 17, color: "white" }}>Edit</Text>
                    </TouchableOpacity>
                  </View>

                  {/* otp , doneOrder buttons */}
                  {cdate.getDate() > visitDate.vd &&
                  cdate.getMonth() > visitDate.vm &&
                  cdate.getFullYear() > visitDate.vy ? (
                    ""
                  ) : cdate.getDate() === visitDate.vd &&
                    cdate.getMonth() === visitDate.vm &&
                    cdate.getFullYear() === visitDate.vy ? (
                    // green
                    <View style={{ width: 300 }}>
                      {modalInfo.orderStatus === "progress" ? (
                        // order completed
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            backgroundColor: "#30E3DF",
                            padding: 15,
                            borderRadius: 4,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() => orderCompleted(modalInfo._id)}
                        >
                          {doneLoader ? (
                            <ActivityIndicator color={"white"} size={20} />
                          ) : (
                            <Text style={{ fontSize: 17, color: "white" }}>
                              completed ?
                            </Text>
                          )}
                        </TouchableOpacity>
                      ) : (
                        // verify otp
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            backgroundColor: "#30E3DF",
                            padding: 15,
                            borderRadius: 4,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            verifyOtp(modalInfo._id, modalInfo.user._id)
                          }
                        >
                          {doneLoader ? (
                            <ActivityIndicator color={"white"} size={20} />
                          ) : (
                            <Text style={{ fontSize: 17, color: "white" }}>
                              verify OTP
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : cdate.getDate() <= visitDate.vd &&
                    cdate.getMonth() <= visitDate.vm &&
                    cdate.getFullYear() <= visitDate.vy ? (
                    // green
                    <View style={{ width: 300 }}>
                      {modalInfo.orderStatus === "progress" ? (
                        // order completed
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            backgroundColor: "#30E3DF",
                            padding: 15,
                            borderRadius: 4,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() => orderCompleted(modalInfo._id)}
                        >
                          {doneLoader ? (
                            <ActivityIndicator color={"white"} size={20} />
                          ) : (
                            <Text style={{ fontSize: 17, color: "white" }}>
                              completed ?
                            </Text>
                          )}
                        </TouchableOpacity>
                      ) : (
                        // verify otp
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            backgroundColor: "#30E3DF",
                            padding: 15,
                            borderRadius: 4,
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            verifyOtp(modalInfo._id, modalInfo.user._id)
                          }
                        >
                          {doneLoader ? (
                            <ActivityIndicator color={"white"} size={20} />
                          ) : (
                            <Text style={{ fontSize: 17, color: "white" }}>
                              verify OTP
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    ""
                  )}
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          ""
        )}

        {/*----------------------------------------------------------------------- date modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            editVisitDate(date);
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
          minimumDate={new Date(modalInfo.bookedDate) || new Date()}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default WorkerAcceptedRequests;
