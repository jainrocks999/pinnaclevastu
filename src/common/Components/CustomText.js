import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { colors } from '../../colors';
import { moderateScale } from '../../scalling';
import { fonts } from '../../assets/fonts/fonts';
import { fontSize } from '../../fontSize';
const CustomText = props => {
  const {
    style,
    mTop = moderateScale(0),
    borderWidth = 0,
    size = fontSize.Sixteen,
    textAlignment = 'left',
    color = colors['black'],
    paddingleft = 0,
    margin = 0,
    lines = 0,
    fontFamily = fonts.OpenSans_Regular,
    fontWeight = '300',
    letterSpacing = 0.3,
    onPress,
    width
  } = props;
  // console.log("lines", lines);
  const defaultStyles = {
    marginTop: mTop,
    margin: margin,
    borderWidth: borderWidth,
    fontSize: size,
    fontFamily: fontFamily,
    textAlign: textAlignment,
    color: color,
    paddingLeft: paddingleft,
    // fontWeight: fontWeight,
    letterSpacing: letterSpacing,
    margin: margin,
    width: width
  };

  return (
    <Text
      numberOfLines={Number(lines)}
      ellipsizeMode={'tail'}
      onPress={onPress}
      style={[defaultStyles, style]}>
      {props.children}
    </Text>
  );
};

export default CustomText;
