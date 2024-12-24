import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

import {useDispatch, useSelector} from 'react-redux';
import {
  addToCartApi,
  getCartDataApi,
  likedProductListApi,
  removeCartItemApi,
  totalCartQuantity,
  updateCartDataApi,
  updateCartQuantity,
} from '../../../Redux/Slice/HomeSlice';
import axios from 'axios';
import constants from '../../../Redux/constant/constants';
import {useRoute} from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import {getAddress} from '../../../Redux/Slice/Addresslice';

const Remedies12SecondComponent = () => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const navigation = useNavigation();
  const [cartItemList, setCartItemList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartDataList = useSelector(state => state?.home?.CartData);
  // const cartTotalQuantity = useSelector(state => state?.home?.cartTotalQuantity);
  const LikeItemList = useSelector(state => state?.home?.likeProductList);
  const addressData = useSelector(state => state.address?.getaData?.data);
  const defaultAddress = addressData?.find(ob => ob.is_default === 1);

  const [userType, setUserType] = useState('');
  const route = useRoute();

  const fromScreen = route?.params?.from;

  console.log("cartRun !!!")

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = JSON.parse(userStatus);

        if (userStatus) {
          setUserType(userData.user_type);
          // logged user come from OTP Screen
          if (fromScreen) {
            const cartData = await AsyncStorage.getItem('cartItems');
            const parsedCartData = cartData ? JSON.parse(cartData) : [];

            if (parsedCartData.length > 0) {
              for (const item of parsedCartData) {
                await dispatch(
                  addToCartApi({
                    user_id: userData.user_id,
                    itemId: item.id,
                    qty: item.qty,
                    user_type: userData.user_type,
                    token: userData?.token,
                    url: 'add-to-cart',
                  }),
                );
              }
              await AsyncStorage.removeItem('cartItems');
            }
          }
          await dispatch(
            getAddress({
              user_id: userData.user_id,
              token: userData.token,

              url: 'fetch-customer-address',
              // navigation,
            }),
          );

          await dispatch(
            getCartDataApi({
              token: userData.token,
              url: `cart?user_id=${userData.user_id}`,
            }),
          );

          setCartItemList(cartDataList);
          // console.log(cartDataList, 'sandeep');
          setIsLoggedIn(true);
        } else {
          getCartData();
          setIsLoggedIn(false);
        }

        // Liked Product List Api...
        await dispatch(
          likedProductListApi({
            url: 'products-collection',
          }),
        );

        //  set cartItem Qutantity in redux state
        //  dispatch(totalCartQuantity(totalQuantity))
        //  console.log(cartTotalQuantity)
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [focus]);

  const handleUpdateCartData = async (user_id, rowid, qty, token) => {
    try {
      let data = {
        user_id: user_id,
        rowid: rowid,
        qty: qty,
      };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}update-to-cart`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        // console.log(response.data, 'response.data Virendra dfgmkdflgkdflg');
        await dispatch(
          getCartDataApi({
            token: token,
            url: `cart?user_id=${user_id}`,
          }),
        );
      }
    } catch (error) {
      console.log('cart Quantity error ', error);
    }
  };

  const getCartData = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cartItems');
      const parsedCartData = cartData ? JSON.parse(cartData) : [];

      setCartItemList(parsedCartData);

      // console.log(cartItemList, 'Retrieved cart data');
    } catch (error) {
      console.error('Error retrieving cart data:', error);
    }
  };

  const Addtocart = async item => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);
      if (userStatus) {
        await dispatch(
          addToCartApi({
            user_id: userData.user_id,
            itemId: item.id,
            qty: 1,
            user_type: userData.user_type,
            token: userData?.token,
            url: 'add-to-cart',
          }),
        );
        await dispatch(
          getCartDataApi({
            token: userData?.token,
            url: `cart?user_id=${userData?.user_id}`,
          }),
        );
      } else {
        const existingCart = await AsyncStorage.getItem('cartItems');

        let cartItems = existingCart ? JSON.parse(existingCart) : [];

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
          };
          Toast.show('Item is already added to cart ! ');
        } else {
          cartItems.push(itemWithId);
          Toast.show('Item added to cart successfully');
        }
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        getCartData();
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const increment = async item => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = JSON.parse(userStatus);

    if (userStatus) {
      await handleUpdateCartData(
        userData?.user_id,
        item?.rowid,
        item?.qty < 100 ? item?.qty + 1 : item?.qty,
        userData?.token,
      );
    } else {
      try {
        const updatedData = cartItemList.map(prod =>
          prod.id === item.id
            ? {
                ...prod,
                qty: prod.qty < 100 ? prod.qty + 1 : prod.qty,
              }
            : prod,
        );
        setCartItemList(updatedData);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedData));
        // dispatch(updateCartQuantity(isLoggedIn ? cartDataList : cartItemList))
      } catch (error) {
        console.log(error);
      }
    }
  };

  const decrement = async item => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = JSON.parse(userStatus);

    if (userStatus) {
      await handleUpdateCartData(
        userData?.user_id,
        item?.rowid,
        item?.qty > 1 ? item?.qty - 1 : item.qty,
        userData?.token,
      );
    } else {
      try {
        const updatedData = cartItemList.map(prod =>
          prod.id === item.id
            ? {
                ...prod,
                qty: prod.qty > 1 ? prod.qty - 1 : prod.qty,
              }
            : prod,
        );

        setCartItemList(updatedData);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedData));
        // dispatch(updateCartQuantity(isLoggedIn ? cartDataList : cartItemList))
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removerItem = async item => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = JSON.parse(userStatus);

    if (userStatus) {
      await dispatch(
        removeCartItemApi({
          user_id: userData?.user_id,
          rowid: item.rowid,
          token: userData?.token,
        }),
      );
      await dispatch(
        getCartDataApi({
          token: userData?.token,
          url: `cart?user_id=${userData?.user_id}`,
        }),
      );
    } else {
      try {
        const updatedData = cartItemList.filter(prod => prod.id !== item.id);
        setCartItemList(updatedData);

        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedData));
        Toast.show('Cart item remove successfully.');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const calculateSubtotalAndSavings = () => {
    let subtotal = 0;
    let savings = 0;

    const dataList = isLoggedIn ? cartDataList : cartItemList;

    dataList?.forEach(item => {
      const discountedPrice =
        userType === 'customers'
          ? item?.sale_price
          : userType === 'student'
          ? item?.student_price
          : userType === 'franchise'
          ? item?.franchise_price
          : item?.price;

      // Ensure discountedPrice is valid and non-negative
      const validDiscountedPrice =
        discountedPrice > 0 ? discountedPrice : item?.price;

      subtotal += item?.price * item.qty;

      // Calculate savings only if discountedPrice is non-negative and lower than item price
      savings += (item?.price - validDiscountedPrice) * item.qty;
    });

    return {subtotal, savings};
  };

  const {subtotal, savings} = calculateSubtotalAndSavings();

  const totalQuantity = (isLoggedIn ? cartDataList : cartItemList).reduce(
    (sum, item) => sum + (item?.qty || 0),
    0,
  );

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
  ];

  const renderItem2 = ({item}) => (
    <View>
      <View style={styles.slide}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
          <Image
            source={
              item?.image
                ? {uri: `${Imagepath.Path}${item?.image}`}
                : require('../../../assets/image/Remedies/ab.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.third, styles.titleText]}>{item?.name}</Text>
          <Text style={[styles.third, {marginTop: 10}]}>₹ {item?.price}</Text>

          <View style={styles.direction}>
            <Rating
              type="custom"
              tintColor={colors.ordercolor}
              ratingCount={5}
              imageSize={wp(4)}
              startingValue={item?.rating}
              ratingColor="#52B1E9"
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
            />
          </View>
          <TouchableOpacity
            style={styles.buttonstylefirst}
            onPress={() => Addtocart(item)}>
            <Text style={styles.buttonstyle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderItem = ({item}) => (
    <View style={styles.viewinner}>
      {isLoggedIn ? (
        <Image
          source={
            item?.option?.image
              ? {uri: `${Imagepath.Path}${item.option.image}`}
              : require('../../../assets/image/Remedies/ab.png')
          }
          style={styles.image1}
        />
      ) : (
        <Image
          source={
            item?.image
              ? {uri: `${Imagepath.Path}${item.image}`}
              : require('../../../assets/image/Remedies/ab.png')
          }
          style={styles.image1}
        />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.textstyle}>{item?.name}</Text>
        <View style={styles.ruupebutton}>
          <View style={styles.rupees}>
            {/* <Text style={styles.rupeestext}>₹ {item?.price}</Text> */}
            {isLoggedIn &&
            (item?.sale_price < item?.price ||
              item?.student_price < item?.price ||
              item?.franchise_price < item?.price) &&
            (item?.sale_price ||
              item?.student_price ||
              item?.franchise_price) ? (
              <Text
                style={[
                  styles.rupeestext,
                  {textDecorationLine: 'line-through'},
                ]}>
                ₹ {item?.price}
              </Text>
            ) : null}

            <Text style={styles.rupeestext}>
              ₹{' '}
              {
                userType === 'customers' && item?.sale_price
                  ? item?.sale_price
                  : userType === 'student' && item?.student_price
                  ? item?.student_price
                  : userType === 'franchise' && item?.franchise_price
                  ? item?.franchise_price
                  : item?.price /* Default case when userType is null or undefined */
              }
            </Text>
          </View>
          <View style={[styles.headerview, styles.quantitySection]}>
            <TouchableOpacity
              style={styles.touch}
              onPress={() => decrement(item)}>
              <Text style={[styles.third1, styles.quantityBtns]}>{'-'}</Text>
            </TouchableOpacity>
            <Text style={[styles.third1, {marginLeft: 5, marginTop: 3}]}>
              {item?.qty}
            </Text>
            <TouchableOpacity
              style={[styles.touch, {marginLeft: 0}]}
              onPress={() => increment(item)}>
              <Text style={[styles.third1, styles.quantityBtns]}>{'+'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.crossIcon}
        onPress={() => {
          removerItem(item);
        }}>
        <View style={styles.closeButton}>
          <Text style={styles.closeIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../../assets/image/Drawer.png')} />
          </TouchableOpacity>
          <Image
            style={{marginLeft: 15}}
            source={require('../../../assets/image/header.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
          style={styles.bagBtn}>
          <View style={styles.itemCount}>
            <Text style={styles.countText}>{totalQuantity}</Text>
          </View>
          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.headerview,
          {
            elevation: 3,
            paddingVertical: 10,
            paddingHorizontal: 18,
            backgroundColor: '#fff',
          },
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Cart</Text>
        </View>
      </View>

      {(isLoggedIn ? cartDataList.length > 0 : cartItemList.length > 0) ? (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            {/* {console.log(cartDataList, 'sandeep sdmfdkjfds 1')}
            {console.log(cartItemList, 'sandeep sdmfsdmflsdkfm')} */}

            {isLoggedIn && defaultAddress ? (
              <View style={styles.viewDeliver}>
                <View style={styles.toview}>
                  <Text style={styles.textDeliver}>Deliver To:</Text>
                  <Text style={styles.texttejash}>
                    {defaultAddress?.name}, {defaultAddress?.zip_code}
                  </Text>
                </View>
                <View style={styles.loremview}>
                  <Text style={styles.loremtext}>
                    {defaultAddress?.apartment}, {defaultAddress?.address}.{' '}
                    {defaultAddress?.city}, {defaultAddress?.state}...
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddressList')}>
                    <Text style={styles.change}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}

            {/* {cartItemList?.length == 0 ? null : ( */}
            {/* <Text style={[styles.viewinner1,styles.third,{textAlign:"center"}]}>Cart is Empty !</Text> */}
            <FlatList
              data={isLoggedIn ? cartDataList : cartItemList}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.viewinner1}
            />
            {/* )} */}

            <View style={styles.main}>
              <Text style={styles.header1}>You May Also Like</Text>
              <FlatList
                data={LikeItemList}
                renderItem={renderItem2}
                horizontal
                keyExtractor={item => item?.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{marginBottom: 15}}
              />
            </View>
          </ScrollView>
          <View style={styles.subtotalsavingyview}>
            <View style={styles.summaryview}>
              <Text style={styles.subtotaltext1}>Price Summary</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={[styles.direction1, {marginBottom: -10}]}>
              <Text style={styles.subtotaltext}>SubTotal</Text>
              <View style={styles.rupees}>
                {/* <FontAwesome name="rupee" size={12} color="#324356" /> */}
                <Text style={styles.rupeestext}>₹ {subtotal}</Text>
              </View>
            </View>

            {savings > 0 && subtotal !== savings ? (
              <>
                <View style={styles.direction1}>
                  <Text style={[styles.subtotaltext, {paddingBottom: 10}]}>
                    Saving:
                  </Text>
                  <View style={styles.rupees}>
                    <Text style={styles.rupeestext}>₹ {savings}</Text>
                  </View>
                </View>

                <View style={styles.horizontalLine} />
              </>
            ) : null}

            <View style={styles.direction1}>
              <Text style={[styles.subtotaltext1, {paddingBottom: 5}]}>
                Grand Total :
              </Text>
              <View style={styles.rupees}>
                {/* <FontAwesome name="rupee" size={12} color="#324356" /> */}
                <Text style={styles.rupeestext}>
                  {' '}
                  ₹ {subtotal !== savings ? subtotal - savings : subtotal}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                isLoggedIn
                  ? navigation.navigate('AddressList', {
                      item: cartDataList,
                      ammount: calculateSubtotal(),
                    })
                  : navigation.navigate('Login', {from: 'MyCart'});
              }}
              style={styles.book}>
              <Text style={styles.btext1}>PLACE ORDER</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/image/continue_shopping.png')}
            style={styles.continueShoppingImg}
          />
          <TouchableOpacity
            onPress={() => {
                navigation.navigate('Home1', {screen: 'Remedie12'})
            }}
            style={[styles.book, {width: '90%', marginHorizontal: 'auto'}]}>
            <Text style={styles.btext1}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Remedies12SecondComponent;

const data = [
  {
    id: '1',
    title: 'Aluminium Metal Strip Vastu',
    price: '₹ 725.00',
    image: require('../../../assets/image/Remedies/ab.png'),
  },
  {
    id: '2',
    title: 'Aluminium Metal Strip Vastu',
    price: '₹ 725.00',
    image: require('../../../assets/image/Remedies/ab.png'),
  },
  // Add more items as needed
];
