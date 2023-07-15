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
import { AtSymbolIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import { XMarkIcon } from "react-native-heroicons/outline";
import carpenterImg from "../../images/carpenter.png";
import painterImg from "../../images/painter.png";
import plumberImg from "../../images/plumber.png";
import electricianImg from "../../images/electrician.png";
import AcRepairImg from "../../images/acRepair.png";
import washingmachinerepair from "../../images/washingmachinerepair.png";
import { getAllServicesApi } from "../../services/Oneforall";

// basically fro tab

const UserServices = () => {
  const navigation = useNavigation();
  const address = useSelector((state) => state.user).address;

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [loader, setLoader] = useState(false); // loader state

  useEffect(() => {
    // getCarpenter();
    getAllServices();
  }, []);

  useLayoutEffect(() => {
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

  const [editStatus, setEditStatus] = useState(false); //edit address

  const [newService, setNewService] = useState([]);

  const userToken = useSelector((state) => state.user).token;
  // console.log("userToken: ", userToken);

  // launched service
  const getAllServices = async () => {
    setLoader(true);
    const result = await getAllServicesApi();

    const { newlyService, error } = result;
    console.log("newlyService: ", newlyService);

    if (newlyService) {
      setLoader(false);
      setNewService(newlyService);
      // setNewService([]);
    }

    if (error) {
      setLoader(false);
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }

    setLoader(false);
  };

  const updateAdd = async (text) => {
    // expo install expo-loaction
    console.log("text: ", text);
  };

  const editAddress = async () => {};

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => getAllServices()}
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
        <SafeAreaView>
          <View>
            {/* image */}
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
            {/* address */}
            {userToken !== "" ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  // backgroundColor: "pink",
                  marginTop: 15,
                  marginBottom: 20,
                }}
              >
                {editStatus === false ? (
                  <>
                    <Text
                      style={{
                        fontSize: 18,
                        width: 290,
                        padding: 8,
                        borderBottomWidth: 2,
                        borderBottomColor: "#30E3DF",
                      }}
                    >
                      {address}
                    </Text>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#30E3DF",
                        borderRadius: 4,
                        alignItems: "center",
                        justifyContent: "space-around",
                        height: 50,
                        width: 50,
                      }}
                      onPress={() => setEditStatus(true)}
                    >
                      <PencilSquareIcon color={"white"} size={40} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TextInput
                      style={{
                        fontSize: 20,
                        width: 250,
                        padding: 8,
                        borderWidth: 2,
                        borderRadius: 8,
                        borderColor: "#30E3DF",
                      }}
                      onChangeText={(text) => updateAdd(text)}
                    />

                    <TouchableOpacity
                      style={{
                        backgroundColor: "#30E3DF",
                        borderRadius: 4,
                        alignItems: "center",
                        justifyContent: "space-around",
                        height: 40,
                        width: 70,
                      }}
                    >
                      <Text style={{ color: "white" }}>update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#30E3DF",
                        borderRadius: 4,
                      }}
                      onPress={() => setEditStatus(false)}
                    >
                      <XMarkIcon size={30} color={"white"} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ) : (
              ""
            )}
            {/* cards */}
            {userToken !== "" ? "" : <View style={{ marginTop: 20 }}></View>}
            <View
              style={{
                justifyContent: "space-around",
                alignContent: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 180,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("ServiceCategory", {
                      serviceName: "Carpenter",
                    })
                  }
                >
                  <Image
                    source={carpenterImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Carpenter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 150,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("ServiceCategory", {
                      serviceName: "Painter",
                    })
                  }
                >
                  <Image
                    source={painterImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Painter</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 150,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("ServiceCategory", {
                      serviceName: "Plumber",
                    })
                  }
                >
                  <Image
                    source={plumberImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Plumbing</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    height: 120,
                    width: 180,
                    backgroundColor: "#30E3DF",
                    borderRadius: 8,
                    shadowColor: "black",
                    elevation: 10,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("ServiceCategory", {
                      serviceName: "Electrician",
                    })
                  }
                >
                  <Image
                    source={electricianImg}
                    style={{ height: 80, width: 80 }}
                  />
                  <Text style={{ fontSize: 15 }}>Electrician</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* flat list */}
            <View style={{ marginTop: 20, marginBottom: 120 }}>
              {newService.map((item, index) => {
                console.log("item: ", item);

                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      margin: 8,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "white",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: 350,
                        height: 80,
                        borderRadius: 5,
                        shadowColor: "black",
                        elevation: 7,
                      }}
                    >
                      <Image
                        source={{
                          uri: item.launchedService.launchedServiceImage[0],
                        }}
                        style={{ height: 45, width: 45 }}
                      />
                      <View
                        style={{
                          height: 40,
                          width: 175,
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            textTransform: "capitalize",
                          }}
                        >
                          {item.launchedService.launchedServiceName}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#30E3DF",
                          height: 40,
                          width: 70,
                          justifyContent: "space-around",
                          alignItems: "center",
                          borderRadius: 5,
                        }}
                        onPress={() =>
                          navigation.navigate("ClickedService", {
                            clickedService: item,
                            serviceId: item._id,
                          })
                        }
                      >
                        <Text style={{ fontSize: 16 }}>view</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </SafeAreaView>
      )}
    </KeyboardAwareScrollView>
  );
};

export default UserServices;
