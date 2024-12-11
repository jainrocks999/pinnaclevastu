import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Dropdown} from 'react-native-element-dropdown';
import StepIndicator from 'react-native-step-indicator';

import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';

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

const OrderDetail = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState(4);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Orders detail</Text>
        </View>
        <Text style={styles.logoText}>Order No: IN324576</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={styles.section}>
          {currentPosition >= 1 ? (
            <View style={styles.OrderstatusMsgContainer}>
              <Image
                style={styles.cancleOrderImg}
                source={require('../../../assets/otherApp/orderCencelled.png')}
              />
              <Text style={styles.StatusMsgText}>
                <Text
                  style={{
                    color: currentPosition !== 4 ? '#FF0000' : '#02A883',
                  }}>
                  {currentPosition !== 4 ? 'CANCELLED ' : 'DELIVERED '}
                </Text>
                on 20 Nov 2024
              </Text>
            </View>
          ) : null}

          <View style={styles.card}>
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
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
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
          </View>
        </View>

        <View style={styles.OrderTrackcontainer}>
          <Text style={styles.titleText}>Track your order</Text>

          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            direction="vertical"
            labels={labels}
            renderStepIndicator={({position}) => (
              <View
                style={[
                  styles.stepCircle,
                  position < currentPosition && styles.activeStepCircle,
                  position === currentPosition && styles.activeStepCircle,
                ]}>
                {/* Checkmark Icon for finished steps */}
                {position === currentPosition && position === 4 && (
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
                      position < currentPosition
                        ? customStyles.finishedStepLabelColor
                        : position === currentPosition
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
              {borderTopWidth: 1, borderColor: '#DFE7EF',
                marginBottom:-10
              },
            ]}>
            <Text style={styles.rowLabel}>Subtotal</Text>
            <Text style={styles.rowLabel}>₹1450.00</Text>
          </View>
          <View
            style={[
              styles.listRow,
              {borderBottomWidth: 1, borderColor: '#DFE7EF'},
            ]}>
            <Text style={styles.rowLabel}>Shipping</Text>
            <Text style={styles.rowLabel}>Free Delivery</Text>
          </View>

          <View style={[styles.listRow, {marginVertical: 5}]}>
            <Text style={styles.TaxText}>
              GST <Text style={{fontSize: wp(1.4)}}>(3.0%)</Text>
            </Text>
            <Text style={styles.rowLabel}>₹50.00</Text>
          </View>
          <View
            style={[
              styles.listRow,
              {borderTopWidth: 1, borderColor: '#DFE7EF'},
            ]}>
            <Text style={styles.totalText}>Total Payable Amount</Text>
            <Text style={styles.rowLabel}>₹ 1450.00</Text>
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
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <Text style={styles.customerName}>Tejas Shah</Text>

            <Text style={[styles.addressText, {marginVertical: 5}]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. - 123456
            </Text>
            <Text style={styles.addressText}> +91 1234567890</Text>
          </View>

          <View style={styles.addressSection}>
            <Text style={styles.sectionTitle}>Billing Address</Text>
            <Text style={styles.customerName}>Tejas Shah</Text>

            <Text style={[styles.addressText, {marginVertical: 5}]}>
              LoDummy text Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. - 123456
            </Text>
            <Text style={styles.addressText}> +91 1234567890</Text>
          </View>
        </View>
      </ScrollView>
     
    </View>
  );
};

export default OrderDetail;
