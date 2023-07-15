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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import Logo from "../../assets/REcREATE.png";
import {
  PhoneArrowUpRightIcon,
  TrashIcon,
  UserIcon,
} from "react-native-heroicons/outline";
// maps
import MapView, { Marker, Polyline } from "react-native-maps"; // npm i react-native-maps --legacy-peer-deps
// import { GOOGLE_MAPS_APIKEY } from "./googleMapKey";
// import MapViewDirections from "react-native-maps-directions";

const ViewMap = ({ route }) => {
  const { item } = route.params;
  console.log("item: ", item);
  const navigation = useNavigation();

  const [state, setState] = useState({
    pickupCords: {
      latitude: 22.9761,
      longitude: 72.6018,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    droplocationCords: {
      latitude: 23.0387,
      longitude: 72.6308,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const { pickupCords, droplocationCords } = state;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${item.user.name}'s location`,
      headerStyle: {
        backgroundColor: "#B9F3FC",
      },
    });
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("WorkerNav");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} initialRegion={pickupCords}>
        <Marker coordinate={pickupCords} />
        <Marker coordinate={droplocationCords} />
        <Polyline
          coordinates={[pickupCords, droplocationCords]}
          strokeColor="#B9F3FC"
          strokeWidth={7}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ViewMap;
