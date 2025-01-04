import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('window');
const OTPPAGE = ({route}) => {
  console.log('fsdss', route?.params.data.OTP);
  // console.log(route?.params.from);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
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

  // const handleVerify = () => {
  //   const enteredCode = code.join('');

  //   console.log('dnkdsnfd', enteredCode, route?.params?.data?.OTP);

  //   if (enteredCode.length < 6) {
  //     Toast.show('Please enter a complete 6-digit code.');
  //   } else if (enteredCode != route?.params?.data?.OTP) {
  //     Toast.show('The entered OTP is incorrect.');
  //   } else {
  //     Toast.show('OTP verified successfully!');
  //     console.log(route?.params?.from)
  //     if (route?.params?.from == 'MyCart') {
  //       // navigation.navigate('MyCart', {from: 'OTP'});
  //       navigation.navigate('Home', {screen: 'MyCart' ,params: { from: 'OTP' },});
  //     } else {
  //       navigation.navigate('Home');
  //     }
  //   }
  // };
  const handleVerify = async () => {
    const enteredCode = code.join('');
    setIsLoading(true);
    console.log('dnkdsnfd', enteredCode, route?.params?.data);

    // if (enteredCode.length < 6) {
    //   Toast.show('Please enter a complete 6-digit code.');
    //   setIsLoading(false);
    // } else if (enteredCode != route?.params?.data?.OTP) {
    //   AsyncStorage.setItem('user_data', route?.params?.data);
    //   AsyncStorage.setItem('user_type', route?.params?.data?.user_type);
    //   AsyncStorage.setItem(
    //     'user_id',
    //     JSON.stringify(route?.params?.data?.user_id),
    //   );
    //   AsyncStorage.setItem('Token', route?.params?.data?.token);

    //   Toast.show('The entered OTP is incorrect.');
    //   setIsLoading(false);
    // } else {
    //   Toast.show('OTP verified successfully!');
    //   setIsLoading(false);

    //   console.log(route?.params?.from);

    //   if (route?.params?.from == 'MyCart') {
    //     // navigation.navigate('MyCart', {from: 'OTP'});
    //     navigation.navigate('Home', {screen: 'MyCart', params: {from: 'OTP'}});
    //   } else {
    //     navigation.navigate('Home');
    //   }
    // }
    if (enteredCode.length < 6) {
      Toast.show('Please enter a complete 6-digit code.');
      setIsLoading(false);
      return; // Early return to stop further execution
    }

    if (enteredCode != route?.params?.data?.OTP) {
      console.log(route?.params?.data?.OTP,"sdjfskflsdfmsdlkdm")
      Toast.show('The entered OTP is incorrect.');
      setIsLoading(false);
      return; // Early return if OTP is incorrect
    }
    try {
      await AsyncStorage.setItem(
        'user_data',
        JSON.stringify(route?.params?.data),
      );
      await AsyncStorage.setItem('user_type', route?.params?.data?.user_type);
      await AsyncStorage.setItem(
        'user_id',
        JSON.stringify(route?.params?.data?.user_id),
      );
      await AsyncStorage.setItem('Token', route?.params?.data?.token);

      Toast.show('OTP verified successfully!');

      if (route?.params?.from === 'MyCart') {
        setIsLoading(false);
        navigation.replace('Home', {screen: 'MyCart', params: {from: 'OTP'}});
      }else if  (route?.params?.from == 'CourseDetails') {
        setIsLoading(false);
        navigation.replace('Home');
        // navigation.replace('CourseDetail');
      }
      
      else {
        setIsLoading(false);
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };
  return (
    <View style={styles.container}>
    {isLoading ? <Loader /> : null}
      <ScrollView style={styles.scroll}>
        <View style={styles.main}>
          <Text style={styles.title1}>
            Please enter verification code sent to your{' '}
          </Text>
          <Text
            style={
              styles.title
            }>{`Mobile Number +91 ${route?.params.item}`}</Text>
          <Text
            style={
              styles.title1
            }>{`verification code sent to your ${route?.params?.data?.OTP}`}</Text>
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
          <TouchableOpacity
            onPress={() => handleVerify()}
            style={styles.buttoncontainer}>
            <View style={styles.touch}>
              <Text style={styles.btext}>{'VERIFY'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.endview}>
          <Text style={styles.endtext}>
            {"Don't receive the OTP ? "}
            <Text
              style={{
                color: colors.heading,
                fontFamily: 'Poppins-Medium',
                textDecorationLine: 'underline',
              }}>
              Resend
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OTPPAGE;
