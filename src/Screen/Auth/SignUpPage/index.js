import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  PermissionsAndroid,
  Animated,
  Vibration,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import SelectModal from '../../../Component/dropdown';
import {useNavigation} from '@react-navigation/native';
import {fontSize} from '../../../Component/fontsize';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../../Redux/Slice/Authslice';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../../../Component/Loader';

const SignUpPage = ({route}) => {
  console.log(route,"######")
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: '',
    value: '',
  });
  const isLoading = useSelector(state => state.Auth?.loading);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedname, setSelectedname] = useState(null);
  const [selectedname1, setSelectedname1] = useState(null);
  const [selectedImagetype, setSelectedImagetype] = useState(null);

  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [search, setSearch] = useState('');
  const onSelect = item => {
    setSelectedItem(item);
    setGender(item.label);
    setVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const [shakeAnimation, setShakeAnimation] = useState({
    name: new Animated.Value(0),
    email: new Animated.Value(0),
    mobile: new Animated.Value(0),
    cityPincode: new Animated.Value(0),
    gender: new Animated.Value(0),
    date: new Animated.Value(0),
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    cityPincode: '',
    date: '',
    birthPlace: '',
  });

  const formatDate = date => {
    if (!date) return 'Date of Birth';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const [time, setTime] = useState(''); // State to store selected time
  const [open1, setOpen1] = useState(false); // State to control date picker visibility

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
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log(
        granted === PermissionsAndroid.RESULTS.GRANTED
          ? 'Camera permission granted'
          : 'Camera permission denied',
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    setModalVisible(false);
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
      

        const pickedImage = response.assets[0];
        setSelectedImage(pickedImage);
      }
    });
  };
  const openCamera = async () => {
    setModalVisible(false); // Close modal immediately
    await requestCameraPermission(); // Handle async logic
    const options = {
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera error: ', response.error);
      }else if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0];
        setSelectedImage(pickedImage);
      }
    });
  };



  const scrollViewRef = useRef(null);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});

    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const mobileRegex = /^[0-9]{0,10}$/;

      mobileRegex.test(numericValue)
        ? setFormData({...formData, mobile: numericValue})
        : Toast.show('Invalid mobile number.');
    } else if (name === 'cityPincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const pinCodeRegex = /^[0-9]{0,6}$/;

      pinCodeRegex.test(numericValue)
        ? setFormData({...formData, cityPincode: numericValue})
        : Toast.show('Invalid city pincode.');
    }
  };
  // Shake animation function
  const shake = field => {
    Vibration.vibrate(100); // Vibration for 100 milliseconds
    Animated.sequence([
      Animated.timing(shakeAnimation[field], {
        toValue: 5, // how far the input will shake
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation[field], {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      scrollToField(field); // Scroll to the field after shake animation completes
    });
  };
  const scrollToField = fieldName => {
    const fieldOffsets = {
      services: 0,
      name: 0,
      email: 100,
      mobile: 200,
      gender: 300,
      cityPincode: 400,
      date: 500,
      time: 600,
      birthPlace: 700,
      additionalInfo: 800,
    };
    scrollViewRef.current.scrollTo({
      y: fieldOffsets[fieldName],
      animated: true,
    });
  };

  const handleSubmit = async () => {
    Animated.sequence([
      Animated.timing(buttonAnimatedValue, {
        toValue: 0.94,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (formData.name === '') {
      shake('name');
      scrollToField('name');
      return;
    } else if (formData.email === '') {
      shake('email');
      scrollToField('email');
      return;
    } else if (!emailRegex.test(formData.email)) {
      shake('email');
      scrollToField('email');
      return;
    } else if (formData.mobile === '') {
      shake('mobile');
      scrollToField('mobile');
      return;
    } else if (formData.mobile.length < 10) {
      shake('mobile');
      scrollToField('mobile');
      return;
    } else if (gender === '') {
      shake('gender');
      scrollToField('gender');
      return;
    } else if (formData.cityPincode === '') {
      shake('cityPincode');
      scrollToField('cityPincode');
      return;
      } else if (date === '') {
        shake('date');
        scrollToField('date');
        return;
    } else if (formData.cityPincode.length < 6) {
      shake('cityPincode');
      scrollToField('cityPincode');
      return;
    } else {
      const formUserData = new FormData();
      formUserData.append('name', formData.name);
      formUserData.append('email', formData.email);
      formUserData.append('phone', formData.mobile);
      formUserData.append('gender', gender);
      formUserData.append('dob', formatDate(date));
      formUserData.append('city_pincode',formData.cityPincode)
      formUserData.append('time_of_birth', formatTime(time));
      formUserData.append('place_of_birth', formData.birthPlace);
      formUserData.append('avatar',{
        uri: selectedImage.uri,
        name: selectedImage.fileName,
        type: selectedImage.type,
      });
      await dispatch(
        signupUser({
          formUserData,
          url: 'sign-up',
          navigation,
          route
        }),
      );
    }
  };

  const data = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Transgender', value: 'transgender'},
  ];

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : null}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.main1}
        keyboardShouldPersistTaps="handled">
        <View style={styles.subt}>
          <Text style={styles.title}>Sign up</Text>

          <Text style={styles.title1}>{'Hello there !\nwelcome to you.'}</Text>
        </View>

        <View style={{paddingHorizontal: 5}}>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Full Name*</Text>
            <View style={[styles.input, styles.inputShadow]}>
              <Animated.View
                style={[{transform: [{translateX: shakeAnimation.name}]}]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Name"
                  placeholderTextColor={colors.placeholder}
                  value={formData.name}
                  onChangeText={text => handleInputChange('name', text)}
                />
              </Animated.View>
            </View>
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Email*</Text>
            <View style={[styles.input, styles.inputShadow]}>
              <Animated.View
                style={[{transform: [{translateX: shakeAnimation.email}]}]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Email"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={text => handleInputChange('email', text)}
                />
              </Animated.View>
            </View>
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Mobile Number*</Text>
            <View style={[styles.input, styles.inputShadow]}>
              <Animated.View
                style={[{transform: [{translateX: shakeAnimation.mobile}]}]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Mobile Number"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="phone-pad"
                  value={formData.mobile}
                  maxLength={10}
                  onChangeText={text => handleInputChange('mobile', text)}
                />
              </Animated.View>
            </View>
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Gender*</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.gender}]}]}>
              <Dropdown
                style={[
                  styles.input,
                  styles.inputShadow,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  },
                ]}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={'Gender'}
                placeholderStyle={{
                  color: gender ? colors.heading : colors.placeholder,
                  fontSize: fontSize.Sixteen,
                  // marginTop: 2,
                  fontFamily: 'Poppins-Regular',
                }}
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.itemText}
                value={gender}
                onChange={text => setGender(text.value)}
                renderRightIcon={() => (
                  <Image
                    style={{
                      height: 8,
                      width: 15,
                    }}
                    source={require('../../../assets/image/arrow_icon.png')}
                  />
                )}
              />
            </Animated.View>
          </View>

          {/* <View style={styles.inputmain}>
            <Text style={styles.title2}>Gender*</Text>
            <TouchableOpacity
              onPress={() => setVisible(true)}
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
                style={{
                  color: gender ? '#000' : colors.placeholder,
                  fontSize: fontSize.Sixteen,
                  // marginTop: 2,
                  fontFamily: 'Poppins-Regular',
                }}>
                {gender ? gender : 'Gender'}
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
            <Text style={styles.title2}>Current City Pincode*</Text>
            <View style={[styles.input, styles.inputShadow]}>
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.cityPincode}]},
                ]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Current City Pincode"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="numeric"
                  maxLength={6}
                  value={formData.cityPincode}
                  onChangeText={text => handleInputChange('cityPincode', text)}
                />
              </Animated.View>
            </View>
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Date of Birth*</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.date}]}]}>
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
                    {color: date === '' ? colors.placeholder : colors.heading},
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
            </Animated.View>
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

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Time of Birth</Text>

            {/* Input area with DatePicker */}
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
                  {color: time === '' ? colors.placeholder : colors.heading},
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
            <View style={[styles.input, styles.inputShadow]}>
              <TextInput
                style={styles.inputText}
                placeholder="Place of Birth"
                placeholderTextColor={colors.placeholder}
                value={formData.birthPlace}
                onChangeText={text => handleInputChange('birthPlace', text)}
              />
            </View>
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Upload Photo</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 5,
                },
              ]}>
              <TextInput
                style={styles.input1}
                placeholder="Upload Photo"
                placeholderTextColor={colors.placeholder}
                value={selectedImage?.uri}
                editable={false}
              />

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.buttoncontainer1}>
                <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                  {'Browse'}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.uppload}>Maximum upload file size 2mb.</Text>
          </View>

          <Animated.View style={[{transform: [{scale: buttonAnimatedValue}]}]}>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.buttoncontainer}>
              <Text style={styles.btext}>{'SUBMIT'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Profile Picture</Text>
            <TouchableOpacity
              onPress={() => openCamera()}
              style={[styles.modalBtn]}>
              <Image
                source={require('../../../assets/image/cameraIcon.png')}
                style={styles.modalBtnIcon}
              />
              <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openGallery()}
              style={[styles.modalBtn]}>
              <Image
                source={require('../../../assets/image/galleryIcon.png')}
                style={styles.modalBtnIcon}
              />
              <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}>
              <Image source={require('../../../assets/image/close.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SignUpPage;
