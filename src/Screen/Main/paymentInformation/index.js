import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import UserAddress from '../../../Component/userAddress/userAddress';
import Toast from 'react-native-simple-toast';
import {RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';
import Loader from '../../../Component/Loader';
import {shipmethod} from '../../../Redux/Slice/orderSclice';
import {useDispatch, useSelector} from 'react-redux';
import {clearcartdata} from '../../../Redux/Slice/CartSlice';
import RazorpayCheckout from 'react-native-razorpay';
const ResidentalScreen = ({route}) => {
  const nav = route.params;
  const navigation = useNavigation();
  const userDetail = useSelector(state => state?.Auth?.userData);
  const ship = useSelector(state => state?.order?.shipm?.shipping_method);
  const dispatch = useDispatch();
  const [radioActive, setRadioActive] = useState('');
  const [loading1, setLoading] = useState(false);
  const [userType, setUserType] = useState('');

  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const [totals, setTotals] = useState({
    totalTaxAmount: '',
    totalAmount: '',
    totalPriceOnly: '',
  });

  const amount =
    (isNaN(parseFloat(totals?.totalAmount))
      ? 0
      : parseFloat(totals?.totalAmount)) + parseFloat(ship?.price ?? '0');

  const getItems = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    dispatch(
      await shipmethod({
        url: 'fetch-shipment-method',
        token: token,
        user_id: userid,
      }),
    );
  };
  const calculateTotals = (productList, userType) => {
    let totalTaxAmount = 0;
    let totalAmount = 0;
    let totalPriceOnly = 0;

    productList.forEach(product => {
      const {price, qty} = product;

      const selectedPrice = price;

      const itemPrice = selectedPrice * qty;

      totalTaxAmount += 0;
      // totalAmount += totalProductAmount;
      totalPriceOnly += itemPrice;
    });

    return {
      totalTaxAmount: totalTaxAmount.toFixed(2),
      // totalAmount: totalAmount.toFixed(2),
      totalPriceOnly: totalPriceOnly.toFixed(2),
    };
  };

  // Fetch user type and calculate totals
  useEffect(() => {
    setTotals('');

    const usercheck = async () => {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);
      setUserType(userData?.user_type || '');
    };

    usercheck();
  }, []);

  useEffect(() => {
    getItems();
    if (userType && nav?.data?.item?.length > 0) {
      const calculatedTotals = calculateTotals(nav?.data?.item, userType);

      setTotals(calculatedTotals);
    }
  }, [nav?.data?.item, userType]);

  const Createorder1 = async () => {
    let total = 100 * parseInt(totals?.totalAmount);
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
      console.log('error', error);

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

  const createbyord = async item12 => {
    const data = {
      shipping_option: ship?.shipping_method_id ?? '1',
      shipping_method: 'default',
      shipping_amount: ship?.price ?? '',
      shipping_type: '',
      is_available_shipping: '1',
      payment_status: item12?.status ?? 'pending',
      payment_method: item12?.radioActive ?? '',
      transaction_id: item12?.paymentId ?? '',
      coupon_code: '',
      tax_amount: totals?.totalTaxAmount,
      sub_amount: totals?.totalPriceOnly,
      discount_amount: '0',
      discount_description: 'order create',
      note: 'order note testing',
      customer_address_id: nav?.adress?.id ?? '',
      address: {
        address_id: nav?.adress?.id ?? '',
        name: nav?.adress?.name ?? '',
        email: nav?.adress?.email ?? '',
        phone: nav?.adress?.phone ?? '',
        country: nav?.adress?.country ?? '',
        state: nav?.adress?.state ?? '',
        city: nav?.adress?.city ?? '',
        address: nav?.adress?.address ?? '',
      },
      amount: amount,
      currency: 'IND',
      customer_id: nav?.adress?.customer_id,
      customer_type: 'Botble\\Ecommerce\\Models\\Customer',
      description: 'testing perpose',
      tax_information: {
        company_name: '',
        company_address: '',
        company_tax_code: '',
        company_email: '',
      },
      user_id: nav?.adress?.customer_id,
      rowid: nav?.data?.item?.[0]?.rowid,
      billing_status: nav?.adress?.billing_status ?? '',
      billingAddress: {
        name: nav?.adress?.billing_address?.name ?? '',
        email: nav?.adress?.billing_address?.email ?? '',
        phone: nav?.adress?.billing_address?.phone ?? '',
        country: nav?.adress?.billing_address?.country ?? '',
        state: nav?.adress?.billing_address?.state ?? '',
        city: nav?.adress?.billing_address?.city ?? '',
        address: nav?.adress?.billing_address?.address ?? '',
      },
    };

    try {
      setLoading(true);

      const jsonData = JSON.stringify(data);
      const token = await AsyncStorage.getItem('Token');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}create-customer-order`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: jsonData,
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        setLoading(false);
        Toast.show(response.data.msg);
        dispatch(clearcartdata());
        navigation.navigate('Thankyou', {
          order: response?.data,
          data: 'Remedies',
        });
      } else {
        setLoading(false);
        Toast.show(response.data.msg);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log('Response data error:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  const renderItem = ({item, index}) => {
    const isGSTRow = item.id === '2';

    return (
      <View
        style={[
          styles.card45,
          styles.borderBottom,
          {
            paddingTop: 0,
            paddingBottom: isGSTRow ? 5 : 0,
          },
        ]}>
        <Text style={[item.isBold ? styles.third3 : styles.third1]}>
          {item?.title
            ? item?.title.length > 25
              ? `${item?.title.substring(0, 25)}...`
              : item?.title
            : ' '}
        </Text>
        <Text style={[styles.third2, item.isBold && {fontWeight: 'bold'}]}>
          ₹ {item.price}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
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
          <UserAddress data={nav?.adress} />
        </View>

        <View style={styles.cardContainer2}>
          <FlatList
            data={nav?.data?.item}
            keyExtractor={item => item.id?.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
          />

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
            <Text style={[styles.third2]}>₹ {totals?.totalPriceOnly}</Text>
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
          <Text style={[styles.payment, {}]}>Payment Methods</Text>

          <View style={[styles.appBottomSection, styles.borderBottom]}>
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
          </View>

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
            {transform: [{scale: buttonAnimatedValue}]},
            {marginTop: 15},
          ]}>
          <TouchableOpacity
            onPress={() => {
              if (radioActive) {
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
              }
            }}
            disabled={!radioActive && nav?.data?.item?.length != 0}
            style={[
              styles.book,
              {
                backgroundColor: radioActive
                  ? nav?.data1 === 'Remedies'
                    ? colors.orange
                    : colors.lightGrey
                  : nav?.data1 === 'Remedies'
                  ? colors.lightGrey
                  : colors.orange,
                shadowColor: radioActive
                  ? nav?.data1 === 'Remedies'
                    ? '#ad3803'
                    : 'black'
                  : nav?.data1 === 'Remedies'
                  ? 'black'
                  : '#ad3803',
              },
            ]}>
            <Text style={[styles.btext1]}>PROCEED TO PAY</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default ResidentalScreen;
