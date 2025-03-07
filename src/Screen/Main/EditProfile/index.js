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
import { updatedata1 } from '../../../Redux/Slice/loginSlice';
import { getCutomerMetafields, updateCustomerMetafields } from '../../../Redux/Api';

const EditProfile = () => {
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const userDetail = useSelector(state => state?.Auth?.userData);
  const isLoading = useSelector(state => state?.Auth?.loading);
 const {userDetails} = useSelector(state => state.Login);

     const loginUserData = useSelector(state => state?.Auth?.loginUserData);
     console.log('datata ....12332',userDetails,loginUserData?.shopify_access_token);
  const [isuserselectimage, setIsuserselectimage] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [gender, setGender] = useState(userDetail?.gender ?? '');

  const [selectedImage, setSelectedImage] = useState({
    uri: userDetail?.avatar ?? '',
    name: '',
    type: '',
  });

 const Apicall =async()=>{
  // const variables = {
  //   customer: {
  //     acceptsMarketing: true,
  //     email: userDetails?.email,
  //     firstName:userDetails?.firstName,
  //     lastName: userDetails?.lastName,
  //     password: '123456',
  //     phone: userDetails?.phone
  //   },
  //   customerAccessToken:loginUserData?.shopify_access_token
   
  //   }
  const userStatus = await AsyncStorage.getItem('user_data');
  const userData = userStatus ? JSON.parse(userStatus) : null;
 
    // await dispatch(
    //   updatedata1({
    //       acceptsMarketing: true,
    //       email: userDetails?.email,
    //       firstName:userDetails?.firstName,
    //       lastName: userDetails?.lastName,
    //       password: '123456',
    //       phone: userDetails?.phone,
    //     customerAccessToken:userData?.shopify_access_token,
    //     navigation
    //   }),
    // );
      // const customerId = userDetails?.id;

      // data.append('name', formData.name);
      // data.append('email', formData.email);
      // data.append('phone', formData.mobile);
      // data.append('dob', formatDate(date));
      // data.append('time_of_birth', formatTime(time));
      // data.append('place_of_birth', formData.birthPlace);
      // data.append('gender', gender);
      // data.append('city_pincode', formData.cityPincode);
      // data.append('user_id', userid);

      const customerId =userDetails?.id;  // ✅ Ensure this is correct format

      const metafields = [
        { key: "gender", type: "list.single_line_text_field", value: [gender] },
        { key: "current_city_pincode", type: "single_line_text_field", value:formData.cityPincode },
        { key: "mobile_number", type: "single_line_text_field", value: formData.mobile },
        { key: "full_name", type: "single_line_text_field", value: formData.name },
        { key: "birth_time", type: "date_time", value: "2005-08-06T20:30:00Z" },
        { key: "birth_date", type: "date", value: "2005-11-30" }
      ];
      
      updateCustomerMetafields(customerId, metafields)
        .then(data => console.log("✅ Final Metafields Response:", data))
        .catch(error => console.error("❌ Error:", error));

          
        
 }

// useEffect(()=>{
//   Apicall()
// },[userDetails])



  const [isModalVisible, setModalVisible] = useState(false);

  const [validationError, setValidationError] = useState({
    name: false,
    email: false,
    mobile: false,
    gender: false,
    cityPincode: false,
    date: false,
  });

  const [formData, setFormData] = useState({
    name: userDetails?.displayName,
    email: userDetails?.email,
    mobile: userDetails?.phone,
    cityPincode: JSON.stringify(userDetail?.city_pincode) ?? '',
    birthPlace: userDetail?.place_of_birth ?? '',
  });

  const [shakeAnimation, setShakeAnimation] = useState({
    name: new Animated.Value(0),
    email: new Animated.Value(0),
    mobile: new Animated.Value(0),
    cityPincode: new Animated.Value(0),
    gender: new Animated.Value(0),
    birthPlace: new Animated.Value(0),
  });
  const scrollViewRef = useRef(null);

  const [date, setDate] = useState(
    userDetail?.dob ? new Date(userDetail.dob) : null,
  );
  const [open, setOpen] = useState(false);

  const formatDate = date => {
    if (!date) return 'Date of Birth';
    const day = date?.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const parseTimeString = timeString => {
    const [time, modifier] = timeString.split(' ');
    const [hours, minutes] = time.split(':');

    let hour = parseInt(hours, 10);
    if (modifier === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (modifier === 'AM' && hour === 12) {
      hour = 0;
    }

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);

    return date;
  };

  const [time, setTime] = useState(() => {
    if (userDetail?.time_of_birth) {
      return parseTimeString(userDetail.time_of_birth);
    }
    return null;
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
      console.log(granted);
    } catch (err) {
      console.warn(err);
    }
  };

  const openCamera = async () => {
    await requestCameraPermission();
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
          uri: pickedImage.uri,
          name: pickedImage.fileName,
          type: pickedImage.type,
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
          uri: pickedImage.uri,
          name: pickedImage.fileName,
          type: pickedImage.type,
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
    setValidationError({...validationError, [name]: false});

    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const mobileRegex = /^[0-9]{0,13}$/;

      mobileRegex.test(numericValue)
        ? setFormData({...formData, mobile: numericValue})
        : (Toast.show('Invalid mobile number.'),
          setValidationError({...validationError, mobile: true}));
    } else if (name === 'cityPincode') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const pinCodeRegex = /^[0-9]{0,6}$/;

      pinCodeRegex.test(numericValue)
        ? setFormData({...formData, cityPincode: numericValue})
        : (Toast.show('Invalid city pincode.'),
          setValidationError({...validationError, [name]: true}));
    }
  };

  const shake = field => {
    setValidationError({...validationError, [field]: true});
    Vibration.vibrate(100);
    Animated.sequence([
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
    } else if (formData.mobile.length < 13) {
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

      let data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.mobile);
      data.append('dob', formatDate(date));
      data.append('time_of_birth', formatTime(time));
      data.append('place_of_birth', formData.birthPlace);
      data.append('gender', gender);
      data.append('city_pincode', formData.cityPincode);
      data.append('user_id', userid);
      {
        isuserselectimage
          ? data.append('avatar', {
              uri: selectedImage.uri,
              name: selectedImage.name,
              type: selectedImage.type,
            })
          : null;
      }

      await dispatch(
        updateApi({
          formUserData: data,
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
      {isLoading ? <Loader /> : null}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.main1}
        keyboardShouldPersistTaps="handled">
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Full Name*</Text>\
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.name}]}]}>
            <TextInput
              style={[
                styles.input,
                validationError.name && {borderColor: 'red'},
              ]}
              placeholder="Name"
              placeholderTextColor={colors.placeholder}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
          </Animated.View>
          {validationError.name && (
            <Text style={styles.errorText}>Please enter your valid name.</Text>
          )}
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Email*</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.email}]}]}>
            <TextInput
              style={[
                styles.input,
                validationError.email && {borderColor: 'red'},
              ]}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
            />
          </Animated.View>
          {validationError.email && (
            <Text style={styles.errorText}>Please enter your valid email.</Text>
          )}
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Mobile Number*</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.mobile}]}]}>
            <TextInput
              style={[
                styles.input,
                validationError.mobile && {borderColor: 'red'},
              ]}
              placeholder="Mobile Number"
              placeholderTextColor={colors.placeholder}
              keyboardType="phone-pad"
              maxLength={13}
              value={formData.mobile}
              onChangeText={text => handleInputChange('mobile', text)}
            />
          </Animated.View>
          {validationError.mobile && (
            <Text style={styles.errorText}>
              Please enter your valid mobile number.
            </Text>
          )}
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
                validationError.gender && {borderColor: 'red'},
              ]}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={'Gender'}
              placeholderStyle={{
                color: gender ? colors.heading : colors.placeholder,
                fontSize: fontSize.Sixteen,
                fontFamily: 'Poppins-Regular',
              }}
              selectedTextStyle={styles.selectedText}
              itemTextStyle={styles.itemText}
              value={gender}
              onChange={text => (
                setGender(text.value),
                setValidationError({...validationError, gender: false})
              )}
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
           {validationError.gender && ( 
            <Text style={styles.errorText}>Please select your gender.</Text>
          )} 
        </View>

        <View style={styles.inputmain}>
          <Text style={styles.title2}>Current City Pincode*</Text>
          <Animated.View
            style={[{transform: [{translateX: shakeAnimation.cityPincode}]}]}>
            <TextInput
              style={[
                styles.input,
                validationError.cityPincode && {borderColor: 'red'},
              ]}
              placeholder="Current City Pincode"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
              value={formData.cityPincode}
              maxLength={6}
              onChangeText={text => handleInputChange('cityPincode', text)}
            />
          </Animated.View>
          {validationError.cityPincode && (
            <Text style={styles.errorText}>
              Please enter your valid city pincode.
            </Text>
          )}
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
              validationError.date && {borderColor: 'red'},
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
          {validationError.date && (
            <Text style={styles.errorText}>
              Please enter your valid date of birth.
            </Text>
          )}
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
