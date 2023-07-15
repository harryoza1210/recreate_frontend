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
  FlatList,
  RefreshControl,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AtSymbolIcon, UserIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WorkerNav from "./WorkerNav";
import Logo from "../../assets/REcREATE.png";
import { acceptUserOrder, workerOrderService } from "../../services/Oneforall";
import { useSelector } from "react-redux";
import { XMarkIcon } from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// basically fro tab

const WorkerRequests = () => {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state
  const [orders, setOrders] = useState([]);

  const [item, setItem] = useState("");

  const [modalState, setModalState] = useState(false); // modal state
  const [modalInfo, setModalInfo] = useState("");

  const workerToken = useSelector((state) => state.worker).token;
  const workerProfession = useSelector((state) => state.worker).profession;

  const [accepetedLoader, setAcceptedLoader] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  // -----------------------------

  useEffect(() => {
    getUserOrders();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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

  const getUserOrders = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    const result = await workerOrderService({ headers });

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

  const checkProfession = async (item) => {
    setItem(item);
    Alert.alert(
      "Accept Order",
      "Are you sure , you wanna accept this Order ?",
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
    const onClickOk = async () => {
      // request
      if (item.request) {
        console.log("request was found");
        console.log("item.serviceName: ", item.serviceName.toLowerCase());
        console.log("workerProfession: ", workerProfession);

        if (item.serviceName.toLowerCase() === workerProfession.toLowerCase()) {
          // console.log("item.serviceName: ", item.serviceName);
          // console.log("request was found");
          setDatePickerVisibility(true);
        } else {
          ToastAndroid.show(
            `You cannot accept this job as you are a ${workerProfession}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      }
      // service
      if (item.service) {
        if (item.service.service) {
          if (
            item.service.service.serviceName.toLowerCase() ===
            workerProfession.toLowerCase()
          ) {
            console.log("service found");

            setDatePickerVisibility(true);
          } else {
            // console.log("service not found");
            ToastAndroid.show(
              `You cannot accept this job as you are a ${workerProfession}`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
        } else if (item.service.launchedService) {
          const launchedService = new RegExp(
            item.service.launchedService.launchedServiceName,
            "i"
          );
          if (launchedService === workerProfession) {
            console.log("launched service found");

            setDatePickerVisibility(true);
          } else {
            // console.log("failure");
            ToastAndroid.show(
              `You cannot accept this job as you are a ${workerProfession}`,
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            );
          }
        } else {
          // console.log("service not found!");
          ToastAndroid.show(
            `You cannot accept this job as you are a ${workerProfession}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      }
    };
  };

  const acceptOrder = async (date) => {
    console.log("item: ", item);
    console.log("visit date accept order:", date);

    const vDate = date.setDate(date.getDate());
    console.log("vDate: ", new Date(vDate));

    setAcceptedLoader(true);
    const headers = {
      headers: { Authorization: `Bearer ${workerToken}` },
    };
    const id = item._id;
    const visitDate = new Date(vDate);
    const result = await acceptUserOrder({ headers, id, visitDate });
    const { error, acceptOrder } = result;
    acceptOrder ? setAcceptedLoader(false) : setAcceptedLoader(false);
    error ? setAcceptedLoader(false) : setAcceptedLoader(false);
    if (error) {
      ToastAndroid.show(
        `something went wrong in acceptinf order!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setItem("");
    getUserOrders();
    setModalState(false);
  };

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getUserOrders()}
        />
      }
    >
      <SafeAreaView style={{ marginBottom: 110 }}>
        <View
          style={{
            backgroundColor: "#B9F3FC",
            padding: 5,
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
        </View>
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
                // console.log("item all orders: ", item);
                console.log("_---------------------------------------------");

                if (item.orderStatus !== "done" && item.visitDate === null) {
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
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "400",
                              color: "white",
                            }}
                          >
                            {item.user.city}
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
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: "400",
                              color: "white",
                            }}
                          >
                            {item.user.city}
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
                            setModalState(true), setModalInfo(item);
                          }}
                        >
                          <Text style={{ fontSize: 16 }}>view</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }
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
                  No Services booked Yet!
                </Text>
                <Text
                  style={{
                    color: "grey",
                    fontSize: 17,
                    fontWeight: "500",
                  }}
                >
                  Please check soon!
                </Text>
              </View>
            )}

            {/* no bookings */}
          </View>
        )}

        {/*----------------------------------------------------------------------- date modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            acceptOrder(date);
            hideDatePicker();
          }}
          onCancel={hideDatePicker}
          minimumDate={new Date(modalInfo.bookedDate) || new Date()}
        />

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
                  height: 550,
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
                      setModalInfo("");
                    }}
                  >
                    <XMarkIcon color={"#30E3DF"} size={30} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    // backgroundColor: "pink",
                    height: 400,
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

                  {/* work details */}
                  <View
                    style={{
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginTop: 20,
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 4,
                    }}
                  >
                    {modalInfo.request ? (
                      <View style={{ width: 240, minHeight: 100 }}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: 20,
                            color: "grey",
                            marginBottom: 10,
                          }}
                        >
                          Request : {modalInfo.serviceName}
                        </Text>
                        <Text style={{ fontSize: 15, fontWeight: "400" }}>
                          {modalInfo.request}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          width: 270,
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={{
                            uri: modalInfo.service.launchedService
                              .launchedServiceImage[0],
                          }}
                          style={{ height: 100, width: 100, padding: 10 }}
                        />
                        <View>
                          {!modalInfo.service.service ? (
                            ""
                          ) : (
                            <Text
                              style={{
                                fontSize: 17,
                                fontWeight: "500",
                                color: "black",
                                width: 150,
                              }}
                            >
                              {modalInfo.service.service.serviceName}
                            </Text>
                          )}

                          <Text
                            style={{
                              fontSize: 17,
                              fontWeight: "500",
                              color: "grey",
                              width: 150,
                            }}
                          >
                            {
                              modalInfo.service.launchedService
                                .launchedServiceName
                            }
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>

                  {/* ACcept or reject */}

                  <TouchableOpacity
                    style={{
                      marginTop: 20,
                      backgroundColor: "#30E3DF",
                      padding: 15,
                      borderRadius: 4,
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    onPress={() => checkProfession(modalInfo)}
                  >
                    {accepetedLoader ? (
                      <ActivityIndicator color={"white"} size={20} />
                    ) : (
                      <Text style={{ fontSize: 17, color: "white" }}>
                        Accept
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
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default WorkerRequests;
