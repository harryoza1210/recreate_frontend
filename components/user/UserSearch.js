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
  ArrowTrendingUpIcon,
  AtSymbolIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSearchServiceApi } from "../../services/Oneforall";
import Logo from "../../assets/REcREATE.png";

const UserSearch = () => {
  const navigation = useNavigation();

  const [loader, setLoader] = useState(false);
  const [searchService, setSearch] = useState("");
  const [recent, setRecent] = useState([]);

  const [searchedService, setSearchedService] = useState([]);
  const [launchedService, setLaunchedService] = useState([]);

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
  // console.log("userToken: ", userToken);

  useEffect(() => {
    getRecentSearches();
  }, []);

  const storeRecentSearches = async (item) => {
    console.log("item store : ", item);

    try {
      const value = await AsyncStorage.getAllKeys();
      console.log("value in store recent: ", value);

      await AsyncStorage.setItem(item, item);
    } catch (e) {
      console.log("error :", e);
    }
  };

  const getRecentSearches = async () => {
    try {
      const value = await AsyncStorage.getAllKeys();
      console.log("value: ", value);

      // AsyncStorage.clear();

      setRecent(value);
    } catch (e) {
      console.log("e: ", e);
    }
  };

  const clear = async () => {
    const keys = await AsyncStorage.getAllKeys();
    keys.map((item) => {
      console.log("item keys: ", item);

      if (item === "persist:root") {
        console.log("cookies not deleted");
      } else {
        AsyncStorage.removeItem(item);
      }
    });
  };

  console.log("---------------------------------------------------------");

  const getSearchedService = async () => {
    try {
      console.log("search service: ", searchService);

      const result = await getSearchServiceApi({ searchService });

      const { error, isFoundLaunchedService, isFoundService } = result;
      console.log("isFoundService: ", isFoundService);
      console.log("isFoundLaunchedService: ", isFoundLaunchedService);

      if (error) {
        console.log("error :", error);
      }

      if (isFoundService.length !== 0 && isFoundLaunchedService === null) {
        const fs = [];

        fs.push(isFoundService[0].service);

        setSearchedService(fs);

        const ls = [];

        isFoundService.map((item) => {
          console.log("item pushed: ", item);
          const _id = item._id;
          const launchedService = item.launchedService;

          ls.push({ _id, launchedService });
        });

        setLaunchedService(ls);
      }

      if (isFoundService.length === 0 && isFoundLaunchedService !== null) {
        setSearchedService([]);
        console.log("isFoundLaunchedService. ", isFoundLaunchedService);

        setLaunchedService([isFoundLaunchedService]);
      }
    } catch (e) {
      console.log("e: ", e);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView>
        {/* search bar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TextInput
            placeholder="eg : carpenter.."
            style={{
              backgroundColor: "white",
              color: "black",
              height: 60,
              width: 300,
              fontSize: 18,
              padding: 10,
              borderRadius: 5,
              shadowColor: "#748c94",
              elevation: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
            onChangeText={async (text) => {
              setSearch(text);
              await getSearchedService();
              await getRecentSearches();
            }}
            value={searchService}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              height: 60,
              width: 60,
              justifyContent: "space-around",
              alignItems: "center",
              shadowColor: "#748c94",
              elevation: 10,
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => getSearchedService()}
          >
            <MagnifyingGlassIcon color={"#30E3DF"} height={"40"} width={"40"} />
          </TouchableOpacity>
        </View>
        {/*  */}
        {searchService === "" ? (
          <>
            <Text
              style={{
                fontSize: 17,
                textAlign: "center",
                marginTop: 40,
                fontWeight: "500",
                marginBottom: 20,
              }}
            >
              recent
            </Text>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 5,
                  shadowColor: "#748c94",
                  elevation: 10,
                  width: 220,
                  height: 40,
                  justifyContent: "space-around",
                  padding: 5,
                }}
                onPress={async () => {
                  await clear(), await getRecentSearches();
                }}
              >
                <Text style={{ fontSize: 17 }}>clear recent searches</Text>
                <XMarkIcon color={"#30E3DF"} height={30} width={30} />
              </TouchableOpacity>
            </View>
            {/* recent */}
            <View
              style={{
                justifyContent: "space-around",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <View
                style={{
                  // backgroundColor: "green",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  width: 350,
                  height: 500,
                }}
              >
                {recent.length !== 1 ? (
                  recent.map((item, index) => {
                    // console.log("index: ", index);
                    if (item === "persist:root") {
                      return <Text key={index}></Text>;
                    } else {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={{
                            backgroundColor: "white",
                            margin: 10,
                            justifyContent: "space-around",
                            alignItems: "center",
                            flexDirection: "row",
                            padding: 10,
                            borderRadius: 5,
                            shadowColor: "#748c94",
                            elevation: 10,
                          }}
                          onPress={async () => {
                            setSearch(item);
                            await getSearchedService();
                          }}
                        >
                          <Text style={{ fontSize: 18 }}>{item}</Text>
                          <ArrowTrendingUpIcon
                            color={"#30E3DF"}
                            height={30}
                            width={30}
                          />
                        </TouchableOpacity>
                      );
                    }
                  })
                ) : (
                  <>
                    <View
                      style={{
                        alignItems: "center",
                        width: 350,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 17,
                        }}
                      >
                        No recent found!
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </>
        ) : (
          <View>
            {searchedService.map((item, index) => {
              // console.log("===============================================");
              // console.log("item searched service: ", item);
              console.log("item.serviceImage[0]: ", item.serviceImage);

              if (index === 0) {
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
                        source={{ uri: item.serviceImage }}
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
                          {item.serviceName}
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
                        onPress={async () => {
                          console.log("item servcie :", item);
                          await storeRecentSearches(item.serviceName);
                          navigation.navigate("ServiceCategory", {
                            serviceName: `${item.serviceName}`,
                          });
                        }}
                      >
                        <Text style={{ fontSize: 16 }}>view</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })}
            {launchedService.map((item, index) => {
              console.log("===============================================");
              console.log("item launched service: ", item);

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
                      onPress={async () => {
                        await storeRecentSearches(
                          item.launchedService.launchedServiceName
                        );

                        navigation.navigate("ClickedService", {
                          clickedService: item,
                          serviceId: item._id,
                        });
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>view</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default UserSearch;
