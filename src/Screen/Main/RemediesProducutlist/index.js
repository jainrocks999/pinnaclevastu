import {
  Dimensions,
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
import React, {useEffect, useState} from 'react';
import styles from './styles';

import {Rating} from 'react-native-ratings';
import {colors} from '../../../Component/colors';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  clearRemeiesDetail1,
  productDetail1,
  RemediesCategory,
} from '../../../Redux/Slice/HomeSlice';
import {
  addToCart,
  addToCartApi,
  getCartDataApi,
  updateCartApi,
} from '../../../Redux/Slice/CartSlice';
import Loader from '../../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import constants from '../../../Redux/constant/constants';

const RemediesProductList = ({route}) => {
  const name1 = route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const RemediesCategor = useSelector(state => state.home?.RemeiesCat?.data);
  const cartDataList = useSelector(state => state?.cart?.CartData);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const isLoading = useSelector(state => state.home?.loading);
  const focus = useIsFocused();

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const win = Dimensions.get('window');

  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setDisplayedText(placeholderText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          currentIndex = 0;
          setDisplayedText('');
        }
      }, 450);

      return intervalId;
    };

    const intervalId = startAnimation();

    return () => clearInterval(intervalId);
  }, [placeholderText]);

  useEffect(() => {
    if (focus) {
      setMasterDataSource(RemediesCategor || []); // Update master data
      setFilteredDataSource(RemediesCategor || []); // Reset filtered data
      setSearch(''); // Clear search text
    }
  }, [focus, RemediesCategor]);
  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource?.filter(function (item) {
        const itemData = `${item.name} ${item.price} `
          ? `${item.name} ${item.price}`.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handleSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

  useEffect(() => {
    const getUserType = async () => {
      try {
        // Get user data from AsyncStorage
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = userStatus ? JSON.parse(userStatus) : null;

        const userType = userData?.user_type;
        setUserType(userType);
      } catch (error) {
        console.log('Error in fetching user types or cart data:', error);
      }
    };

    getUserType();
    RemediesProductcategory();
  }, [focus, cartDataList]);

  const RemediesProductcategory = async () => {
    await dispatch(
      RemediesCategory({
        url: 'remedies-by-product',
        category_id: name1?.item.id,
      }),
    );
  };
  const PRoductDeta = async item => {
    console.log('fgfdglkd', item);

    dispatch(clearRemeiesDetail1());
    navigation.navigate('ProductDetail', {data: item});
  };

  const Addtocard = async item => {
    try {
      const userStatus = await AsyncStorage.getItem('user_data');
      const userData = JSON.parse(userStatus);

      if (userStatus) {
        console.log(cartDataList, 'Current cart data...');

        const existingCartItem = cartDataList.find(
          cartItem => cartItem.product_id === item.id,
        );
        console.log(existingCartItem, 'sandeep......');
        if (existingCartItem) {
          const newQuantity = existingCartItem.qty + 1;

          await dispatch(
            updateCartApi({
              user_id: userData.user_id,
              rowid: existingCartItem.rowid,
              qty: newQuantity,
              token: userData.token,
              currentQty: 1,
              fromCartScreen: false,
            }),
          );
          console.log(`Item quantity updated: ${newQuantity}`);
        } else {
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
          console.log('Item added to cart with quantity 1');
        }
        await dispatch(
          getCartDataApi({
            token: userData.token,
            url: `cart?user_id=${userData.user_id}`,
          }),
        );
      } else {
        dispatch(addToCart(item));
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
              item?.image
                ? {uri: `${Imagepath.Path}${item.image}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            style={{height: '100%', width: '100%', borderRadius: 10}}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.third, styles.titleText]}>
            {item.name
              ? item.name.length > 20
                ? `${item.name.substring(0, 20)}...`
                : item.name
              : ' '}
          </Text>
          <View style={styles.priceText}>
            <Text style={[styles.third]}>
              {`₹ ${
                userType === 'customers' && item?.sale_price
                  ? item?.sale_price
                  : userType === 'student' && item?.student_price
                  ? item?.student_price
                  : userType === 'franchise' && item?.franchise_price
                  ? item?.franchise_price
                  : item?.price
              }`}
            </Text>
            {userType &&
            (item?.sale_price < item?.price ||
              item?.student_price < item?.price ||
              item?.franchise_price < item?.price) &&
            (item?.sale_price ||
              item?.student_price ||
              item?.franchise_price) ? (
              <Text
                style={[styles.third, {textDecorationLine: 'line-through'}]}>
                ₹ {item?.price}
              </Text>
            ) : null}
          </View>

          <View style={styles.direction}>
            {item?.rating ? (
              <Rating
                type="custom"
                tintColor={colors.ordercolor}
                ratingCount={5}
                imageSize={item?.rating ? 16 : 20}
                startingValue={item?.rating}
                ratingColor="#52B1E9"
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
            ) : null}
          </View>
          <TouchableOpacity
            onPress={() => Addtocard(item)}
            style={styles.buttonstylefirst}>
            <Text style={styles.buttonstyle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={
              () => (name1?.Id ? navigation.goBack() : navigation.goBack())

              // navigation.reset({
              //     index: 0,
              //     routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
              //   })
            }
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            //
          >
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>{name1?.item?.name}</Text>
        </View>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
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
      {/* {isLoading ? <Loader /> : null} */}
      <ScrollView contentContainerStyle={styles.Scroll}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
              <Image source={require('../../../assets/image/SearchIcon.png')} />
            </TouchableOpacity>

            <TextInput
              placeholder={displayedText}
              style={styles.searchInput}
              placeholderTextColor={colors.searchBarTextColor}
              value={search}
              onChangeText={val => searchFilterFunction(val)}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <Image source={require('../../../assets/image/Vector.png')} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredDataSource ? filteredDataSource : RemediesCategor}
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

// import {
//   Dimensions,
//   FlatList,
//   Image,
//   ImageBackground,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import styles from './styles';

// import {Rating} from 'react-native-ratings';
// import {colors} from '../../../Component/colors';
// import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
// import {useDispatch, useSelector} from 'react-redux';
// import Imagepath from '../../../Component/Imagepath';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {addToCartApi, productDetail1} from '../../../Redux/Slice/HomeSlice';
// import Loader from '../../../Component/Loader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
// import axios from 'axios';
// import constants from '../../../Redux/constant/constants';

// const RemediesProductList = ({route}) => {
//   const name1 = route?.params?.name1;
//   const id =route?.params?.id

//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [userType, setUserType] = useState('');
//   const [cartItemList, setCartItemList] = useState([]);
//   const RemediesCategory = useSelector(state => state.home?.RemeiesCat?.data);
//   const cartDataList = useSelector(state => state?.home?.CartData);
//   const isLoading = useSelector(state => state.home?.loading);
//   const focus = useIsFocused();

//   const [totalQuantity, setTotalQuantity] = useState(0);

//   // useEffect(() => {
//   //   const getUserType = async () => {
//   //     try {
//   //       const userStatus = await AsyncStorage.getItem('user_data');
//   //       const userData = JSON.parse(userStatus);
//   //       setUserType(userData?.user_type);

//   //       const cartData = await AsyncStorage.getItem('cartItems');
//   //       const parsedCartData = cartData ? JSON.parse(cartData) : [];

//   //       setCartItemList(parsedCartData);

//   //       let data = userType === undefined ? cartItemList : cartDataList;
//   //       const calculateTotalQuantity = data => {
//   //         const total = data.reduce((sum, item) => sum + (item?.qty || 0), 0);
//   //         setTotalQuantity(total);
//   //       };
//   //       calculateTotalQuantity(data);
//   //     } catch (error) {
//   //       console.log('error in user types:', error);
//   //     }
//   //   };
//   //   // console.log("useEffect run !")

//   //   getUserType();
//   // }, [focus]);

//   // console.log(userType, 'sandeep skdfpsdfsdlf');
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState(RemediesCategory);
//   const [masterDataSource, setMasterDataSource] = useState(RemediesCategory);
//   const win = Dimensions.get('window');

//   const searchFilterFunction = text => {
//     if (text) {
//       const newData = masterDataSource.filter(function (item) {
//         const itemData = `${item.name} ${item.price} `
//           ? `${item.name} ${item.price}`.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredDataSource(newData);
//       setSearch(text);
//     } else {
//       setFilteredDataSource(masterDataSource);
//       setSearch(text);
//     }
//   };

//   const handleSearch = () => {
//     setSearch('');
//     setFilteredDataSource(masterDataSource);
//   };

//   useEffect(() => {
//     const getUserType = async () => {
//       try {
//         // Get user data from AsyncStorage
//         const userStatus = await AsyncStorage.getItem('user_data');
//         const userData = userStatus ? JSON.parse(userStatus) : null;

//         const userType = userData?.user_type;
//         setUserType(userType);

//         // Get cart data from AsyncStorage
//         const cartData = await AsyncStorage.getItem('cartItems');
//         const parsedCartData = cartData ? JSON.parse(cartData) : [];

//         setCartItemList(parsedCartData); // Set cart items

//         // Determine which list to use for calculation
//         const data = userType ? cartDataList : parsedCartData;

//         // Calculate total quantity
//         const total = data.reduce((sum, item) => sum + (item?.qty || 0), 0);
//         setTotalQuantity(total);
//       } catch (error) {
//         console.log('Error in fetching user types or cart data:', error);
//       }
//     };

//     // Call the async function
//     getUserType();
//   }, [focus, cartDataList]); // Include cartDataList in dependencies

//   // const totalQuantity = (userType===undefined ?  cartItemList:cartDataList).reduce(
//   //   (sum, item) => sum + (item?.qty || 0),
//   //   0,
//   // );

//   const PRoductDeta = async item => {
//     await dispatch(
//       productDetail1({
//         url: 'fetch-single-product',
//         product_id: item.id,
//         navigation,
//       }),
//     );
//   };

//   const Addtocard = async item => {
//     try {
//       const userStatus = await AsyncStorage.getItem('user_data');
//       const userData = JSON.parse(userStatus);

//       if (userStatus) {
//         await dispatch(
//           addToCartApi({
//             user_id: userData.user_id,
//             itemId: item.id,
//             qty: 1,
//             user_type: userData.user_type,
//             token: userData?.token,
//             url: 'add-to-cart',
//           }),
//         );
//       } else {
//         const existingCart = await AsyncStorage.getItem('cartItems');
//         let cartItems = existingCart ? JSON.parse(existingCart) : [];

//         const itemWithId = {
//           ...item,
//           qty: 1,
//           addedAt: new Date().toISOString(),
//         };

//         let existingItemIndex = cartItems.findIndex(
//           cartItem => cartItem.id === item.id,
//         );

//         if (existingItemIndex !== -1) {
//           cartItems[existingItemIndex] = {
//             ...cartItems[existingItemIndex],
//             ...itemWithId,
//           };
//           Toast.show('Item is already added to cart ! ');
//         } else {
//           cartItems.push(itemWithId);
//           Toast.show('Item added to cart successfully');
//         }
//         await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
//       }
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };

//   const renderItem = ({item}) => (
//     <View style={styles.slide}>
//       <TouchableOpacity onPress={() => PRoductDeta(item)}>
//         <View style={styles.image}>
//           <Image
//             source={
//               item?.image
//                 ? {uri: `${Imagepath.Path}${item.image}`}
//                 : require('../../../assets/image/Remedies/ab.png')
//             }
//             style={{height: '100%', width: '100%', borderRadius: 10}}
//           />
//         </View>
//       </TouchableOpacity>
//       <View style={styles.textContainer}>
//         <Text style={[styles.third, styles.titleText]}>{item.name}</Text>
//         <View style={styles.priceText}>
//           {userType &&
//           (item?.sale_price < item?.price ||
//             item?.student_price < item?.price ||
//             item?.franchise_price < item?.price) &&
//           (item?.sale_price || item?.student_price || item?.franchise_price) ? (
//             <Text style={[styles.third, {textDecorationLine: 'line-through'}]}>
//               ₹ {item?.price}
//             </Text>
//           ) : null}

//           <Text style={[styles.third]}>
//             {`₹ ${
//               userType === 'customers' && item?.sale_price
//                 ? item?.sale_price
//                 : userType === 'student' && item?.student_price
//                 ? item?.student_price
//                 : userType === 'franchise' && item?.franchise_price
//                 ? item?.franchise_price
//                 : item?.price
//             }`}
//           </Text>
//         </View>

//         <View style={styles.direction}>
//           <Rating
//             type="custom"
//             tintColor={colors.ordercolor}
//             ratingCount={5}
//             imageSize={item?.rating ? 16 : 20}
//             startingValue={item?.rating}
//             ratingColor="#52B1E9"
//             ratingBackgroundColor={colors.lightGrey} // Unfilled star color
//           />
//         </View>
//         <TouchableOpacity
//           onPress={() => Addtocard(item)}
//           style={styles.buttonstylefirst}>
//           <Text style={styles.buttonstyle}>Add to Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerview}>
//           <TouchableOpacity
//             onPress={() =>
//              id
//                 ? navigation.goBack()
//                 :  navigation.goBack()

//                 // navigation.reset({
//                 //     index: 0,
//                 //     routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
//                 //   })
//             }

//             //
//           >
//             <Image
//               style={styles.backBtn}
//               source={require('../../../assets/drawer/Back1.png')}
//             />
//           </TouchableOpacity>
//           <Text style={styles.logoText}>{name1}</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('Home', {screen: 'MyCart'});
//           }}>
//           <View style={styles.itemCount}>
//             <Text style={styles.countText}>{totalQuantity}</Text>
//           </View>
//           <Image
//             style={styles.bagBtn}
//             source={require('../../../assets/image/Group.png')}
//           />
//         </TouchableOpacity>
//       </View>
//       {isLoading ? <Loader /> : null}
//       <ScrollView contentContainerStyle={styles.Scroll}>
//         <View style={styles.searchContainer}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <Image source={require('../../../assets/image/SearchIcon.png')} />
//             <TextInput
//               placeholder="Search..."
//               style={styles.searchInput}
//               placeholderTextColor={colors.searchBarTextColor}
//               value={search}
//               onChangeText={val => searchFilterFunction(val)}
//             />
//           </View>
//           <TouchableOpacity style={styles.filterBtn}>
//             <Image source={require('../../../assets/image/Vector.png')} />
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           data={filteredDataSource ? filteredDataSource :RemediesCategory}
//           renderItem={renderItem}
//           numColumns={2}
//           keyExtractor={item => item.id}
//           // nestedScrollEnabled={true}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{}}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// export default RemediesProductList;

// const data2 = [
//   {
//     id: '1',
//     source1: require('../../../assets/image/Remedies/ab.png'),
//     title: 'Aluminium Metal Strip Vastu',
//     price: '₹725.00',
//     rating: 3,
//     reviewCount: 2,
//   },
//   {
//     id: '2',
//     source1: require('../../../assets/image/Remedies/vk.png'),
//     title: 'Copper Metal Strip',
//     price: '₹725.00',
//     rating: 3,
//     reviewCount: 2,
//   },
//   {
//     id: '3',
//     source1: require('../../../assets/image/Remedies/dk.png'),
//     title: 'Iron Metal Strip',
//     price: '₹725.00',
//     rating: 3,
//     reviewCount: 2,
//   },
//   {
//     id: '4',
//     source1: require('../../../assets/image/Remedies/dk.png'),
//     title: 'Brass Metal Strip',
//     price: '₹725.00',
//     rating: 3,
//     reviewCount: 2,
//   },
//   {
//     id: '5',
//     source1: require('../../../assets/image/Remedies/dk.png'),
//     title: 'Steel Strip',
//     price: '₹725.00',
//     rating: 3,
//     reviewCount: 2,
//   },
//   {
//     id: '6',
//     source1: require('../../../assets/image/Remedies/vk.png'),
//     title: 'Blue Tap For Vastu',
//     price: '₹725.00',
//     rating: 3,
//     reviewCount: 2,
//   },
// ];
