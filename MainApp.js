import { BackHandler, StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native";
// navigation center for android
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ClipboardDocumentCheckIcon,
  GiftIcon,
  WrenchScrewdriverIcon,
  UserCircleIcon,
  QueueListIcon,
  ClipboardDocumentListIcon,
  WalletIcon,
  UserIcon,
  MagnifyingGlassIcon,
  CreditCardIcon,
} from "react-native-heroicons/solid";
import {
  WrenchScrewdriverIcon as ServiceIcon,
  ClipboardDocumentCheckIcon as BookingsIcon,
  GiftIcon as RewardsIcon,
  UserCircleIcon as Profile,
  QueueListIcon as RequestIcon,
  ClipboardDocumentListIcon as AcceptedRequestIcon,
  WalletIcon as PaymentIcon,
  UserIcon as WorkerIcon,
  CreditCardIcon as Payment,
} from "react-native-heroicons/outline";

// screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

import OnboardScreen from "./screens/OnboardScreen";
import ForgotScreen from "./screens/ForgotpassScreen";
import UserSignupScreen from "./screens/UserSignupScreen";
import WorkerSignupScreen from "./screens/WorkerSignupScreen";
import UserServices from "./components/user/UserServices";
import UserSearch from "./components/user/UserSearch";
import UserBookings from "./components/user/UserBookings";
import UserPayments from "./components/user/UserPayments";
import UserAccount from "./components/user/UserAccount";
import WorkerRequests from "./components/worker/WorkerRequests";
import WorkerAcceptedRequests from "./components/worker/WorkerAcceptedRequests";
import WorkerPayment from "./components/worker/WorkerPayments";
import WorkerAccount from "./components/worker/WorkerAccount";
import ServiceCategory from "./components/user/ServiceCategory";
import ClickedService from "./components/user/ClickedService";
import FunctionalPage from "./components/user/FunctionalPage";
import { useLayoutEffect } from "react";
import WorkerMyOrder from "./components/worker/WorkerMyOrder";
import WorkerTNC from "./components/worker/WorkerTNC";
import ViewMap from "./components/worker/ViewMap";
import WorkerWallet from "./components/worker/WorkerWallet";
import WorkerSupport from "./components/worker/WorkerSupport";
import UserSupport from "./components/user/UserSupport";

// screen manager ~ routes
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// user tab
const UserHome = () => {
  // services
  // bookings
  // coupons
  // account

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
  });

  return (
    <Tab.Navigator
      // initialRouteName="UserServices"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          margin: 15,
          height: 80,
          borderRadius: 15,
          justifyContent: "space-around",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Services"
        component={UserServices}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <WrenchScrewdriverIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <ServiceIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Services
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={UserSearch}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <MagnifyingGlassIcon
                  size={30}
                  color={focused ? "#30E3DF" : "#748c94"}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Search
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={UserBookings}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <ClipboardDocumentCheckIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <BookingsIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Bookings
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Coupons"
        component={UserPayments}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <CreditCardIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <Payment size={30} color={focused ? "#30E3DF" : "#748c94"} />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Payments
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserAccount}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <UserCircleIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <Profile size={30} color={focused ? "#30E3DF" : "#748c94"} />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
// workerTab
const WorkerHome = () => {
  // services
  // bookings
  // coupons
  // account
  return (
    <Tab.Navigator
      initialRouteName="WorkerRequests"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "white",
          margin: 15,
          height: 80,
          borderRadius: 15,
          justifyContent: "space-around",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="Requests"
        component={WorkerRequests}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <QueueListIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <RequestIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Requests
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="My Tasks"
        component={WorkerAcceptedRequests}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <ClipboardDocumentListIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <AcceptedRequestIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  My Tasks
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Payment"
        component={WorkerPayment}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <WalletIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                ) : (
                  <PaymentIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Payment
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Account"
        component={WorkerAccount}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                {focused ? (
                  <UserIcon size={30} color={focused ? "#30E3DF" : "#748c94"} />
                ) : (
                  <WorkerIcon
                    size={30}
                    color={focused ? "#30E3DF" : "#748c94"}
                  />
                )}
                <Text
                  style={{
                    fontSize: 13,
                    color: focused ? "#30E3DF" : "#748c94",
                  }}
                >
                  Account
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
// primary color : #1C82AD

const MainApp = () => {
  const userToken = useSelector((state) => state.user).token;
  console.log("userToken: ", userToken);
  const workerToken = useSelector((state) => state.worker).token;
  console.log("workerToken: ", workerToken);

  if (userToken !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UserNav"
            component={UserHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />

          {/* user home page */}

          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="UserServices" component={UserServices} />
          <Stack.Screen name="UserSearch" component={UserSearch} />
          <Stack.Screen name="UserBookings" component={UserBookings} />
          <Stack.Screen name="UserPayments" component={UserPayments} />
          <Stack.Screen name="UserAccount" component={UserAccount} />
          <Stack.Screen name="ServiceCategory" component={ServiceCategory} />
          <Stack.Screen
            name="FunctionalPage"
            component={FunctionalPage}
            options={{
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="ClickedService"
            component={ClickedService}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="UserSupport" component={UserSupport} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (workerToken !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="WorkerNav"
            component={WorkerHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />

          {/* homepage of worker */}
          <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />
          <Stack.Screen name="WorkerRequests" component={WorkerRequests} />
          <Stack.Screen
            name="WorkerAccepted"
            component={WorkerAcceptedRequests}
          />
          <Stack.Screen name="WorkerPayment" component={WorkerPayment} />
          <Stack.Screen name="WorkerAccount" component={WorkerAccount} />
          <Stack.Screen name="WorkerMyOrder" component={WorkerMyOrder} />
          <Stack.Screen name="Termsandcondtions" component={WorkerTNC} />
          <Stack.Screen name="ViewMap" component={ViewMap} />
          <Stack.Screen name="WorkerWallet" component={WorkerWallet} />
          <Stack.Screen name="WorkerSupport" component={WorkerSupport} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Onboard" component={OnboardScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Forgotpassword" component={ForgotScreen} />

          {/* user home page */}
          <Stack.Screen
            name="UserNav"
            component={UserHome}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
          <Stack.Screen name="UserServices" component={UserServices} />
          <Stack.Screen name="UserBookings" component={UserBookings} />
          <Stack.Screen name="UserPayments" component={UserPayments} />
          <Stack.Screen name="UserAccount" component={UserAccount} />
          <Stack.Screen name="WorkerSignup" component={WorkerSignupScreen} />

          {/* homepage of worker */}
          <Stack.Screen
            name="WorkerNav"
            component={WorkerHome}
            options={{ headerShown: false }}
          />

          <Stack.Screen name="WorkerRequests" component={WorkerRequests} />
          <Stack.Screen
            name="WorkerAccepted"
            component={WorkerAcceptedRequests}
          />
          <Stack.Screen name="WorkerPayment" component={WorkerPayment} />
          <Stack.Screen name="WorkerAccount" component={WorkerAccount} />
          <Stack.Screen name="ServiceCategory" component={ServiceCategory} />
          <Stack.Screen
            name="FunctionalPage"
            component={FunctionalPage}
            options={{
              animation: "fade_from_bottom",
            }}
          />
          <Stack.Screen
            name="ClickedService"
            component={ClickedService}
            options={{
              animation: "slide_from_right",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default MainApp;
