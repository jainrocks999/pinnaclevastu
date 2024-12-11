import { StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, Image } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import { colors } from '../../../Component/colors';
import { Checkbox } from 'react-native-paper';
const Address = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [pincode, setPincode] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const [checked, setChecked] = useState(false);


  const countryOptions = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' },
  ];

  const stateOptions = [
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'California', value: 'California' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Add Details</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={styles.addresstext}>Address</Text>

        {/* Full Name Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor={colors.paymenttext}
            value={firstName}
            onChangeText={setFirstName}

          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor={colors.paymenttext}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}

          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.paymenttext}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}

          />
        </View>

        {/* Address Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor={colors.paymenttext}
            value={address}
            onChangeText={setAddress}

          />
        </View>

        {/* Apartment Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Apartment, suite, etc. (optional)"
            placeholderTextColor={colors.paymenttext}
            value={apartment}
            onChangeText={setApartment}

          />
        </View>

        {/* City Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor={colors.paymenttext}
            value={city}
            onChangeText={setCity}

          />
        </View>

        {/* Country Dropdown */}
        <View style={styles.inputWrapper}>
          <Dropdown
            style={styles.input}
            data={countryOptions}
            labelField="label"
            valueField="value"
            placeholder={"Country/Regionborder india"}
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText} // Set color for items
            value={country}
            onChange={item => setCountry(item.value)}
            renderRightIcon={() => (
              <Text style={styles.customIcon}>▼</Text>
            )}
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
              value={state}
              onChange={(item) => setState(item.value)}
              renderRightIcon={() => (
                <Text style={styles.customIcon}>▼</Text>
              )}
            />
          </View>

          {/* Pincode Input */}
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              placeholderTextColor={colors.paymenttext}
              value={pincode}
              onChangeText={setPincode}

            />
          </View>
        </View>


        <View style={styles.checkboxRow}>
          <View
            style={[styles.checkboxWrapper, checked && styles.checkedBackground]}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => setChecked(!checked)}
              color="#FFF"
              uncheckedColor="#DFE7EF"
            />
          </View>
          <Text style={styles.checkboxText}>
            Save this information for the next time
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddressList')}
          style={styles.book}>
          <Text style={styles.btext1}>CONTINUE</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Place Order Button */}

    </View>
  );
};

export default Address;


