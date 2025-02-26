import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
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
import {
  addShopifyuserAddress,
  INITIAL_ADDRESS,
  updateShopifyUserAddress,
} from '../../../Redux/Slice/Addresslice';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCountryStateList} from '../../../Redux/Slice/countryStateSlice';
import {fontSize} from '../../../Component/fontsize';

const Address = ({route}) => {
  const item = route.params;

  const navigation = useNavigation();
  const isLoading = useSelector(state => state.address?.loading);
  const {countryStateList} = useSelector(state => state.countryState);
  const dispatch = useDispatch();

  const [provicences, setProvicences] = useState([]);
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
    if (item.data == false && item.item) {
      setFormData(prevData => ({
        ...prevData,
        name: item?.item?.name,
        phoneNumber: item?.item?.phone,
        email: item?.item?.email,
        address: item?.item?.address1,
        apartment: item?.item?.address2,
        city: item?.item?.city,
        pincode: item?.item?.zip,
        country: item?.item?.country,
        state: item?.item?.province,
      }));
    }
  }, [item?.item, item.data]);

  useEffect(() => {
    dispatch(getCountryStateList());
  }, [item.data]);

  useEffect(() => {
    if (Array.isArray(countryStateList?.countries)) {
      let index = countryStateList?.countries.findIndex(
        item => item.name == formData.country,
      );
      if (index != -1) {
        setProvicences(countryStateList?.countries[index].provinces);
      }
    }
  }, [formData, item.data]);

  const handleInputChange = (name, value, isBilling = false) => {
    let updatedValue = value;
    if (name === 'phoneNumber' || name === 'pincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const regex = name === 'phoneNumber' ? /^[0-9]{0,10}$/ : /^[0-9]{0,6}$/;

      if (!regex.test(numericValue)) {
        Toast.show(
          name === 'phoneNumber'
            ? 'Invalid mobile number.'
            : 'Invalid pincode.',
        );
        return;
      }
      updatedValue = numericValue;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: updatedValue,
    }));
    // }
  };

  const validateFields = data => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (data.name === '') return 'Please enter full name';
    if (data.phoneNumber === '' || data.phoneNumber.length < 10)
      return 'Please enter a valid mobile number';
    if (data.address === '') return 'Please enter address';
    if (data.city === '') return 'Please enter city name';
    if (data.pincode === '' || data.pincode.length < 6)
      return 'Please enter a valid pincode';
    return null;
  };
  const handleSubmit = async () => {
    const errorMessage = validateFields(formData);
    if (errorMessage) {
      Toast.show(errorMessage);
      return;
    }
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = JSON.parse(userStatus);

    const nameParts = formData.name.split(' ');

    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[1] : '';

    const inputs = {
      address1: formData.address,
      address2: formData.apartment,
      city: formData.city,
      company: '',
      firstName: firstName,
      lastName: lastName,
      zip: formData.pincode,
      phone: formData.phoneNumber,
      province: formData.state,
      country: formData.country,
    };
    dispatch(INITIAL_ADDRESS());

    if (item.data == false) {
      dispatch(
        updateShopifyUserAddress(
          userData?.shopify_access_token,
          item.item.id,
          inputs,
          navigation,
          saveInfo,
        ),
      );
    } else {
      dispatch(
        addShopifyuserAddress(
          userData?.shopify_access_token,
          inputs,
          navigation,
          saveInfo,
        ),
      );
    }
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
          <Text style={styles.logoText}>
            {item.data ? 'Add Details' : 'Edit Details'}
          </Text>
        </View>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View>
          <Text style={styles.addresstext}>Delivery Address</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={colors.paymenttext}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor={colors.paymenttext}
              maxLength={10}
              keyboardType="phone-pad"
              value={formData.phoneNumber}
              onChangeText={text => handleInputChange('phoneNumber', text)}
            />
          </View>

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

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor={colors.paymenttext}
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Apartment, suite, etc. (optional)"
              placeholderTextColor={colors.paymenttext}
              value={formData.apartment}
              onChangeText={text => handleInputChange('apartment', text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor={colors.paymenttext}
              value={formData.city}
              onChangeText={text => handleInputChange('city', text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Dropdown
              style={styles.input}
              data={
                Array.isArray(countryStateList?.countries)
                  ? countryStateList?.countries
                  : []
              }
              labelField="name"
              valueField="name"
              placeholder={'Country/Regionborder india'}
              placeholderStyle={styles.placeholder}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.itemText}
              dropdownPosition={'top'}
              searchPlaceholder="search.."
              search
              inputSearchStyle={{
                borderRadius: 10,
                fontSize: fontSize.Fourteen,
                color: colors.heading,
                fontFamily: 'Poppins-Regular',
              }}
              itemContainerStyle={{marginBottom: -15}}
              value={formData.country}
              onChange={text => handleInputChange('country', text.name)}
              renderRightIcon={() => <Text style={styles.customIcon}>▼</Text>}
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <Dropdown
                style={styles.input}
                data={provicences}
                labelField="name"
                valueField="name"
                placeholder="State"
                placeholderStyle={styles.placeholder}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.itemText}
                value={formData.state}
                dropdownPosition={'top'}
                searchPlaceholder="search.."
                search
                inputSearchStyle={{
                  borderRadius: 10,
                  fontSize: fontSize.Fourteen,
                  color: colors.heading,
                  fontFamily: 'Poppins-Regular',
                }}
                itemContainerStyle={{marginBottom: -15}}
                onChange={text => handleInputChange('state', text.name)}
                renderRightIcon={() => <Text style={styles.customIcon}>▼</Text>}
              />
            </View>

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
              Save this information for the billing address
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => handleSubmit()} style={styles.book}>
          <Text style={styles.btext1}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Address;
