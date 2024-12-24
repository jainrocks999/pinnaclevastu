import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import UserAddress from '../../../Component/userAddress/userAddress';
import CourseInfoCard from '../../../Component/CourseInfoCard/CourseInfoCard';
import Toast from 'react-native-simple-toast';
import {RadioButton} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';
import Loader from '../../../Component/Loader';

const ResidentalScreen = ({route}) => {
  const nav = route.params;
 console.log('virerndrrfr',nav?.data?.item);
 
const navigation=useNavigation();

  const [radioActive, setRadioActive] = useState('');
  const [loading,setLoading] =useState(false);
  const [userType, setUserType] = useState('');
  const [totals, setTotals] = useState({ totalTaxAmount: '', totalAmount: '',totalPriceOnly:'' });
console.log('dfl;gldfgldfg',totals);

  
useEffect(() => {
  console.log('Updated userType :', userType);
  console.log('Product List:', nav?.data?.item);
}, [userType, nav?.data?.item]);

// Function to calculate totals dynamically
const calculateTotals = (productList, userType) => {
  let totalTaxAmount = 0;
  let totalAmount = 0;
  let totalPriceOnly = 0;

  productList.forEach((product) => {
    const { sale_price, student_price, franchise_price, price, qty, option } = product;
    const taxRate = option.taxRate || 0;

    const selectedPrice =
      userType === 'customers' && sale_price
        ? sale_price
        : userType === 'student' && student_price
        ? student_price
        : userType === 'franchise' && franchise_price
        ? franchise_price
        : price;

    const itemPrice = selectedPrice * qty;
    const taxAmount = (itemPrice * taxRate) / 100; // Use itemPrice for tax calculation
    const totalProductAmount = itemPrice + taxAmount;

    totalTaxAmount += taxAmount;
    totalAmount += totalProductAmount;
    totalPriceOnly += itemPrice;
  });

  return {
    totalTaxAmount: totalTaxAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    totalPriceOnly: totalPriceOnly.toFixed(2),
  };
};

// Fetch user type and calculate totals
useEffect(() => {
  const usercheck = async () => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = JSON.parse(userStatus);
    setUserType(userData?.user_type || ''); // Handle null/undefined user type
  };

  usercheck();
}, []);

