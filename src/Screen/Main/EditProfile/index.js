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

import {useNavigation} from '@react-navigation/native';
import {fontSize} from '../../../Component/fontsize';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {updateApi} from '../../../Redux/Slice/Authslice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../Component/Loader';

const EditProfile = () => {
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const userDetail = useSelector(state => state?.Auth?.userData);
  const isLoading =useSelector(state=>state?.Auth?.loading);
  const [visible, setVisible] = useState(false);
  const [isuserselectimage,setIsuserselectimage] =useState(false)
  const [selectedItem, setSelectedItem] = useState({
    label: '',
    value: '',
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [gender, setGender] = useState(userDetail?.gender ?? '');

  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState({
    uri: userDetail?.avatar ?? '', 
    name: '',
    type: '', 
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: userDetail.name,
    email: userDetail.email,
    mobile: userDetail.phone,
    cityPincode: JSON.stringify(userDetail?.city_pincode) ?? '',
    birthPlace: userDetail?.place_of_birth ?? '',
  });

  const [shakeAnimation, setShakeAnimation] = useState({
    name: new Animated.Value(0),
    email: new Animated.Value(0),
    mobile: new Animated.Value(0),
    cityPincode: new Animated.Value(0),
    gender: new Animated.Value(0),
    // date: new Animated.Value(0),
    birthPlace: new Animated.Value(0),
    // additionalInfo: new Animated.Value(0),
    // time: new Animated.Value(0),
    // services: new Animated.Value(0),
  });
  const scrollViewRef = useRef(null);
  console.log('gfaadssa', userDetail);

  const [date, setDate] = useState(
    userDetail?.dob ? new Date(userDetail.dob) : null,
  );
  const [open, setOpen] = useState(false);

  const formatDate = date => {
    console.log('fjffkjgdfk', date);

    if (!date) return 'Date of Birth';
    const day = date?.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const parseTimeString = timeString => {
    const [time, modifier] = timeString.split(' '); // Split time and AM/PM
    const [hours, minutes] = time.split(':'); // Split hours and minutes

    let hour = parseInt(hours, 10);
    if (modifier === 'PM' && hour !== 12) {
      hour += 12; // Convert PM hours to 24-hour format
    }
    if (modifier === 'AM' && hour === 12) {
      hour = 0; // Convert 12 AM to 0 hours (midnight)
    }

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0); // Set seconds to 0 for consistency

    return date;
  };

  const [time, setTime] = useState(() => {
    if (userDetail?.time_of_birth) {
      return parseTimeString(userDetail.time_of_birth); // Parse the time string to Date
    }
    return null; // If no time, set to null
  });

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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

  const openCamera = async () => {
    await requestCameraPermission();
    console.log('handleCamera');
    const options = {
      mediaType: 'photo',
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera error: ', response.error);
      } else if (response.assets) {
        const pickedImage = response.assets[0];
        setIsuserselectimage(true);
        setSelectedImage({
          uri: pickedImage.uri, // Initial URI is the avatar URL from userDetail
          name: pickedImage.fileName, // Default name is empty
          type: pickedImage.type, // Default type is empty
        });
      }
      toggleModal();
    });
  };

  const openGallery = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0];
        setIsuserselectimage(true);
        setSelectedImage({
          uri: pickedImage.uri, // Initial URI is the avatar URL from userDetail
          name: pickedImage.fileName, // Default name is empty
          type: pickedImage.type, // Default type is empty
        });
      }
      toggleModal();
    });
  };

  const data = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Transgender', value: 'transgender'},
  ];

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
    ]).start();
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
    } else if (formData.cityPincode.length < 6) {
      shake('cityPincode');
      scrollToField('cityPincode');
      return;
    } else {
      const userid = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('Token');
      // const formUserData = new FormData();

      // formUserData.append('user_id',userid);
      // formUserData.append('name', formData.name);
      // formUserData.append('email', formData.email);
      // formUserData.append('phone', formData.mobile);
      // formUserData.append('gender', gender);
      // formUserData.append('dob', formatDate(date));
      // formUserData.append('city_pincode', formData.cityPincode);
      // formUserData.append('time_of_birth', formatTime(time));
      // formUserData.append('place_of_birth', formData.birthPlace);
      // formUserData.append('avatar', {
      //   uri: selectedImage.uri,
      //   name: selectedImage.name,
      //   type: selectedImage.type,
      // });
      let data = new FormData();
      data.append('name',  formData.name);
      data.append('email',  formData.email);
      data.append('phone',  formData.mobile);
      data.append('dob', formatDate(date));
      data.append('time_of_birth',formatTime(time));
      data.append('place_of_birth', formData.birthPlace);
      data.append('gender', gender);
      data.append('city_pincode', formData.cityPincode);
      data.append('user_id', userid);
      {isuserselectimage?
        data.append('avatar', {
          uri: selectedImage.uri,
          name: selectedImage.name,
          type: selectedImage.type,
        }):null
      }
     
      await dispatch(
        updateApi({
          formUserData:data,
          url: 'profile-update',
          token,
          userid,
          navigation,
        }),
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

        <Text style={styles.logoText}>Edit My Profile</Text>
      </View>
       {isLoading?<Loader/>:null}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.main1} // Added to fix scrolling
        keyboardShouldPersistTaps="handled" // Dismisses keyboard on tap outside
      >
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Full Name*</Text>\
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.name}]}]}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={colors.placeholder}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
          </Animated.View>
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Email*</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.email}]}]}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
          </Animated.View>
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Mobile Number*</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.mobile}]}]}>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={colors.placeholder}
              keyboardType="phone-pad"
              maxLength={10}
              value={formData.mobile}
              onChangeText={text => handleInputChange('mobile', text)}
            />
          </Animated.View>
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

        <View style={styles.inputmain}>
          <Text style={styles.title2}>Current City Pincode*</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.cityPincode}]}]}>
            {console.log('formData.cityPincode', formData.cityPincode)}

            <TextInput
              style={styles.input}
              placeholder="Current City Pincode"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              value={formData.cityPincode}
              maxLength={6}
              onChangeText={text => handleInputChange('cityPincode', text)}
            />
          </Animated.View>
        </View>

        <View style={styles.inputmain}>
          <Text style={styles.title2}>Date of Birth*</Text>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[
              styles.input,
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
          <TouchableOpacity
            onPress={() => setOpen1(true)}
            style={[
              styles.input,
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
          <TextInput
            style={styles.input}
            placeholder="Place of Birth"
            placeholderTextColor={colors.placeholder}
            value={formData.birthPlace}
            onChangeText={text => handleInputChange('birthPlace', text)}
          />
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Upload Photo</Text>
          <View
            style={[
              styles.input,
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <TextInput
              style={styles.input1}
              placeholder="Upload Photo"
              placeholderTextColor={colors.placeholder}
              value={selectedImage.uri}
              editable={false}
            />
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.buttoncontainer1}>
              <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                {'Browse'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.uppload}>Maximum upload file size 2mb.</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttoncontainer}>
          <Text style={styles.btext}>{'UPDATE PROFILE'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Profile Picture</Text>
            <TouchableOpacity onPress={openCamera} style={[styles.modalBtn]}>
              <Image
                source={require('../../../assets/image/cameraIcon.png')}
                style={styles.modalBtnIcon}
              />
              <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery} style={[styles.modalBtn]}>
              <Image
                source={require('../../../assets/image/galleryIcon.png')}
                style={styles.modalBtnIcon}
              />
              <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={toggleModal}>
              <Image source={require('../../../assets/image/close.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
