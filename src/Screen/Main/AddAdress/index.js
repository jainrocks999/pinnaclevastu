import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {Checkbox} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import { createAddress } from '../../../Redux/Slice/Addresslice';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Address = ({route}) => {

  const item = route.params;
  console.log('fhfjf',item);
  
  const navigation = useNavigation();
  const isLoading = useSelector(state => state.address.loading);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    pincode: '',
  });

  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    if (item.data === false && item.item) {
      setFormData((prevData) => ({
        ...prevData,
        name: item?.item?.name,
        phoneNumber: item?.item?.phone,
        email: item?.item?.email,
        address: item?.item?.address,
        apartment: item?.item?.apartment ,
        city: item?.item?.city,
        pincode: item?.item?.zip_code,
        country: item?.item?.country,
        state: item?.item?.state,
      }));
    }
  }, [item.data, item]);



  const countryOptions = [
    {label: 'India', value: 'India'},
    {label: 'USA', value: 'USA'},
    {label: 'UK', value: 'UK'},
  ];

  const stateOptions = [
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'Madhyapradesh', value: 'Madhyapredesh'},
  ];

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});

    if (name === 'phoneNumber') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const mobileRegex = /^[0-9]{0,10}$/;

      mobileRegex.test(numericValue)
        ? setFormData({...formData, phoneNumber: numericValue})
        : Toast.show('Invalid mobile number.');
    } else if (name === 'pincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const pinCodeRegex = /^[0-9]{0,6}$/;

      pinCodeRegex.test(numericValue)
        ? setFormData({...formData, pincode: numericValue})
        : Toast.show('Invalid city pincode.');
    }
  };

  const handleSubmit = async() => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (formData.name == '') {
      Toast.show('Please enter fullname');
      return;
    } else if (formData.phoneNumber == '') {
      Toast.show('Please enter mobile Number');
      return;
    } else if (formData.phoneNumber.length < 10) {
      Toast.show('Mobile number should be at least 10 digits');
      return;
    } else if (formData.email == '') {
      Toast.show('Please enter email');
      return;
    } else if (!emailRegex.test(formData.email)) {
      Toast.show('Please valid Email');
      return;
    } else if (formData.address == '') {
      Toast.show('Please enter address');
      return;
    } else if (formData.city == '') {
      Toast.show('Please enter city name');
      return;
    } else if (formData.pincode == '') {
      Toast.show('Please enter city pincode');
      return;
    } else if (formData.pincode.length < 6) {
      Toast.show('Pincode should be at least 6 digits');
      return;
    } else {
     
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');
      const addressData = {
        name:formData.name,
        email:formData.email,
        phone:formData.phoneNumber,
        address:formData.address,
        city:formData.city,
        state:formData.state,
        country:formData.country,
        zip_code: formData.pincode,
        apartment:formData.apartment,
        user_id: userid,
        is_default: item?.data === false ? (saveInfo ? '1' : '0') : (saveInfo ? '1' : '0'),
         ...(item?.data == false && {customer_address_id: item?.item?.id}),
      };
  
      // try {


        // alert('fjnhdjkg',formData.phoneNumber)
      await dispatch(
          createAddress({
            url:
              item?.data == false?
                 'update-customer-address':
                 'create-customer-address',
            token,
            data: addressData,
            navigation,
          }),
        );
        // navigation.goBack();
      // } catch (error) {
      //   console.error('Error saving address:', error);
      //   Toast.show('Failed to save address. Please try again.');
      // }

      // saveInfo ? navigation.navigate('AddressList') : null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Add Details</Text>
        </View>
      </View>
      {isLoading?<Loader/>:null}
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={styles.addresstext}>Address</Text>

        {/* Full Name Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={colors.paymenttext}
            value={formData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor={colors.paymenttext}
            maxLength={10}
            keyboardType="numeric"
            value={formData.phoneNumber}
            onChangeText={text => handleInputChange('phoneNumber', text)}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.paymenttext}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => handleInputChange('email', text)}
          />
        </View>

        {/* Address Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor={colors.paymenttext}
            value={formData.address}
            onChangeText={text => handleInputChange('address', text)}
          />
        </View>

        {/* Apartment Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Apartment, suite, etc. (optional)"
            placeholderTextColor={colors.paymenttext}
            value={formData.apartment}
            onChangeText={text => handleInputChange('apartment', text)}
          />
        </View>

        {/* City Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor={colors.paymenttext}
            value={formData.city}
            onChangeText={text => handleInputChange('city', text)}
          />
        </View>

        {/* Country Dropdown */}
        <View style={styles.inputWrapper}>
          <Dropdown
            style={styles.input}
            data={countryOptions}
            labelField="label"
            valueField="value"
            placeholder={'Country/Regionborder india'}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText}
            value={formData.country}
            onChange={text => handleInputChange('country', text.value)}
            renderRightIcon={() => <Text style={styles.customIcon}>▼</Text>}
          />
        </View>

        {/* State and Pincode Row */}
        <View style={styles.row}>
          {/* State Dropdown */}
          <View style={styles.halfWidth}>
            <Dropdown
              style={styles.input}
              data={stateOptions}
              labelField="label"
              valueField="value"
              placeholder="State"
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.itemText}
              value={formData.state}
              onChange={text => handleInputChange('state', text.value)}
              renderRightIcon={() => <Text style={styles.customIcon}>▼</Text>}
            />
          </View>

          {/* Pincode Input */}
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              placeholderTextColor={colors.paymenttext}
              value={formData.pincode}
              maxLength={6}
              onChangeText={text => handleInputChange('pincode', text)}
            />
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <View
            style={[
              styles.checkboxWrapper,
              saveInfo && styles.checkedBackground,
            ]}>
            <Checkbox
              status={saveInfo ? 'checked' : 'unchecked'}
              onPress={() => setSaveInfo(!saveInfo)}
              color="#FFF"
              uncheckedColor="#DFE7EF"
            />
          </View>
          <Text style={styles.checkboxText}>
            Save this information for the next time
          </Text>
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.book}>
          <Text style={styles.btext1}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Place Order Button */}
    </View>
  );
};

export default Address;
