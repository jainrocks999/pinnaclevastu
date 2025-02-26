import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {colors} from '../../../Component/colors';
import {useDispatch} from 'react-redux';
import {
  homeApiCall,
} from '../../../Redux/Slice/HomeBannerSlice';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, []);
  useEffect(() => {
    CallApi();
  }, []);

  const CallApi = async () => {
    await dispatch(homeApiCall());
  };
  return (
    <View style={styles.main}>
      <View style={styles.contain}>
        <Image
          source={require('../../../assets/image/Pinnacle-vastu-logo.png')}
        />
      </View>
    </View>
  );
};
export default SplashScreen;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
