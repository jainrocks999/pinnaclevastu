import { Alert, Linking } from "react-native";

export const userAlert = (type, msg) => {
  return Alert.alert(
    type,
    msg,
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );
};

export const appAlert = (type, msg) => {
  return Alert.alert(
    type,
    msg,
    [
      {
        text: "UPDATE",
        onPress: () => {
          Platform.OS === "android"
            ? Linking.openURL(
                ""
              )
            : Linking.openURL(
                ""
              );

          //console.log("OK Pressed");
        },
      },
    ],
    { cancelable: false }
  );
};
