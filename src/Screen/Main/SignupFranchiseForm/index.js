import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  PermissionsAndroid,
  Animated,
  Vibration,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {colors} from '../../../Component/colors';
import {useNavigation} from '@react-navigation/native';
import DownarrowIcon from '../../../assets/image/down_grey_icon.svg';
import ClockIcon from '../../../assets/image/timeIcon.svg';
import CalendarIcon from '../../../assets/image/calendarIcon.svg';
import {fontSize} from '../../../Component/fontsize';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import Loader from '../../../Component/Loader';
import {Checkbox} from 'react-native-paper';
import {signupAsFranchiseApi} from '../../../Redux/Slice/ConsultancySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';

const SignUpFranchise = () => {
  const userDetail = useSelector(state => state?.Auth?.userData);
  const services = useSelector(state => state.home?.HomeBanner?.data?.services);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [countryOptions, setCountryOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [servicesFields, setServicesFields] = useState([
    {serviceId: '', charges: ''},
  ]);
  const [shakeAnimationServices] = useState(
    servicesFields.map(() => ({
      serviceId: new Animated.Value(0),
      charges: new Animated.Value(0),
    })),
  );
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const [isuserselectimage, setIsuserselectimage] = useState(false);
  const isLoading = useSelector(state => state.Auth?.loading);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(userDetail?.avatar);

  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [gender, setGender] = useState(userDetail?.gender ?? '');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [date, setDate] = useState(
    userDetail?.dob ? new Date(userDetail.dob) : null,
  );
  const [open, setOpen] = useState(false);

  const [shakeAnimation, setShakeAnimation] = useState({
    name: new Animated.Value(0),
    email: new Animated.Value(0),
    mobile: new Animated.Value(0),
    gender: new Animated.Value(0),
    country: new Animated.Value(0),
    stateName: new Animated.Value(0),
    city: new Animated.Value(0),
    cityPincode: new Animated.Value(0),
    charges: new Animated.Value(0),
    currentLocation: new Animated.Value(0),
    fieldOfExp: new Animated.Value(0),
    yearOfExp: new Animated.Value(0),
    specialization: new Animated.Value(0),
    language: new Animated.Value(0),
    date: new Animated.Value(0),
    selectedImage: new Animated.Value(0),
  });

  const [validationError, setValidationError] = useState({
    name: false,
    email: false,
    mobile: false,
    date: false,
    gender: false,
    fieldOfExp: false,
    yearOfExp: false,
    specialization: false,
    charges: false,
    language: false,

    country: false,
    stateName: false,
    city: false,
    cityPincode: false,
    currentLocation: false,
    services: false,
    servicesCharges: false,
  });

  const [formData, setFormData] = useState({
    name: userDetail.name || '',
    email: userDetail.email || '',
    mobile: userDetail.phone || '',
    country: '',
    stateName: '',
    city: '',
    cityPincode: JSON.stringify(userDetail?.city_pincode) ?? '',
    currentLocation: '',
    charges: '',
    fieldOfExp: '',
    yearOfExp: '',
    specialization: '',
  });
  useEffect(() => {
    getCountryOptionsData();
    getStateOptionsData(formData.country || 0);
    getCityOptionsData(formData.stateName || 0);
  }, [formData.country, formData.stateName]);

  const formatDate = date => {
    if (!date) return 'Date of Birth';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const addExtraInputs = () => {
    Keyboard.dismiss();
    setServicesFields([...servicesFields, {serviceId: '', charges: ''}]);
    shakeAnimationServices.push(new Animated.Value(0));
  };

  const handleExtraInputChange = (index, field, value) => {
    const newInputs = [...servicesFields];
    newInputs[index][field] = value;
    setServicesFields(newInputs);
  };

  const validateInputs = () => {
    let isValid = true;

    if (servicesFields[0].serviceId === '') {
      shake2(0, 'serviceId');
      setValidationError(prevState => ({
        ...prevState,
        services: true,
      }));
      isValid = false;
      return isValid;
    }

    if (servicesFields[0].charges === '' || servicesFields[0].charges <= 0) {
      shake2(0, 'charges');
      setValidationError(prevState => ({
        ...prevState,
        servicesCharges: true,
      }));
      isValid = false;
      return isValid;
    }
    return isValid;
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
        setIsuserselectimage(true);
        setSelectedImage(pickedImage);
      }
      toggleModal();
    });
  };
  const openCamera = async () => {
    setModalVisible(false);
    await requestCameraPermission();
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
      } else if (response.assets && response.assets.length > 0) {
        const pickedImage = response.assets[0];
        setIsuserselectimage(true);
        setSelectedImage(pickedImage);
      }
      toggleModal();
    });
  };

  const scrollViewRef = useRef(null);

  const handleInputChange = (name, value) => {
    setFormData({...formData, [name]: value});
    setValidationError({...validationError, [name]: false});
    if (name === 'mobile') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const mobileRegex = /^[0-9]{0,10}$/;

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
          setValidationError({...validationError, cityPincode: true}));
    }
  };

  const shake = field => {
    Vibration.vibrate(100);
    setValidationError({...validationError, [field]: true});
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
    ]).start(() => {
      scrollToField(field);
    });
  };
  const shake2 = (index, field) => {
    Vibration.vibrate(100);
    setValidationError({...validationError, [field]: true});
    Animated.sequence([
      Animated.timing(shakeAnimationServices[index][field], {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationServices[index][field], {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationServices[index][field], {
        toValue: 5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationServices[index][field], {
        toValue: -5,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimationServices[index][field], {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const scrollToField = fieldName => {
    const fieldOffsets = {
      name: 0,
      email: 100,
      mobile: 200,
      date: 300,
      gender: 400,
      fieldOfExp: 500,
      yearOfExp: 500,
      specialization: 600,
      charges: 600,
      language: 700,
      index: 800,
      country: 800,
      stateName: 800,
      city: 900,
      cityPincode: 900,
      currentLocation: 1000,
      selectedImage: 1500,
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
    } else if (date === '') {
      shake('date');
      scrollToField('date');
      return;
    } else if (gender === '') {
      shake('gender');
      scrollToField('gender');
      return;
    } else if (formData.fieldOfExp === '') {
      shake('fieldOfExp');
      scrollToField('fieldOfExp');
      return;
    } else if (formData.yearOfExp === '') {
      shake('yearOfExp');
      scrollToField('yearOfExp');
      return;
    } else if (formData.specialization === '') {
      shake('specialization');
      scrollToField('specialization');
      return;
    } else if (formData.charges === '') {
      shake('charges');
      scrollToField('charges');
      return;
    } else if (selectedLanguages.length == 0) {
      shake('language');
      scrollToField('language');
      return;
    } else if (!validateInputs()) {
      return;
    } else if (formData.country === '') {
      shake('country');
      scrollToField('country');
      return;
    } else if (formData.stateName === '') {
      shake('stateName');
      scrollToField('stateName');
      return;
    } else if (formData.city === '') {
      shake('city');
      scrollToField('city');
      return;
    } else if (formData.cityPincode === '') {
      shake('cityPincode');
      scrollToField('cityPincode');
      return;
    } else if (formData.cityPincode.length < 6) {
      shake('cityPincode');
      scrollToField('cityPincode');
      return;
    } else if (formData.currentLocation === '') {
      shake('currentLocation');
      scrollToField('currentLocation');
      return;
    } else if (selectedImage == undefined || selectedImage == null) {
      shake('selectedImage');
      scrollToField('selectedImage');
      return;
      selectedImage;
    } else {
      const userid = await AsyncStorage.getItem('user_id');
      const token = await AsyncStorage.getItem('Token');

      const formUserData = new FormData();
      formUserData.append('franchise_name', formData.name);
      formUserData.append('email', formData.email);
      formUserData.append('phone', formData.mobile);
      formUserData.append('gender', gender);
      formUserData.append('dob', formatDate(date));
      formUserData.append('country', formData.country);
      formUserData.append('state', formData.stateName);
      formUserData.append('charges', formData.charges);
      formUserData.append('city', formData.city);
      formUserData.append('pincode', formData.cityPincode);
      formUserData.append('current_location', formData.currentLocation);
      formUserData.append('experience_field', formData.fieldOfExp);
      formUserData.append('experience_of_year', formData.yearOfExp);
      formUserData.append('specializations', formData.specialization);
      formUserData.append('user_id', parseInt(userDetail.id));
      formUserData.append('customer_id', parseInt(userDetail.id));
      servicesFields.forEach((service, index) => {
        formUserData.append(`service_prices[${index}]`, service.charges);
        formUserData.append(`service_id[${index}]`, service.serviceId);
      });
      selectedLanguages.forEach((language, index) => {
        formUserData.append(`language[${index}]`, language);
      });
      if (selectedImage?.fileName == undefined) {
        formUserData.append('customer_profile_img', selectedImage);
      } else {
        formUserData.append('logo', {
          uri: selectedImage.uri || '',
          name: selectedImage.fileName || '',
          type: selectedImage.type || '',
        });
      }

      await dispatch(
        signupAsFranchiseApi({
          formUserData: formUserData,
          url: 'franchise-request-post',
          token,
          navigation,
        }),
      );
    }
  };

  const handleCheckboxPress = language => {
    setSelectedLanguages(prevSelectedLanguages => {
      if (prevSelectedLanguages.includes(language)) {
        return prevSelectedLanguages.filter(lang => lang !== language);
      } else {
        return [...prevSelectedLanguages, language];
      }
    });
  };

  const getCountryOptionsData = async () => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}fetch-country-list`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        setCountryOptions(response?.data?.data);
      }
    } catch (error) {
      console.log('dropdown error ', error);
    }
  };
  const getStateOptionsData = async country_id => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}fetch-state-list?country_id=${country_id}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        setStateOptions(response?.data?.data);
      }
    } catch (error) {
      console.log('dropdown error ', error);
    }
  };
  const getCityOptionsData = async state_id => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}fetch-city-list?state_id=${state_id}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        setCityOptions(response?.data?.data);
      }
    } catch (error) {
      console.log('dropdown error ', error);
    }
  };

  const data = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Transgender', value: 'transgender'},
  ];

  const languageOptions = [
    {label: 'Hindi', value: 'Hindi'},
    {label: 'English', value: 'English'},
    {label: 'Gujarati', value: 'Gujarati'},
  ];

  const getFilteredServices = currentServiceId => {
    const selectedServiceIds = servicesFields
      .filter(item => item.serviceId)
      .map(item => item.serviceId);

    return services?.filter(
      service =>
        !selectedServiceIds.includes(service.id) ||
        service.id === currentServiceId,
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : null}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.main1}
        keyboardShouldPersistTaps="handled">
        <View style={styles.subt}>
          <Text style={styles.title}>Sign up as Franchise</Text>

          <Text style={styles.title1}>{'Hello there !\nwelcome to you.'}</Text>
        </View>

        <View style={{paddingHorizontal: 5}}>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Name*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.name && {borderColor: 'red'},
              ]}>
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
            {validationError.name && (
              <Text style={styles.errorText}>
                Please enter your valid name.
              </Text>
            )}
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Email*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.email && {borderColor: 'red'},
              ]}>
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
            {validationError.email && (
              <Text style={styles.errorText}>
                Please enter your valid email.
              </Text>
            )}
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Phone*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.mobile && {borderColor: 'red'},
              ]}>
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
            {validationError.mobile && (
              <Text style={styles.errorText}>
                Please enter your valid phone number.
              </Text>
            )}
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
                  validationError.date && {borderColor: 'red'},
                ]}>
                <Text
                  style={[
                    styles.input1,
                    {color: date === '' ? colors.placeholder : colors.heading},
                  ]}>
                  {formatDate(date)}
                </Text>

                <CalendarIcon
                  width={wp(4)}
                  height={wp(4)}
                  style={{marginRight: 10}}
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
            {validationError.date && (
              <Text style={styles.errorText}>
                Please enter your valid date of birth.
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
                  validationError.gender && {borderColor: 'red'},
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
                  <DownarrowIcon
                    width={wp(4)}
                    height={wp(3)}
                    style={{marginRight: 5}}
                  />
                )}
              />
            </Animated.View>
            {validationError.gender && (
              <Text style={styles.errorText}>Please select your gender.</Text>
            )}
          </View>

          {/* <View style={{flexDirection: 'row'}}> */}
          <View style={[styles.inputmain, {flex: 1}]}>
            <Text style={styles.title2}>Experience in Field*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.fieldOfExp && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.fieldOfExp}]},
                ]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Servicename"
                  placeholderTextColor={colors.placeholder}
                  value={formData.fieldOfExp}
                  onChangeText={text => handleInputChange('fieldOfExp', text)}
                />
              </Animated.View>
            </View>
            {validationError.fieldOfExp && (
              <Text style={styles.errorText}>
                Please enter a valid service name that you have experience in.
              </Text>
            )}
          </View>

          <View style={[styles.inputmain, {flex: 1}]}>
            <Text style={styles.title2}>Year of Experience*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.yearOfExp && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[{transform: [{translateX: shakeAnimation.yearOfExp}]}]}>
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  placeholder="year"
                  placeholderTextColor={colors.placeholder}
                  value={formData.yearOfExp}
                  onChangeText={text => handleInputChange('yearOfExp', text)}
                />
              </Animated.View>
            </View>
            {validationError.yearOfExp && (
              <Text style={styles.errorText}>
                Please enter a valid year of experience that you have.
              </Text>
            )}
          </View>
          {/* </View> */}

          {/* <View style={{flexDirection: 'row'}}> */}
          <View style={[styles.inputmain]}>
            <Text style={styles.title2}>Specialization*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.specialization && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.specialization}]},
                ]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Specialization name"
                  placeholderTextColor={colors.placeholder}
                  value={formData.specialization}
                  onChangeText={text =>
                    handleInputChange('specialization', text)
                  }
                />
              </Animated.View>
            </View>
            {validationError.specialization && (
              <Text style={styles.errorText}>
                Please enter a valid service name that you have specialized in.
              </Text>
            )}
          </View>

          <View style={[styles.inputmain]}>
            <Text style={styles.title2}>Charges*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.charges && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[{transform: [{translateX: shakeAnimation.charges}]}]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="₹ charges"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="numeric"
                  maxLength={6}
                  value={formData.charges}
                  onChangeText={text => handleInputChange('charges', text)}
                />
              </Animated.View>
            </View>
            {validationError.charges && (
              <Text style={styles.errorText}>
                Please enter a valid service's charges.
              </Text>
            )}
          </View>
          {/* </View> */}

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Language*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                {height: 'auto', paddingVertical: 5},
                validationError.language && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[{transform: [{translateX: shakeAnimation.language}]}]}>
                <FlatList
                  data={languageOptions}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <View style={styles.serviceSection}>
                      <View
                        style={[
                          styles.checkboxWrapper,
                          selectedLanguages.includes(item.value) &&
                            styles.checkedBackground,
                        ]}>
                        <Checkbox
                          status={
                            selectedLanguages.includes(item.value)
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => (
                            handleCheckboxPress(item.value),
                            setValidationError({
                              ...validationError,
                              language: false,
                            })
                          )}
                          color="#FFF"
                          uncheckedColor="#DFE7EF"
                        />
                      </View>
                      <Text style={styles.inputText}>{item.label}</Text>
                    </View>
                  )}
                />
              </Animated.View>
            </View>
            {validationError.language && (
              <Text style={[styles.errorText, {marginTop: 8}]}>
                Please select language.
              </Text>
            )}
          </View>

          <View style={styles.inputmain}>
            <View style={styles.inputeLableWithBtn}>
              <Text
                style={[styles.title2, {marginBottom: 0, paddingVertical: 5}]}>
                Services*
              </Text>

              <TouchableOpacity style={styles.addIconBtn}>
                <Text style={styles.addIcon} onPress={addExtraInputs}>
                  + Add services
                </Text>
              </TouchableOpacity>
            </View>

            {servicesFields.map((input, index) => (
              <View key={`service-${index}`}>
                <Animated.View
                  style={{
                    transform: [
                      {translateX: shakeAnimationServices[0].serviceId},
                    ],
                  }}>
                  <Dropdown
                    style={[
                      styles.input,
                      styles.inputShadow,
                      {marginBottom: 10},
                      validationError.services &&
                        index == 0 && {borderColor: 'red'},
                    ]}
                    data={getFilteredServices(input.serviceId)}
                    labelField="services_name"
                    valueField="id"
                    placeholder={`Service ${index + 1}`}
                    placeholderStyle={[
                      styles.inputText,
                      {color: colors.placeholder},
                    ]}
                    search
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    searchPlaceholder="Search..."
                    selectedTextStyle={styles.selectedText}
                    itemTextStyle={styles.inputText}
                    value={input.serviceId}
                    onChange={item => (
                      handleExtraInputChange(index, 'serviceId', item.id),
                      setValidationError({
                        ...validationError,
                        services: false,
                      })
                    )}
                    renderRightIcon={() => (
                      <DownarrowIcon
                        width={wp(4)}
                        height={wp(3)}
                        style={{marginRight: 5}}
                      />
                    )}
                  />
                </Animated.View>

                <Animated.View
                  style={{
                    transform: [
                      {translateX: shakeAnimationServices[0].charges},
                    ],
                  }}>
                  <View
                    style={[
                      styles.input,
                      styles.inputShadow,
                      {flex: 1, marginBottom: 10},
                      validationError.servicesCharges && index == 0
                        ? {borderColor: 'red'}
                        : {},
                    ]}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="₹ charges"
                      placeholderTextColor={colors.placeholder}
                      keyboardType="numeric"
                      value={input.charges}
                      onChangeText={text => {
                        handleExtraInputChange(index, 'charges', text);
                        setValidationError({
                          ...validationError,
                          servicesCharges: false,
                        });
                      }}
                    />
                  </View>
                </Animated.View>
              </View>
            ))}
          </View>
          {validationError.services && (
            <Text
              style={[
                styles.errorText,
                {paddingHorizontal: 15, marginTop: -8},
              ]}>
              Please select a service's name.
            </Text>
          )}
          {validationError.servicesCharges && (
            <Text
              style={[
                styles.errorText,
                {paddingHorizontal: 15, marginTop: -8},
              ]}>
              Please enter a valid service's charges.
            </Text>
          )}

          {/* <View style={{flexDirection: 'row'}}> */}
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Country*</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.country}]}]}>
              <Dropdown
                style={[
                  styles.input,
                  styles.inputShadow,
                  validationError.country && {borderColor: 'red'},
                ]}
                data={countryOptions}
                labelField="name"
                valueField="id"
                placeholder={'Country'}
                placeholderStyle={[
                  styles.inputText,
                  {color: colors.placeholder},
                ]}
                search
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                searchPlaceholder="Search..."
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.inputText}
                value={formData.country}
                onChange={text => handleInputChange('country', text.id)}
                renderRightIcon={() => (
                  <DownarrowIcon
                    width={wp(4)}
                    height={wp(3)}
                    style={{marginRight: 5}}
                  />
                )}
              />
            </Animated.View>
            {validationError.country && (
              <Text style={styles.errorText}>Please select your country.</Text>
            )}
          </View>

          <View style={[styles.inputmain, {flex: 1}]}>
            <Text style={styles.title2}>State*</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.stateName}]}]}>
              <Dropdown
                style={[
                  styles.input,
                  styles.inputShadow,
                  validationError.stateName && {borderColor: 'red'},
                ]}
                data={stateOptions}
                labelField="name"
                valueField="id"
                placeholder="state"
                placeholderStyle={[
                  styles.inputText,
                  {color: colors.placeholder},
                ]}
                search
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                searchPlaceholder="Search..."
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.inputText}
                value={formData.stateName}
                onChange={text => handleInputChange('stateName', text.id)}
                renderRightIcon={() => (
                  <DownarrowIcon
                    width={wp(4)}
                    height={wp(3)}
                    style={{marginRight: 5}}
                  />
                )}
              />
            </Animated.View>
            {validationError.stateName && (
              <Text style={styles.errorText}>Please select your state.</Text>
            )}
          </View>
          {/* </View> */}

          {/* <View style={{flexDirection: 'row'}}> */}
          <View style={[styles.inputmain, {flex: 1, marginBottom: 10}]}>
            <Text style={styles.title2}>City*</Text>
            <Animated.View
              style={[{transform: [{translateX: shakeAnimation.city}]}]}>
              <Dropdown
                style={[
                  styles.input,
                  styles.inputShadow,
                  validationError.city && {borderColor: 'red'},
                ]}
                data={cityOptions}
                labelField="name"
                valueField="id"
                placeholder="City"
                placeholderStyle={[
                  styles.inputText,
                  {color: colors.placeholder},
                ]}
                search
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                searchPlaceholder="Search..."
                selectedTextStyle={styles.selectedText}
                itemTextStyle={styles.inputText}
                value={formData.city}
                onChange={text => handleInputChange('city', text.id)}
                renderRightIcon={() => (
                  <DownarrowIcon
                    width={wp(4)}
                    height={wp(3)}
                    style={{marginRight: 5}}
                  />
                )}
              />
            </Animated.View>
            {validationError.city && (
              <Text style={styles.errorText}>Please select your city.</Text>
            )}
          </View>

          <View style={[styles.inputmain, {flex: 1}]}>
            <Text style={styles.title2}>City Pincode*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.cityPincode && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.cityPincode}]},
                ]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="City Pincode"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="numeric"
                  maxLength={6}
                  value={formData.cityPincode}
                  onChangeText={text => handleInputChange('cityPincode', text)}
                />
              </Animated.View>
            </View>
            {validationError.cityPincode && (
              <Text style={styles.errorText}>
                Please enter your valid city pincode.
              </Text>
            )}
          </View>
          {/* </View> */}

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Current Location*</Text>
            <View
              style={[
                styles.input,
                styles.inputShadow,
                validationError.currentLocation && {borderColor: 'red'},
              ]}>
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.currentLocation}]},
                ]}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Current Location"
                  placeholderTextColor={colors.placeholder}
                  value={formData.currentLocation}
                  onChangeText={text =>
                    handleInputChange('currentLocation', text)
                  }
                />
              </Animated.View>
            </View>
            {validationError.currentLocation && (
              <Text style={styles.errorText}>
                Please enter your valid current location.
              </Text>
            )}
          </View>

          <View style={styles.inputmain}>
            <Animated.View
              style={[
                {transform: [{translateX: shakeAnimation.selectedImage}]},
              ]}>
              <Text style={styles.title2}>Upload Photo</Text>
              <View
                style={{flexDirection: 'row'}}>
                <View
                  style={[
                    styles.input,
                    styles.inputShadow,
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 5,
                      // width: '85%',
                      flex:1
                    },
                  ]}>
                  <TextInput
                    style={styles.input1}
                    placeholder="Upload Photo"
                    placeholderTextColor={colors.placeholder}
                    value={
                      selectedImage?.uri ? selectedImage?.uri : selectedImage
                    }
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
                {selectedImage.length !== 0 && (
                  <TouchableOpacity
                    style={styles.removeImgBtn}
                    onPress={() => setSelectedImage('')}>
                    <Text style={styles.removeImg}>+</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.uppload}>Maximum upload file size 2mb.</Text>
            </Animated.View>
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

export default SignUpFranchise;
