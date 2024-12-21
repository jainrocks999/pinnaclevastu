import React, { useState } from 'react';
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
import { colors } from '../../../Component/colors';
import { fontSize } from '../../../Component/fontsize';
import SelectModal from '../../../Component/dropdown';
import { Checkbox } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import { Dropdown } from 'react-native-element-dropdown';


const ResidentalScreen = ({ navigation }) => {
  const [isResident, setIsresident] = useState(true);
  const [isIndustrial, setIsindustrial] = useState(false);
  const [isGemstone, setIsGemstone] = useState(false);

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: '',
    value: '',
  });

  const [gender, setGender] = useState('');
  const [search, setSearch] = useState('');
  const onSelect = item => {
    setSelectedItem(item);
    setGender(item.label);
    setVisible(false);
  };

  

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];

  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const formatDate = date => {
    if (!date) return 'Date of Birth';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const [time, setTime] = useState('');
  const [open1, setOpen1] = useState(false);

  const formatTime = time => {
    if (!time) return 'Time Of Birth';
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    cityPincode: '',
    birthPlace: '',
    additionalInfo: ''
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const mobileRegex = /^[0-9]{0,10}$/;

      mobileRegex.test(numericValue)
        ? setFormData({ ...formData, mobile: numericValue })
        : Toast.show('Invalid mobile number.');

    } else if (name === 'cityPincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const pinCodeRegex = /^[0-9]{0,6}$/;

      pinCodeRegex.test(numericValue)
        ? setFormData({ ...formData, cityPincode: numericValue })
        : Toast.show('Invalid city pincode.');
    }
  };

  const handleSubmit = () => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (formData.name == '') {
      Toast.show('Please enter name');
      return;
    } else if (formData.email == '') {
      Toast.show('Please enter email');
      return;
    } else if (!emailRegex.test(formData.email)) {
      Toast.show('Please valid Email');
      return;
    } else if (formData.mobile == '') {
      Toast.show('Please enter mobile Number');
      return;
    } else if (formData.mobile.length < 10) {
      Toast.show('Mobile number should be at least 10 digits');
      return;
    } else if (gender == '') {
      Toast.show('Please enter gender');
      return;
    } else if (formData.cityPincode == '') {
      Toast.show('Please enter city pincode');
      return;
    } else if (formData.cityPincode.length < 6) {
      Toast.show('Pincode should be at least 6 digits');
      return;
    } else if (date == '') {
      Toast.show('Please enter Birth Date');
      return;
    } else {
      navigation.navigate('Payment', { data1: 'Residental' })
    }
    console.log(formData);
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
          <Text style={styles.logoText}>Make a Appointment</Text>
        </View>
      </View>

      {/* <SelectModal
        search={search}
        data={data}
        setSearch={setSearch}
        visible={visible}
        onSelect={onSelect}
        onClose={value => setVisible(value)}
      /> */}
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={[styles.cardContainer2]}>
          <Text
            style={[
              styles.service,
              styles.widthOfSevices1,
              { fontSize: fontSize.Fifteen },
            ]}>
            Services
          </Text>
          <View>
            <View style={styles.serviceSection}>
              <View
                style={[
                  styles.checkboxWrapper,
                  isResident && styles.checkedBackground,
                ]}>
                <Checkbox
                  status={isResident ? 'checked' : 'unchecked'}
                  onPress={() => setIsresident(!isResident)}
                  color="#FFF"
                  uncheckedColor="#DFE7EF"
                />
              </View>

              <Text style={styles.labelText}>Residential Vastu</Text>
              <Text style={styles.priceText}>₹ 5000</Text>
            </View>
            <View
              style={[
                styles.serviceSection,
                {
                  borderColor: colors.lightGrey,
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                },
              ]}>
              <View
                style={[
                  styles.checkboxWrapper,
                  isIndustrial && styles.checkedBackground,
                ]}>
                <Checkbox
                  status={isIndustrial ? 'checked' : 'unchecked'}
                  onPress={() => setIsindustrial(!isIndustrial)}
                  color="#FFF"
                  uncheckedColor="#DFE7EF"
                />
              </View>

              <Text style={styles.labelText}>Industrial Vastu</Text>
              <Text style={styles.priceText}>₹ 25000</Text>
            </View>

            <View style={styles.serviceSection}>
              <View
                style={[
                  styles.checkboxWrapper,
                  isGemstone ? styles.checkedBackground : null,
                ]}>
                <Checkbox
                  status={isGemstone ? 'checked' : 'unchecked'}
                  onPress={() => setIsGemstone(!isGemstone)}
                  color="#FFF"
                  uncheckedColor="#DFE7EF"
                />
              </View>
              <Text style={styles.labelText}>Gemstone</Text>
              <Text style={styles.priceText}>₹ 500</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer2}>
          <Text style={[styles.service, styles.widthOfSevices2, { fontSize: fontSize.Fifteen }]}>
            Personal Detail
          </Text>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Full Name*</Text>
            <TextInput
              style={[styles.input, { elevation: 5 }]}
              placeholder="Name"
              placeholderTextColor={colors.placeholder}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Email*</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Mobile Number*</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={colors.placeholder}
              maxLength={10}
              keyboardType="numeric"
              value={formData.mobile}
              onChangeText={text => handleInputChange('mobile', text)}
            />
          </View>
          {/* <View style={styles.inputmain}>
            <Text style={styles.title2}>Gender*</Text>

            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  color: gender ? colors.heading : colors.placeholder,
                  fontSize: fontSize.Fifteen,
                  // marginTop: 2,
                  fontFamily: 'Poppins-Regular',
                }}>
                {gender == '' ? 'Gender' : gender}
              </Text>
              <Image
                style={{
                  height: 8,
                  width: 15,
                }}
                source={require('../../../assets/image/arrow_icon.png')}
              />
            </TouchableOpacity>
          </View> */}

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Gender*</Text>
            <Dropdown
              style={styles.input}
              data={genderOptions}
              labelField="label"
              valueField="value"
              placeholder={'Select Gender'}
              placeholderStyle={{
                color: formData.gender ? colors.heading : colors.placeholder,
                fontSize: fontSize.Fifteen,
              }}
              selectedTextStyle={{
                color: colors.heading,
                fontSize: fontSize.Fifteen,
                fontFamily: 'Poppins-Regular',
              }}
              value={formData.gender}
              onChange={text => handleInputChange('gender', text.value)}
              renderRightIcon={() => (
                <Image
                  style={{
                    height: 8,
                    width: 15,
                  }}
                  source={require('../../../assets/image/arrow_icon.png')}
                />
              )}
              renderItem={item => (
                <Text
                  style={{
                    color: colors.heading, // इनपुट का टेक्स्ट कलर
                    fontSize: fontSize.Fifteen,
                    fontFamily: 'Poppins-Regular',
                    padding: 10, // आइटम के लिए padding
                  }}
                >
                  {item.label} 
                </Text>
              )}
            />



          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Current City Pincode*</Text>
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              value={formData.cityPincode}
              onChangeText={text => handleInputChange('cityPincode', text)}
            />
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Date of Birth*</Text>

            <TouchableOpacity
              onPress={() => setOpen(true)}
              style={[
                styles.input,
                styles.inputShadow,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  styles.input1,
                  { color: date === '' ? colors.placeholder : colors.heading },
                ]}>
                {formatDate(date)}
              </Text>

              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../../../assets/image/cale.png')}
              />
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              date={date || new Date()}
              mode="date"
              maximumDate={new Date()}
              onConfirm={selectedDate => {
                setOpen(false);
                setDate(selectedDate);
              }}
              onCancel={() => setOpen(false)}
            />
          </View>

          {/* <View style={styles.inputmain}>
          <Text style={styles.title2}>Date of Birth</Text>
          <View
            style={[
              styles.input,
              styles.inputShadow,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              style={styles.input1}
              placeholder="Date of Birth"
              placeholderTextColor={colors.placeholder}
              keyboardType="number-pad"
            />
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../../../assets/image/cale.png')}
            />
          </View>
        </View> */}

          {/* <View style={styles.inputmain}>
          <Text style={styles.title2}>Time of Birth</Text>
          <View
            style={[
              styles.input,
              styles.inputShadow,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <TextInput
              style={styles.input1}
              placeholder="Time of Birth"
              placeholderTextColor={colors.placeholder}
              keyboardType="number-pad"
            />
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../../../assets/image/Layer.png')}
            />
          </View>
        </View> */}

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Time of Birth</Text>

   
            <TouchableOpacity
              onPress={() => setOpen1(true)}
              style={[
                styles.input,
                styles.inputShadow,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  styles.input1,
                  { color: time === '' ? colors.placeholder : colors.heading },
                ]}>
                {formatTime(time)}
              </Text>

              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../../../assets/image/Layer.png')}
              />
            </TouchableOpacity>

            <DatePicker
              modal
              open={open1}
              date={time || new Date()}
              mode="time"
              onConfirm={selectedTime => {
                setOpen1(false);
                setTime(selectedTime);
              }}
              onCancel={() => setOpen1(false)}
            />
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Place of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Place of Birth"
              placeholderTextColor={colors.placeholder}
              value={formData.birthPlace}
              onChangeText={text => handleInputChange('birthPlace', text)}
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Additional Information Message</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Type here..."
              placeholderTextColor={colors.placeholder}
              value={formData.additionalInfo}
              onChangeText={text => handleInputChange('additionalInfo', text)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.book}>
          <Text style={styles.btext1}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
    
    </View>
  );
};

export default ResidentalScreen;
