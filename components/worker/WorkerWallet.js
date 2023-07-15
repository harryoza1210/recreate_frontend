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
  getWalletService,
  createWalletIntentService,
  withdrawAmtService,
} from "../../services/Oneforall";
import { CurrencyRupeeIcon } from "react-native-heroicons/outline";
import { useStripe } from "@stripe/stripe-react-native";

// basically fro tab

const WorkerWallet = () => {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  const [balance, setMyBalance] = useState([]); //
  const [amount, setAmount] = useState("");

  const [modalState, setModalState] = useState(false); // modal state

  const [doneLoader, setDoneLoader] = useState(false);

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
    getMyWalletBalance();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "My Wallet",
      headerShown: true,
      headerBackVisible: true,
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
  const workerName = useSelector((state) => state.worker).name;

  const getMyWalletBalance = async () => {
    setLoader(true);
    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    const response = await getWalletService({ headers });

    const { error, myBalance } = response;

    myBalance ? setLoader(false) : setLoader(false);

    if (error) {
      return ToastAndroid.show(
        `Wallet is empty!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setMyBalance(myBalance);
    console.log("myBalance: ", myBalance);
  };

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const withdrawAmount = async () => {
    if (amount === "") {
      return ToastAndroid.show(
        `withdrawl amount not added!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    console.log("amount: ", amount);

    if (amount > balance.TotalBalance || amount > balance.length) {
      return ToastAndroid.show(
        `Insufficient balance!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    setLoader(true);

    // create payment intent ->
    const intentId = await createWalletIntentService({
      amount: Number(amount),
      headers,
    });

    const { paymentIntent, error } = intentId;
    console.log("paymentIntent: ", paymentIntent);

    if (error) {
      console.log("error: ", error);
      setLoader(false);
      return;
    }

    paymentIntent ? setLoader(false) : setLoader(false);
    // initialize pament sheet
    const initPayment = await initPaymentSheet({
      merchantDisplayName: `${workerName}`,
      paymentIntentClientSecret: paymentIntent, //payment intent
      style: "alwaysDark",
    });

    console.log("initPayment: ", initPayment);

    if (initPayment.error) {
      console.log("initPayment.error: ", initPayment.error);
      setLoader(false);
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
      const response = await withdrawAmtService({ headers, amount });

      const { error, success } = response;

      if (error) {
        return ToastAndroid.show(
          `${error.message}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      ToastAndroid.show(`${success}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);

      getMyWalletBalance();
      setModalState(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getMyWalletBalance()}
        />
      }
    >
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
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          {/* rectangle box */}
          <View
            style={{
              backgroundColor: "#30E3DF",
              borderColor: "white",
              borderWidth: 3,
              borderStyle: "dashed",
              height: 90,
              width: 130,
              top: 85,
              left: 120,
              zIndex: 1,
              borderRadius: 5,
            }}
          >
            {/* circle */}
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                height: 50,
                width: 90,
                borderRadius: 100,
                justifyContent: "space-around",
                alignItems: "center",
                top: 15,
                left: 10,
              }}
              onPress={() => setModalState(true)}
            >
              <Text style={{ fontWeight: "700" }}>withdraw</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#30E3DF",
              height: 250,
              width: 350,
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: -80,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                //   backgroundColor: "white",
                height: 230,
                width: 330,
                borderColor: "white",
                borderWidth: 3,
                borderStyle: "dashed",
              }}
            >
              <Text
                style={{
                  padding: 15,
                  fontSize: 20,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {workerName}
              </Text>
              <Text
                style={{
                  padding: 15,
                  fontSize: 20,
                  color: "grey",
                  fontWeight: "600",
                }}
              >
                Total balance:
              </Text>
              <Text
                style={{
                  padding: 15,
                  top: -20,
                  fontSize: 50,
                  color: "white",
                  fontWeight: "600",
                  // backgroundColor: "green",
                  width: 250,
                }}
              >
                {balance.length !== 0 ? balance.TotalBalance : balance.length}
              </Text>
            </View>
          </View>

          {/* transactions */}
          <View>
            {balance.length !== 0 ? (
              balance?.transaction.map((item, index) => {
                console.log("item: ", item);

                const date = new Date(item.date);

                const dd = date.getDate();
                const mm = date.getMonth();
                const yy = date.getFullYear();

                if (item.type === "deposit") {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: "green",
                        marginTop: 10,
                        width: 330,
                        height: 70,
                        borderRadius: 5,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "400",
                            color: "white",
                          }}
                        >
                          {item.type}
                        </Text>
                        <Text style={{ color: "white" }}>
                          {dd + "-" + mm + "-" + yy}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <CurrencyRupeeIcon size={25} color={"white"} />
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          {item.amount}
                        </Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View
                      key={index}
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "row",
                        backgroundColor: "red",
                        marginTop: 10,
                        width: 330,
                        height: 70,
                        borderRadius: 5,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: "400",
                            color: "white",
                          }}
                        >
                          {item.type}
                        </Text>
                        <Text style={{ color: "white" }}>
                          {dd + "-" + mm + "-" + yy}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <CurrencyRupeeIcon size={25} color={"white"} />
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          {item.amount}
                        </Text>
                      </View>
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
                  wallet is empty!
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      {/* edit password model */}
      {modalState ? (
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
                  onPress={() => {
                    setModalState(false), setAmount("");
                  }}
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
                  Withdrawl Amount
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
                    keyboardType="numeric"
                    onChangeText={(text) => setAmount(text)}
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
                  }}
                  onPress={() => withdrawAmount()}
                >
                  {doneLoader ? (
                    <ActivityIndicator color={"#30E3DF"} size={30} />
                  ) : (
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "300",
                      }}
                    >
                      withdraw
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

export default WorkerWallet;
