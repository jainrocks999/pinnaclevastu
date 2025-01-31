import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {heightPercent} from '../../../Component/ResponsiveScreen/responsive';
const ThankyouPage = ({route}) => {
  console.log('route,,,,', route?.params);
  const navigation = useNavigation();
  useEffect(() => {
    // Handle hardware back button press
    const backAction = () => {
      navigation.replace('Home');
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation, route?.params?.data]);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Image
          style={styles.image}
          source={require('../../../assets/otherApp/true.png')}
        />
        {/* <Text style={styles.logoText1}>
              Order{' '}
              {route?.params?.data == 'Consultation'
                ? route?.params?.order?.franchise_booking_id
                : route?.params?.order?.order_id}
            </Text>
            <Text style={styles.logoText}>
              Thank you {route?.params?.order?.name}!
            </Text>
            <Text style={styles.logoText12}>Your order is confirmed</Text> */}

        {route?.params?.data == 'Consultation' && (
          <>
            <Text style={[styles.logoText12, {marginTop: heightPercent(3)}]}>
              Appointment ID : {route?.params?.order?.franchise_booking_id}
            </Text>
            <Text style={styles.logoText}>
              Thank you {route?.params?.order?.name}!
            </Text>
            <Text style={[styles.logoText12, styles.longMsgText]}>
              Your appointment has been successfully booked. Our Vastu expert
              will contact you shortly. View{' '}
              <Text
                style={styles.pressabelText}
                onPress={() => {
                  navigation.navigate('Home', {
                    screen: 'Home1',
                    params: {
                      screen: 'MyProfile',
                      params: {
                        screen: 'Appointment',
                        params: {data: route?.params?.data},
                      },
                    },
                  });
                }}>
                Appointment Detail
              </Text>
            </Text>
          </>
        )}
        {console.log(route?.params,"sdmfksjfd")}
        {/* <>
            <Text style={[styles.logoText12, {marginTop: heightPercent(3)}]}>
               Order ID : {route?.params?.order?.order_id}
             </Text>
            <Text style={styles.logoText}>
               Thank you {route?.params?.order?.name}!
             </Text>
             <Text style={[styles.logoText12, styles.longMsgText]}>
               Your Order has been successfully placed. View{' '}
               <Text style={styles.pressabelText} onPress={() => {}}>
                 Order detail
               </Text>
             </Text>
           </> */}
        {route?.params?.data == 'Courses' && (
          <>
            <Text style={[styles.logoText12, {marginTop: heightPercent(3)}]}>
              Order ID : {route?.params?.order?.order_id}
            </Text>
            <Text style={styles.logoText}>
              Thank you {route?.params?.order?.name}!
            </Text>
            <Text style={[styles.logoText12, styles.longMsgText]}>
              Your course has been successfully registered. View{' '}
              <Text
                style={styles.pressabelText}
                onPress={() => {
                  navigation.navigate('Home', {
                    screen: 'Home1',
                    params: {
                      screen: 'MyProfile',
                      params: {
                        screen: 'MyOrder',
                        params: {data: route?.params?.data},
                      },
                    },
                  });
                }}>
                Cources Detail
              </Text>
            </Text>
          </>
        )}

        {route?.params?.data == 'Remedies' && (
          <>
            <Text style={[styles.logoText12, {marginTop: heightPercent(3)}]}>
              Order ID : {route?.params?.order?.order_id}
            </Text>
            <Text style={styles.logoText}>
              Thank you {route?.params?.order?.name}!
            </Text>
            <Text style={[styles.logoText12, styles.longMsgText]}>
              Your order has been placed successfully . View{' '}
              <Text
                style={styles.pressabelText}
                onPress={() => {
                  navigation.navigate('Home', {
                    screen: 'Home1',
                    params: {
                      screen: 'MyProfile',
                      params: {
                        screen: 'MyOrder',
                        params: {data: route?.params?.data},
                      },
                    },
                  });
                }}>
                Order Detail
              </Text>
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          width: '100%',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.book}>
          <Text style={styles.btext1}>Continue Exploring</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            route?.params?.data == 'Consultation'
              ? navigation.navigate('Home', {
                  screen: 'Home1',
                  params: {
                    screen: 'MyProfile',
                    params: {
                      screen: 'Appointment',
                      params: {data: route?.params?.data},
                    },
                  },
                })
              : navigation.navigate('Home', {
                  screen: 'Home1',
                  params: {
                    screen: 'MyProfile',
                    params: {
                      screen: 'MyOrder',
                      params: {data: route?.params?.data},
                    },
                  },
                });
          }}
          style={styles.book}>
          <Text style={styles.btext1}>Continue Exploring</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default ThankyouPage;
