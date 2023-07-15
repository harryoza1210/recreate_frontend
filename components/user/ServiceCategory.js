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
import { useNavigation, StackActions } from "@react-navigation/native";
import { AtSymbolIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import { XMarkIcon } from "react-native-heroicons/outline";
import {
  getServiceCatgeory,
  getAllServicesApi,
  bookService,
} from "../../services/Oneforall";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ServiceCategory = ({ route }) => {
  const [loader, setLoader] = useState(false); // loader state
  const userToken = useSelector((state) => state.user).token;

  const navigation = useNavigation();
  // console.log("route: ", route.params);
  const { serviceName } = route.params;

  const backAction = () => {
    // const popAction = StackActions.pop(1);
    navigation.navigate("UserNav");
    // navigation.canGoBack(true);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  // -------------------------
  // date picker
  const minDate = new Date();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${serviceName}s`,
      headerStyle: {
        backgroundColor: "#B9F3FC",
      },
    });
  }, []);

  useEffect(() => {
    getParticularService();
    getAllServices();
  }, []);

  const [refresh, setRefresh] = useState(false); // pull-down-refresh
  const [category, setCategory] = useState([]);

  const [newService, setNewService] = useState([]);

  const [bookLoader, setBookLoader] = useState(false);

  const [request, setRequest] = useState("");

  const getParticularService = async () => {
    setLoader(true);
    const result = await getServiceCatgeory({ serviceName });

    const { error, isFoundService } = result;
    // console.log("isFoundService: ", isFoundService);

    result ? setLoader(false) : setLoader(false);

    isFoundService ? setCategory(isFoundService) : setCategory([]);

    if (error) {
      console.log("error : ", error);
    }
  };

  // other services:
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
  };

  const bookClickedService = async (date) => {
    if (!isNaN(request)) {
      return ToastAndroid.show(
        `Text only!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    const onClickOk = async () => {
      setBookLoader(true);

      if (userToken !== "") {
        const bDate = date.setDate(date.getDate() + 1);
        console.log("bDate: ", new Date(bDate));
        const bookedDate = new Date(bDate);

        const headers = { headers: { Authorization: `Bearer ${userToken}` } };
        const result = await bookService({
          headers,
          request,
          serviceName,
          bookedDate,
        });
        const { newBookedService, error } = result;
        if (error) {
          ToastAndroid.show(
            `${error.message}`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
        if (newBookedService) {
          ToastAndroid.show(
            `Service was booked successfully!`,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
        newBookedService ? setBookLoader(false) : setBookLoader(false);
        newBookedService ? setRequest("") : setRequest("");
      } else {
        ToastAndroid.show(
          `please login first!`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    };

    Alert.alert(
      "Book Clicked Service",
      "Are you sure , you want to book this Service ?",
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

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={async () => await getParticularService()}
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
        <View>
          {category.map((item, index) => {
            if (item.service && index === 0) {
              return (
                <View key={index}>
                  <Image
                    source={{ uri: item.service.serviceImage }}
                    style={{
                      backgroundColor: "white",
                      height: 250,
                      width: 400,
                    }}
                  />
                  <Text style={{ margin: 10, fontSize: 20 }}>
                    {item.service.serviceName} related services
                  </Text>
                </View>
              );
            }
          })}
          {/* list of service category */}
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
              marginTop: 10,
              flexWrap: "wrap",
            }}
          >
            {category.map((item, index) => {
              if (item.launchedService) {
                // console.log(
                //   "item.launchedService.launchedServiceImage[0]: ",
                //   item.launchedService.launchedServiceImage[0]
                // );
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: "white",
                      height: 170,
                      width: 150,
                      margin: 10,
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderRadius: 5,
                      shadowColor: "#748c94",
                      elevation: 10,
                    }}
                    onPress={() =>
                      navigation.navigate("ClickedService", {
                        clickedService: item,
                        serviceId: item._id,
                      })
                    }
                  >
                    <Image
                      source={{
                        uri: item.launchedService.launchedServiceImage[0],
                      }}
                      style={{
                        // backgroundColor: "green",
                        height: 130,
                        width: 130,
                        borderRadius: 5,
                      }}
                    />
                    <Text style={{ fontSize: 16 }}>
                      {item.launchedService.launchedServiceName}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>

          {/* adding extra request */}
          <View
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
            <View
              style={{
                backgroundColor: "#B9F3FC",
                marginTop: 20,
                marginBottom: 30,
                justifyContent: "space-around",
                alignItems: "center",
                width: 330,
                height: 250,
                borderRadius: 5,
                shadowColor: "#748c94",
                elevation: 10,
              }}
            >
              <Text style={{ fontSize: 17 }}>Something else?</Text>
              <Text style={{ fontSize: 20 }}>Add your request :</Text>
              <TextInput
                style={{
                  fontSize: 17,
                  backgroundColor: "white",
                  width: 250,
                  minHeight: 50,
                  maxHeight: 70,
                  borderRadius: 5,
                  padding: 10,
                  borderColor: "#30E3DF",
                  borderWidth: 2,
                }}
                value={request}
                multiline={true}
                onChangeText={(text) => setRequest(text)}
                keyboardType="ascii-capable"
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  height: 40,
                  width: 150,
                  alignItems: "center",
                  justifyContent: "space-around",
                  borderRadius: 5,
                  borderColor: "#30E3DF",
                  borderWidth: 2,
                }}
                onPress={() => {
                  !userToken
                    ? ToastAndroid.show(
                        `please login first`,
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      )
                    : setDatePickerVisibility(true);
                }}
              >
                {bookLoader ? (
                  <ActivityIndicator size={30} color={"#30E3DF"} />
                ) : (
                  <Text style={{ fontWeight: "500" }}>Book Request</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/*----------------------------------------------------------------------- date modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              bookClickedService(date);
              hideDatePicker();
            }}
            onCancel={hideDatePicker}
            minimumDate={minDate}
          />

          {/* other services */}
          <Text style={{ fontSize: 18, marginLeft: 15 }}>
            Other Services...
          </Text>
          <View style={{ marginTop: 20, marginBottom: 120 }}>
            {newService.map((item, index) => {
              // console.log("image link: ", item.launchedServiceImage[0]);
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
      )}
    </KeyboardAwareScrollView>
  );
};

export default ServiceCategory;
