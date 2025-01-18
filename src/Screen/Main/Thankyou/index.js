import { StyleSheet, Text, TouchableOpacity, View,Image, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
const ThankyouPage = ({route}) => {
  console.log('route,,,,',route?.params?.order);
  const navigation =useNavigation();
  useEffect(() => {
    // Handle hardware back button press
    const backAction = () => {
      navigation.replace('Home');
      return true; // Prevent default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); 
  }, [navigation, route?.params?.data]);

  return (
    <View style={styles.container}>
        <View style={styles.main}>
          <Image 
          style={styles.image}
          source={require('../../../assets/otherApp/true.png')}/>
        <Text style={styles.logoText1}>Order {route?.params?.order?.order_id}</Text>
      <Text style={styles.logoText}>Thank you {route?.params?.order?.name}!</Text>
      <Text style={styles.logoText12}>Your order is confirmed</Text>
      </View>
      <View style={{position:'absolute',bottom:20,width:'100%',paddingHorizontal:10}}>
      <TouchableOpacity  onPress={()=>
        
      //  { route?.params?.order?.data?.length==0?
      //   navigation.navigate('Home', {
      //     screen: 'Home1',
      //     params: {
      //       screen: 'MyProfile',
      //       params: {
      //         screen: 'Appointment',params:{data:route?.params?.data}
      //       },
      //     },
      //   })
      // :
      navigation.navigate('Home', {
        screen: 'Home1',
        params: {
          screen: 'MyProfile',
          params: {
            screen: 'MyOrder',params:{data:route?.params?.data}
          },
        },
      })
    // }
      
        } style={styles.book}>
       <Text style={styles.btext1}>DONE</Text>
       </TouchableOpacity>
       </View>
    </View>
  )
}

export default ThankyouPage

