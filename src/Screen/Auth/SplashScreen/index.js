import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../../Component/colors';

const SplashScreen =({navigation})=> {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('Home');
        }, 2000);
      }, []);
  return (
    <View style={styles.main}>
     <View style={styles.contain}>   
     <Image source={require('../../../assets/image/Pinnacle-vastu-logo.png')}/>
    </View>
    </View>
  )
}
export default SplashScreen;
const styles = StyleSheet.create({
main:{
    flex:1,
    backgroundColor:colors.white,
    alignItems:'center',
    justifyContent:'center'
},
contain:{
    alignItems:'center',
    justifyContent:'center',
   
}

})