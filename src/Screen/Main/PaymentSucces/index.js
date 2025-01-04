import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';

const PaymentApp = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Image
          style={{ height: "100%", width: "100%" }}
          source={require('../../../assets/image/lightClose.png')}
        />
      </TouchableOpacity>

      <Image
        source={require('../../../assets/otherApp/dummyProfile.png')}
        style={styles.profileImg}
      />
      <Text style={styles.containerText}>Paying Pinnacle Vastu</Text>
      <View style={styles.bankNameSection}>
        <View style={styles.blueDot} />
        <Text style={[styles.containerText,{textAlign:"auto"}]}>
          Banking name: PINNACLE
          VASTU...
        </Text>
      </View>
      <Text style={[styles.containerText, styles.upiText]}>
        UPI ID: pinnaclevastu.razorpay@icicibank
      </Text>
      <Text style={styles.amountText}>₹ 7300.00</Text>

      <View style={styles.bottomSection}>
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomSmallText}>Choose account to pay with</Text>

          <View style={styles.middleSection}>
            <Image
              style={styles.bankImg}
              source={require('../../../assets/otherApp/bankImg.png')}
            />

            <View>
              <Text style={styles.bankNameTxt}>ICICI Bank . . . 2134</Text>
              <Text style={styles.bankNameTxt}>
                Balance : <Text style={{ color: '#206EBC' }}>Check now</Text>
              </Text>
            </View>

            <Image source={require('../../../assets/image/arrowDownLight.png')} style={styles.arrowDownIcon}/>
          </View>
        </View>

        <TouchableOpacity
         style={styles.book}
        onPress={() => navigation.navigate('Thankyou')}>
          <Text style={styles.payBtn}>PAY ₹ 7300.00</Text>
        </TouchableOpacity>
        <View style={styles.imageSection}>
          <Image
            style={styles.logoImg}
            source={require('../../../assets/otherApp/icicibankLogo.png')}
          />
          <View style={styles.line}></View>
          <Image
            style={styles.logoImg}
            source={require('../../../assets/otherApp/upiLogo.png')}
          />
        </View>
      </View>
      {/* <View style={{position:'absolute',bottom:40,width:'100%',paddingHorizontal:25}}>
      <TouchableOpacity onPress={()=>navigation.navigate('Appoiment')} style={styles.book}>
       <Text style={styles.btext1}>PAY ₹ 7300.00</Text>
       </TouchableOpacity>
       </View> */}
    </View>
  );
};

export default PaymentApp;
