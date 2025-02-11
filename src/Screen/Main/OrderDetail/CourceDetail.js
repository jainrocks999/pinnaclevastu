import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import StepIndicator from 'react-native-step-indicator';
import Toast from 'react-native-simple-toast';
import {
  heightPercent,
  widthPrecent,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {cancelorders, orderDetail} from '../../../Redux/Slice/orderSclice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../../Component/colors';
// import AutoHeightImage from 'react-native-auto-height-image';

const labels = [
  'Order Received',
  'Ready For Shipping',
  'Dispatched',
  'Out For Delivery',
  'Delivered',
];

const customStyles = {
  stepIndicatorSize: wp(5),
  stepStrokeWidth: 0,
  currentStepStrokeWidth: 0,
  currentStepIndicatorSize: wp(5),
  separatorStrokeWidth: wp(1),
  separatorFinishedColor: '#02A883',
  separatorUnFinishedColor: '#8E959E',
  currentStepIndicatorLabelFontSize: 1,
  unfinishedStepLabelColor: '#8E959E',
  finishedStepLabelColor: '#02A883',
  stepIndicatorLabelFinishedColor: '#02A883',
  stepIndicatorLabelUnFinishedColor: '#8E959E',
  labelColor: '#999999',
  labelSize: wp(2.5),
  currentStepLabelColor: '#02A883',
};

const CourceDetail = () => {
  const navigation = useNavigation();
  const data2 = useSelector(state => state?.order?.orderDetal);
  const loading1 = useSelector(state => state?.order?.loading);
  const [visibleItemId, setVisibleItemId] = useState(null);
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
 
   useEffect(() => {
       const backAction = () => {
         navigation.goBack()
         return true; 
       };
       
       const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
   
       return () => backHandler.remove(); 
     
   }, [navigation]);

  const cancelorder = async () => {
    if (!reason.trim()) {
      Toast.show('Reason for cancellation is required');
      return;
    } else {
      try {
        const token = await AsyncStorage.getItem('Token');
        const userid = await AsyncStorage.getItem('user_id');
        let data = {
          user_id: userid,
          order_id: JSON.stringify(data2.id),
          order_number: data2.code,
          description: reason,
        };

        await dispatch(
          cancelorders({
            token: token,
            url: 'cancel-customer-order',
            data1: data,
            navigation,
          }),
        );
        OrderDetails();
        setVisibleItemId(null);
      } catch (error) {
        console.error('Error in cancelorder function:', error);
      }
    }
  };

  const OrderDetails = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      orderDetail({
        id: userid,
        token: token,
        url: 'fetch-order-details',
        orderid: JSON.stringify(data2.id),
        code: data2.code,
        navigation,
      }),
    );
  };

  const getdata = qty => {
    let value = {label: '1', value: '1'};
    let array1 = [value];
    if (qty == 1) {
      return array1;
    }
    let array = [];
    for (let i = 1; i <= qty; i++) {
      array.push({label: i.toString(), value: i.toString()});
    }
    return array;
  };

  const formatDate = () => {
    const date = new Date(data2?.created_at);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', {month: 'short'});
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      {console.log(item)}
      <Image
        style={styles.cardImg}
        source={
          item?.product_image
            ? {uri: `${Imagepath.Path}${item?.product_image}`}
            : require('../../../assets/otherApp/itemImg.png')
        }
      />
      <View style={styles.cardInfo}>
        <Text style={[styles.productName, {marginBottom: 10}]}>
          {item.product_name}
        </Text>
        <View style={styles.quantitySection}>
          <Text style={styles.productName}>Quantity:</Text>

          <Text style={styles.productQuantity}>{item?.qty}</Text>
        </View>
        <Text style={styles.productName}>Total: ₹ {item?.price}</Text>
        {data2?.status?.value !== 'canceled' &&
        data2?.status?.value !== 'completed' &&
        data2?.shipment?.shipment_status !== 'not_delivered' &&
        visibleItemId !== item.id ? (
          <TouchableOpacity onPress={() => setVisibleItemId(item.id)}>
            <Text style={styles.cancleBtn}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
        {visibleItemId === item.id && (
          <View style={styles.reasonContainer}>
            <Text style={[styles.productName, {marginBottom: 10}]}>
              Reason for Cancellation:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your reason here"
              value={reason}
              onChangeText={text => setReason(text)}
              multiline={true}
              textAlignVertical="top"
              numberOfLines={4}
            />
            <TouchableOpacity onPress={() => cancelorder()}>
              <Text style={styles.cancleBtn}>submit</Text>
            </TouchableOpacity>
          </View>
        )}
        =
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Cource detail</Text>
        </View>
        <Text style={[styles.logoText]}>{`Order No: ${data2?.code}`}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 10,
          paddingBottom: heightPercent(10),
        }}>
        <View style={styles.section}>
          <View style={styles.card}>
            {console.log(' data2?.course?.image', `${Imagepath.Path}${data2?.course?.image}`)
            }
            {/* <AutoHeightImage
            style={{width:widthPrecent(34)}}
              // style={[styles.cardImg,{width:widthPrecent(34)}]}
              source={
                data2?.course?.image
                  ? {uri: `${Imagepath.Path}${data2?.course?.image}`}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
            /> */}
            <Image
            style={{width:widthPrecent(34),resizeMode:"contain"}}
              source={
                data2?.course?.image
                  ? {uri: `${Imagepath.Path}${data2?.course?.image}`}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
            />
            <View style={styles.cardInfo}>
              <Text style={[styles.productName, {marginBottom: 10}]}>
                {data2?.course_title}
              </Text>
              <Text style={[styles.productName, {marginBottom: 10}]}>
                {`Course category :  ${data2?.course_category}`}
              </Text>
              <Text style={[styles.productName, {marginBottom: 10}]}>
                {`Course purchase :  ${formatDate()}`}
              </Text>
              <Text
                style={
                  styles.productName
                }>{`Total: ₹ ${data2?.sub_total}`}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('CourceListDownload')}>
                <Text
                  style={{
                    marginTop: 8,
                    color: colors.white,
                    fontSize: fontSize.Twelve,
                    backgroundColor: colors.orange,
                    fontFamily: 'Poppins-Regular',
                    padding: wp(1.5),
                    width: wp(25),
                    textAlign: 'center',
                    borderRadius: 6,
                  }}>
                  View Cource
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <View style={styles.OrderTrackcontainer}>
            <Text style={styles.titleText}>Track your order</Text>
  
            <StepIndicator
              customStyles={customStyles}
              currentPosition={getCurrentPosition()}
              direction="vertical"
              labels={labels}
              renderStepIndicator={({position}) => (
                <View
                  style={[
                    styles.stepCircle,
                    position < getCurrentPosition() && styles.activeStepCircle,
                    position === getCurrentPosition() && styles.activeStepCircle,
                  ]}>
                 
                  {position === getCurrentPosition() && position === 4 && (
                    <Image
                      source={require('../../../assets/otherApp/checkedIcon.png')}
                      style={styles.checkedIcon}
                    />
                  )}
                </View>
              )}
              renderLabel={({position, label}) => (
                <Text
                  style={[
                    styles.lebleText,
                    {
                      fontSize: customStyles.labelSize,
                   
                      color:
                        position < getCurrentPosition()
                          ? customStyles.finishedStepLabelColor
                          : position == getCurrentPosition()
                          ? customStyles.currentStepLabelColor
                          : customStyles.unfinishedStepLabelColor,
                    },
                  ]}>
                  {label}
                </Text>
              )}
            />
          </View> */}
        {/* {getCurrentPosition() == 4 ? (
            <View style={[styles.section, styles.trakIdSection]}>
              <View style={styles.trakIdSection}>
                <Text style={styles.tarkIdText}>AWB No:</Text>
                <Text style={styles.btnText}>1234678942124576</Text>
              </View>
              <TouchableOpacity style={[styles.trakIdSection, styles.copyBtn]}>
                <Image
                  style={styles.copyIcon}
                  source={require('../../../assets/drawer/copy.png')}
                />
                <Text style={styles.btnText}>Copy</Text>
              </TouchableOpacity>
            </View>
          ) : null} */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          <View
            style={[
              styles.listRow,
              {borderTopWidth: 1, borderColor: '#DFE7EF', marginBottom: -10},
            ]}>
            <Text style={styles.rowLabel}>Subtotal</Text>
            <Text style={styles.rowLabel}>{`₹ ${data2?.sub_total}`}</Text>
          </View>
          {/* <View
              style={[
                styles.listRow,
                {borderBottomWidth: 1, borderColor: '#DFE7EF'},
              ]}>
              <Text style={styles.rowLabel}>Shipping charges</Text>
              <Text style={styles.rowLabel}>{`₹ ${data2?.shipping_amount}`}</Text>
            </View> */}

          <View style={[styles.listRow]}>
            <Text style={styles.TaxText}>
              Tax
              {/* <Text style={{fontSize: fontSize.Thirteen}}>(3.0%)</Text> */}
            </Text>
            <Text style={styles.rowLabel}>{`₹ ${data2?.tax_amount}`}</Text>
          </View>
          <View
            style={[
              styles.listRow,
              {borderTopWidth: 1, borderColor: '#DFE7EF'},
            ]}>
            <Text style={styles.totalText}>Total Payable Amount</Text>
            <Text style={styles.rowLabel}>{`₹ ${data2?.total}`}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CourceDetail;
