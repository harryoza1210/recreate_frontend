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
import { AtSymbolIcon, XMarkIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import {
  changeDateApi,
  deleteMyOrderService,
  getAllOtpsService,
  getAllUsersOrder,
} from "../../services/Oneforall";
import Logo from "../../assets/REcREATE.png";
import {
  PhoneArrowUpRightIcon,
  TrashIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const UserBookings = () => {
  const navigation = useNavigation();

  const [allOrders, setAllOrders] = useState([]);
  const [allOtps, setAllOtps] = useState([]);

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  const [modalState, setModalState] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    item: "",
    bookedDt: "",
    visitDt: "",
    compare: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  console.log("isDatePickerVisible: ", isDatePickerVisible);

  useEffect(() => {
    getAllOrders();
    getAllOtps();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);

  const getAllOrders = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getAllUsersOrder({ headers });

    const { orders, error } = response;

    response ? setLoader(false) : setLoader(false);

    if (orders) {
      setAllOrders(orders);
      getAllOtps();
    }

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    // console.log("error: ", error);
    // console.log("userOrders: ", orders);
  };

  const getAllOtps = async () => {
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getAllOtpsService({ headers });

    const { allOtps, error } = response;
    console.log("allOtps: ", allOtps);

    if (allOtps) {
      setAllOtps(allOtps);
    }

    if (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    console.log("error: ", error);
    console.log("otps : ", allOtps);
  };

  const deleteMyOrder = async (_id) => {
    const onClickOk = async () => {
      console.log("_id: ", _id);

      setLoader(true);
      const headers = { headers: { Authorization: `Bearer ${userToken}` } };

      const result = await deleteMyOrderService({ _id, headers });

      const { success, error } = result;

      // success ? setLoader(false) : setLoader(false);

      if (error) {
        console.log("error: ", error);
        setLoader(false);
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }

      setModalState(false);
      getAllOrders();
    };

    Alert.alert(
      "delete Order",
      "Are you sure , you want to delete this order's date ?",
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

  const changeDate = async (date) => {
    const onClickOk = async () => {
      if (userToken !== "") {
        // setLoader(true);
        console.log("userToken: ", userToken);

        const bDate = date.setDate(date.getDate() + 1);
        console.log("bDate: ", new Date(bDate));
        const bookedDate = new Date(bDate);
        console.log("bookedDate: ", bookedDate);

        const headers = { headers: { Authorization: `Bearer ${userToken}` } };

        const result = await changeDateApi(
          headers,
          modalInfo.item._id,
          bookedDate
        );

        const { success, error } = result;

        if (error) {
          setModalState(false);
          setLoader(false);

          ToastAndroid.show(
            `${error.message}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }

        if (success) {
          setModalState(false);
          setLoader(false);
          getAllOrders();
          getAllOtps();

          return ToastAndroid.show(
            `date was changed successfully!`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      } else {
        ToastAndroid.show(
          `please login first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    Alert.alert(
      "change date",
      "Are you sure , you want to change this order's date ?",
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

  if (userToken === "") {
    return (
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
            Bookings
          </Text>
        </View>
        <View
          style={{
            height: "80%",
            width: "100%",
            // backgroundColor: "green",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text>No bookings found!</Text>
            <Text>Please login!</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => getAllOrders()}
            />
          }
        >
          <SafeAreaView style={{ marginBottom: 110 }}>
            <View style={{ backgroundColor: "#B9F3FC", height: 90 }}>
              <Text style={{ fontSize: 26, fontWeight: "300", padding: 25 }}>
                Bookings
              </Text>
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
                {allOrders.length !== 0 ? (
                  allOrders.map((item, index) => {
                    console.log("item all orders: ", item);
                    console.log(
                      "_---------------------------------------------"
                    );

                    if (item.orderStatus !== "done") {
                      if (item.service) {
                        const date = new Date(item.bookedDate);

                        const dd = date.getDate() - 1;
                        const mm = date.getMonth();
                        const yyyy = date.getFullYear();

                        const booked = dd + "-" + mm + "-" + yyyy;

                        const vdate = new Date(item.visitDate);
                        const vdd = vdate.getDate();
                        const vmm = vdate.getMonth();
                        const vyyyy = vdate.getFullYear();

                        const visit = vdd + "-" + vmm + "-" + vyyyy;
                        console.log("visit - service: ", visit);
                        // console.log("item.service: ", item.service);

                        const current = new Date();
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
                                {
                                  item.service.launchedService
                                    .launchedServiceName
                                }
                              </Text>
                              <Text
                                style={{
                                  paddingTop: 4,
                                  color: "grey",
                                  fontWeight: "500",
                                }}
                              >
                                Booked dt . {booked}
                              </Text>
                              {/* visit date */}
                              {item.orderStatus == "accepted" ? (
                                current > vdate ? (
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Worker will visit soon!
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {" "}
                                    Visit dt . {visit}{" "}
                                  </Text>
                                )
                              ) : item.orderStatus === "progress" ? (
                                <Text
                                  style={{
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  {" "}
                                  Visiting dt . {visit}{" "}
                                </Text>
                              ) : (
                                ""
                              )}
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
                                setModalState(true),
                                  setModalInfo({
                                    item: item,
                                    bookedDt: booked,
                                    visitDt: visit,
                                    compare: vdate,
                                  });
                              }}
                            >
                              <Text style={{ fontSize: 16 }}>view</Text>
                            </TouchableOpacity>
                          </View>
                        );
                      } else if (item.request) {
                        // booked date
                        const date = new Date(item.bookedDate);
                        const dd = date.getDate() - 1;
                        const mm = date.getMonth();
                        const yyyy = date.getFullYear();
                        const booked = dd + "-" + mm + "-" + yyyy;

                        // visit date
                        const vdate = new Date(item.visitDate);
                        const vdd = vdate.getDate();
                        const vmm = vdate.getMonth();
                        const vyyyy = vdate.getFullYear();
                        const visit = vdd + "-" + vmm + "-" + vyyyy;
                        console.log("visit - request: ", visit);

                        // curent date
                        const current = new Date();

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
                                  paddingTop: 4,
                                  color: "grey",
                                  fontWeight: "500",
                                }}
                              >
                                {" "}
                                Booked dt . {booked}
                              </Text>
                              {item.orderStatus == "accepted" ? (
                                current > vdate ? (
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                    }}
                                  >
                                    Worker will visit soon!
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {" "}
                                    Visit dt . {visit}{" "}
                                  </Text>
                                )
                              ) : item.orderStatus === "progress" ? (
                                <Text
                                  style={{
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  {" "}
                                  Visiting dt . {visit}{" "}
                                </Text>
                              ) : (
                                ""
                              )}
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
                                setModalState(true),
                                  setModalInfo({
                                    item: item,
                                    bookedDt: booked,
                                    visitDt: visit,
                                    compare: vdate,
                                  });
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
                  </View>
                )}

                {/* no bookings */}
              </View>
            )}

            {/* modal info */}
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
                      height: 620,
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
                        //
                        height: 540,
                        width: 300,
                      }}
                    >
                      <ScrollView style={{ marginBottom: 10 }}>
                        {console.log("Model info :", modalInfo)}

                        {modalInfo.item.request ? (
                          // request
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            <View
                              style={{
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                source={Logo}
                                style={{
                                  height: 200,
                                  width: 200,
                                  backgroundColor: "white",
                                }}
                              />
                              <Text style={{ marginTop: 20, fontSize: 16 }}>
                                Personal Request
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: 16,
                                textTransform: "capitalize",
                              }}
                            >
                              Requested for . "{modalInfo.item.request}"
                            </Text>

                            {/* otp start */}
                            {allOtps.map((item, index) => {
                              if (modalInfo.item._id == item.orderid) {
                                console.log("otp found!");
                                return (
                                  <View
                                    key={index}
                                    style={{
                                      backgroundColor: "#30E3DF",
                                      marginTop: 10,
                                      marginBottom: 10,
                                      height: 40,
                                      padding: 7,
                                      borderRadius: 3,
                                      alignItems: "center",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        color: "white",
                                        fontWeight: "500",
                                      }}
                                    >
                                      OTP . {item.otp}
                                    </Text>
                                  </View>
                                );
                              } else {
                                console.log("otp not found!");
                              }
                            })}

                            {modalInfo.item.orderStatus === "pending" ||
                            modalInfo.item.orderStatus === "accepted" ? (
                              ""
                            ) : (
                              <View
                                style={{
                                  backgroundColor: "#30E3DF",
                                  marginTop: 10,
                                  marginBottom: 10,
                                  height: 40,
                                  padding: 7,
                                  borderRadius: 3,
                                  alignItems: "center",
                                  justifyContent: "space-around",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: "white",
                                    fontWeight: "500",
                                  }}
                                >
                                  work in . {modalInfo.item.orderStatus}
                                </Text>
                              </View>
                            )}
                            {/* otp end */}

                            <Text style={{ fontSize: 16, color: "#30E3DF" }}>
                              Booked dt . {modalInfo.bookedDt}
                            </Text>

                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              ------------
                            </Text>
                            {modalInfo.item.orderStatus === "pending" ? (
                              <>
                                <Text style={{ fontSize: 16, color: "grey" }}>
                                  Your service is pending{" "}
                                </Text>
                                <Text style={{ fontSize: 16, color: "grey" }}>
                                  to be accepted by worker!
                                </Text>
                              </>
                            ) : modalInfo.item.orderStatus === "accepted" ? (
                              <>
                                {new Date() >= modalInfo.compare ? (
                                  <Text style={{ fontSize: 16, color: "grey" }}>
                                    Service provider will visit Soon!
                                  </Text>
                                ) : (
                                  <Text style={{ fontSize: 16, color: "grey" }}>
                                    Service provider will visit in{" "}
                                    {modalInfo.visitDt}
                                  </Text>
                                )}
                              </>
                            ) : (
                              <View
                                style={{
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 17,
                                    color: "grey",
                                    fontWeight: "600",
                                  }}
                                >
                                  Visit dt . {modalInfo.visitDt}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    fontWeight: "600",
                                  }}
                                >
                                  {modalInfo.item.worker.name
                                    ? modalInfo.item.worker.name
                                    : "worker"}{" "}
                                  is working on this project!
                                </Text>
                              </View>
                            )}

                            {/* worker */}
                            {modalInfo.item.orderStatus === "pending" ? (
                              ""
                            ) : modalInfo.item.orderStatus === "accepted" ? (
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "space-around",
                                  alignItems: "center",
                                  marginTop: 20,
                                  backgroundColor: "white",
                                  minWidth: 250,
                                  maxWidth: 300,

                                  minHeight: 100,
                                  maxHeight: 130,
                                  borderRadius: 3,
                                  marginBottom: 10,
                                }}
                              >
                                {/* worker */}
                                <View
                                  style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <UserIcon size={50} color={"black"} />
                                  <Text
                                    style={{
                                      minWidth: 50,
                                      marginLeft: 5,
                                      marginRight: 5,
                                    }}
                                  >
                                    {modalInfo.item.worker.profession
                                      ? modalInfo.item.worker.profession
                                      : "profession"}
                                  </Text>
                                </View>
                                {/* line */}
                                <View
                                  style={{
                                    backgroundColor: "black",
                                    minHeight: 70,
                                    maxHeight: 180,
                                    width: 3,
                                  }}
                                ></View>
                                {/* worker info */}
                                <View
                                  style={{
                                    padding: 10,
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text>
                                    {modalInfo.item.worker.name
                                      ? modalInfo.item.worker.name
                                      : "worker name"}
                                  </Text>

                                  <TouchableOpacity
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                      backgroundColor: "#30E3DF",
                                      marginTop: 10,
                                      height: 40,
                                      width: 80,
                                      borderRadius: 3,
                                    }}
                                    onPress={() => {
                                      Linking.openURL(
                                        `tel:${modalInfo.item.worker.phone}`
                                      );
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "white",
                                        fontSize: 16,
                                      }}
                                    >
                                      call
                                    </Text>
                                    <PhoneArrowUpRightIcon
                                      size={30}
                                      color={"white"}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            ) : (
                              ""
                            )}
                          </View>
                        ) : (
                          // service
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            <View
                              style={{
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                            >
                              <Image
                                source={{
                                  uri: modalInfo.item.service.launchedService
                                    .launchedServiceImage[0],
                                }}
                                style={{
                                  height: 200,
                                  width: 200,
                                  backgroundColor: "white",
                                }}
                              />
                            </View>
                            <View
                              style={{
                                justifyContent: "space-around",
                                alignItems: "center",
                                // backgroundColor: "pink",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  textTransform: "capitalize",
                                  marginTop: 20,
                                }}
                              >
                                Requested for .{" "}
                                {
                                  modalInfo.item.service.launchedService
                                    .launchedServiceName
                                }
                              </Text>
                              {/* otp start */}
                              {allOtps.map((item, index) => {
                                if (modalInfo.item._id == item.orderid) {
                                  console.log("otp found!");
                                  return (
                                    <View
                                      key={index}
                                      style={{
                                        backgroundColor: "#30E3DF",
                                        marginTop: 10,
                                        marginBottom: 10,
                                        height: 40,
                                        padding: 7,
                                        borderRadius: 3,
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          color: "white",
                                          fontWeight: "500",
                                        }}
                                      >
                                        OTP . {item.otp}
                                      </Text>
                                    </View>
                                  );
                                } else {
                                  console.log("otp not found!");
                                }
                              })}

                              {modalInfo.item.orderStatus === "pending" ||
                              modalInfo.item.orderStatus === "accepted" ? (
                                ""
                              ) : (
                                <View
                                  style={{
                                    backgroundColor: "#30E3DF",
                                    marginTop: 10,
                                    marginBottom: 10,
                                    height: 40,
                                    padding: 7,
                                    borderRadius: 3,
                                    alignItems: "center",
                                    justifyContent: "space-around",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      color: "white",
                                      fontWeight: "500",
                                    }}
                                  >
                                    work in . {modalInfo.item.orderStatus}
                                  </Text>
                                </View>
                              )}
                              {/* otp end */}

                              <Text style={{ fontSize: 16, color: "#30E3DF" }}>
                                Booked dt . {modalInfo.bookedDt}
                              </Text>

                              <Text
                                style={{
                                  fontSize: 16,
                                }}
                              >
                                ------------
                              </Text>
                              {modalInfo.item.orderStatus === "pending" ? (
                                <>
                                  <Text style={{ fontSize: 16, color: "grey" }}>
                                    Your service is pending{" "}
                                  </Text>
                                  <Text style={{ fontSize: 16, color: "grey" }}>
                                    to be accepted by worker!
                                  </Text>
                                </>
                              ) : modalInfo.item.orderStatus === "accepted" ? (
                                <>
                                  {new Date() >= modalInfo.compare ? (
                                    <Text
                                      style={{ fontSize: 16, color: "grey" }}
                                    >
                                      Service provider will visit Soon!
                                    </Text>
                                  ) : (
                                    <Text
                                      style={{ fontSize: 16, color: "grey" }}
                                    >
                                      Service provider will visit in{" "}
                                      {modalInfo.visitDt}
                                    </Text>
                                  )}
                                </>
                              ) : (
                                <View
                                  style={{
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontSize: 17,
                                      color: "grey",
                                      fontWeight: "600",
                                    }}
                                  >
                                    Visit dt . {modalInfo.visitDt}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 17,
                                      fontWeight: "600",
                                    }}
                                  >
                                    {modalInfo.item.worker.name
                                      ? modalInfo.item.worker.name
                                      : "worker"}{" "}
                                    is working on this project!
                                  </Text>
                                </View>
                              )}

                              {/* worker */}
                              {modalInfo.item.orderStatus === "pending" ? (
                                ""
                              ) : modalInfo.item.orderStatus === "accepted" ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    alignItems: "center",
                                    marginTop: 20,
                                    backgroundColor: "white",
                                    minWidth: 250,
                                    maxWidth: 300,

                                    minHeight: 100,
                                    maxHeight: 130,
                                    borderRadius: 3,
                                    marginBottom: 10,
                                  }}
                                >
                                  {/* worker */}
                                  <View
                                    style={{
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                    }}
                                  >
                                    <UserIcon size={50} color={"black"} />
                                    <Text
                                      style={{
                                        minWidth: 50,
                                        marginLeft: 5,
                                        marginRight: 5,
                                      }}
                                    >
                                      {modalInfo.item.worker.profession
                                        ? modalInfo.item.worker.profession
                                        : "profession"}
                                    </Text>
                                  </View>
                                  {/* line */}
                                  <View
                                    style={{
                                      backgroundColor: "black",
                                      minHeight: 70,
                                      maxHeight: 180,
                                      width: 3,
                                    }}
                                  ></View>
                                  {/* worker info */}
                                  <View
                                    style={{
                                      padding: 10,
                                      justifyContent: "space-around",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text>
                                      {modalInfo.item.worker.name
                                        ? modalInfo.item.worker.name
                                        : "worker name"}
                                    </Text>

                                    <TouchableOpacity
                                      style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        alignItems: "center",
                                        backgroundColor: "#30E3DF",
                                        marginTop: 10,
                                        height: 40,
                                        width: 80,
                                        borderRadius: 3,
                                      }}
                                      onPress={() => {
                                        Linking.openURL(
                                          `tel:${modalInfo.item.worker.phone}`
                                        );
                                      }}
                                    >
                                      <Text
                                        style={{
                                          color: "white",
                                          fontSize: 16,
                                        }}
                                      >
                                        call
                                      </Text>
                                      <PhoneArrowUpRightIcon
                                        size={30}
                                        color={"white"}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              ) : (
                                ""
                              )}
                            </View>
                          </View>
                        )}
                      </ScrollView>

                      {/* pay */}
                      <View
                        style={{
                          flexDirection: "row",
                          // backgroundColor: "pink",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        {/* cancel */}
                        {modalInfo.item.orderStatus === "pending" ? (
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#30E3DF",
                              height: 60,
                              width: 140,
                              alignItems: "center",
                              justifyContent: "space-around",
                              borderRadius: 4,
                            }}
                            onPress={() => setDatePickerVisibility(true)}
                          >
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: "500",
                                color: "white",
                              }}
                            >
                              change date
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          ""
                        )}

                        {/* delete */}
                        {modalInfo.item.orderStatus === "pending" ? (
                          <TouchableOpacity
                            style={{
                              backgroundColor: "#30E3DF",
                              height: 60,
                              width: 60,
                              alignItems: "center",
                              justifyContent: "space-around",
                              borderRadius: 4,
                            }}
                            onPress={() => deleteMyOrder(modalInfo.item._id)}
                          >
                            <TrashIcon size={30} color={"white"} />
                          </TouchableOpacity>
                        ) : (
                          ""
                        )}
                      </View>
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
                changeDate(date);
                hideDatePicker();
              }}
              onCancel={hideDatePicker}
              minimumDate={new Date()}
            />
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </>
    );
  }
};

export default UserBookings;
