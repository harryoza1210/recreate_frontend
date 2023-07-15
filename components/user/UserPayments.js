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
import { AtSymbolIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import {
  createPayemntIntentService,
  getAllPaymentService,
  payAmountService,
} from "../../services/Oneforall";
import { useStripe } from "@stripe/stripe-react-native";

// basically fro tab

const UserPayments = () => {
  const navigation = useNavigation();
  const [allOrders, setAllOrders] = useState([]);

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  const [modalInfo, setModalInfo] = useState("");
  const [modalState, setModalState] = useState(false);

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

  useEffect(() => {
    getAllPayments();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);

  const getAllPayments = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    const response = await getAllPaymentService({ headers });

    const { allPayments, error } = response;
    console.log("allPayments: ", allPayments);
    response ? setLoader(false) : setLoader(false);

    if (allPayments) {
      setAllOrders(allPayments);
    }

    if (error) {
      ToastAndroid.show(
        `${error.message}`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // payment gateway
  const payForService = async (item) => {
    const headers = { headers: { Authorization: `Bearer ${userToken}` } };

    setLoader(true);

    // create payment intent ->
    const intentId = await createPayemntIntentService({
      amount: item.serviceCost,
      headers,
    });

    const { paymentIntent, error } = intentId;
    console.log("paymentIntent: ", paymentIntent);

    if (error) {
      console.log("error: ", error);
      return;
    }

    paymentIntent ? setLoader(false) : setLoader(false);
    // initialize pament sheet
    const initPayment = await initPaymentSheet({
      merchantDisplayName: "reCreate",
      paymentIntentClientSecret: paymentIntent, //payment intent
      style: "alwaysDark",
    });

    console.log("initPayment: ", initPayment);

    if (initPayment.error) {
      console.log("initPayment.error: ", initPayment.error);

      return;
    }

    // present the payment sheet
    const paymentResponse = await presentPaymentSheet();

    if (paymentResponse.error) {
      console.log("paymentResponse.error: ", paymentResponse.error);
      return;
    }

    //call other payemnt gateway mechanism

    if (paymentResponse) {
      setLoader(true);
      const response = await payAmountService(item._id, headers);

      const { success, error } = response;

      if (error) {
        return ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      ToastAndroid.show(`${success}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      getAllPayments();
    }
  };

  let notDone = 0;

  if (userToken !== "") {
    return (
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => getAllPayments()}
          />
        }
      >
        <SafeAreaView style={{ marginBottom: 110 }}>
          <View style={{ backgroundColor: "#B9F3FC", height: 90 }}>
            <Text style={{ fontSize: 26, fontWeight: "300", padding: 25 }}>
              Payments
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
                  console.log("item payments: ", item);
                  console.log("_---------------------------------------------");

                  if (
                    item.order.paymentStatus !== "paid" &&
                    item.order.orderStatus === "done"
                  ) {
                    if (item.order.service) {
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: "white",
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
                          <View
                            style={{
                              // backgroundColor: "pink",
                              width: 230,
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
                                fontSize: 17,
                                fontWeight: "400",
                              }}
                            >
                              {
                                item?.service.launchedService
                                  .launchedServiceName
                              }
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "grey",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Service . {item.order.orderStatus}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "#30E3DF",
                                textAlign: "center",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Payment . {item.order.paymentStatus}
                            </Text>
                          </View>
                          {item.order.paymentStatus === "asked for payment" ? (
                            <TouchableOpacity
                              style={{
                                backgroundColor: "#30E3DF",
                                height: 40,
                                width: 85,
                                borderRadius: 3,
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                              onPress={() => payForService(item)}
                            >
                              <Text style={{ fontSize: 16, color: "white" }}>
                                PAY . {item.serviceCost}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <View
                              style={{
                                backgroundColor: "#30E3DF",
                                height: 40,
                                width: 85,
                                borderRadius: 3,
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <Text style={{ fontSize: 16, color: "white" }}>
                                PAID
                              </Text>
                            </View>
                          )}
                        </View>
                      );
                    } else if (item.order.request) {
                      return (
                        <View
                          key={index}
                          style={{
                            backgroundColor: "white",
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
                          <View
                            style={{
                              // backgroundColor: "pink",
                              width: 230,
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
                                fontSize: 17,
                                fontWeight: "400",
                              }}
                            >
                              {item.order.request}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "grey",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Service . {item.order.orderStatus}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "#30E3DF",
                                fontSize: 15,
                                textTransform: "capitalize",
                                textAlign: "center",
                              }}
                            >
                              Payment . {item.order.paymentStatus}
                            </Text>
                          </View>
                          {item.order.paymentStatus === "asked for payment" ? (
                            <TouchableOpacity
                              style={{
                                backgroundColor: "#30E3DF",
                                height: 40,
                                width: 85,
                                borderRadius: 3,
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                              onPress={() => payForService(item)}
                            >
                              <Text style={{ fontSize: 16, color: "white" }}>
                                PAY . {item.serviceCost}
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={{
                                backgroundColor: "#30E3DF",
                                height: 40,
                                width: 60,
                                borderRadius: 3,
                                justifyContent: "space-around",
                                alignItems: "center",
                              }}
                            >
                              <Text style={{ fontSize: 16, color: "white" }}>
                                PAID
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    }
                  } else {
                    notDone = notDone + 1;
                  }

                  console.log("notDone: ", notDone);
                  console.log("allOrders.length: ", allOrders.length);

                  if (allOrders.length === notDone) {
                    console.log("notDone: ", notDone);
                    console.log("allOrders.length: ", allOrders.length);

                    return (
                      <View
                        style={{
                          justifyContent: "space-around",
                          alignItems: "center",
                          marginTop: 40,
                        }}
                        key={index}
                      >
                        <Text
                          style={{
                            color: "grey",
                            fontSize: 17,
                            fontWeight: "500",
                          }}
                        >
                          No Booked servicies completed Yet!
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
                    No Orders completed Yet!
                  </Text>
                </View>
              )}

              {/* no bookings */}
            </View>
          )}
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  } else {
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
            <Text>No Orders found!</Text>
            <Text>Please login!</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default UserPayments;