useEffect(() => {
  if (userType && nav?.data?.item?.length > 0) {
    const calculatedTotals = calculateTotals(nav?.data?.item, userType);
    console.log('Calculated Totals:', calculatedTotals);
    setTotals(calculatedTotals);
  }
}, [nav?.data?.item, userType]);
  
  const data = {
    shipping_option: '2',
    shipping_method: 'default',
    shipping_amount: '0',
    coupon_code: '',
    tax_amount: totals?.totalTaxAmount,
    sub_amount: totals?.totalPriceOnly,
    discount_amount: '0',
    discount_description: 'order create',
    note: 'order note testing',
    address: {
      address_id:  nav?.adress?.id ?? '',
      name: nav?.adress?.name ?? '',
      email: nav?.adress?.email ?? '',
      phone:  nav?.adress?.phone ?? '',
      country:  nav?.adress?.country ?? '',
      state:  nav?.adress?.state ?? '',
      city: nav?.adress?.city ?? '',
      address:  nav?.adress?.address ?? '',
    },
    amount: totals?.totalAmount,
    currency: 'IND',
    customer_id:  nav?.adress?.customer_id,
    customer_type: 'Botble\\Ecommerce\\Models\\Customer',
    payment_method: 'cod',
    payment_status: 'pending',
    description: 'testing perpose',
    tax_information: {
      company_name: '',
      company_address: '',
      company_tax_code: '',
      company_email: '',
    },
    user_id: nav?.adress?.customer_id,
    rowid:nav?.data?.item?.[0]?.rowid ,
    transaction_id: '79896585966',
     shipping_type:"free-shipping",
     is_available_shipping:1
  };

  const data5 = {
    shipping_option: 2,
    shipping_method: 'default',
    shipping_amount: 0.00,
    coupon_code: '',
    tax_amount:'',
    sub_amount:'',
    discount_amount:'',
    discount_description:'',
    note:'',
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
    amount: Number(nav?.data?.ammount) + Number(0),
    currency: 'IND',
    customer_id: nav?.adress?.customer_id,
    customer_type: 'Botble\\Ecommerce\\Models\\Customer',
    payment_method: radioActive == 1 ? 'cod' : '',
    payment_status: 'pending',
    description: 'testing perpose',
    tax_information: {
      company_name: '',
      company_address: '',
      company_tax_code: '',
      company_email: '',
    },
    user_id: JSON.stringify(nav?.adress?.customer_id),
    transaction_id: '2354648586',
    rowid:''
  };
  const createbyord = async () => {
    try {
      setLoading(true);
      // Convert the dynamic object to a JSO stringN
      const jsonData = JSON.stringify(data);
      const token = await AsyncStorage.getItem('Token');
      console.log('create order request ', jsonData);

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
      console.log('create order to response ',response.data);
      
      if (response.data.status == 200) {
        setLoading(false);
        Toast.show(response.data.msg);
        navigation.navigate('Thankyou',{order:response?.data});
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











  const renderItem = ({ item, index }) => {
    const isLastItem = index === nav?.data?.item.length - 1; // Dynamically check if it's the last item
    const isGSTRow = item.id === '2'; // Example: Use dynamic checks for specific rows
  
    return (
      <View
        style={[
          styles.card45,
         styles.borderBottom, // Apply border unless it's the last item
          {
            paddingTop: 0,
            paddingBottom: isGSTRow ? 5 : 0, // Apply padding dynamically based on item condition
          },
        ]}
      >
        <Text style={[item.isBold ? styles.third3 : styles.third1]}>
          {item.name}
        </Text>
        <Text style={[styles.third2, item.isBold && { fontWeight: 'bold' }]}>


        ₹  {
                userType === 'customers' && item?.sale_price
                  ? item?.sale_price
                  : userType === 'student' && item?.student_price
                  ? item?.student_price
                  : userType === 'franchise' && item?.franchise_price
                  ? item?.franchise_price
                  : item?.price /* Default case when userType is null or undefined */
              }

       
        {/* {item.price?.toFixed(2)} */}
        </Text>
      </View>
    );
  };
  



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Payment Information</Text>
        </View>
      </View>
{loading?<Loader/>:null}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        {nav?.data1 === 'Remedies' && (
          <View>
            <UserAddress data={nav?.adress} />
          </View>
        )}
        {nav?.data1 === 'Cources' && (
          <View>
            <CourseInfoCard />
          </View>
        )}

<View style={styles.cardContainer2}>
<FlatList
    data={nav?.data?.item}
    keyExtractor={(item) => item.id?.toString()} // Ensure id is a string
    renderItem={renderItem}
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
            <Text style={[styles.third2]}>₹ {totals?.totalAmount}</Text>
          </View>
    </View>


        {/* <View style={[styles.cardContainer2]}>
          <View
            style={[
              styles.card45,
              styles.borderBottom,
              {paddingTop: 0, paddingBottom: 0},
            ]}>
            <Text style={styles.third1}>{'Shreni Rajbhandary '}</Text>
            <Text style={styles.third2}>{'₹ 25000'}</Text>
          </View>
          <View
            style={[
              styles.card45,
              styles.borderBottom,
              {paddingTop: 0, paddingBottom: 5},
            ]}>
            <Text style={styles.third2}>{'GST (3.0%) '}</Text>
            <Text style={[styles.third2]}>{' ₹ 50'}</Text>
          </View>

          <View style={styles.card45}>
            <Text style={styles.third3}>{'Total Payable Amount'}</Text>
            <Text style={[styles.third2]}>{'₹ 5550'}</Text>
          </View>
        </View> */}

        <View style={styles.inputmain}>
          <View style={[styles.input]}>
            <TextInput
              style={styles.input1}
              placeholder="Enter Coupon Code"
              placeholderTextColor={'#C9C9C9'}
            />
            <TouchableOpacity
              style={styles.buttoncontainer1}>
              <Text style={styles.btext}>{'APPLY'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.cardContainer2]}>
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
        </View>

        <View style={styles.cardContainer2}>
          <Text style={[styles.payment, {}]}>Other payment Methods</Text>

          <View style={[styles.appBottomSection, styles.borderBottom]}>
            {/* <Image
              style={styles.otherIcons}
              source={require('../../../assets/otherApp/paytm2.png')}
            /> */}
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

          <View style={[styles.appBottomSection, styles.borderBottom]}>
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
          </View>

          <View style={[styles.appBottomSection, styles.borderBottom]}>
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
          </View>

          <View style={[styles.appBottomSection]}>
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
          </View>
        </View>

        <Text style={[styles.payment1]}>
          Secured by Trusted Indian Banks{' '}
          <Image
            style={{height: 12, width: 12}}
            source={require('../../../assets/otherApp/verify.png')}
          />
        </Text>


        <TouchableOpacity
      onPress={() => {
        if (radioActive) {
          createbyord();
          // navigation.navigate('Succes');
        }
      }}
      disabled={!radioActive} // Disable the button if COD is not active
      style={[
        styles.book,
        {
          backgroundColor: radioActive
            ? nav?.data1 === 'Remedies'
              ? colors.orange
              : colors.lightGrey
            : nav?.data1 === 'Remedies'
            ? colors.lightGrey
            : colors.orange, // Opposite color logic
          shadowColor: radioActive
            ? nav?.data1 === 'Remedies'
              ? '#ad3803'
              : 'black'
            : nav?.data1 === 'Remedies'
            ? 'black'
            : '#ad3803', // Opposite shadow color
        },
      ]}
    >
      <Text
        style={[
          styles.btext1,
          // {
          //   color: radioActive
          //     ? nav?.data1 === 'Remedies'
          //       ? 'white'
          //       : 'black'
          //     : nav?.data1 === 'Remedies'
          //     ? 'black'
          //     : 'white', // Opposite text color
          // },
        ]}
      >
        PROCEED TO PAY
      </Text>
    </TouchableOpacity>



        {/* <TouchableOpacity
          onPress={() =>createbyord()
            //  navigation.navigate('Succes')
            }
          style={[
            styles.book,
            {
              backgroundColor:
                nav?.data1 === 'Remedies' ? colors.lightGrey : colors.orange,
                shadowColor:
                nav?.data1 === 'Remedies' ? "black" : "#ad3803",
            },
          ]}>
          <Text style={styles.btext1}>PROCEED TO PAY</Text>
        </TouchableOpacity> */}
      </ScrollView>
  
    </View>
  );
};

export default ResidentalScreen;
