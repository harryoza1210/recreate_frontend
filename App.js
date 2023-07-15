// reducer
import { myStore, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LogBox } from "react-native";

//
import MainApp from "./MainApp";

LogBox.ignoreLogs(["new NativeEventEmitter()"]);

const App = () => {
  const STRIPE_KEY =
    "pk_test_51N8cZ9SF8xi1SOipwFMkWRgRzJI0HbsfFSaD6ArgpQM87tuJme1vfKTi2w3gmBxN1fM80zHqi5MQaAaEW2XPknlD00s6E29Q2F";

  return (
    <Provider store={myStore}>
      <PersistGate loading={null} persistor={persistor}>
        <StripeProvider publishableKey={STRIPE_KEY}>
          <MainApp />
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
