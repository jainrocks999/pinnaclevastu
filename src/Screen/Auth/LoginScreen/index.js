// import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React from 'react'
// import styles from './styles'
// import { colors } from '../../../Component/colors'
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// const LoginScreen = ({navigation}) => {
//   return (
//     <View style={styles.container}>

//       <ImageBackground
//                       style={styles.imgbcg}
//                     //   resizeMode="stretch"
//                       source={require('../../../assets/image/Group1.png')}>
//     <ScrollView>
//               <KeyboardAwareScrollView
//                 extraScrollHeight={10}
//                 enableOnAndroid={true}
//                 keyboardShouldPersistTaps="handled"
//                 contentContainerStyle={{ flex: 1 }}>
//       <View style={styles.main}>
//       <View style={styles.subt}>
//            <Text style={styles.title}>Login</Text>

//         <Text style={styles.title1}>{"Hello there !\nwelcome Back"}</Text>
//         </View>
//         <View style={styles.inputcontainer}>
//          <Text style={styles.inputtext}>{'+91'}</Text>
//          <View style={styles.line}/>
//          <TextInput
//           style={styles.inputbox}
//           placeholder=''
//          />
//       </View>
//       <TouchableOpacity onPress={()=>navigation.navigate('OTP')} style={styles.buttoncontainer}>
//        <View style={styles.touch}>
//          <View/>
//          <Text style={styles.btext}>{'GET OTP'}</Text>
//          <Image style={{height:7,width:15,tintColor:'#fff'}} source={require('../../../assets/image/aerow.png')}/>
//        </View>
//       </TouchableOpacity>
//       <View style={styles.endview}>
//       <Text style={styles.endtext}>{"Don't have an account ? "}<Text onPress={()=>navigation.navigate('Signup')}   style={{color:colors.orange}}>Sign up</Text></Text>
//       </View>
//       </View>
//       </KeyboardAwareScrollView>
//       </ScrollView>
//      </ImageBackground>

//     </View>
//   )
// }

// export default LoginScreen

import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../Redux/Slice/Authslice';


const LoginScreen = ({navigation}) => {
  const [mobile, setMobile] = useState('');
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
      dispatch(loginUser({mobile, navigation, url: 'login'}));
      // navigation.navigate('OTP');
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
        <View style={styles.main}>
          <View style={styles.subt}>
            <Text style={styles.title}>Login</Text>
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
              keyboardType="numeric"
              maxLength={10}
              onChangeText={handleInputChange}
            />
          </View>
          <TouchableOpacity
            onPress={() => LoginAPi()}
            style={styles.buttoncontainer}>
            <View style={styles.touch}>
              <View />
              <Text style={styles.btext}>GET OTP</Text>
              <Image
                style={{height: 7, width: 15, tintColor: '#fff'}}
                source={require('../../../assets/image/aerow.png')}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.endview}>
            <Text style={styles.endtext}>
              {"Don't have an account ? "}
              <Text
                onPress={() => navigation.navigate('Signup')}
                style={{color: colors.orange}}>
                Sign up
              </Text>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
