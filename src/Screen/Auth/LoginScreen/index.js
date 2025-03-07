import {
  Image,
  ImageBackground,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../Redux/Slice/Authslice';
import Loader from '../../../Component/Loader';

const LoginScreen = ({route, navigation}) => {
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const [mobile, setMobile] = useState('');

  const isLoading = useSelector(state => state.Auth?.loading);

  const dispatch = useDispatch();

  const handleInputChange = text => {
    const numericText = text.replace(/[^0-9]/g, '');

    const mobileRegex = /^[0-9]{0,10}$/;
    if (mobileRegex.test(numericText)) {
      setMobile(numericText);
    } else {
      Toast.show('Invalid mobile number.');
    }
  };
  const LoginAPi = () => {
    Keyboard.dismiss();
    if (mobile == '') {
      Toast.show('Please enter mobile number');
    } else if (mobile.length < 10) {
      Toast.show('Mobile number should be at least 10 digits');
      return;
    } else {
      dispatch(loginUser({mobile, navigation, url: 'login', route}));
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        style={styles.imgbcg}
        source={require('../../../assets/image/Group1.png')}>
        {isLoading ? <Loader /> : null}
        <View style={styles.main}>
          <View style={styles.subt}>
            <Text style={styles.title}>Login / Sign up</Text>
            <Text style={styles.title1}>{'Hello there !\nWelcome Back'}</Text>
          </View>
          <View style={styles.inputcontainer}>
            <Text style={styles.inputtext}>{'+91'}</Text>
            <View style={styles.line} />
            <TextInput
              style={styles.inputbox}
              value={mobile}
              placeholder="Enter Mobile Number"
              placeholderTextColor={colors.placeholder}
              keyboardType="phone-pad"
              maxLength={10}
              onChangeText={text => handleInputChange(text)}
            />
          </View>
          <Animated.View
            style={[
              {
                transform: [{scale: buttonAnimatedValue}],
              },
              {marginTop: 15},
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
                  LoginAPi();
                });
              }}
              style={styles.buttoncontainer}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <View style={styles.touch}>
                <View />
                <Text style={styles.btext}>GET OTP</Text>
                <Image
                  style={{height: 7, width: 15, tintColor: '#fff'}}
                  source={require('../../../assets/image/aerow.png')}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* <View style={styles.endview}>
            <Text style={styles.endtext}>
              {"Don't have an account ? "}
              <Text
                onPress={() => {
                  console.log('datatatta login',route);
                  
                  navigation.navigate('Signup', route.params)}}
                style={{color: colors.orange}}>
                Sign up
              </Text>
            </Text>
          </View> */}
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
