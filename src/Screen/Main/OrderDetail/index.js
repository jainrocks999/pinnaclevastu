import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import StepIndicator from 'react-native-step-indicator';
import Toast from 'react-native-simple-toast';
import {
  heightPercent,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Collapsible from 'react-native-collapsible';
import {colors} from '../../../Component/colors';

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

const OrderDetail = ({route}) => {
  const navigation = useNavigation();
  const data2 = useSelector(state => state?.order?.orderD);
  const loading1 = useSelector(state => state?.order?.loading);

  const [isCancle, setIsCancle] = useState(false);
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCollapsed1, setIsCollapsed1] = useState(true);

  const orderDetailItem = route?.params?.data?.node;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleCollapse1 = () => {
    setIsCollapsed1(!isCollapsed1);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const cancelorder = async () => {
    if (!reason.trim()) {
      Toast.show('Reason for cancellation is required');
      return;
    } else {
      try {
        //   const token = await AsyncStorage.getItem('Token');
        //   const userid = await AsyncStorage.getItem('user_id');
        //   let data = {
        //     user_id: userid,
        //     order_id: JSON.stringify(data2.id),
        //     order_number: data2.code,
        //     description: reason,
        //   };

        // setVisible(false);

        // await dispatch(
        //   cancelorders({
        //     token: token,
        //     url: 'cancel-customer-order',
        //     data1: data,
        //     navigation,
        //   }),
        // );
        // OrderDetails();
        // setVisibleItemId(null);
        setIsCancle(false);
      } catch (error) {
        console.error('Error in cancelorder function:', error);
      }
    }
  };

  const formatDate = () => {
    const date = new Date(data2?.updated_at);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', {month: 'short'});
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const calculateSubTotal = items => {
    return items
      .reduce((total, item) => {
        const itemPrice = parseFloat(item?.node?.variant?.price?.amount || 0);
        return total + itemPrice * item?.node?.quantity;
      }, 0)
      .toFixed(2);
  };

  // const onPageChange = position => {
  //   setCurrentPosition(position);
  // };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.ImageBtn}
        onPress={() =>
          navigation.navigate('ProductDetail', {
            itemId: item?.node?.variant?.product?.id,
          })
        }>
        <Image
          style={styles.cardImg}
          source={
            item?.node?.variant?.product?.featuredImage?.url
              ? {uri: `${item?.node?.variant?.product?.featuredImage?.url}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
        />
      </TouchableOpacity>
      <View style={styles.cardInfo}>
        <Text style={[styles.itemNameText, {marginBottom: 10}]}>
          {item?.node?.variant?.product?.title}
        </Text>
        <View style={styles.quantitySection}>
          <Text style={styles.productName}>Quantity:</Text>

          <Text style={styles.productQuantity}>{item?.node?.quantity}</Text>
        </View>
        <Text style={styles.productName}>
          Total: ₹ {item?.node?.variant?.price?.amount}
        </Text>
        {/* {data2?.status?.value !== 'canceled' &&
        data2?.status?.value !== 'completed' &&data2?.payment?.status?.value!=='failed'&&
        data2?.shipment?.shipment_status !== 'not_delivered' &&
        visibleItemId !== item.id ? (
          <TouchableOpacity onPress={() => setVisibleItemId(item.id)}>
            <Text style={styles.cancleBtn}>Cancel</Text>
          </TouchableOpacity>
        ) : null} */}
        {/* {visibleItemId === item.id && (
          <View style={styles.reasonContainer}>
            <Text style={[styles.productName, {marginBottom: 10}]}>
              Reason for Cancellation:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your reason here"
              placeholderTextColor={colors.placeholder}
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
        )} */}
      </View>
    </View>
  );

  const getCurrentPosition = () => {
    const position = data2?.shipment?.shipment_status;
    if (position == 'pending' || position == 'canceled') return null;
    if (position == 'Order Placed') return 0;
    if (position == 'Ready For Shipment') return 1;
    if (position == 'Dispatched') return 2;
    if (position == 'Out For Delivery') return 3;
    if (position == 'Delivered') return 4;
  };

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
          <Text style={styles.logoText}>Orders detail</Text>
        </View>
        <Text
          style={
            styles.logoText
          }>{`Order No: ${orderDetailItem?.orderNumber}`}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 10,
          paddingBottom: heightPercent(10),
        }}>
        <View style={styles.section}>
          {/* {getCurrentPosition() >= 7 ? ( */}
          {data2?.status?.value == 'canceled' ||
          data2?.status?.value == 'completed' ||
          data2?.payment?.status?.value == 'failed' ||
          data2?.shipment?.shipment_status == 'not_delivered' ? (
            <View style={styles.OrderstatusMsgContainer}>
              <Image
                style={styles.cancleOrderImg}
                source={require('../../../assets/otherApp/orderCencelled.png')}
              />
              <Text style={styles.StatusMsgText}>
                <Text
                  style={{
                    color:
                      data2?.status?.value === 'canceled' ||
                      data2?.payment?.status?.value == 'failed'
                        ? '#FF0000'
                        : data2?.status?.value === 'completed'
                        ? '#02A883'
                        : '#FFA500',
                  }}>
                  {data2?.status?.value === 'canceled'
                    ? 'CANCELLED '
                    : data2?.status?.value === 'completed'
                    ? 'DELIVERED '
                    : data2?.shipment?.shipment_status === 'not_delivered'
                    ? 'NOT DELIVERED '
                    : data2?.payment?.status?.value == 'failed'
                    ? 'PAYMENT FAILED '
                    : ''}
                </Text>
                on {formatDate()}
              </Text>
            </View>
          ) : null}
          <FlatList
            data={orderDetailItem?.lineItems?.edges}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        {data2?.status?.value !== 'canceled' &&
        data2?.status?.value !== 'completed' &&
        data2?.payment?.status?.value !== 'failed' &&
        data2?.shipment?.shipment_status !== 'not_delivered' ? (
          <View style={styles.section}>
            {isCancle && (
              <View style={styles.reasonContainer}>
                <Text style={[styles.productName, {marginBottom: 10}]}>
                  Reason for Cancellation:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your reason here"
                  placeholderTextColor={colors.placeholder}
                  value={reason}
                  onChangeText={text => setReason(text)}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={4}
                />
              </View>
            )}
            {isCancle ? (
              <TouchableOpacity
                style={styles.cancleBtn}
                onPress={() => cancelorder()}>
                <Text style={styles.cancleBtnText}>submit</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.cancleBtn}
                onPress={() => setIsCancle(true)}>
                <Text style={styles.cancleBtnText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : null}
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
        </View>
        {getCurrentPosition() == 4 ? (
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
            <Text style={styles.rowLabel}>{`₹ ${calculateSubTotal(
              orderDetailItem.lineItems?.edges,
            )}`}</Text>
          </View>
          <View
            style={[
              styles.listRow,
              {borderBottomWidth: 1, borderColor: '#DFE7EF'},
            ]}>
            <Text style={styles.rowLabel}>Shipping charges</Text>
            <Text
              style={
                styles.rowLabel
              }>{`₹ ${orderDetailItem?.totalShippingPrice?.amount}`}</Text>
          </View>
          <View style={[styles.listRow]}>
            <Text style={styles.TaxText}>Tax</Text>
            <Text
              style={
                styles.rowLabel
              }>{`₹ ${orderDetailItem?.totalTax?.amount}`}</Text>
          </View>
          <View
            style={[
              styles.listRow,
              {borderTopWidth: 1, borderColor: '#DFE7EF'},
            ]}>
            <Text style={styles.totalText}>Total Payable Amount</Text>
            <Text style={styles.rowLabel}>
              {`₹ ${orderDetailItem?.totalPrice?.amount}`}
            </Text>
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
                style={[styles.toggleIcon2, {marginLeft: wp(-10)}]}
              />
            </TouchableOpacity>

            <Collapsible collapsed={isCollapsed}>
              <Text style={styles.customerName}>
                {orderDetailItem?.shippingAddress?.firstName &&
                  orderDetailItem?.shippingAddress?.firstName + ' '}

                {orderDetailItem?.shippingAddress?.lastName &&
                  orderDetailItem?.shippingAddress?.lastName}
              </Text>

              {orderDetailItem?.shippingAddress?.address2 && (
                <Text style={[styles.addressText, {marginVertical: 0}]}>
                  {`${orderDetailItem?.shippingAddress?.address2} `},
                </Text>
              )}
              {orderDetailItem?.shippingAddress?.address1 && (
                <Text style={[styles.addressText, {marginVertical: 0}]}>
                  {`${orderDetailItem?.shippingAddress?.address1} `},
                  {orderDetailItem?.shippingAddress?.city &&
                    ` ${orderDetailItem?.shippingAddress?.city} `}
                  {orderDetailItem?.shippingAddress?.zip &&
                    `- (${orderDetailItem?.shippingAddress?.zip})`}
                </Text>
              )}

              <Text style={styles.addressText}>
                {orderDetailItem?.shippingAddress?.province &&
                  ` ${orderDetailItem?.shippingAddress?.province} `}
                ,{' '}
                {orderDetailItem?.shippingAddress?.country &&
                  ` ${orderDetailItem?.shippingAddress?.country} `}
              </Text>
              {orderDetailItem?.shippingAddress?.phone && (
                <Text style={styles.addressText}>
                  {' '}
                  +91 {orderDetailItem?.shippingAddress?.phone}
                </Text>
              )}
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
                style={[styles.toggleIcon2, {marginLeft: wp(-10)}]}
              />
            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed1}>
              <Text style={styles.customerName}>
                {orderDetailItem?.billingAddress?.firstName &&
                  orderDetailItem?.billingAddress?.firstName + ' '}

                {orderDetailItem?.billingAddress?.lastName &&
                  orderDetailItem?.billingAddress?.lastName}
              </Text>

              {orderDetailItem?.billingAddress?.address2 && (
                <Text style={[styles.addressText, {marginVertical: 0}]}>
                  {`${orderDetailItem?.billingAddress?.address2} `},
                </Text>
              )}

              {orderDetailItem?.billingAddress?.address1 && (
                <Text style={[styles.addressText, {marginVertical: 0}]}>
                  {`${orderDetailItem?.billingAddress?.address1} `},
                  {orderDetailItem?.billingAddress?.city &&
                    ` ${orderDetailItem?.billingAddress?.city} `}
                  {orderDetailItem?.billingAddress?.zip &&
                    `- (${orderDetailItem?.billingAddress?.zip})`}
                </Text>
              )}

              <Text style={styles.addressText}>
                {orderDetailItem?.billingAddress?.province &&
                  ` ${orderDetailItem?.billingAddress?.province} `}
                ,{' '}
                {orderDetailItem?.billingAddress?.country &&
                  ` ${orderDetailItem?.billingAddress?.country} `}
              </Text>
              {orderDetailItem?.billingAddress?.phone && (
                <Text style={styles.addressText}>
                  {' '}
                  +91 {orderDetailItem?.billingAddress?.phone}
                </Text>
              )}
            </Collapsible>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;
