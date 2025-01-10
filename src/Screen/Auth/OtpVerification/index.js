import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../../../Redux/Slice/Authslice';
import { useDispatch } from 'react-redux';
const {width} = Dimensions.get('window');

const OTPPAGE = ({route}) => {
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  console.log('fsdss', route?.params.data.OTP);
  const dispatch =useDispatch();
  // console.log(route?.params.from);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  const handleResendOTP = () => {
    setTimer(60);
    setIsDisabled(true);
  };

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

  const handleVerify = async () => {
    const enteredCode = code.join('');
    setIsLoading(true);
    console.log('dnkdsnfd', enteredCode, route?.params?.data);

    if (enteredCode.length < 6) {
      Toast.show('Please enter a complete 6-digit code.');
      setIsLoading(false);
      return;
    }

    if (enteredCode != route?.params?.data?.OTP) {
      console.log(route?.params?.data?.OTP, 'sdjfskflsdfmsdlkdm');
      Toast.show('The entered OTP is incorrect.');
      setIsLoading(false);
      return;
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
      } else if (route?.params?.from == 'CourseDetails') {
        setIsLoading(false);
        navigation.replace('Home');
        // navigation.replace('CourseDetail');
      } else {
        setIsLoading(false);
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const resendOtp = async() => {
   
   
     await dispatch(loginUser({mobile:route?.params.item, url: 'login',}));
      // navigation.navigate('OTP');
    
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
        {isDisabled && (
          <Text style={{color: '#FC0600'}}>
            {' '}
            {timer}
            <Text>seconds</Text>{' '}
          </Text>
        )}
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
        <Animated.View
          style={[
            {
              transform: [{scale: buttonAnimatedValue}],
            },
          ]}>
          <TouchableOpacity
            onPress={() => {
              Animated.sequence([
                Animated.timing(buttonAnimatedValue, {
                  toValue: 0.94,
                  duration: 500,
                  useNativeDriver: true,
                }),
                Animated.timing(buttonAnimatedValue, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
                }),
              ]).start(() => {
                handleVerify();
              });
            }}
            style={styles.buttoncontainer}>
            <View style={styles.touch}>
              <Text style={styles.btext}>{'VERIFY'}</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <View style={styles.endview}>
          {isLoading ? null : (
            <Text style={styles.endtext}>Don't receive the OTP ?</Text>
          )}

          <TouchableOpacity
            disabled={isDisabled ? true : false}
            onPress={() => resendOtp()}
            style={styles.resend}>
            <Text
              style={{
                // color: isDisabled ? '#161616' : '#FC0600',
                color: colors.heading,
                fontFamily: 'Poppins-Medium',
                textDecorationLine: 'underline',
              }}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OTPPAGE;
