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
import { Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WorkerNav from "./WorkerNav";
import Logo from "../../assets/REcREATE.png";
import { useSelector } from "react-redux";
import {
  AtSymbolIcon,
  PencilSquareIcon,
  PhoneArrowUpRightIcon,
  XMarkIcon,
  UserIcon,
} from "react-native-heroicons/solid";
const WorkerTNC = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `Terms and Conditions`,
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
              inappropriate, profane, defamatory, infringing, obscene, indecent
              or unlawful topic, name, material or information;
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
              Upload files that contain software or other material protected by
              intellectual property laws unless you own or control the rights
              thereto or have received all necessary consents;
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
              Upload or distribute files that contain viruses, corrupted files,
              or any other similar software or programs that may damage the
              operation of the Website or another's computer;
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
              know, or reasonably should know, cannot be legally distributed in
              such manner;
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
              Moreover, we might refuse any of our services, terminate accounts,
              and/or cancel orders at our discretion, including but not limited
              to, if we believe that customer conduct violates applicable law or
              is harmful to our interests.
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
              about ReCreate, its associates and partners on any property owned
              by ReCreate.
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
};

export default WorkerTNC;
