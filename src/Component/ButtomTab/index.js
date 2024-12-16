import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../colors';
import { fontSize } from '../fontsize';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../Component/ResponsiveScreen/responsive';

const BottomNavBar = ({navigation}) => {

  
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity style={styles.navItem}onPress={()=>navigation.navigate('Home',{screen:'Home1'})}>
        <Image source={require('../../assets/buttomtabview/home.png')} style={styles.icon} />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Residental')}>
        <Image source={require('../../assets/buttomtabview/chat.png')} style={styles.icon} />
        <Text style={styles.navText}>Consultancy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Remedies')}>
        <Image source={require('../../assets/buttomtabview/Grou.png')} style={styles.icon} />
        <Text style={styles.navText}>Remedies</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home',{screen:'Courses'} )}>
        <Image source={require('../../assets/buttomtabview/Icon.png')} style={styles.icon} />
        <Text style={styles.navText}>Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserProfile')}>
        <Image source={require('../../assets/buttomtabview/Laye.png')} style={styles.icon} />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    backgroundColor: colors.orange, // Set the background color as in your image
    height: wp(15) ,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop:5
  },
  icon: {
    // width: wp(5),
    // height: wp(5),
    marginBottom: 5,
    // tintColor: '#FFFFFF', 
  },
  navText: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
  },
});

export default BottomNavBar;
