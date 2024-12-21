import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';

import {Rating} from 'react-native-ratings';
import {colors} from '../../../Component/colors';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {useNavigation} from '@react-navigation/native';
import {addToCartApi, productDetail1} from '../../../Redux/Slice/HomeSlice';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import constants from '../../../Redux/constant/constants';

const RemediesProductList = ({route}) => {
  const name1 = route?.params?.name1;

  console.log('lnkslks', route.params.id);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const RemediesCategory = useSelector(state => state.home?.RemeiesCat?.data);
  const isLoading = useSelector(state => state.home?.loading);

  const PRoductDeta = async item => {
    await dispatch(
      productDetail1({
        url: 'fetch-single-product',
        product_id: item.id,
        navigation,
      }),
    );
    //  navigation.navigate("ProductDetail")
  };

  const Addtocard = async item => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);
     
      if (userStatus) {
        await dispatch(addToCartApi({
          user_id: userData.user_id,
          itemId: item.id,
          qty:1,
          user_type: userData.user_type,
          token:userData?.token,
          url:'add-to-cart'
        }))
       
      } else {
        const existingCart = await AsyncStorage.getItem('cartItems');
        // console.log('virendra', existingCart);

        let cartItems = existingCart ? JSON.parse(existingCart) : [];

        // const uniqueId = `${Date.now()}-${Math.random()
        //   .toString(36)
        //   .substr(2, 9)}`;

        const itemWithId = {
          ...item,
          qty: 1,
          // uniqueId: uniqueId,
          addedAt: new Date().toISOString(),
        };

        let existingItemIndex = cartItems.findIndex(
          cartItem => cartItem.id === item.id,
        );

        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex] = {
            ...cartItems[existingItemIndex],
            ...itemWithId,
            // updatedQuantity:
            // quantity: quantity,
          };
        } else {
          cartItems.push(itemWithId);
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Item added to cart:', itemWithId);
        Toast.show('Item added to cart successfully');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() => PRoductDeta(item)}>
        <View style={styles.image}>
          <Image
            source={
              item?.images
                ? {uri: `${Imagepath.Path}${item.images}`}
                : require('../../../assets/image/Remedies/ab.png')
            }
            style={{height: '100%', width: '100%', borderRadius: 10}}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.third, styles.titleText]}>{item.name}</Text>
        <Text
          style={[styles.third, styles.priceText]}>{`₹ ${item.price}`}</Text>

        <View style={styles.direction}>
        <Rating
            type="custom"
            tintColor={colors.ordercolor}
            ratingCount={5}
            imageSize={item?.rating?16:20}
            startingValue={item?.rating}
            ratingColor="#52B1E9"
            ratingBackgroundColor={colors.lightGrey} // Unfilled star color
          />
        </View>
        <TouchableOpacity
          onPress={() => Addtocard(item)}
          style={styles.buttonstylefirst}>
          <Text style={styles.buttonstyle}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() =>
              route.params.id
                ? navigation.goBack()
                : navigation.reset({
                    index: 0,
                    routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
                  })
            }

            //
          >
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>{name1}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home', {screen: 'MyCart'});
          }}>
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.Scroll}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../../assets/image/SearchIcon.png')} />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Image source={require('../../../assets/image/Vector.png')} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={RemediesCategory}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
          // nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
        />
      </ScrollView>
    </View>
  );
};

export default RemediesProductList;

const data2 = [
  {
    id: '1',
    source1: require('../../../assets/image/Remedies/ab.png'),
    title: 'Aluminium Metal Strip Vastu',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '2',
    source1: require('../../../assets/image/Remedies/vk.png'),
    title: 'Copper Metal Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '3',
    source1: require('../../../assets/image/Remedies/dk.png'),
    title: 'Iron Metal Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '4',
    source1: require('../../../assets/image/Remedies/dk.png'),
    title: 'Brass Metal Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '5',
    source1: require('../../../assets/image/Remedies/dk.png'),
    title: 'Steel Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '6',
    source1: require('../../../assets/image/Remedies/vk.png'),
    title: 'Blue Tap For Vastu',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
];
