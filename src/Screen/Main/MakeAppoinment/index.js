import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  Vibration,
  BackHandler,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {fontSize} from '../../../Component/fontsize';
import {Checkbox} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';

const ResidentalScreen = ({navigation}) => {
  const userDetail = useSelector(state => state?.Auth?.userData);
  const data = useSelector(state => state?.consultation?.ConsultationDetail);
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const [services, setServices] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const genderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
    {label: 'Transgender', value: 'transgender'},
  ];

  useEffect(() => {
    if (data?.franchise_services?.length > 0) {
      const defaultService = {
        id: data?.franchise_services[0]?.service_id,
        name: data?.franchise_services[0]?.service_name,
        price: data?.franchise_services[0]?.service_price,
        taxPercent: data?.franchise_services[0]?.tax_percentage,
      };
      setServices([defaultService]);
    }
  }, [data?.franchise_services, userDetail]);

  const [date, setDate] = useState(
    userDetail?.dob ? new Date(userDetail.dob) : null,
  );
  const [open, setOpen] = useState(false);

  const formatDate = date => {
    if (!date) return 'Date of Birth';
    const day = date.getDate().toString().padStart(2, '0');
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

  const [formData, setFormData] = useState({
    name: userDetail?.name || '',
    email: userDetail?.email || '',
    mobile: userDetail?.phone || '',
    cityPincode: userDetail?.city_pincode?.toString() || '',
    gender: userDetail?.gender || '',
    birthPlace: userDetail?.place_of_birth || '',
    additionalInfo: '',
  });

  const [shakeAnimation, setShakeAnimation] = useState({
    name: new Animated.Value(0),
    email: new Animated.Value(0),
    mobile: new Animated.Value(0),
    cityPincode: new Animated.Value(0),
    gender: new Animated.Value(0),
    date: new Animated.Value(0),
    birthPlace: new Animated.Value(0),
    additionalInfo: new Animated.Value(0),
    time: new Animated.Value(0),
    services: new Animated.Value(0),
  });
  const scrollViewRef = useRef(null);

  const [validationError, setValidationError] = useState({
    name: false,
    email: false,
    mobile: false,
    gender: false,
    cityPincode: false,
    date: false,
    services: false,
  });

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
    setIsEdit(true);
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

  const handleSubmit = () => {
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

    if (services.length === 0) {
      shake('services');
      scrollToField('services');
      return;
    }
    const fieldsToValidate = [
      'name',
      'email',
      'mobile',
      'gender',
      'cityPincode',
    ];

    for (let field of fieldsToValidate) {
      if (field === 'email' && !emailRegex.test(formData[field])) {
        shake(field);
        scrollToField(field);
        return;
      }

      if (
        !formData[field] ||
        (field === 'mobile' && formData[field].length < 10)
      ) {
        shake(field);
        scrollToField(field);
        return;
      }
    }

    navigation.navigate('PaymentAppointment', {
      data1: 'Residental',
      services: services,
      formData: {...formData, bod: formatDate(date), bot: formatTime(time)},
    });
  };

  const handleCheckboxPress = service => {
    const isSelected = services.some(item => item.id === service.id);

    if (isSelected) {
      setServices(services.filter(item => item.id !== service.id));
    } else {
      setServices([...services, service]);
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
          <Text style={styles.logoText}>Make a Appointment</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.servicesContainer}>
        <Animated.View
          style={{transform: [{translateX: shakeAnimation.services}]}}>
          <View
            style={[
              styles.cardContainer2,
              validationError.services && {borderColor: 'red'},
            ]}>
            <Text
              style={[
                styles.service,
                styles.widthOfSevices1,
                {fontSize: fontSize.Fifteen},
              ]}>
              Services
            </Text>

            <View>
              <FlatList
                data={data?.franchise_services || []}
                scrollEnabled={false}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={item => (
                  <View style={styles.serviceSection}>
                    <View
                      style={[
                        styles.checkboxWrapper,
                        services.some(
                          service => service.id === item?.item?.service_id,
                        ) && styles.checkedBackground,
                      ]}>
                      <Checkbox
                        status={
                          services.some(
                            service => service.id === item?.item?.service_id,
                          )
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => (
                          handleCheckboxPress({
                            id: item?.item?.service_id,
                            name: item?.item?.service_name,
                            price: item?.item?.service_price,
                            taxPercent: item?.item?.tax_percentage,
                          }),
                          setValidationError({
                            ...validationError,
                            services: false,
                          })
                        )}
                        color="#FFF"
                        uncheckedColor="#DFE7EF"
                      />
                    </View>
                    <Text style={styles.labelText}>
                      {item?.item?.service_name}
                    </Text>
                    <Text style={styles.priceText}>
                      ₹ {item?.item?.service_price}
                    </Text>
                  </View>
                )}
              />
            </View>
            {validationError.services && (
              <Text style={styles.errorText}>
                Please select at least one service.
              </Text>
            )}
          </View>
        </Animated.View>
        {isEdit ? (
          <View style={styles.cardContainer2}>
            <Text
              style={[
                styles.service,
                styles.widthOfSevices2,
                {fontSize: fontSize.Fifteen},
              ]}>
              Personal Detail
            </Text>

            <View style={styles.inputmain}>
              <Text style={styles.title2}>Full Name*</Text>
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
                <Text style={styles.errorText}>
                  Please enter your valid name.
                </Text>
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
                <Text style={styles.errorText}>
                  Please enter your valid email.
                </Text>
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
                  maxLength={10}
                  keyboardType="numeric"
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
                    validationError.gender && {borderColor: 'red'},
                  ]}
                  data={genderOptions}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select Gender'}
                  placeholderStyle={{
                    color: formData.gender
                      ? colors.heading
                      : colors.placeholder,
                    fontSize: fontSize.Fifteen,
                  }}
                  selectedTextStyle={{
                    color: colors.heading,
                    fontSize: fontSize.Fifteen,
                    fontFamily: 'Poppins-Regular',
                  }}
                  value={formData.gender}
                  onChange={text => (
                    handleInputChange('gender', text.value),
                    setValidationError({
                      ...validationError,
                      gender: false,
                    })
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
                  renderItem={item => (
                    <Text
                      style={{
                        color: colors.heading,
                        fontSize: fontSize.Fifteen,
                        fontFamily: 'Poppins-Regular',
                        padding: 10,
                      }}>
                      {item.label}
                    </Text>
                  )}
                />
              </Animated.View>
              {validationError.gender && (
                <Text style={styles.errorText}>Please select your gender</Text>
              )}
            </View>

            <View style={styles.inputmain}>
              <Text style={styles.title2}>Current City Pincode*</Text>
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.cityPincode}]},
                ]}>
                <TextInput
                  style={[
                    styles.input,
                    validationError.cityPincode && {borderColor: 'red'},
                  ]}
                  placeholder="Pincode"
                  placeholderTextColor={colors.placeholder}
                  keyboardType="numeric"
                  maxLength={6}
                  value={formData.cityPincode}
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
              <Animated.View
                style={[
                  {transform: [{translateX: shakeAnimation.birthPlace}]},
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Place of Birth"
                  placeholderTextColor={colors.placeholder}
                  value={formData.birthPlace}
                  onChangeText={text => handleInputChange('birthPlace', text)}
                />
              </Animated.View>
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
        ) : (
          <View style={styles.cardContainer2}>
            <Text
              style={[
                styles.service,
                styles.widthOfSevices2,
                {fontSize: fontSize.Fifteen},
              ]}>
              Personal Detail
            </Text>
            <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              style={styles.editBtn}
              onPress={() => setIsEdit(true)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 8,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingVertical: 5,
              }}>
              <Text style={styles.profileText}>{formData.name}</Text>
            </View>
            {formData.email && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingVertical: 5,
                  gap: 10,
                }}>
                <Text style={styles.boldText}> Email :</Text>
                <Text style={styles.smallText}>{formData.email}</Text>
              </View>
            )}

            {formData.mobile && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingVertical: 5,
                  gap: 10,
                }}>
                <Text style={styles.boldText}> Phone no :</Text>
                <Text style={styles.smallText}>{formData.mobile}</Text>
              </View>
            )}

            {formatDate(date) && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingVertical: 5,
                  gap: 10,
                }}>
                <Text style={styles.boldText}> Birthdate :</Text>
                <Text style={styles.smallText}>{formatDate(date)}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity onPress={handleSubmit} activeOpacity={1}>
        <Animated.View
          style={[
            styles.book,
            {
              transform: [{scale: buttonAnimatedValue}],
              backgroundColor: colors.orange,
            },
          ]}>
          <Text style={styles.btext1}>SUBMIT</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ResidentalScreen;
