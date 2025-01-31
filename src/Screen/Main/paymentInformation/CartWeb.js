import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
  Platform,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";
// import {fetchAllOrders} from '../../redux/actions/orderAction';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Component/Loader";
import { clearLocalCartData } from "../../../Redux/Slice/CartSlice";


const CartWeb = (props) => {
  var isFromCart = props.route.params.isFromCart;
  console.log("isFromCart--->", isFromCart);
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const [URI, setURI] = useState(props.route.params.Url);
  console.log("URI", props.route.params.Url);

  useEffect(() => {
    dispatch(clearLocalCartData());
  }, []);
  useEffect(() => {
    const goBack = () => {
      navigation.goBack();
      return true;
    };
    BackHandler?.addEventListener("hardwareBackPress", () => goBack());
    return () =>
      BackHandler?.removeEventListener("hardwareBackPress", () => goBack());
  }, []);
  let isConnected = true;
  const webViewRef = useRef(null);
  function shouldOverrideUrlLoading(event) {
    const { url } = event;
    if (url.includes("upi://pay?")) {
      Linking.openURL(url);
      return false;
    }
    return true;
  }

  const runFirst = `
  window.webview=yes;
  true; // note: this is required, or you'll sometimes get silent failures
`;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {isConnected ? (
          Platform.OS == "ios" ? (
            <WebView
              ref={webViewRef}
              style={{ height: "100%", width: "100%" }}
              source={{
                uri: props.route.params.Url,
              }}
              ignoreSslError={true}
              onNavigationStateChange={async (event) => {
                console.log(
                  "event......=----------????",
                  event.url == "https://manaiya.com/"
                );
                if (event.url == "https://manaiya.com/") {
                  navigation.replace("MainStack");
                }
              }}
              onReceivedError={(error) => {
                console.log("error", error);
              }}
              onShouldStartLoadWithRequest={shouldOverrideUrlLoading}
              scalesPageToFit={true}
              javaScriptEnabledAndroid={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onError={(error) => console.log("error--", error)}
              startInLoadingState={true}
              renderLoading={() => <Loader />}
              injectedJavaScript={runFirst}
            />
          ) : (
            <WebView
              ref={webViewRef}
              style={{ height: "100%", width: "100%" }}
              source={{
                uri: props.route.params.Url,
              }}
              originWhitelist={["*"]}
              ignoreSslError={true}
              onNavigationStateChange={async (event) => {
                console.log(
                  "event......=----------????",
                  event.url == "https://manaiya.com/"
                );
                if (event.url == "https://manaiya.com/") {
                  navigation.navigate("MainStack");
                }
              }}
              onReceivedError={(error) => {
                console.log("error", error);
              }}
              onShouldStartLoadWithRequest={shouldOverrideUrlLoading}
              scalesPageToFit={true}
              javaScriptEnabledAndroid={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onError={(error) => console.log("error--", error)}
              startInLoadingState={true}
              renderLoading={() => <Loader />}
              injectedJavaScript={runFirst}
            />
          )
        ) : null}
      </ScrollView>

      {isConnected ? null : (
        <View style={styles.container}>
          <Text>Oops! No internet connection</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default CartWeb;
