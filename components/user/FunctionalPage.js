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
import {
  AtSymbolIcon,
  PencilSquareIcon,
  PhoneArrowUpRightIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import {
  MicrophoneIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import { getAllUsersOrder } from "../../services/Oneforall";

const FunctionalPage = ({ route }) => {
  const navigation = useNavigation();

  const backAction = () => {
    navigation.navigate("UserNav");
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${pageName}`,
      headerStyle: {
        backgroundColor: "#B9F3FC",
      },
      headerTitleStyle: {
        color: "black",
      },
    });
  }, []);

  const { pageName } = route.params;

  const userToken = useSelector((state) => state.user).token;

  if (pageName === "About") {
    return (
      <>
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <View
            style={{
              width: 300,
              height: 650,
              backgroundColor: "white",
              margin: 70,
              padding: 30,
              borderRadius: 5,
              shadowColor: "black",
              elevation: 20,
            }}
          >
            <Image source={Logo} style={{ height: 100, width: 100 }} />
            <Text style={{ marginTop: 30, fontSize: 17, fontWeight: "300" }}>
              ReCreate is an application which provide services to local people
              in which we are mediator between a customer/user and a worker.
            </Text>

            <Text style={{ marginTop: 30, fontSize: 17, fontWeight: "300" }}>
              Local workers like Electrician , A.C. repairer , Geyser repairer ,
              Water purifier repairer , painter , Carpenter , Plumber etc will
              connect to our application for providing their services.
            </Text>
            <Text style={{ marginTop: 30, fontSize: 17, fontWeight: "300" }}>
              Local people before joining our system , had to search for these
              helpers , workers but , after joining our system , will get the
              services at the door step.
            </Text>
          </View>
        </View>
      </>
    );
  }

  if (pageName === "Terms and Conditions") {
    return (
      <>
        <View
          style={{
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              fontWeight: "500",
              padding: 20,
            }}
          >
            You agree and undertake to use the Website and the Service only for
            legal purposes and not to perform any illegal activity. By way of
            example, and not as a limitation, you agree and undertake that when
            using a Service, you will not:
          </Text>
          <ScrollView
            style={{
              width: 380,
              //   marginBottom: 40,
              //   padding: 20,
              height: 600,
              borderRadius: 5,
            }}
            indicatorStyle="white"
          >
            <View style={{ padding: 20 }}>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                {" "}
                Defame, abuse, harass, stalk, threaten or otherwise violate the
                legal rights of others;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Publish, post, upload, distribute or disseminate any
                inappropriate, profane, defamatory, infringing, obscene,
                indecent or unlawful topic, name, material or information;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Upload files that contain software or other material protected
                by intellectual property laws unless you own or control the
                rights thereto or have received all necessary consents;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Upload or distribute files that contain viruses, corrupted
                files, or any other similar software or programs that may damage
                the operation of the Website or another's computer;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Conduct or forward surveys, contests, pyramid schemes or chain
                letters;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Download any file posted by another user of a Service that you
                know, or reasonably should know, cannot be legally distributed
                in such manner;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Falsify or delete any author attributions, legal or other proper
                notices or proprietary designations or labels of the origin or
                source of software or other material contained in a file that is
                uploaded;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Violate any code of conduct or other guidelines, which may be
                applicable for or to any particular Service;
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Violate any applicable laws or regulations for the time being in
                force in or outside India
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Violate any of the terms and conditions of this Agreement or any
                other terms and conditions for the use of the Website contained
                elsewhere herein.
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                Exploit any of the services. We reserve the right to deprive
                individual customers of our Cash on Delivery payment option.
                Moreover, we might refuse any of our services, terminate
                accounts, and/or cancel orders at our discretion, including but
                not limited to, if we believe that customer conduct violates
                applicable law or is harmful to our interests.
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                }}
              >
                You shall not make any derogatory, defamatory, abusive,
                inappropriate, profane or indecent statement/s and/or comment/s
                about ReCreate, its associates and partners on any property
                owned by ReCreate.
              </Text>
              <Text
                style={{
                  backgroundColor: "#30E3DF",
                  margin: 10,
                  padding: 20,
                  borderRadius: 5,
                  shadowColor: "black",
                  elevation: 15,
                  marginBottom: 20,
                }}
              >
                ou will not perform any illegal activity while using the Website
                or availing any of our services.
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }
  if (pageName === "Customer Support") {
    return (
      <View style={{ marginBottom: 100 }}>
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "white",
              height: 250,
              width: 330,
              padding: 20,
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 5,
              shadowColor: "#748c94",
              elevation: 20,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Tell something you liked about our app {">>>"}
            </Text>
            <TextInput
              multiline={true}
              style={{
                backgroundColor: "#30E3DF",
                width: 230,
                height: 80,
                borderRadius: 5,
                color: "white",
                fontSize: 17,
                padding: 10,
                fontWeight: "600",
              }}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 120,
                justifyContent: "space-around",
                alignItems: "center",
                borderBottomColor: "#30E3DF",
                borderBottomWidth: 2,
                // backgroundColor: "green",
              }}
              onPress={() =>
                ToastAndroid.show(
                  `please login first`,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              }
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "500",
                  color: "#30E3DF",
                }}
              >
                Submit!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* complaints */}
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "#30E3DF",
              height: 250,
              width: 330,
              padding: 20,
              // marginTop: 0,
              marginBottom: 30,
              borderRadius: 5,
              shadowColor: "#748c94",
              elevation: 20,
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Faced Some problems , Tell us below {">>>"}
            </Text>
            <TextInput
              multiline={true}
              style={{
                backgroundColor: "white",
                width: 230,
                height: 50,
                borderRadius: 5,
                color: "#30E3DF",
                fontSize: 17,
                padding: 10,
                fontWeight: "600",
              }}
            />
            <TouchableOpacity
              style={{
                height: 40,
                width: 120,
                justifyContent: "space-around",
                alignItems: "center",
                borderBottomColor: "white",
                borderBottomWidth: 2,
                // backgroundColor: "green",
              }}
              onPress={() =>
                ToastAndroid.show(
                  `please login first`,
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              }
            >
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "500",
                  color: "white",
                }}
              >
                List Down!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  if (pageName === "Privacy Policy") {
    return (
      <>
        <View style={{ justifyContent: "space-around", alignItems: "center" }}>
          <ScrollView
            style={{
              width: 350,
              marginTop: 40,
              marginBottom: 40,
            }}
            indicatorStyle="white"
          >
            <View
              style={{
                backgroundColor: "#30E3DF",
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 13,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Jurisdiction, User Account, Password, and Security:
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                The Services available on this Website is only available to
                users residing within India. You will receive a password and
                account designation upon completing the Website's registration
                process. You are responsible for maintaining the confidentiality
                of the password and account, and are fully responsible for all
                activities that occur using your password or account. You agree
                to (a) immediately notify ReCreate of any unauthorized use of
                your password or account or any other breach of security, and
                (b) ensure that you exit from your account at the end of each
                session. ReCreate cannot and will not be liable for any loss or
                damage arising from your failure to comply with this clause.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#30E3DF",
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 13,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Services Offered:
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                ReCreate provides a number of Internet-based services through
                the website (all such services, collectively, the "Service").
                One such service enables users to purchase original merchandise
                such as footwear and accessories from various fashion and
                lifestyle brands. (Collectively, "Products"). Upon placing an
                order, myurbancountry.com shall ship the product to you and be
                entitled to its payment for the Services.
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#30E3DF",
                padding: 20,
                margin: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 13,
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Other Policies:
              </Text>
              <Text style={{ fontSize: 17, fontWeight: "300" }}>
                The User hereby consents, expresses and agrees that he has read
                and fully understands the Privacy Policy of myurbancountry.com,
                the Website. The user further consents that the terms and
                contents of such Privacy Policy are acceptable to him. The User
                also agrees that he has read and understood the ordering policy,
                payment policy, Shipping and tracking terms , Returns and
                Exchange Policy , promotional offer terms, registration
                requirement and other terms and policies published on the
                Website and fully accepts these terms.
              </Text>
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  if (pageName === "User orders") {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "My Orders",
      });
    }, []);
    const navigation = useNavigation();

    const [allOrders, setAllOrders] = useState([]);

    const [refresh, setRefresh] = useState(false); // pull-down-refresh
    const [loader, setLoader] = useState(false); // loader state

    const [modalState, setModalState] = useState(false);
    const [modalInfo, setModalInfo] = useState({
      item: "",
      bookedDt: "",
      visitDt: "",
      compare: "",
    });

    useEffect(() => {
      getAllOrders();
    }, []);

    const userToken = useSelector((state) => state.user).token;
    console.log("userToken: ", userToken);

    const getAllOrders = async () => {
      setLoader(true);
      const headers = { headers: { Authorization: `Bearer ${userToken}` } };

      const response = await getAllUsersOrder({ headers });

      const { orders, error } = response;

      if (orders) {
        setLoader(false);
        setAllOrders(orders);
      }

      if (error) {
        setLoader(false);
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }

      console.log("error: ", error);
      console.log("userOrders: ", orders);
    };

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
                  console.log("_---------------------------------------------");

                  if (item.orderStatus !== "done") {
                    if (item.service) {
                      const date = new Date(item.bookedDate);

                      const dd = date.getDate();
                      const mm = date.getMonth();
                      const yyyy = date.getFullYear();

                      const booked = dd + "-" + mm + "-" + yyyy;

                      const vdate = new Date(item.visitDate);
                      const vdd = vdate.getDate();
                      const vmm = vdate.getMonth();
                      const vyyyy = vdate.getFullYear();

                      const visit = vdd + "-" + vmm + "-" + vyyyy;
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
                              {item.service.launchedService.launchedServiceName}
                            </Text>
                            <Text
                              style={{
                                paddingTop: 4,
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              Booked dt . {booked}
                            </Text>
                            {item.orderStatus == "accepted" ? (
                              current > vdate ? (
                                <Text>Worker will visit soon!</Text>
                              ) : (
                                <Text> Visit dt . {visit} </Text>
                              )
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
                      const dd = date.getDate();
                      const mm = date.getMonth();
                      const yyyy = date.getFullYear();
                      const booked = dd + "-" + mm + "-" + yyyy;

                      // visit date
                      const vdate = new Date(item.visitDate);
                      console.log("vdate: ", vdate);
                      const vdd = vdate.getDate();
                      const vmm = vdate.getMonth();
                      const vyyyy = vdate.getFullYear();
                      const visit = vdd + "-" + vmm + "-" + vyyyy;

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
                                color: "white",
                                fontWeight: "500",
                              }}
                            >
                              {" "}
                              Booked dt . {booked}
                            </Text>
                            {item.orderStatus == "accepted" ? (
                              current > vdate ? (
                                <Text>Worker will visit soon!</Text>
                              ) : (
                                <Text> Visit dt . {visit} </Text>
                              )
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
                            <Text style={{ marginTop: 40, fontSize: 16 }}>
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
                          <Text style={{ fontSize: 16 }}>
                            Booked dt . {modalInfo.bookedDt}
                          </Text>
                          {modalInfo.item.orderStatus === "pending" ? (
                            <>
                              <Text
                                style={{
                                  fontSize: 16,
                                }}
                              >
                                ------------
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                Your service is pending{" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                to be accepted by worker!
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text
                                style={{
                                  fontSize: 16,
                                }}
                              >
                                ------------
                              </Text>

                              {new Date() > modalInfo.compare ? (
                                <Text>Service provider will visit Soon!</Text>
                              ) : (
                                <Text>
                                  Service provider will visit in{" "}
                                  {modalInfo.visitDt}
                                </Text>
                              )}
                            </>
                          )}

                          {modalInfo.item.orderStatus !== "pending" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginTop: 20,
                                backgroundColor: "white",
                                minWidth: 250,
                                maxWidth: 300,

                                height: 130,
                                borderRadius: 3,
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
                                  minHeight: 90,
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
                              minHeight: 100,
                              maxHeight: 150,
                              margin: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 16,
                                textTransform: "capitalize",
                                marginTop: 40,
                              }}
                            >
                              Requested for .{" "}
                              {
                                modalInfo.item.service.launchedService
                                  .launchedServiceName
                              }
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                              }}
                            >
                              Booked dt . {modalInfo.bookedDt}
                            </Text>
                            {modalInfo.item.visitDate === null ? (
                              <>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  ------------
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  Your service is pending{" "}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  to be accepted by worker!
                                </Text>
                              </>
                            ) : (
                              <>
                                <Text
                                  style={{
                                    fontSize: 16,
                                  }}
                                >
                                  ------------
                                </Text>
                                {new Date() > modalInfo.compare ? (
                                  <Text>Service provider will visit Soon!</Text>
                                ) : (
                                  <Text>
                                    Service provider will visit in{" "}
                                    {modalInfo.visitDt}
                                  </Text>
                                )}
                              </>
                            )}
                          </View>

                          {modalInfo.item.orderStatus !== "pending" ? (
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                marginTop: 20,
                                backgroundColor: "white",
                                minWidth: 250,
                                maxWidth: 300,

                                height: 130,
                                borderRadius: 3,
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
                                  {modalInfo.item.worker.profession}
                                </Text>
                              </View>
                              {/* line */}
                              <View
                                style={{
                                  backgroundColor: "black",
                                  minHeight: 90,
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
                                <Text>{modalInfo.item.worker.name}</Text>

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
                      )}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </Modal>
          ) : (
            ""
          )}
        </KeyboardAwareScrollView>
      </>
    );
  }

  if (pageName === "User payments") {
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: "My Payments",
      });
    }, []);

    const navigation = useNavigation();
    const [allOrders, setAllOrders] = useState([]);

    const [refresh, setRefresh] = useState(false); // pull-down-refresh
    const [loader, setLoader] = useState(false); // loader state

    useEffect(() => {
      getAllOrders();
    }, []);

    const userToken = useSelector((state) => state.user).token;
    console.log("userToken: ", userToken);

    const getAllOrders = async () => {
      setLoader(true);
      const headers = { headers: { Authorization: `Bearer ${userToken}` } };

      const response = await getAllUsersOrder({ headers });

      const { orders, error } = response;

      if (orders) {
        setLoader(false);
        setAllOrders(orders);
      }

      if (error) {
        setLoader(false);
        ToastAndroid.show(`${error}`, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      }

      console.log("error: ", error);
      console.log("userOrders: ", orders);
    };

    let notDone = 0;

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
                  console.log("_---------------------------------------------");

                  if (item.orderStatus === "done") {
                    if (item.service) {
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
                                fontSize: 17,
                                fontWeight: "400",
                              }}
                            >
                              {item.service.launchedService.launchedServiceName}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "grey",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Service . {item.orderStatus}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "#30E3DF",

                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Payment . {item.paymentStatus}
                            </Text>
                          </View>
                          {item.paymentStatus === "pending" ? (
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
                                PAY
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
                    } else if (item.request) {
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
                          <Image
                            source={Logo}
                            style={{
                              height: 60,
                              width: 60,
                              backgroundColor: "#30E3DF",
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
                                fontSize: 17,
                                fontWeight: "400",
                              }}
                            >
                              {item.request}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "grey",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Service . {item.orderStatus}
                            </Text>
                            <Text
                              style={{
                                fontWeight: "500",
                                color: "#30E3DF",
                                fontSize: 15,
                                textTransform: "capitalize",
                              }}
                            >
                              Payment . {item.paymentStatus}
                            </Text>
                          </View>
                          {item.paymentStatus === "pending" ? (
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
                                PAY
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
                          No Payments have been made yet!
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
                    No Booked servcies completed Yet!
                  </Text>
                </View>
              )}

              {/* no bookings */}
            </View>
          )}
        </KeyboardAwareScrollView>
      </>
    );
  }
};

export default FunctionalPage;
