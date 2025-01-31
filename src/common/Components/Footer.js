import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {fonts} from '../../assets/fonts/fonts';
import {colors} from '../../colors';
import {fontSize} from '../../fontSize';
import CustomText from './CustomText';
import {Facebook, Instagram} from '../../assets/svgIcon';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-simple-toast';
import {fetchCollectionUrl} from '../../redux/features/collectionSlice';
const Footer = ({screen, onPress}) => {
  const dispatch = useDispatch();
  const {customerAccessToken} = useSelector(state => state.SSO);
  const subscription = () => {
    if (email)
      navigation.navigate('AuthStack', {
        screen: 'RegistrationScreen',
        params: {email, from: 'footer'},
      });
    else Toast.show('Please Etner Email');
  };
  const navigation = useNavigation();

  const handleNavigation = title => {
    if (screen == 'static') {
      onPress();
    }
    if (title == 'About Us') {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/pages/about-us?webview=true',
      });
    } else if (title == 'Blog') {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/blogs/news?webview=true',
      });
    } else if (title == 'Contact Us') {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/pages/contact-us?webview=true',
      });
    } else if (title == 'Shipping & Delivery') {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/pages/shipping?webview=true',
      });
    } else if (title == 'Return & Refund') {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/pages/returns-refund?webview=true',
      });
    } else if (title == "FAQ's") {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/pages/faqs?webview=true',
      });
    } else if (title == 'Terms & Conditions') {
      navigation.navigate('StaticPages', {
        url: 'https://manaiya.com/pages/terms-conditions?webview=true',
      });
    } else if (title == 'Sign In') {
      navigation.navigate('AuthStack');
    } else if (title == 'Furniture') {
      dispatch(
        fetchCollectionUrl('https://manaiya.com/collections/furniture-by-room'),
      );
      navigation.navigate('CollectionScreen');
    } else if (title == 'Lighting') {
      dispatch(fetchCollectionUrl('https://manaiya.com/collections/lighting'));
      navigation.navigate('CollectionScreen');
    } else if (title == 'Home Decor') {
      dispatch(
        fetchCollectionUrl('https://manaiya.com/collections/home-decor'),
      );
      navigation.navigate('CollectionScreen');
    } else if (title == 'My Account') {
      if (screen == 'order') {
        navigation.navigate('My Profile');
      } else {
        navigation.navigate('ProfileStack', {
          screen: 'MyAccountScreen',
        });
      }
    }
  };
  const RenderHead = ({title, title2, mTop, width}) => {
    return (
      <View style={{flexDirection: 'row', marginTop: mTop}}>
        <View style={{width: width ?? '55%'}}>
          <CustomText
            size={fontSize.Fourteen}
            style={[{textTransform: 'uppercase'}]}>
            {title}
          </CustomText>
        </View>
        <View>
          <CustomText
            size={fontSize.Fourteen}
            style={[{textTransform: 'uppercase'}]}>
            {title2}
          </CustomText>
        </View>
      </View>
    );
  };
  const RenderBody = ({title, title2, mTop}) => {
    return (
      <View style={{flexDirection: 'row', paddingVertical: 8, marginTop: mTop}}>
        <TouchableOpacity
          onPress={() => handleNavigation(title)}
          style={{width: '55%'}}>
          <CustomText size={fontSize.Fourteen}>{title}</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavigation(title2)}
          style={{width: '45%'}}>
          <CustomText size={fontSize.Fourteen}>{title2}</CustomText>
        </TouchableOpacity>
      </View>
    );
  };
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        contentContainerStyle={{paddingBottom: 20}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}>
        <RenderHead title={'Product Category'} title2={'Customer Support'} />
        <RenderBody mTop={10} title={'Furniture'} title2={'About Us'} />
        <RenderBody title={'Lighting'} title2={'Blog'} />
        <RenderBody title={'Home Decor'} title2={'Contact Us'} />
        <RenderBody title={''} title2={'Shipping & Delivery'} />
        <RenderBody title={''} title2={'Return & Refund'} />
        <RenderBody title={''} title2={"FAQ's"} />
        <RenderBody title={''} title2={'Terms & Conditions'} />
        <RenderHead mTop={15} title={'my account'} title2={''} />

        {customerAccessToken == '' ? (
          <RenderBody mTop={10} title={'Sign In'} title2={''} />
        ) : (
          <RenderBody title={'My Account'} title2={''} />
        )}
        <RenderHead
          mTop={15}
          width={'100%'}
          title={'Subscribe to our emails'}
          title2={''}
        />

        <View
          style={[
            styles.subStyle,
            {
              borderWidth: 1,
              paddingStart: 8,
              borderColor: colors.lightGrey,
              marginTop: 15,
            },
          ]}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Email Address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            placeholderTextColor={'grey'}
            onChangeText={text => setEmail(text)}
          />

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              backgroundColor: colors['black'],
              padding: 10,
            }}
            onPress={() => subscription()}>
            <CustomText color={colors['white']} style={styles.subscribeText}>
              SUBSCRIBE
            </CustomText>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            width: '25%',
            justifyContent: 'space-between',
            paddingLeft: '2%',
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://m.facebook.com/ManaiyaByPraachi/');
            }}>
            <Facebook />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.instagram.com/manaiya_by_ps/');
            }}>
            <Instagram />
          </TouchableOpacity>
        </View>
        <CustomText mTop={20} style={{alignSelf: 'center'}}>
          {'© 2024, Manaiya Powered by Binary'}
        </CustomText>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  inputStyle: {
    height: 40,
    color: 'black',
    fontSize: 14,
    width: '67%',
    // borderWidth: 1,
    // fontFamily: fonts.OpenSans_Regular,
  },
  subscribeText: {
    alignSelf: 'center',
    fontSize: 16,
  },
  subStyle: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
});
