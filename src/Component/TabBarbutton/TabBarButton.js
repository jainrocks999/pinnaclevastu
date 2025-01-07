import React, { useEffect } from "react";
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Pressable,
  View,
  Text
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { fontSize } from '../fontsize/index';
import { colors } from '../colors/index';
const TabBarButton = ({
  onPress,
  isFocused,
  Icon,
  style,
  lable
}) => {
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [isFocused, scale]);
  const AnimatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0, 1], [0, 1]);
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top: top,
    };
  });
  // console.log("label",lable);


  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      style={[
        style, // Apply any additional styles passed via props
        {
          flex: 1,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          zIndex: 10,
        },
      ]}
    >
      <Animated.View style={[]}>
        {Icon}

      </Animated.View>
      <Text style={{
        color: colors.white,
        fontSize: fontSize.Twelve,
        fontFamily: 'Poppins-Regular',
        width: '100%',
        textAlign: 'center',
      }}>{lable}</Text>
    </Pressable>
  );
};

export default TabBarButton;
