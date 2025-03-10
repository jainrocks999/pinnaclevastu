import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {Rating} from 'react-native-ratings';
import {colors} from '../../../Component/colors';
import BackIcon from '../../../assets/image/backIcon.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import SearchIcon from '../../../assets/image/searchIcon.svg';
import FilterIcon from '../../../assets/image/filterIcon.svg';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {fetchCollection} from '../../../Redux/Slice/collectionSlice';
import {addToCart} from '../../../Redux/Slice/CartSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const RemediesProductList = ({route}) => {
  const name1 = route?.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('');
  const RemediesCategor1 = useSelector(state => state.collection?.products);

  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [countdata, setCountdata] = useState(0);
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
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
    setCountdata(countdata + 10);

    await dispatch(fetchCollection(name1?.item.id, countdata));
  };

  const Addtocard = async item => {
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

        if (productTemp?.availableForSale) {
          dispatch(addToCart(productTemp));
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {itemId: item?.node?.id})
        }>
        <View style={styles.image}>
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
              ? item?.node?.title.length > 30
                ? `${item?.node?.title.substring(0, 30)}...`
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
            {item?.node?.review != null ? (
              <Rating
                type="custom"
                tintColor={colors.ordercolor}
                ratingCount={item?.node?.review?.scale_max}
                imageSize={item?.node?.review?.value ? 16 : 16}
                startingValue={item?.node?.review?.value}
                ratingColor="#52B1E9"
                readonly
                ratingBackgroundColor={colors.lightGrey}
              />
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => {
              if (item?.node?.availableForSale == true) {
                Addtocard(item?.node);
              } else {
                Toast.show('This product  is currently not available for sale');
              }
            }}
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
            onPress={() =>
              name1?.Id ? navigation.goBack() : navigation.goBack()
            }
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
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
          <BagIcon width={wp(5)} height={wp(5)} />
        </TouchableOpacity>
      </View>
      <View style={[styles.Scroll, {flexGrow: 1}]}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
              <SearchIcon width={wp(5)} height={wp(5)} />
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
            <FilterIcon width={wp(5)} height={wp(5)} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={RemediesCategor1 || []}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled={true}
          onEndReachedThreshold={0.5}
          onEndReached={() => RemediesProductcategory()}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
};

export default RemediesProductList;
