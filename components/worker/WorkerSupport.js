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
  TrashIcon,
} from "react-native-heroicons/solid";
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WorkerNav from "./WorkerNav";
import Logo from "../../assets/REcREATE.png";
import { useSelector } from "react-redux";
import {
  deleteComplaintWorkerApi,
  getComplaintWorkerApi,
  postCompaintWorkerApi,
  postFeedbackWorkerApi,
} from "../../services/Oneforall";

const WorkerSupport = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Worker Support",
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

  useEffect(() => {
    getComplaint();
  }, []);

  const [refresh, setRefresh] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [complaint, setComplaint] = useState("");
  const [allMyComplaints, setMyComplaints] = useState([]);
  const [feedLoader, setFeedLoader] = useState(false); //button loader
  const [complaintLoader, setComplaintLoader] = useState(false); //button loader

  const [mainLoader, setMainLoader] = useState(false); // loader loader

  const workerToken = useSelector((state) => state.worker).token;

  const postFeedback = async () => {
    if (!workerToken) {
      return ToastAndroid.show(
        `Please login first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    setFeedLoader(true);

    if (feedback === "") {
      return ToastAndroid.show(
        `add your feedback first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    const reply = await postFeedbackWorkerApi({ feedback, headers });
    const { feed, error } = reply;

    feed ? setFeedLoader(false) : setFeedLoader(false);

    if (error) {
      return ToastAndroid.show(
        `${error}!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (feed) {
      setFeedback("");
      return ToastAndroid.show(
        `Thanks for your feedback!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const postComplaint = async () => {
    if (!workerToken) {
      return ToastAndroid.show(
        `Please login first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setComplaintLoader(true);

    if (complaint === "") {
      return ToastAndroid.show(
        `add your complaint first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    const reply = await postCompaintWorkerApi({ complaint, headers });
    const { addComplaint, error } = reply;
    console.log("addComplaint: ", addComplaint);

    addComplaint ? setComplaintLoader(false) : setComplaintLoader(false);

    if (error) {
      setComplaint("");
      getComplaint();
      return ToastAndroid.show(
        `${error}!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (addComplaint) {
      setComplaint("");
      getComplaint();
      return ToastAndroid.show(
        `your complaint has been added!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const getComplaint = async () => {
    if (!workerToken) {
      return ToastAndroid.show(
        `Please login first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setMainLoader(true);

    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    const reply = await getComplaintWorkerApi({ headers });
    const { myComplaints, error } = reply;
    console.log("myComplaints: ", myComplaints);

    myComplaints ? setMainLoader(false) : setMainLoader(false);

    myComplaints ? setMyComplaints(myComplaints) : setMyComplaints([]);

    if (error) {
      return ToastAndroid.show(
        `${error}!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  const deleteComplaint = async (id) => {
    if (!workerToken) {
      return ToastAndroid.show(
        `Please login first!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
    setMainLoader(true);

    const headers = { headers: { Authorization: `Bearer ${workerToken}` } };

    const reply = await deleteComplaintWorkerApi({ id, headers });
    const { feedDeleted, error } = reply;

    // feedDeleted ? setMainLoader(false) : setMainLoader(false);

    if (feedDeleted) {
      getComplaint();

      return ToastAndroid.show(
        `complaint deleted!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }

    if (error) {
      return ToastAndroid.show(
        `${error}!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => getComplaint()} />
      }
    >
      {mainLoader ? (
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
        <View style={{ marginBottom: 100 }}>
          <View
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
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
                value={feedback}
                onChangeText={(text) => setFeedback(text)}
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
                onPress={() => postFeedback()}
              >
                {feedLoader ? (
                  <ActivityIndicator color={"#30E3DF"} size={30} />
                ) : (
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "500",
                      color: "#30E3DF",
                    }}
                  >
                    Submit!
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* complaints */}
          <View
            style={{ justifyContent: "space-around", alignItems: "center" }}
          >
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
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
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
                value={complaint}
                onChangeText={(text) => setComplaint(text)}
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
                onPress={() => postComplaint()}
              >
                {complaintLoader ? (
                  <ActivityIndicator color={"white"} size={30} />
                ) : (
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    List Down!
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {allMyComplaints.length !== 0
            ? allMyComplaints.map((item, index) => {
                if (item.complaintStatus === "false") {
                  return (
                    <View
                      style={{
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginBottom: 20,
                      }}
                      key={index}
                    >
                      <View
                        style={{
                          backgroundColor: "white",
                          width: 360,
                          justifyContent: "space-around",
                          alignItems: "center",
                          flexDirection: "row",
                          padding: 10,
                          borderRadius: 5,
                          shadowColor: "#748c94",
                          elevation: 20,
                        }}
                      >
                        <View
                          style={{
                            width: 270,
                            padding: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "grey",
                              fontSize: 15,
                              fontWeight: "500",
                              margin: 5,
                            }}
                          >
                            {item._id}
                          </Text>
                          <Text>{item.complaint}</Text>
                          {item.admin ? <Text>{item.admin}</Text> : ""}
                          {item.complaintStatus === "false" ? (
                            <Text style={{ color: "red" }}>pending*</Text>
                          ) : (
                            <Text style={{ color: "green" }}>solved*</Text>
                          )}
                        </View>

                        <TouchableOpacity
                          style={{
                            backgroundColor: "#30E3DF",
                            padding: 10,
                            borderRadius: 3,
                          }}
                          onPress={() => deleteComplaint(item._id)}
                        >
                          <TrashIcon color={"white"} size={30} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              })
            : ""}
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default WorkerSupport;
