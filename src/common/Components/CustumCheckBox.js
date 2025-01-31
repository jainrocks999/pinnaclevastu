import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
const CustomCheckBox = ({ value, onValueChange, label }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.checkBoxContainer}
      onPress={() => onValueChange(!value)}
    >
      <View
        style={[
          styles.checkBox,
          {
            backgroundColor: value ? "black" : "#fff",
            borderColor: value ? "black" : "grey",
          },
        ]}
      >
        {value ? <Text style={styles.checkMark}>✓</Text> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox: {
    width: 15,
    height: 15,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius:2
  },
  checkMark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  label: {
    color: "black",
    fontSize: 12,
    textTransform: "capitalize",
  },
});

export default CustomCheckBox;
