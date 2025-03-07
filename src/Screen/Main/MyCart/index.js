import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  addToCart,
  updateCartQuantity,
} from '../../../Redux/Slice/CartSlice';

import {useRoute} from '@react-navigation/native';
import Imagepath from '../../../Component/Imagepath';
import Loader from '../../../Component/Loader';

import {getCountryStateList} from '../../../Redux/Slice/countryStateSlice';
import {getUserDetails} from '../../../Redux/Slice/loginSlice';

const Remedies12SecondComponent = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cartisLoading = useSelector(state => state.cart?.loading);
  const isLoading = useSelector(state => state.address?.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const localCartDataList = useSelector(
    state => state?.cart?.localStorageCartData,
  );

  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const {userDetails} = useSelector(state => state.Login);

  const defaultAddress = userDetails?.defaultAddress;

  const [userType, setUserType] = useState('');
  const route = useRoute();

  const fromScreen = route?.params?.from;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = JSON.parse(userStatus);
        dispatch(getCountryStateList());
        dispatch(getUserDetails(userData?.shopify_access_token));
        if (userStatus) {
          setUserType(userData.user_type);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [fromScreen]);

  const handlePlaceOrder = () => {
    Animated.sequence([
      Animated.timing(buttonAnimatedValue, {
        toValue: 0.94,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isLoggedIn) {
        navigation.navigate('AddressList', {
          item: localCartDataList,
          ammount: totalAmount,
          data: defaultAddress,
        });
      } else {
        navigation.navigate('Login', {from: 'MyCart'});
      }
    });
  };

  const Addtocart = async item => {
    try {
      dispatch(addToCart(item));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const increment = async item => {
    let updatedItem = {
      id: item.id,
      operation: 'increase',
    };
    dispatch(updateCartQuantity(updatedItem));
  };

  const decrement = async item => {
    let updatedItem = {
      id: item.id,
      operation: 'decrease',
    };
    dispatch(updateCartQuantity(updatedItem));
  };

  const confirmRemoveItem = item => {
    setItemToRemove(item);
    setIsModalVisible(true);
  };

  const removerItem = async item => {
    setIsModalVisible(false);
    dispatch(removeFromCart(item.id));
  };

  const calculateSubtotalAndSavings = () => {
    let subtotal = 0;
    let savings = 0;
    let Tax = 0;

    const dataList = localCartDataList;

    dataList?.forEach(item => {
      const discountedPrice = item?.price;

      const validDiscountedPrice =
        discountedPrice > 0 ? discountedPrice : item?.price;

      subtotal += JSON.parse(discountedPrice) * item.qty;
      Tax += parseFloat(item?.tax_amount || 0);

      savings += (item?.price - validDiscountedPrice) * item.qty;
    });

    return {subtotal, savings, Tax};
  };
  const {subtotal, savings, Tax} = calculateSubtotalAndSavings();
  const totalAmount =
    subtotal !== savings ? subtotal + Tax - savings : subtotal;

  const renderItem2 = ({item}) => (
    <View>
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', {data: item})}
          style={{flex: 1}}>
          <Image
            source={
              item?.image
                ? {uri: `${Imagepath.Path}${item?.image}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.third, styles.titleText]}>
            {' '}
            {item.name
              ? item.name.length > 20
                ? `${item.name.substring(0, 20)}...`
                : item.name
              : ' '}
          </Text>

          <Text style={[styles.third, {marginTop: 10}]}>₹ {item?.price}</Text>

          <View style={styles.direction}>
            {item?.rating ? (
              <Rating
                type="custom"
                tintColor={colors.ordercolor}
                ratingCount={5}
                imageSize={wp(4)}
                startingValue={item?.rating}
                ratingColor="#52B1E9"
                readonly
                ratingBackgroundColor={colors.lightGrey}
              />
            ) : null}
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
    <TouchableOpacity    onPress={() =>
      navigation.navigate('ProductDetail', {itemId: item.productId})
    }style={styles.viewinner}>
      <TouchableOpacity
      >
        <Image
          source={
            item?.image
              ? {uri: `${item?.image}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.image1}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text style={styles.textstyle}>
          {' '}
          {item?.title
            ? item?.title.length > 15
              ? `${item?.title.substring(0, 15)}...`
              : item?.title
            : ' '}
        </Text>
        <View style={styles.ruupebutton}>
          <View style={styles.rupees}>
            <Text style={styles.rupeestext}>₹ {item?.price}</Text>
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
          confirmRemoveItem(item);
        }}>
        <View style={styles.closeButton}>
          <Text style={styles.closeIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image source={require('../../../assets/image/Drawer.png')} />
          </TouchableOpacity>
          <Image
            style={{marginLeft: 15}}
            source={require('../../../assets/image/header.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.bagBtn}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <Image source={require('../../../assets/image/small_bag.png')} />
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Cart</Text>
        </View>
      </View>
      {cartisLoading || isLoading ? (
        <Loader />
      ) : localCartDataList.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            {isLoggedIn && defaultAddress ? (
              <View style={styles.viewDeliver}>
                <View style={styles.toview}>
                  <Text style={styles.textDeliver}>Deliver To:</Text>
                  <Text style={styles.texttejash}>
                    {defaultAddress?.firstName}
                    {defaultAddress.lastName}, {defaultAddress?.zip}
                  </Text>
                </View>
                <View style={styles.loremview}>
                  <Text style={styles.loremtext}>
                    {defaultAddress?.address1}, {defaultAddress?.address2}.{' '}
                    {defaultAddress?.city}, {defaultAddress?.province}{' '}
                    {`Mobile: ${defaultAddress?.phone}`}...
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('AddressList', {
                        item: localCartDataList,
                        ammount: totalAmount,
                        data: defaultAddress,
                      })
                    }>
                    <Text style={styles.change}>Change</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            <FlatList
              data={localCartDataList}
              scrollEnabled={false}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.viewinner1}
            />
          </ScrollView>
          <View style={styles.subtotalsavingyview}>
            <View style={styles.summaryview}>
              <Text style={styles.subtotaltext1}>Price Summary</Text>
            </View>

            <View style={styles.horizontalLine} />

            <View style={[styles.direction1, {marginBottom: -10}]}>
              <Text style={styles.subtotaltext}>SubTotal</Text>
              <View style={styles.rupees}>
                <Text style={styles.rupeestext}>₹ {subtotal}</Text>
              </View>
            </View>
            <View style={[styles.direction1, {marginBottom: -10}]}>
              <Text style={styles.subtotaltext}>Tax</Text>
              <View style={styles.rupees}>
                <Text style={styles.rupeestext}>₹ {Tax}</Text>
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
                <Text style={styles.rupeestext}> ₹ {totalAmount}</Text>
              </View>
            </View>
            <Text style={[styles.subtotaltext, {color: colors?.grey}]}>
              {' '}
              Shipping charges will be calculated in the next step.
            </Text>
            <Animated.View
              style={[
                {
                  transform: [{scale: buttonAnimatedValue}],
                },
                {marginTop: 15},
              ]}>
              <TouchableOpacity onPress={handlePlaceOrder} style={styles.book}>
                <Text style={styles.btext1}>PLACE ORDER</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/image/continue_shopping.png')}
            style={styles.continueShoppingImg}
          />
          <Animated.View
            style={[
              {
                transform: [{scale: buttonAnimatedValue}],
              },
              {marginTop: 15},
            ]}>
            <TouchableOpacity
              onPress={() => {
                Animated.sequence([
                  Animated.timing(buttonAnimatedValue, {
                    toValue: 0.94,
                    duration: 500,
                    useNativeDriver: true,
                  }),
                  Animated.timing(buttonAnimatedValue, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                  }),
                ]).start(() => {
                  navigation.navigate('Home1', {screen: 'Remedie12'});
                });
              }}
              style={styles.book}>
              <Text style={styles.btext1}>Continue Shopping</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay} pointerEvents="box-none">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Remove Item</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to remove this item from your cart?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => removerItem(itemToRemove)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Remedies12SecondComponent;
