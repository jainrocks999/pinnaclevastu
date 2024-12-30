import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import StepIndicator from 'react-native-step-indicator';

import {
  heightPercent,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import Collapsible from 'react-native-collapsible';
import { cancelorders, orderDetail } from '../../../Redux/Slice/orderSclice';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const OrderDetail = () => {
  const navigation = useNavigation();
  const data2 = useSelector(state => state?.order?.orderD);
  const loading1 = useSelector(state => state?.order?.loading);
  const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const dispatch=useDispatch();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };
  const cancelorder = async () => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    let data = {
      user_id: userid,
      order_id: JSON.stringify(data2.id),
      order_number: data2.code,
      description: reason,
    };

    // setVisible(false);

    await dispatch(
      cancelorders({
        token: token,
        url: 'cancel-customer-order',
        data1: data,
        navigation,
      }),
    );
    OrderDetails();
  };

  const OrderDetails = async () => {
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

  const data = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
  ];

  // const onPageChange = position => {
  //   setCurrentPosition(position);
  // };

  const renderItem = ({item}) => (
    <View style={styles.card}>
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
          {/* <Dropdown
            style={[styles.dropdown, isFocus]}
            selectedTextStyle={styles.productQuantity}
            data={getdata(parseInt(item?.qty))}
            maxHeight={200}
            labelField="label"
            valueField="value"
            itemContainerStyle={{marginBottom: -20}}
            placeholder={value ? value : item?.qty}
            value={item?.qty}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          /> */}
        </View>

        <Text style={styles.productName}>Total: ₹ {item?.price}</Text>
        <TouchableOpacity onPress={()=>  visible ? cancelorder() : setVisible(true)} >
          <Text style={styles.cancleBtn}>Cancel</Text>
        </TouchableOpacity>
        {visible && (
        <View style={styles.reasonContainer}>
          <Text style={styles.label}>Reason for Cancellation:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your reason here"
            value={reason}
            onChangeText={(text)=>setReason(text)}
          />
        </View>
      )}
=
      </View>
    </View>
  );
  const getCurrentPosition = () => {
    const position = data2?.shipment?.shipment_status;
    if (position == 'pending') return 0;
    if (position == 'approved') return 1;
    if (position == 'arrange_shipment') return 2;
    if (position == 'ready_to_be_shipped_out') return 3;
    if (position == 'delivered') return 5;
    if (position == 'not_delivered') return 4;
    if (position == 'canceled') return 7;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} 
             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Orders detail</Text>
        </View>
        <Text style={styles.logoText}>{`Order No: ${data2?.code}`}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 10,
          paddingBottom: heightPercent(10),
        }}>
        <View style={styles.section}>
          {getCurrentPosition() >= 7 ? (
            <View style={styles.OrderstatusMsgContainer}>
              <Image
                style={styles.cancleOrderImg}
                source={require('../../../assets/otherApp/orderCencelled.png')}
              />
              <Text style={styles.StatusMsgText}>
                <Text
                  style={{
                    color: getCurrentPosition() == 7 ? '#FF0000' : '#02A883',
                  }}>
                  {getCurrentPosition() == 7 ? 'CANCELLED ' : 'DELIVERED '}
                </Text>
                on 20 Nov 2024
              </Text>
            </View>
          ) : null}

          <FlatList
            data={data2?.products}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
          />

          {/* <View style={styles.card}>
            <Image
              style={styles.cardImg}
              source={require('../../../assets/otherApp/itemImg.png')}
            />
            <View style={styles.cardInfo}>
              <Text
                style={[styles.productName, {marginBottom: 10}]}>
                Aluminium Metal Strip Vastu
              </Text>

              <View style={styles.quantitySection}>
                <Text style={styles.productName}>Quantity:</Text>

                <Dropdown
                  style={[styles.dropdown, isFocus]}
                  selectedTextStyle={styles.productQuantity}
                  data={data}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  itemContainerStyle={{marginBottom: -20}}
                  placeholder={!isFocus ? '...' : value}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>

              <Text style={styles.productName}>Total: ₹ 1450.00</Text>
              <TouchableOpacity>
                <Text style={styles.cancleBtn}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>

        <View style={styles.OrderTrackcontainer}>
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
                {/* Checkmark Icon for finished steps */}
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
                    // fontFamily: 'YourCustomFontFamily',
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
        </View>
        {currentPosition === 4 ? (
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
        ) : null}
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
          <View
            style={[
              styles.listRow,
              {borderBottomWidth: 1, borderColor: '#DFE7EF'},
            ]}>
            <Text style={styles.rowLabel}>Shipping charges</Text>
            <Text style={styles.rowLabel}>{`₹ ${data2?.shipping_amount}`}</Text>
          </View>

          <View
            style={[
              styles.listRow,
              
            ]}>
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
            <Text style={styles.rowLabel}>{`₹ ${data2?.amount}`}</Text>
          </View>
        </View>

        <View style={[styles.section, {gap: 8}]}>
          <View
            style={[
              styles.addressSection,
              {
                borderBottomWidth: 1,
                borderColor: '#DFE7EF',
                marginBottom: 10,
                paddingBottom: 10,
              },
            ]}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={toggleCollapse}>
              <Text style={styles.sectionTitle}>Shipping Address</Text>

              <Image
                source={
                  !isCollapsed
                    ? require('../../../assets/otherApp/updown.png')
                    : require('../../../assets/image/arrow_icon.png')
                }
                style={[
                  styles.toggleIcon2,{marginLeft:wp(-10)},
                  // !isCollapsed ? {resizeMode: 'contain'} : null,
                ]}
              />
            </TouchableOpacity>

            {/* Collapsible View */}
            <Collapsible collapsed={isCollapsed}>
              <Text style={styles.customerName}>
                {data2?.shipping_address?.name}
              </Text>
              {data2?.shipping_address?.address && (
                <Text style={[styles.addressText, {marginVertical: 0}]}>
                  {`${data2.shipping_address.address} `}
                  {data2?.shipping_address?.city &&
                    `${data2.shipping_address.city} `}
                  {data2?.shipping_address?.zip_code &&
                    `- (${data2.shipping_address.zip_code})`}
                </Text>
              )}
              <Text style={styles.addressText}>
                {data2?.shipping_address?.state}{' '}
                {data2?.shipping_address?.country}
              </Text>
              <Text style={styles.addressText}>
                {' '}
                +91 {data2?.shipping_address?.phone}
              </Text>
            </Collapsible>
          </View>

          <View style={styles.addressSection}>
          
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={toggleCollapse1}>
               <Text style={styles.sectionTitle}>Billing Address</Text>

              <Image
                source={
                  !isCollapsed1
                    ? require('../../../assets/otherApp/updown.png')
                    : require('../../../assets/image/arrow_icon.png')
                }
                style={[
                  styles.toggleIcon2,{marginLeft:wp(-10)},
                  // !isCollapsed ? {resizeMode: 'contain'} : null,
                ]}
              />
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed1}>
            <Text style={styles.customerName}>
              {' '}
              {data2?.billing_address?.name}
            </Text>

            {data2?.billing_address?.address && (
              <Text style={[styles.addressText, {marginVertical: 0}]}>
                {data2?.billing_address?.address &&
                  `${data2.billing_address.address} `}
                {data2?.billing_address?.city &&
                  `${data2.billing_address.city} `}
                {data2?.billing_address?.zip_code &&
                  `- (${data2.billing_address.zip_code})`}
              </Text>
            )}
            <Text style={styles.addressText}>
              {data2?.billing_address?.state} {data2?.billing_address?.country}
            </Text>
            <Text style={styles.addressText}>
              {' '}
              +91 {data2?.billing_address?.phone}
            </Text>
            </Collapsible>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;
