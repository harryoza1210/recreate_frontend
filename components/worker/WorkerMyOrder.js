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
import { getWorkerAcceptedOrder, workDoneApi } from "../../services/Oneforall";

// basically fro tab

const WorkerMyOrder = () => {
  const navigation = useNavigation();

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  const [orders, setOrders] = useState([]); // orders

  const [modalState, setModalState] = useState(false); // modal state
  const [modalInfo, setModalInfo] = useState({});

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
    myOrders();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "My Accepeted Orders",
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

  const orderCompleted = async (id) => {
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

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => myOrders()} />
      }
    >
      <SafeAreaView style={{ marginBottom: 110 }}>
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
                          setModalState(true), setModalInfo(item);
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>view</Text>
                      </TouchableOpacity>
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
                  height: 500,
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
                  {/* touchable opacity */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {/* call  or edit visit data or view map */}
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
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
                      <PhoneArrowUpRightIcon color={"white"} size={40} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        backgroundColor: "#30E3DF",
                        padding: 15,
                        borderRadius: 4,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      // onPress={() => acceptOrder(modalInfo)}
                    >
                      <Text style={{ fontSize: 17, color: "white" }}>
                        View in Map
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        backgroundColor: "#30E3DF",
                        padding: 15,
                        borderRadius: 4,
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      // onPress={() => acceptOrder(modalInfo)}
                    >
                      <PencilSquareIcon color={"white"} size={40} />
                      <Text style={{ fontSize: 17, color: "white" }}>Edit</Text>
                    </TouchableOpacity>
                  </View>

                  {/*  */}
                  <TouchableOpacity
                    style={{
                      marginTop: 20,
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
                        done ?
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

export default WorkerMyOrder;
