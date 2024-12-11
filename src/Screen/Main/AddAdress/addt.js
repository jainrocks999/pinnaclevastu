import {StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import CheckBox from '@react-native-community/checkbox';
const Address = () => {
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

  const countryOptions = [
    {label: 'India', value: 'India'},
    {label: 'USA', value: 'USA'},
    {label: 'UK', value: 'UK'},
  ];

  const stateOptions = [
    {label: 'Maharashtra', value: 'Maharashtra'},
    {label: 'Gujarat', value: 'Gujarat'},
    {label: 'California', value: 'California'},
  ];

  return (
    <View style={styles.main}>
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Add Details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <Text style={styles.addresstext}>Address</Text>

        {/* Full Name Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#4A4A4A"
            value={firstName}
            onChangeText={setFirstName}
            color="#4A4A4A"
          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#4A4A4A"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            color="#4A4A4A"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#4A4A4A"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            color="#4A4A4A"
          />
        </View>

        {/* Address Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="#4A4A4A"
            value={address}
            onChangeText={setAddress}
            color="#4A4A4A"
          />
        </View>

        {/* Apartment Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Apartment, suite, etc. (optional)"
            placeholderTextColor="#4A4A4A"
            value={apartment}
            onChangeText={setApartment}
            color="#4A4A4A"
          />
        </View>

        {/* City Input */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#4A4A4A"
            value={city}
            onChangeText={setCity}
            color="#4A4A4A"
          />
        </View>

        {/* Country Dropdown */}
        <View style={styles.inputWrapper}>
          <Dropdown
            style={styles.input}
            data={countryOptions}
            labelField="label"
            valueField="value"
            placeholder="Country/Region india"
            placeholderStyle={styles.placeholder}
            selectedTextStyle={styles.selectedText}
            itemTextStyle={styles.itemText} // Set color for items
            value={country}
            onChange={item => setCountry(item.value)}
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
              itemTextStyle={styles.itemText} // Set color for items
              value={state}
              onChange={item => setState(item.value)}
            />
          </View>

          {/* Pincode Input */}
          <View style={styles.halfWidth}>
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="numeric"
              placeholderTextColor="#4A4A4A"
              value={pincode}
              onChangeText={setPincode}
              color="#4A4A4A"
            />
          </View>
        </View>


<View style={styles.checkboxRow}>
  <CheckBox
    value={saveInfo}
    onValueChange={() => setSaveInfo(!saveInfo)}
    tintColors={{
      true: '#F1F1F1', // Border color with 80% opacity when selected
      false: '#F1F1F1', // Border color with 50% opacity when unselected
    }}
    boxType="square"
    onCheckColor="#F1F1F1" // Fill color when selected
    
  />
  <Text style={styles.checkboxText}>
    Save this information for the next time
  </Text>
</View>
      </ScrollView>

      {/* Place Order Button */}
 <TouchableOpacity style={styles.placeOrderButton} >
        <Text style={styles.placeOrderText}>CONTINUE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    elevation:20,
    padding: 15,
  },
  scrollview: {
    paddingBottom: 20,
   
  },
  addresstext: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 20,
    marginTop: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    // borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfWidth: {
    width: '48%',
  },
  placeholder: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  selectedText: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  itemText: {
    color: '#4A4A4A',
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: ,
  },
  checkboxText: {
    color: '#4A4A4A', // Change the text color to red
    fontSize: 14,
    marginLeft: 5,
  },
  headertext: {
    padding:5,
  marginTop:5,
    color: '#4A4A4A',
    fontSize: 16,
  },
  headerview: {
    marginTop: -15,
    width: '100%',
    height: '10%',
    backgroundColor: '#FFFFFF',
  },
  placeOrderButton: {
    backgroundColor: '#F4996C', // Or any color you prefer
    paddingVertical: 12,
    width:'100%',
    // paddingHorizontal: 20,
    borderRadius: 10,
    // marginTop: 20,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});
