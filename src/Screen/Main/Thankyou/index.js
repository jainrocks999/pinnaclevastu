import { StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native'
import React from 'react'
import styles from './styles'
const ThankyouPage = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.main}>
          <Image 
          style={styles.image}
          source={require('../../../assets/otherApp/true.png')}/>
        <Text style={styles.logoText1}>Order #19438</Text>
      <Text style={styles.logoText}>Thank you Tejash!</Text>
      <Text style={styles.logoText12}>Your order is confirmed</Text>
      </View>
      <View style={{position:'absolute',bottom:20,width:'100%',paddingHorizontal:10}}>
      <TouchableOpacity  onPress={()=>navigation.navigate('Home',{screen:'Home1'})} style={styles.book}>
       <Text style={styles.btext1}>DONE</Text>
       </TouchableOpacity>
       </View>
    </View>
  )
}

export default ThankyouPage

