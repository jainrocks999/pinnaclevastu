import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearloginUserData,
  getUserDetailApi,
  loginUser,
} from '../../../Redux/Slice/Authslice';
import {useDispatch, useSelector} from 'react-redux';
const {width} = Dimensions.get('window');

const OTPPAGE = ({route}) => {
  const loginUserData = useSelector(state => state?.Auth?.loginUserData);

  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  // console.log(loginUserData, 'smfldflsdf');

  // console.log('fsdss', route?.params.data.OTP);
  const dispatch = useDispatch();
  // console.log(route?.params.from);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(true);
  // const [OTP, setOTP] = useState('');

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

    if (enteredCode != loginUserData.OTP) {
      console.log(loginUserData.OTP, 'sdjfskflsdfmsdlkdm');
      Toast.show('The entered OTP is incorrect.');
      setIsLoading(false);
      return;
    }
    try {
      await AsyncStorage.setItem('user_data', JSON.stringify(loginUserData));
      await AsyncStorage.setItem('user_type', loginUserData?.user_type);
      await AsyncStorage.setItem(
        'user_id',
        JSON.stringify(loginUserData?.user_id),
      );
      await AsyncStorage.setItem('Token', loginUserData?.token);

      Toast.show('OTP verified successfully!');

      if (route?.params?.from === 'MyCart') {
        setIsLoading(false);
        navigation.replace('Home', {screen: 'MyCart', params: {from: 'OTP'}});
      } else if (route?.params?.from == 'CourseDetails') {
        setIsLoading(false);
        // navigation.replace('Home');
        await dispatch(
          getUserDetailApi({
            token: loginUserData?.token,
            url: `profile-list?user_id=${loginUserData?.user_id}`,
          }),
        );
        navigation.pop();
        navigation.replace('CourseDetail');
      } else if (route?.params?.from === 'profile') {
        setIsLoading(false);
        await dispatch(
          getUserDetailApi({
            token: loginUserData?.token,
            url: `profile-list?user_id=${loginUserData?.user_id}`,
          }),
        );
        // navigation.replace('Appoiment');
        navigation.pop();
        navigation.replace('profile');
      } else {
        setIsLoading(false);
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };
  // console.log('this is user data', loginUserData);

  const resendOtp = async () => {
    Keyboard.dismiss();
    setIsDisabled(true);
    setTimer(60);
    await dispatch(loginUser({mobile: route?.params.item, url: 'login'}));
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
              // }>{`verification code sent to your ${route?.params?.data?.OTP}`}</Text>
            }>{`verification code sent to your ${loginUserData.OTP}`}</Text>
        </View>
        {isDisabled && (
          <Text style={{color: '#FC0600', textAlign: 'center'}}>
            {' '}
            {timer}
            <Text> seconds</Text>{' '}
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
                color: isDisabled ? colors.placeholder : colors.heading,
                // color: colors.heading,
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
