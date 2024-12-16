import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { fontSize } from '../fontsize';
import { colors } from '../colors';
import { heightPercent as hp ,widthPrecent as wp } from '../ResponsiveScreen/responsive';

const CustomRadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
    
        
        <TouchableOpacity
          key={option.value}
          style={styles.radioContainer}
          onPress={() => onSelect(option.value)}
          activeOpacity={0.8}
        >
         
          {/* Radio Button Circle */}
          <View style={styles.circle}>
            {selectedOption === option.value && <View style={styles.selectedCircle} />}
          </View>
          {/* Radio Button Label */}
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // alignItems: 'flex-start',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:hp(1),
  },
  circle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: colors.Headertext, // Customize border color
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: colors.Headertext, // Customize fill color
  },
  label: {
    fontSize: fontSize.Thirteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
    // marginTop:hp(1) 
  },
});

export default CustomRadioButton;
