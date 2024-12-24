import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import styles from './styles'
import { useNavigation } from '@react-navigation/native';
const ThankyouPage = ({route}) => {
  console.log('route,,,,',route?.params?.order);
  const navigation =useNavigation();
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
        // navigation.navigate('Home',{screen:'Home1'})
       
       
    
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              state: {
                routes: [
                  {
                    name: 'Home1',
                    state: {
                      routes: [
                        {name: 'MyProfile',params:{screen:'MyOrder'}},
                      ],
                    },
                  },
                ],
              },
            },
          ],
        })
       
        
        
      
        } style={styles.book}>
       <Text style={styles.btext1}>DONE</Text>
       </TouchableOpacity>
       </View>
    </View>
  )
}

export default ThankyouPage

