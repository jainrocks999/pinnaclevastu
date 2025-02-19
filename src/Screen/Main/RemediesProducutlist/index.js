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
import {fetchCollection} from '../../../Redux/Slice/collectionSlice';
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
import {fetchProduct, InitProduct} from '../../../Redux/Slice/productSlice';
import {getProductMetafieldsApiCall} from '../../../Redux/Api';

const RemediesProductList = ({route}) => {
  const name1 = route?.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const RemediesCategor1 = useSelector(state => state.collection?.products);

  const RemediesCategor = useSelector(state => state.home?.RemeiesCat?.data);
  const cartDataList = useSelector(state => state?.cart?.CartData);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const isLoading = useSelector(state => state.home?.loading);
  const focus = useIsFocused();

  const [search, setSearch] = useState('');
  const [ilteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const win = Dimensions.get('window');
const [countdata,setCountdata]=useState(0);
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          // setDisplayedText(placeholderText.slice(0, currentIndex + 1));
          setDisplayedText(prev => placeholderText.slice(0, currentIndex + 1));
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
  }, []);

  useEffect(() => {
    RemediesProductcategory();
  }, []);

  // useEffect(() => {
  //   if (focus) {
  //     setMasterDataSource(RemediesCategor || []);
  //     setFilteredDataSource(RemediesCategor || []);
  //     setSearch('');
  //   }
  // }, [RemediesCategor]);
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
  }, []);

  const RemediesProductcategory = async () => {
  setCountdata(countdata+10);
   
    await dispatch(fetchCollection(name1?.item.id,countdata));
  };
  const PRoductDeta = async (item, id) => {
    dispatch(clearRemeiesDetail1());

    if (Object.keys(item).length == 0) {
    } else {
      dispatch(InitProduct());
      dispatch(fetchProduct(id));
    }
    // getProductMetafieldsApiCall(productId)
    const data = await getProductMetafieldsApiCall(id);
    console.log('datata get by meta feild', id,data);
    navigation.navigate('ProductDetail', {data: item});
  };

  const Addtocard = async item => {
    console.log('jfdnkjsdfksjskjfs',item.variants?.edges?.[0].id);
    
    try {
      if (item?.variants?.length != 0) {
        const image = item.variants?.edges?.[0]?.node?.image?.src;
        let product = {...item};
        product.selectedVarient = item.variants?.edges?.[0];
        let productTemp = {
          ...product,
          image,
          qty: 1,
          productId: product?.id,
          compareAtPrice: item?.variants?.edges?.[0].node?.compareAtPrice,
          price: item?.variants?.edges?.[0].node?.price.amount,
          id: isNaN(product?.selectedVarient?.node?.id)
            ? await product?.selectedVarient?.node?.id
            : product?.selectedVarient?.node?.id,

          properties: {},
        };
        console.log('before add to cart ', productTemp);
        if (productTemp?.availableForSale) {
          console.log('hfghkjghfdkg', product?.selectedVarient.id);

          dispatch(addToCart(productTemp));
        }
      }
      // dispatch(addToCart({...item,selectedVarient: item?.variants?.edges[0]?.node}));
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const renderItem = ({item}) => (
  
    <View style={styles.slide}>
 
      
      <TouchableOpacity onPress={() => PRoductDeta(item, item?.node?.id)}>
        <View style={styles.image}>
          {/* {  console.log('item get the data ',item?.node?.variants?.edges?.[0]?.node?.image?.src)} */}

          <Image
            source={
              item?.node?.variants?.edges?.[0]?.node?.image?.src
                ? {uri: `${item?.node?.variants?.edges?.[0]?.node?.image?.src}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            style={{height: '100%', width: '100%', borderRadius: 0}}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.third, styles.titleText]}>
            {item?.node?.title
              ? item?.node?.title.length > 20
                ? `${item?.node?.title.substring(0, 20)}...`
                : item?.node.title
              : ' '}
          </Text>
          <View style={styles.priceText}>
            <Text style={[styles.third]}>
              {`₹ ${item?.node?.variants?.edges?.[0].node?.price.amount}`}
            </Text>
            {item?.node?.variants?.edges?.[0].node?.compareAtPrice ? (
              <Text
                style={[styles.third, {textDecorationLine: 'line-through'}]}>
                ₹{' '}
                {item?.node?.variants?.edges?.[0].node?.compareAtPrice?.amount}
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
                readonly
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
            ) : null}
          </View>
          
          <TouchableOpacity
            onPress={() =>{
              if(item?.node?.availableForSale==true){
                Addtocard(item?.node)
              }else{
                Toast.show('This product  is currently not available for sale');
              }
            }
          }
              
              
             
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
          <Text style={styles.logoText}>{name1?.item?.title}</Text>
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
            source={require('../../../assets/image/small_bag.png')}
          />
        </TouchableOpacity>
      </View>
      {/* {isLoading ? <Loader /> : null} */}
      <View style={[styles.Scroll,{flexGrow:1}]}>
      {/* <ScrollView 
      
       showsVerticalScrollIndicator={false} 
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.Scroll,{flexGrow:1}]}> */}
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
        {/* <FlatList
          data={RemediesCategor1 ? RemediesCategor1 : []}
          renderItem={renderItem}
          numColumns={2}
          // keyExtractor={item => item.id}
          scrollEnabled={true}
          // nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{}}
          onEndReachedThreshold={0.5}
          onEndReached={()=> console.log('gjnkfgkjdfgkdg',)
          }
        /> */}

<FlatList
    data={RemediesCategor1 || []}
    renderItem={renderItem}
    numColumns={2}
    keyExtractor={(item, index) => index.toString()}
    nestedScrollEnabled={true}
    onEndReachedThreshold={0.5}
    onEndReached={() => RemediesProductcategory()}
     style={{ flex: 1 }} // Ensure full height
  />
  </View>
      {/* </ScrollView> */}
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
// import React, {useEffect, useRef, useState} from 'react';
// import styles from './styles';

// import {Rating} from 'react-native-ratings';
// import {colors} from '../../../Component/colors';
// import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
// import {useDispatch, useSelector} from 'react-redux';
// import Imagepath from '../../../Component/Imagepath';
// import {useIsFocused, useNavigation} from '@react-navigation/native';
// import {
//   clearRemeiesDetail1,
//   productDetail1,
//   RemediesCategory,
// } from '../../../Redux/Slice/HomeSlice';
// import { fetchCollection } from '../../../Redux/Slice/collectionSlice';
// import {
//   addToCart,
//   addToCartApi,
//   getCartDataApi,
//   updateCartApi,
// } from '../../../Redux/Slice/CartSlice';
// import Loader from '../../../Component/Loader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
// import axios from 'axios';
// import constants from '../../../Redux/constant/constants';
// import { fetchProduct, InitProduct } from '../../../Redux/Slice/productSlice';
// import { getProductMetafieldsApiCall } from '../../../Redux/Api';

// const RemediesProductList = ({route}) => {
//   const name1 = route?.params;
 
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [userType, setUserType] = useState('');
//   const RemediesCategor1 = useSelector(state => state.collection?.products);
//   const [countdata,setCountdata]=useState(0);
//   const scrollViewRef = useRef(null);
//   const RemediesCategor = useSelector(state => state.home?.RemeiesCat?.data);
//   const cartDataList = useSelector(state => state?.cart?.CartData);
//   const cartTotalQuantity = useSelector(
//     state => state?.cart?.cartTotalQuantity,
//   );

//   const isLoading = useSelector(state => state.home?.loading);
//   const focus = useIsFocused();

//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);
//   const win = Dimensions.get('window');
 
//   const placeholderText = 'Search';
//   const [displayedText, setDisplayedText] = useState('');

//   useEffect(() => {
//     let currentIndex = 0;

//     const startAnimation = () => {
//       const intervalId = setInterval(() => {
//         if (currentIndex < placeholderText.length) {
//           setDisplayedText(placeholderText.slice(0, currentIndex + 1));
//           currentIndex++;
//         } else {
//           currentIndex = 0;
//           setDisplayedText('');
//         }
//       }, 450);

//       return intervalId;
//     };

//     const intervalId = startAnimation();

//     return () => clearInterval(intervalId);
//   }, [placeholderText]);

// useEffect(()=>{
//   RemediesProductcategory();
// },[])

//   // useEffect(() => {
//   //   if (focus) {
//   //     setMasterDataSource(RemediesCategor || []);
//   //     setFilteredDataSource(RemediesCategor || []);
//   //     setSearch(''); 
//   //   }
//   // }, [RemediesCategor]);
//   const searchFilterFunction = text => {
//     if (text) {
//       const newData = masterDataSource?.filter(function (item) {
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
//       } catch (error) {
//         console.log('Error in fetching user types or cart data:', error);
//       }
//     };

//     getUserType();
   
//   }, []);





//  const handleScroll = async(event) => {
//     const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
//     if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
//     console.log('virendra mishra ',event);
    
//       RemediesProductcategory();
//     }
//   };








//   const RemediesProductcategory = async () => {
//   setCountdata(countdata+10);
   
//     await dispatch(fetchCollection(name1?.item.id,countdata));
//   };
//   const PRoductDeta = async (item,id) => {

//     dispatch(clearRemeiesDetail1());


//     if (Object.keys(item).length == 0) {
//     } else {
//       dispatch(InitProduct());
//       dispatch(fetchProduct(id));
//     }
//     // getProductMetafieldsApiCall(productId)
//   const data = await getProductMetafieldsApiCall(id);
//   console.log('datata get by meta feild',id);
//    navigation.navigate('ProductDetail', {data: item});
//   };

//   const Addtocard = async item => {
//     try {


//   if (item?.variants?.length != 0) {
//       const image = item.variants?.edges?.[0]?.node?.image?.src;
//       let product = {...item};
//       product.selectedVarient = item.variants?.edges?.[0];
//       let productTemp = {
//         ...product,
//         image,
//         qty:1,
//         productId: product?.id,
//         compareAtPrice :item?.variants?.edges?.[0].node?.compareAtPrice,
//         price:item?.variants?.edges?.[0].node?.price.amount,
//         id: isNaN(product?.selectedVarient?.node?.id)
//           ? await product?.selectedVarient?.node?.id
//           : product?.selectedVarient?.node?.id,
       
//         properties: {},
//       };
//       console.log('before add to cart ',productTemp);
//       if (productTemp?.availableForSale) {
//         console.log('hfghkjghfdkg',product?.selectedVarient.id);
        
//           dispatch(addToCart(productTemp));
//       }
//     }

      
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };
//   const renderItem = ({item}) => (

 
    
//     <View style={styles.slide}>
//       <TouchableOpacity onPress={() => PRoductDeta(item,item?.node?.id)}>
//         <View style={styles.image}>
//         {/* {  console.log('item get the data ',item?.node?.variants?.edges?.[0]?.node?.image?.src)} */}
          
//           <Image
//             source={
//               item?.node?.variants?.edges?.[0]?.node?.image?.src
//                 ? {uri: `${item?.node?.variants?.edges?.[0]?.node?.image?.src}`}
//                 : require('../../../assets/image/Remedies/Image-not.png')
//             }
//             style={{height: '100%', width: '100%', borderRadius: 0}}
//           />
//         </View>
//         <View style={styles.textContainer}>
//           <Text style={[styles.third, styles.titleText]}>
//             {item?.node?.title
//               ? item?.node?.title.length > 20
//                 ? `${item?.node?.title.substring(0, 20)}...`
//                 : item?.node.title
//               : ' '}
//           </Text>
//           <View style={styles.priceText}>
//             <Text style={[styles.third]}>
//               {`₹ ${
//                 item?.node?.variants?.edges?.[0].node?.price.amount
//               }`}
//             </Text>
//             {item?.node?.variants?.edges?.[0].node?.compareAtPrice?
            
//               <Text
//                 style={[styles.third, {textDecorationLine: 'line-through'}]}>
//                 ₹ {item?.node?.variants?.edges?.[0].node?.compareAtPrice?.amount}
//               </Text>
// :null}
         
//           </View>

//           <View style={styles.direction}>
//             {item?.rating ? (
//               <Rating
//                 type="custom"
//                 tintColor={colors.ordercolor}
//                 ratingCount={5}
//                 imageSize={item?.rating ? 16 : 20}
//                 startingValue={item?.rating}
//                 ratingColor="#52B1E9"
//                 readonly
//                 ratingBackgroundColor={colors.lightGrey} // Unfilled star color
//               />
//             ) : null}
//           </View>
//           <TouchableOpacity
//             onPress={() => Addtocard(item?.node)}
//             style={styles.buttonstylefirst}>
//             <Text style={styles.buttonstyle}>Add to Cart</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerview}>
//           <TouchableOpacity
//             onPress={
//               () => (name1?.Id ? navigation.goBack() : navigation.goBack())

//               // navigation.reset({
//               //     index: 0,
//               //     routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
//               //   })
//             }
//             hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
//             //
//           >
//             <Image
//               style={styles.backBtn}
//               source={require('../../../assets/drawer/Back1.png')}
//             />
//           </TouchableOpacity>
//           <Text style={styles.logoText}>{name1?.item?.title}</Text>
//         </View>
//         <TouchableOpacity
//           hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
//           onPress={() => {
//             navigation.navigate('Home', {screen: 'MyCart'});
//           }}>
//           {cartTotalQuantity > 0 && (
//             <View style={styles.itemCount}>
//               <Text style={styles.countText}>{cartTotalQuantity}</Text>
//             </View>
//           )}
//           <Image
//             style={styles.bagBtn}
//             source={require('../../../assets/image/Group.png')}
//           />
//         </TouchableOpacity>
//       </View>
//       {/* {isLoading ? <Loader /> : null} */}
//       <ScrollView ref={scrollViewRef}
//               onScroll={handleScroll}
//               scrollEventThrottle={400}
//               contentContainerStyle={[styles.Scroll, {flexGrow: 1}]}>
//         <View style={styles.searchContainer}>
//           <View style={{flexDirection: 'row', alignItems: 'center'}}>
//             <TouchableOpacity
//               hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
//               <Image source={require('../../../assets/image/SearchIcon.png')} />
//             </TouchableOpacity>

//             <TextInput
//               placeholder={displayedText}
//               style={styles.searchInput}
//               placeholderTextColor={colors.searchBarTextColor}
//               value={search}
//               onChangeText={val => searchFilterFunction(val)}
//             />
//           </View>
//           <TouchableOpacity
//             style={styles.filterBtn}
//             hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
//             <Image source={require('../../../assets/image/Vector.png')} />
//           </TouchableOpacity>
//         </View>
//         <FlatList
//           data={RemediesCategor1 ? RemediesCategor1 : []}
//           renderItem={renderItem}
//           numColumns={2}
//           // keyExtractor={item => item.id}
//           scrollEnabled={false}
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