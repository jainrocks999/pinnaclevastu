import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import styles from './styles';
import { colors } from '../../../Component/colors';
const {width} = Dimensions.get('window');
const OTPPAGE = ({navigation}) => {
    
   
    const [code, setCode] = useState(['', '', '', '','','']);
    const inputs = useRef([]);
  
    const handleInputChange = (text, index) => {
      if (/^\d*$/.test(text)) {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
  
        if (text && index < 5) {
          inputs.current[index + 1].focus();
        }
      }
    };
  
    const handleBackspace = (key, index) => {
      if (key === 'Backspace' && !code[index] && index > 0) {
        inputs.current[index - 1].focus();
      }
    };
  
    const handleVerify = () => {
      navigation.navigate('HomeNavigation');
      const enteredCode = code.join('');
      console.log('Verification Code:', enteredCode);
      if (enteredCode.length === 6) {
      } else {
        console.log('Please enter a 6-digit code.');
      }
    };
  
   
  return (
    <View style={styles.container}>
        <ScrollView style={styles.scroll}>
       <View style={styles.main}>     
      <Text style={styles.title1}>Please enter verification code sent to your </Text>
      <Text style={styles.title}>Mobile Number +91 123456789</Text>
      </View>
      <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleInputChange(text, index)}
              onKeyPress={({nativeEvent}) =>
                handleBackspace(nativeEvent.key, index)
              }
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
        <View>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.buttoncontainer}>
       <View style={styles.touch}>
        
         <Text style={styles.btext}>{'VERIFY'}</Text>
        
       </View>
      </TouchableOpacity>
        </View>
      <View style={styles.endview}>
      <Text style={styles.endtext}>{"Don't receive the OTP ? "}<Text style={{color:colors.heading,fontFamily:'Poppins-Medium',textDecorationLine:"underline"}}>Resend</Text></Text>
      </View>
      </ScrollView>
    </View>
  )
}

export default OTPPAGE

