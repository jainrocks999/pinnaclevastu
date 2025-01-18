import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Animated,
  Share,
  Pressable,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import BannerSlider from '../../../Component/Banner';
import {fontSize} from '../../../Component/fontsize';
import Collapsible from 'react-native-collapsible';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {
  addToCart,
  addToCartApi,
  getCartDataApi,
  updateCartApi,
  updateCartQuantity,
} from '../../../Redux/Slice/CartSlice';
import Imagepath from '../../../Component/Imagepath';
import constants from '../../../Redux/constant/constants';
import axios from 'axios';
import {productDetail1} from '../../../Redux/Slice/HomeSlice';
import {useNavigation} from '@react-navigation/native';
import AnimatedLine from '../../../Component/progressbar';

const RemediesProductDetail = ({route}) => {
  const item = route?.params?.data;


  const navigation = useNavigation();
  const {width} = Dimensions.get('window');
  const Detail = useSelector(state => state.home?.RemeiesDetail?.data);
  const cartDataList = useSelector(state => state?.cart?.CartData);
  const localCartDataList = useSelector(
    state => state?.cart?.localStorageCartData,
  );
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  const isLoading = useSelector(state => state.home?.loading);
  const [quantity, setQuantity] = useState(1);
  const [userType, setUserType] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [currentItemInCart, setCurrentItemInCart] = useState();
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;

  const animation = useRef(new Animated.Value(0)).current;
  const [buttonText, setButtonText] = useState('ADD TO CART');

  const halfFlipInterpolate = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'], // Rotate only up to 90 degrees
  });

  useEffect(() => {
    PRoductDeta();
  }, []);
  console.log('jkfdgdgdkj',item);
  const PRoductDeta = async () => {
   
    await dispatch(
      productDetail1({
        url: 'fetch-single-product',
        product_id: item?.id ? item?.id : item?.product_id,
        navigation,
      }),
    );
    // navigation.navigate("ProductDetail", { data: item })
  };

  const productDetaill = async item => {
    await dispatch(
      productDetail1({
        url: 'fetch-single-product',
        product_id: item.id,
        navigation,
      }),
    );
  };

  const newArray = [];
  (Detail?.image_data || []).forEach(item => {
    const updatedItem = {
      ...item,
      image: `${Imagepath.Path}${item.image}`,
    };

    newArray.push(updatedItem);
  });

  const calculateAverageRating = reviews => {
    const totalRatings = reviews?.reduce(
      (sum, review) => sum + review.rating,
      0,
    );
    const averageRating =
      reviews?.length > 0 ? totalRatings / reviews.length : 0;
    return averageRating.toFixed(1);
  };

  const averageRating = calculateAverageRating(Detail?.reviews);

  const [checkedItems, setCheckedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (Detail?.cross_sales) {
      const initialCheckedState = Detail.cross_sales.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setCheckedItems(initialCheckedState);
      calculateTotalPrice(initialCheckedState);
    }
    const init = async () => {
      await getUserType();
    };
    const checkIfInCart = () => {
      // console.log(userType, 'sandeep dsfksdfmsdfmsdlf');
      const cartItem =
        userType === undefined
          ? localCartDataList.find(item => item.id === Detail?.id)
          : cartDataList.find(item => item.product_id === Detail?.id);

      setCurrentItemInCart(cartItem);
    };

    checkIfInCart();
    init();
  }, [Detail?.cross_sales]);

  const getUserType = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);
      setUserType(userData?.user_type);

      const existingCart = await AsyncStorage.getItem('cartItems');
      const cartItems = existingCart ? JSON.parse(existingCart) : [];
      // setLocalCartData(cartItems);
    } catch (error) {
      console.error('Error fetching user data or cart items:', error);
    }
  };

  const toggleCheckbox = itemId => {
    setCheckedItems(prevState => {
      const updatedState = {
        ...prevState,
        [itemId]: !prevState[itemId], // Toggle the selected state
      };
      calculateTotalPrice(updatedState); // Recalculate total price
      return updatedState;
    });
  };

  const calculateTotalPrice = checkedState => {
    // Calculate total price based on selected items
    const total = Detail?.cross_sales?.reduce((sum, product) => {
      return checkedState[product.id] ? sum + (product?.price || 0) : sum;
    }, 0);
    setTotalPrice(total); // Update the total price state
  };

  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleImageChange = index => {
    setCurrentIndex(index);
  };

  const increment = () => {
    if (quantity < 100) {
      // if (currentItemInCart) {
      //   if (quantity > currentItemInCart?.qty) {
      //     setIsInCart(false);
      //   } else {
      //     setIsInCart(true);
      //   }
      // }
      setIsInCart(false);
      setButtonText('ADD TO CART');
      setQuantity(quantity + 1);
    }
  };
  

  const decrement = () => {
    if (quantity > 1) {
      // if (currentItemInCart) {
      //   if (quantity < currentItemInCart?.qty) {
      //     setIsInCart(false);
      //   } else {
      //     setIsInCart(true);
      //   }
      // }
      setButtonText('ADD TO CART');
      setIsInCart(false);
      setQuantity(quantity - 1);
    }
  };


  const handleGoToCartAnimation = () => {
    if (isInCart) {
      navigation.navigate('Home', {screen: 'MyCart'});
    }
  };

  const handleAddToCart = async Detail => {
    try {
      const prod = Detail || {}; // Fallback to empty object if no product details
      if (!prod || Object.keys(prod).length === 0) {
        console.error('Error: Product details are missing!');
        return;
      }

      // Change button text immediately to "GO TO CART"
      setButtonText('GO TO CART');
      setIsInCart(true);

      // Start flip animation
      Animated.timing(animation, {
        toValue: 90, // Rotate halfway
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Add product to the cart in the background
        Addtocart(prod, {qty: quantity});
        console.log('Added to cart:', prod);

        // Complete the flip animation back to 0 degrees
        Animated.timing(animation, {
          toValue: 0, // Rotate back to 0
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const Addtocart = async (item, {qty}) => {
    // console.log(qty,"sandeepdfmgdlfkgl.........")
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);

      // console.log(item);
      if (userData) {
        const cartItem = cartDataList.find(prod => prod.product_id === item.id);
        const quantityToUpdate = cartItem ? cartItem.qty + qty : qty;

        if (cartItem) {
          const rowId = cartItem.rowid;

          await dispatch(
            updateCartApi({
              user_id: userData.user_id,
              rowid: rowId,
              qty: quantityToUpdate,
              token: userData.token,
              currentQty: qty,
              fromCartScreen: false,
            }),
          );
        } else {
          await dispatch(
            addToCartApi({
              user_id: userData.user_id,
              itemId: item.id,
              qty: qty,
              user_type: userData.user_type,
              token: userData?.token,
              url: 'add-to-cart',
            }),
          );
        }
        await dispatch(
          getCartDataApi({
            token: userData?.token,
            url: `cart?user_id=${userData?.user_id}`,
          }),
        );
        setIsInCart(true);
      } else {
        const itemWithQty = {
          ...item,
          qty: quantity,
        };
        dispatch(addToCart(itemWithQty));
        setIsInCart(true);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const share = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app: https://example.com',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  // const handleUpdateCartData = async (user_id, rowid, qty, token) => {
  //   try {
  //     let data = {
  //       user_id: user_id,
  //       rowid: rowid,
  //       qty: qty,
  //     };
  //     const config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: `${constants.mainUrl}update-to-cart`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //       data: JSON.stringify(data),
  //     };

  //     const response = await axios.request(config);

  //     console.log(response.data, 'updated !sdfmlkdflsd');

  //     if (response?.data?.status == 200) {
  //       Toast.show(response.data.msg);
  //     }
  //   } catch (error) {
  //     console.log('cart Quantity error ', error);
  //   }
  // };

  const AddExtraItemInCart = async checkedItems => {
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
    ]).start(async () => {
      const selectedItems = Object.entries(checkedItems)
        .filter(([key, isChecked]) => isChecked)
        .map(([key, value]) => key);

      if (selectedItems.length === 0) {
        console.log('No items selected');
        return;
      }

      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = JSON.parse(userStatus);

        const matchedItems = Detail?.cross_sales?.filter(item =>
          selectedItems.includes(item.id.toString()),
        );
        if (userStatus) {
          for (const item of matchedItems) {
            const existingCartItem = cartDataList.find(
              cartItem => cartItem.product_id === item.id,
            );

            const quantity = existingCartItem ? existingCartItem?.qty + 1 : 1;

            if (existingCartItem) {
              // If item exists in the cart, update it
              let qty = quantity;
              await dispatch(
                updateCartApi({
                  user_id: userData.user_id,
                  rowid: existingCartItem.rowid,
                  qty: qty,
                  token: userData.token,
                  currentQty: 1,
                  fromCartScreen: false,
                }),
              );
              // handleUpdateCartData(
              //   userData.user_id,
              //   existingCartItem.rowid,
              //   qty,
              //   userData.token,
              // );
              await dispatch(
                getCartDataApi({
                  token: userData?.token,
                  url: `cart?user_id=${userData?.user_id}`,
                }),
              );
              Toast.show('Item quantity updated successfully!');
            } else {
              // If item doesn't exist, add it to the cart
              await dispatch(
                addToCartApi({
                  user_id: userData.user_id,
                  itemId: item.id,
                  qty: 1, // Initial quantity
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
              Toast.show('Item added to cart successfully!');
            }
          }
        } else {
          for (const item of matchedItems) {
            const existingCartItem = localCartDataList.find(
              cartItem => cartItem.id === item.id,
            );
            console.log(existingCartItem);
            if (existingCartItem) {
              let updatedItem = {
                id: item.id,
                operation: 'increase',
              };
              dispatch(updateCartQuantity(updatedItem));
            } else {
              dispatch(addToCart(item));
            }
          }
        }
      } catch (error) {
        console.log('Error adding items to cart:', error);
      }
    });
  };

  const [showAllReviews, setShowAllReviews] = useState(false);

  // Determine the data to show based on `showAllReviews`
  const reviewsToShow = showAllReviews
    ? Detail?.reviews
    : Detail?.reviews?.slice(0, 3);

  const renderItem4 = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.cardContainer]}>
          <Image source={item.image} style={styles.sevicesImg} />
          <Text style={styles.text}>{item.name}</Text>
          <Text style={[styles.text, {fontSize: fontSize.Ten}]}>
            {item.title}
          </Text>
        </View>
        {item.id !== '3' ? <View style={styles.viewLine} /> : null}
      </View>
    );
  };
  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('profile')}
        style={[styles.cardContainer1]}>
        <View style={styles.reviewCard}>
          <View style={{paddingLeft: 5}}>
            <Image
              style={styles.reviewImage}
              source={
                item?.customer_image != null
                  ? {uri: `${Imagepath?.Path}${item?.customer_image}`}
                  : require('../../../assets/image/Ellipse1.png')
              }
            />

            <Rating
              type="custom"
              tintColor={colors.white}
              ratingCount={5}
              imageSize={wp(3.5)}
              startingValue={item.rating}
              ratingColor="#52B1E9"
              readonly
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
            />
          </View>
          <View style={[styles.card, {paddingLeft: 10}]}>
            <Text style={styles.reviewText}>{item.customer_name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>
              {item?.comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
  };

  const renderItem = ({item, index}) => (
    <View>
      <Pressable
        onPress={() => productDetaill(item)}
        style={styles.productCard}>
        <Image
          source={
            item?.image
              ? {uri: `${Imagepath.Path}${item.image}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.productImage}
        />
        <Text style={[styles.productName, {}]}>{item.name}</Text>
        <Text style={[styles.productName]}>₹ {item.price}</Text>
        <View
          style={[
            styles.checkboxWrapper,
            checkedItems[item.id] && styles.checkedBackground,
          ]}>
          <Checkbox
            status={checkedItems[item.id] ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox(item.id)}
            color="#FFF"
            uncheckedColor="#DFE7EF"
          />
        </View>
      </Pressable>
      {index !== Detail?.cross_sales?.length - 1 ? (
        <Text style={styles.plusBtn}>+</Text>
      ) : null}
    </View>
  );

  const renderItem2 = ({item}) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() => productDetaill(item)}>
        <Image
          source={
            item?.image
              ? {uri: `${Imagepath.Path}${item?.image}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={[styles.thirdCard, styles.titleText]}>
            {' '}
            {item.name
              ? item.name.length > 20
                ? `${item.name.substring(0, 20)}...`
                : item.name
              : ' '}
          </Text>
          <Text style={[styles.thirdCard, {marginTop: 10}]}>
            ₹ {item.price}
          </Text>

          <View style={styles.direction}>
            {item.reviews != null ? (
              <Rating
                type="custom"
                tintColor={colors.ordercolor}
                ratingCount={5}
                imageSize={16}
                startingValue={item?.reviews}
                ratingColor="#52B1E9"
                readonly
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.buttonstylefirst}
            onPress={() => Addtocart(item, {qty: 1})}>
            <Text style={styles.buttonstyle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderSubItems = ({item}) => (
    <View style={styles.singleSubItem}>
      <Text style={styles.subItemTitle}>{item.title}</Text>
      <Text style={styles.subItemSubtitle}>{item.subtitle}</Text>
    </View>
  );

  const renderItems = ({item}) => (
    <View style={styles.paddings}>
      {/* {console.log('slksflk', item)} */}
      <TouchableOpacity
        onPress={() => toggleSection(item.desc_data_id)}
        style={[
          styles.courseToggle1,
          expandedSection === item.desc_data_id && styles.activeCourseToggle,
        ]}>
        <View style={styles.direction1}>
          {/* <Text
            style={[
              styles.coursetext1,
              expandedSection === item.id && styles.activeTitleColor1,
            ]}>
            {item.title0}
          </Text> */}
          <Text
            style={[
              styles.coursetext2,
              expandedSection === item.desc_data_id && styles.activeTitleColor,
            ]}>
            {item.label}
          </Text>
        </View>
        <Image
          source={
            expandedSection === item.desc_data_id
              ? require('../../../assets/otherApp/updown.png')
              : require('../../../assets/image/arrow_icon.png')
          }
          style={[
            styles.toggleIcon2,
            expandedSection !== item.desc_data_id
              ? {resizeMode: 'contain'}
              : null,
          ]}
        />
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== item.desc_data_id}>
        <View style={styles.subItemContainer}>
          <RenderHTML
            contentWidth={width}
            source={{
              html: item.description,
            }}
          />
        </View>
        {/* <View style={styles.subItemContainer}>
          <FlatList
            data={item.subItems}
            keyExtractor={(subItem, index) => index.toString()}
            renderItem={renderSubItems}
          />
        </View> */}
      </Collapsible>
    </View>
  );

  if (!Detail) {
    return (
      <View>
        <View style={styles.headerdouble}>
          <View style={styles.directionsytyle}>
            <Image
              style={styles.backBtn1}
              source={require('../../../assets/drawer/Back1.png')}
            />

            <Text style={styles.logoText1}>Product Detail</Text>
          </View>

          <Image source={require('../../../assets/image/Group.png')} />
        </View>
        {!Detail ? <AnimatedLine /> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Product Detail</Text>
        </View>
        <TouchableOpacity
          hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
          onPress={() => {
            navigation.navigate('Home', {screen: 'MyCart'});
          }}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')}
          />
        </TouchableOpacity>
      </View>
      {Detail ? (
        <ScrollView contentContainerStyle={styles.servicesContainer}>
          {newArray?.length != 0 ? (
            <View style={styles.welcomeCard}>
              <BannerSlider
                onPress={item => {}}
                data={newArray}
                local={true}
                height1={wp(60)}
              />
            </View>
          ) : (
            <View style={styles.welcomeCard}>
              <Image
                source={require('../../../assets/image/Remedies/Image-not.png')}
                style={{
                  width: '100%',
                  height: wp(60),
                  borderRadius: 15,
                }}
              />
            </View>
          )}
          <View style={styles.contain}>
            {/* Aluminium Metal Strip Vastu */}
            <Text style={styles.service}>
              {Detail?.name}
              {/* {Array.isArray(Detail) && Detail[0]?.name ? Detail[0]?.name : ''} */}
            </Text>
          </View>
          <View style={styles.main}>
            {Detail?.reviews?.length > 0 && (
              <>
                <View style={styles.headerview}>
                  <View style={{marginTop: -5}}>
                    <Rating
                      type="custom"
                      tintColor={colors.white}
                      ratingCount={5}
                      imageSize={16}
                      startingValue={averageRating}
                      ratingColor="#52B1E9"
                      readonly
                      ratingBackgroundColor={colors.lightGrey} // Unfilled star color
                    />
                  </View>

                  <Text
                    style={[
                      styles.third1,
                      {
                        fontSize: fontSize.Twelve,
                        color: colors.heading,
                        marginLeft: 8,
                      },
                    ]}>
                    {'('}
                  </Text>
                  <Text
                    style={[
                      styles.third1,
                      {fontSize: fontSize.Twelve, color: '#27C571'},
                    ]}>
                    {Detail.reviews.length}
                  </Text>
                  <Text
                    style={[
                      styles.third1,
                      {fontSize: fontSize.Twelve, color: colors.heading},
                    ]}>
                    {')'}
                  </Text>
                  <Text
                    style={[
                      styles.third1,
                      {fontSize: fontSize.Fourteen, color: colors.light_gr},
                    ]}>
                    {' reviews'}
                  </Text>
                </View>

                <View style={styles.dividerView} />
              </>
            )}
            <Text
              style={[
                styles.third1,
                {
                  fontSize: fontSize.Twelve,
                  color: colors.light_gr,
                  textDecorationLine: 'underline',
                },
              ]}>
              {'write a review'}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.ordercolor,
                position: 'absolute',
                right: 5,
              }}
              onPress={() => share()}>
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/otherApp/share.png')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.cont}>{Detail?.short_description}</Text>

            <View
              style={{
                marginTop: 15,
                marginHorizontal: 15,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Text style={[styles.third1]}>
                {`₹ ${
                  userType === 'customers' && Detail?.sale_price
                    ? Detail?.sale_price
                    : userType === 'student' && Detail?.student_price
                    ? Detail?.student_price
                    : userType === 'franchise' && Detail?.franchise_price
                    ? Detail?.franchise_price
                    : Detail?.price
                }`}
              </Text>

              {userType &&
              (Detail?.sale_price < Detail?.price ||
                Detail?.student_price < Detail?.price ||
                Detail?.franchise_price < Detail?.price) &&
              (Detail?.sale_price ||
                Detail?.student_price ||
                Detail?.franchise_price) ? (
                <Text
                  style={[styles.third1, {textDecorationLine: 'line-through'}]}>
                  ₹ {Detail?.price}
                </Text>
              ) : null}
            </View>
            <View
              style={[
                styles.headerview,
                {marginTop: 15, marginHorizontal: 15},
              ]}>
              <Text style={[styles.third2, {color: colors.heading}]}>
                Quantity:
              </Text>
              <View style={[styles.headerview, styles.quantitySection]}>
                <TouchableOpacity
                  style={styles.touch}
                  hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
                  onPress={() => decrement()}>
                  <Text style={[styles.third1, styles.quantityBtns]}>
                    {'-'}
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.third1, {marginLeft: 5, marginTop: 3}]}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  style={[styles.touch, {marginLeft: 0}]}
                  hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
                  onPress={() => increment()}>
                  <Text style={[styles.third1, styles.quantityBtns]}>
                    {'+'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      rotateX: halfFlipInterpolate, // Smoothly flips the button
                    },
                  ],
                },
                styles.book1,
                {marginTop: 15},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  if (isInCart) {                   
                    handleGoToCartAnimation(); // Navigate to the cart
                  } else {
                    handleAddToCart(Detail); // Add to cart and update state
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Animated.Text style={[styles.btext1]}>
                  {buttonText}
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View>
            <FlatList
              data={data5}
              renderItem={renderItem4}
              keyExtractor={item => item.id}
              numColumns={3}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </View>

          <View style={{marginTop: 10, marginHorizontal: 15}}>
            <FlatList
              data={Detail?.desc_data?.filter(
                item => item.description !== null && item.label !== null,
              )}
              keyExtractor={item => item.desc_data_id.toString()}
              scrollEnabled={false}
              renderItem={renderItems}
            />
          </View>
          {Detail?.cross_sales?.length != 0 ? (
            <View style={[styles.productsContainer, {gap: 0}]}>
              <Text style={[styles.header1, {marginLeft: 20}]}>
                Frequently Bought Together
              </Text>
              <FlatList
                data={Detail?.cross_sales}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                  styles.productsContainer,
                  {paddingVertical: 0, paddingRight: 25},
                ]}
              />
              <View style={styles.viewBorder} />
              {totalPrice != 0 ? (
                <Text style={styles.totalText}>Total: ₹ {totalPrice}</Text>
              ) : null}
              {Object.values(checkedItems)?.filter(Boolean)?.length !== 0 ? (
                <Animated.View
                  style={[
                    {
                      transform: [{scale: buttonAnimatedValue}], // स्केल का इफ़ेक्ट
                    },
                    // styles.book,
                    {marginTop: 15},
                  ]}>
                  <TouchableOpacity
                    onPress={() => AddExtraItemInCart(checkedItems)}
                    style={styles.book}>
                    <Text style={styles.btext1}>
                      ADD {Object.values(checkedItems)?.filter(Boolean)?.length}{' '}
                      ITEMS TO CART
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              ) : // <TouchableOpacity
              //   onPress={() => AddExtraItemInCart(checkedItems)}
              //   style={styles.book}>
              //   <Text style={styles.btext1}>
              //     ADD {Object.values(checkedItems)?.filter(Boolean)?.length}{' '}
              //     ITEMS TO CART
              //   </Text>
              // </TouchableOpacity>
              null}
            </View>
          ) : null}

          {Detail?.top_best_seller?.length != 0 ? (
            <View style={styles.suggestItemContainer}>
              <Text style={styles.header1}>Top Best Sellers</Text>
              <FlatList
                data={Detail?.top_best_seller}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem2}
                horizontal
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e => {
                  const contentOffsetX = e.nativeEvent.contentOffset.x;
                  const slideWidth = styles.slide.width; // Assuming styles.slide.width defines the width of each slide
                  const currentIndex = Math.round(contentOffsetX / slideWidth); // Use Math.round for more accurate calculation
                  setCurrentIndex(currentIndex); // Update state with the calculated index
                }}
              />
              {/* {console.log(Detail?.top_best_seller,"sandeepfdmkdfkgdf")} */}
              <View style={styles.dotContainer}>
                {Detail?.top_best_seller.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dot,
                      currentIndex === index && styles.activeDot,
                    ]}
                    // onPress={() => handleImageChange(index)}
                  />
                ))}
              </View>
            </View>
          ) : null}

          <View style={{backgroundColor: '#F1F1F1'}}>
            {Detail?.reviews?.length === 0 ? null : (
              <>
                <View style={styles.shareview}>
                  <View style={{marginBottom: -20}}>
                    <Text
                      style={
                        styles.service
                      }>{`User Reviews (${Detail?.reviews?.length})`}</Text>
                  </View>

                  <TouchableOpacity style={styles.button1}>
                    <Text style={styles.btext}>Write a Review</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={reviewsToShow}
                  renderItem={renderItem3}
                  scrollEnabled={false}
                  keyExtractor={index => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
               
                  <TouchableOpacity onPress={() => setShowAllReviews(true)}>
                    <Text style={styles.seeall}>{!showAllReviews &&'See all Reviews'}</Text>
                  </TouchableOpacity>
               
              </>
            )}
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
};

export default RemediesProductDetail;

const data5 = [
  {
    id: '1',
    image: require('../../../assets/otherApp/services1.png'),
    name: 'Speedy Delivery',
    title: 'We ensure express & fast deliver',
  },
  {
    id: '2',
    image: require('../../../assets/otherApp/services2.png'),
    name: '100% Payment Secure',
    title: 'We assure 100% payment Security',
  },
  {
    id: '3',
    image: require('../../../assets/otherApp/services3.png'),
    name: 'Over 3000 Products',
    title: "India's largest healing crystal store",
  },
];
const dummyDatas = [
  {
    id: '1',

    title: 'Description',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      
    ],
  },
  {
    id: '2',

    title: 'Aluminium strip for Vastu',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

     
    ],
  },
  {
    id: '3',

    title: 'Aluminium strip for Home',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

      {
        title: '●',
        subtitle:
          'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      },
      {
        title: '●',
        subtitle:
          'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      },
    ],
  },
  {
    id: '4',

    title: 'Aluminium strip for Toilet',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

      {
        title: '●',
        subtitle:
          'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      },
      {
        title: '●',
        subtitle:
          'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      },
    ],
  },
];
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

const data7 = [
  {id: '1', image: require('../../../assets/image/Remedies/ab.png')},
  {id: '2', image: require('../../../assets/image/Remedies/dk.png')},
  {id: '3', image: require('../../../assets/image/Remedies/vk.png')},
];

const data1 = [
  {
    id: '1',
    image: require('../../../assets/image/Ellipse1.png'),
    name: 'Vikash',
    msg: 'Thanku so much madam ji',
  },
  {
    id: '3',
    image: require('../../../assets/image/Ellipse2.png'),
    name: 'Sudhir',
    msg: 'Thanku so much madam ',
  },
  {
    id: '5',
    image: require('../../../assets/image/Ellipse3.png'),
    name: 'Hemant',
    msg: 'VeryNice',
  },
];

const products = [
  {
    id: 1,
    name: 'Aluminium Metal Strip Vastu',
    price: 725,
    image: require('../../../assets/image/Remedies/ab.png'), // Replace with your image path
  },
  {
    id: 2,
    name: 'Lapis Lazulli',
    price: 905,
    image: require('../../../assets/image/Remedies/vk.png'),
  },
  {
    id: 3,
    name: 'Lazulli',
    price: 905,
    image: require('../../../assets/image/Remedies/dk.png'),
  },
];
