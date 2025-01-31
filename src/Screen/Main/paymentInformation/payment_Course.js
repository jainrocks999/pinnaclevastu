import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import CourseInfoCard from '../../../Component/CourseInfoCard/CourseInfoCard';
import Toast from 'react-native-simple-toast';
import {RadioButton} from 'react-native-paper';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import {fontSize} from '../../../Component/fontsize';

const PaymentCourse = ({route}) => {
  const nav = route.params?.data1;
  const navigation = useNavigation();
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const userDetail = useSelector(state => state?.Auth?.userData);
  const dispatch = useDispatch();
  const [radioActive, setRadioActive] = useState('');
  const [loading1, setLoading] = useState(false);
  const [userType, setUserType] = useState('');
  const [totals, setTotals] = useState({
    totalTaxAmount: '',
    totalAmount: '',
    totalPriceOnly: '',
  });

  const calculateTotals = (product, userType) => {
    const {
      sale_price,
      student_price,
      franchise_price,
      price,
      tax_amount = 0,
      tax_type = 'percentage',
    } = product;

    // Determine the selected price based on user type.
    const selectedPrice =
      userType === 'customers' && sale_price
        ? parseFloat(sale_price)
        : userType === 'student' && student_price
        ? parseFloat(student_price)
        : userType === 'franchise' && franchise_price
        ? parseFloat(franchise_price)
        : parseFloat(price);

    const itemPrice = selectedPrice;
    // const taxAmount =
    // tax_type === "percentage"
    //   ? (itemPrice * parseFloat(tax_amount)) / 100
    //   : parseFloat(tax_amount);
    const taxAmount =
      tax_type === 'percentage'
        ? (selectedPrice * tax_amount) / 100 // Calculate percentage-based tax
        : tax_type === 'amount'
        ? tax_amount // Fixed tax amount
        : 0;
    const totalProductAmount = itemPrice + taxAmount;

    return {
      totalTaxAmount: taxAmount.toFixed(2), // Total tax amount.
      totalAmount: totalProductAmount.toFixed(2), // Grand total amount.
      totalPriceOnly: itemPrice.toFixed(2), // Total price before tax.
    };
  };

  useEffect(() => {
    setTotals('');

    const usercheck = async () => {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);
      setUserType(userData?.user_type || ''); // Handle null/undefined user type
    };

    usercheck();
  }, []);

  useEffect(() => {
    if (userType && Object.values(nav)?.filter(Boolean)?.length > 0) {
      const calculatedTotals = calculateTotals(nav, userType);
      setTotals(calculatedTotals);
    }
  }, [nav, userType]);

  const createbyord = async item => {
    const userid = await AsyncStorage.getItem('user_id');
    const data = {
      user_id: userid,
      course_id: nav?.id,
      total: totals?.totalAmount,
      sub_amount: totals?.totalPriceOnly,
      tax_amount: totals?.totalTaxAmount,
      coupon_code: '',
      coupon_desc: '',
      discount_amt: '',
      payment_method: item?.radioActive,
      payment_status: item?.status,
      payment_transaction_id: item?.paymentId ?? '',
    };
    try {
      setLoading(true);

      const jsonData = JSON.stringify(data);
      const token = await AsyncStorage.getItem('Token');
      console.log('create order request ', jsonData);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}create-courses-order`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: jsonData,
      };

      const response = await axios.request(config);
      console.log('create order to response ', response.data);

      if (response?.data?.status == 200) {
        setLoading(false);
        Toast.show(response?.data?.msg);
        navigation.navigate('Thankyou', {
          order: response?.data,
          data: 'Courses',
      
        });
      } else {
        setLoading(false);
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Response data ererrer:', error.response.data);
        console.log('Response status sfgsfg:', error.response.status);
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
          amount: totals?.totalAmount,
          reason: '',
          code: '',
        };
        createbyord(transactionDetails);
      }
    });
  };

  const Createorder1 = async () => {
    let total = 100 * parseInt(totals?.totalAmount); // Total in paise
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
        amount: totals?.totalAmount,
        reason: data.razorpay_payment_id ? null : 'Payment ID missing',
        code: null,
      };

      createbyord(transactionDetails);
    } catch (error) {
      console.log('shgkjshgkg', error);

      const transactionDetails = {
        radioActive,
        paymentId: '',
        status: 'failed',
        amount: totals?.totalAmount,
        reason: error?.error?.reason || 'Transaction failed',
        code: error.code,
      };
  
   
      // createbyord(transactionDetails);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Payment Information</Text>
        </View>
      </View>
      {loading1 ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View>
          <CourseInfoCard data={nav} />
        </View>

        <View style={styles.cardContainer2}>
          <View
            style={[
              styles.card45,
              styles.borderBottom,
              {paddingTop: 0, paddingBottom: 5},
            ]}>
            <Text style={styles.third2}>{nav?.title}</Text>
            <Text style={[styles.third2]}>{`₹ ${totals?.totalPriceOnly}`}</Text>
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
            <Text style={[styles.third2]}>₹ {totals?.totalAmount}</Text>
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

        {/* <View style={[styles.cardContainer2]}>
          <Text style={styles.payment}>
            Pay Directly with your favourite UPI apps
          </Text>
          <View style={[styles.card]}>
            <View style={styles.appItem}>
              <Image
                style={styles.appIcon}
                source={require('../../../assets/otherApp/gpay.png')}
              />
              <Text style={[styles.third21]}>{'GPay'}</Text>
            </View>
            <View style={styles.appItem}>
              <Image
                style={styles.appIcon}
                source={require('../../../assets/otherApp/phonePe.png')}
              />
              <Text style={[styles.third21]}>{'PhonePe'}</Text>
            </View>
            <View style={styles.appItem}>
              <Image
                style={styles.appIcon}
                source={require('../../../assets/otherApp/paytm.png')}
              />
              <Text style={[styles.third21]}>{'Paytm'}</Text>
            </View>
            <View style={styles.appItem}>
              <Image
                style={styles.appIcon}
                source={require('../../../assets/otherApp/credUpi.png')}
              />
              <Text style={[styles.third21]}>{'CRED UPI'}</Text>
            </View>
          </View>

          <View style={[styles.appBottomSection]}>
            <Image
              style={styles.payIcon}
              source={require('../../../assets/otherApp/bharatpayLogo.png')}
            />
            <Text style={[styles.service]}>Pay with other UPI apps</Text>
          </View>
        </View> */}

        <View style={styles.cardContainer2}>
          <Text style={[styles.payment, {}]}>Payment Method</Text>

          {/* <View style={[styles.appBottomSection, styles.borderBottom]}>
            <Image
              style={styles.otherIcons}
              source={require('../../../assets/image/cash-on-delivery.png')}
            />
            <Text style={styles.otherIconText}>Cash on Delivery</Text>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="cod"
                status={radioActive === 'cod' ? 'checked' : 'unchecked'}
                onPress={() => setRadioActive('cod')}
                color="#009FDF"
                uncheckedColor="#B7B7B7"
                style={styles.radio}
              />
            </View>
          </View> */}

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
          {/* <View style={[styles.appBottomSection, styles.borderBottom]}>
            <Image
              style={styles.otherIcons}
              source={require('../../../assets/otherApp/paytm2.png')}
            />
            <Text style={styles.otherIconText}>UPI</Text>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="upi"
                status={radioActive === 'upi' ? 'checked' : 'unchecked'}
                onPress={() => setRadioActive('upi')}
                color="#009FDF"
                uncheckedColor="#B7B7B7"
                style={styles.radio}
              />
            </View>
          </View> */}

          {/* <View style={[styles.appBottomSection, styles.borderBottom]}>
            <Image
              style={styles.otherIcons}
              source={require('../../../assets/otherApp/card.png')}
            />
            <Text style={styles.otherIconText}>Credit/Debit Card</Text>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="card"
                status={radioActive === 'card' ? 'checked' : 'unchecked'}
                onPress={() => setRadioActive('card')}
                color="#009FDF"
                uncheckedColor="#B7B7B7"
                style={styles.radio}
              />
            </View>
          </View> */}

          {/* <View style={[styles.appBottomSection]}>
            <Image
              style={styles.otherIcons}
              source={require('../../../assets/otherApp/netbanking.png')}
            />
            <Text style={styles.otherIconText}>Net Banking</Text>

            <View style={styles.radioBtnContainer}>
              <RadioButton
                value="net banking"
                status={radioActive === 'net banking' ? 'checked' : 'unchecked'}
                onPress={() => setRadioActive('net banking')}
                color="#009FDF"
                uncheckedColor="#B7B7B7"
                style={styles.radio}
              />
            </View>
          </View> */}
        </View>
      </ScrollView>
      <View style={styles.servicesContainer}>
        <Text style={[styles.payment1]}>
          {nav?.title}
          <Text
            style={{
              fontSize: fontSize.Sixteen,
              color: colors.paymenttext,
              fontFamily: 'Poppins-SemiBold',
              marginLeft: 15,
            }}>
            {' '}
            {`₹ ${totals?.totalAmount}`}
          </Text>
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

export default PaymentCourse;
