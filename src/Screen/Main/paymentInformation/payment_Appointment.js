import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import styles from './styles';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import BackIcon from '../../../assets/image/backIcon.svg';
import {colors} from '../../../Component/colors';
import Toast from 'react-native-simple-toast';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import RazorpayCheckout from 'react-native-razorpay';
import {useSelector} from 'react-redux';

const PaymentAppointment = ({route}) => {
  const services = route.params?.services;

  const formData = route.params?.formData;
  const navigation = useNavigation();
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const userDetail = useSelector(state => state?.Auth?.userData);
  const vastuExpertData = useSelector(
    state => state?.consultation?.ConsultationDetail,
  );

  const [radioActive, setRadioActive] = useState('');
  const [loading1, setLoading] = useState(false);
  const [userType, setUserType] = useState('');
  const [totals, setTotals] = useState({
    totalServicesAmount: '',
    totalTaxAmount: '',
    grandTotalAmount: '',
  });

  const calculateTotalTax = () => {
    let totalTax = 0;
    let totalServicesPrice = 0;
    services.forEach(service => {
      const ServicesPrice = parseInt(service?.price);
      const taxAmount = (service?.price * service.taxPercent) / 100;

      totalServicesPrice += ServicesPrice;

      totalTax += taxAmount;
    });
    setTotals({
      totalServicesAmount: totalServicesPrice,
      totalTaxAmount: totalTax,
      grandTotalAmount: totalServicesPrice + totalTax,
    });
  };

  useEffect(() => {
    setTotals('');

    const usercheck = async () => {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);
      setUserType(userData?.user_type || '');
    };

    usercheck();
    calculateTotalTax();
  }, []);

  function getServiceNames() {
    const serviceNames = services.map(service => service.name).join(', ');
    return `(${serviceNames})`;
  }

  const createbyord = async item => {
    const userid = await AsyncStorage.getItem('user_id');
    const selected_franchise_services = services.map(service => ({
      service_id: service.id,
      service_price: service.price,
    }));

    let data = {
      name: formData.name,
      email: formData.email,
      mobile_no: formData.mobile,
      gender: formData.gender,
      citypincode: formData.cityPincode,
      dob: formData.bod,
      birth_time: formData.bot,
      text_here: formData.additionalInfo,
      birth_place: formData.birthPlace,
      selected_franchise_id: vastuExpertData?.id,
      selected_franchise_services: selected_franchise_services,
      user_id: userid,
      status: 'pending',
      transaction_id: item?.paymentId ?? '',
      payment_method: item?.radioActive,
      payment_status: item?.status,
      payment_date: new Date(),
    };
    try {
      setLoading(true);

      const jsonData = JSON.stringify(data);
      const token = await AsyncStorage.getItem('Token');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}franchise-appointment`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: jsonData,
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        setLoading(false);
        navigation.navigate('Thankyou', {
          order: response?.data,
          data: 'Consultation',
        });
      } else {
        setLoading(false);
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Response data error:', error.response.data);
        console.log('Response status :', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const handleProceedToPay = () => {
    if (!radioActive) return;

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
      if (radioActive === 'razorpay') {
        Createorder1();
      } else {
        const transactionDetails = {
          radioActive,
          paymentId: '',
          status: 'pending',
          amount: totals?.grandTotalAmount,
          reason: '',
          code: '',
        };
        // createbyord(transactionDetails);
      }
    });
  };

  const Createorder1 = async () => {
    let total = 100 * parseInt(totals?.grandTotalAmount);
    var options = {
      description: 'Credits towards consultation',
      image: require('../../../assets/image/header.png'),
      currency: 'INR',
      key: 'rzp_test_PhhCFgYuhlpWmQ',
      amount: total,
      name: 'Pinnacle Vastu',
      prefill: {
        email: userDetail?.email || '',
        contact: userDetail?.phone || '',
        name: userDetail?.name || '',
      },
      theme: {color: colors.orange},
    };

    try {
      const data = await RazorpayCheckout.open(options);
      const transactionDetails = {
        radioActive,
        paymentId: data.razorpay_payment_id || '',
        status: data.razorpay_payment_id ? 'completed' : 'failed',
        amount: totals?.grandTotalAmount,
        reason: data.razorpay_payment_id ? null : 'Payment ID missing',
        code: null,
      };

      createbyord(transactionDetails);
    } catch (error) {
      console.log(error);
      const transactionDetails = {
        radioActive,
        paymentId: '',
        status: 'failed',
        amount: totals?.grandTotalAmount,
        reason: error?.error?.reason || 'Transaction failed',
        code: error.code,
      };
      // createbyord(transactionDetails);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Payment Information</Text>
        </View>
      </View>
      {loading1 ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.cardContainer2}>
          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingVertical: 2,
            }}>
            <Text style={styles.smallText}>{formData.name}</Text>
            <View style={styles.shapeDot}></View>
            <Text style={styles.smallText}>{formData.bod}</Text>
          </View>

          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingVertical: 2,
            }}>
            <Text style={styles.smallText}>{formData.mobile}</Text>
            <View style={styles.shapeDot}></View>
            <Text style={styles.smallText}>{formData.email}</Text>
          </View>
        </View>

        <View style={styles.cardContainer2}>
          <View
            style={[
              styles.card45,
              styles.borderBottom,
              {paddingTop: 0, paddingBottom: 5},
            ]}>
            <Text style={styles.third2}>{vastuExpertData?.franchise_name}</Text>
          </View>
          <View
            style={[
              styles.card45,
              styles.borderBottom,
              {paddingTop: 0, paddingBottom: 5},
            ]}>
            <Text style={[styles.third2, {width: '80%'}]}>
              {getServiceNames()}
            </Text>

            <Text
              style={[
                styles.third2,
              ]}>{`₹ ${totals?.totalServicesAmount}`}</Text>
          </View>
          <View
            style={[
              styles.card45,
              styles.borderBottom,
              {paddingTop: 0, paddingBottom: 5},
            ]}>
            <Text style={styles.third2}>{'Tax'}</Text>
            <Text style={[styles.third2]}>₹ {totals?.totalTaxAmount}</Text>
          </View>

          <View style={styles.card45}>
            <Text style={styles.third3}>{'Total Payable Amount'}</Text>
            <Text style={[styles.third2]}>₹ {totals?.grandTotalAmount}</Text>
          </View>
        </View>

        <View style={styles.inputmain}>
          <View style={[styles.input]}>
            <TextInput
              style={styles.input1}
              placeholder="Enter Coupon Code"
              placeholderTextColor={'#C9C9C9'}
            />
            <TouchableOpacity style={styles.buttoncontainer1}>
              <Text style={styles.btext}>{'APPLY'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer2}>
          <Text style={[styles.payment, {}]}>Payment Method</Text>

          <View style={[styles.appBottomSection, {paddingBottom: 15}]}>
            <Image
              style={styles.otherIcons}
              source={require('../../../assets/image/razorpay-icon.png')}
            />
            <Text style={styles.otherIconText}>Razorpay Payment</Text>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="razorpay"
                status={radioActive === 'razorpay' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setRadioActive('razorpay');
                }}
                color="#009FDF"
                uncheckedColor="#B7B7B7"
                style={styles.radio}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.servicesContainer}>
        <Text style={[styles.payment1]}>
          Secured by Trusted Indian Banks{' '}
          <Image
            style={{height: 12, width: 12}}
            source={require('../../../assets/otherApp/verify.png')}
          />
        </Text>

        <Animated.View
          style={[
            styles.book,
            {
              transform: [{scale: buttonAnimatedValue}],
              backgroundColor: !radioActive ? colors.lightGrey : colors.orange,
              shadowColor: !radioActive ? 'black' : '#ad3803',
            },
          ]}>
          <TouchableOpacity
            onPress={handleProceedToPay}
            disabled={!radioActive}>
            <Text style={[styles.btext1]}>PROCEED TO PAY</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default PaymentAppointment;
