import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import {colors} from '../../../Component/colors';

import styles from './styles';
import BackIcon from '../../../assets/image/backIcon.svg';
import SearchIcon from '../../../assets/image/searchIcon.svg';
import FilterIcon from '../../../assets/image/filterIcon.svg';
import {
  widthPrecent as wp,
  heightPercent,
} from '../../../Component/ResponsiveScreen/responsive';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  courceorderDetail,
  orderDetail,
  orderlistapi,
  orderlistcource,
} from '../../../Redux/Slice/orderSclice';
import Imagepath from '../../../Component/Imagepath';

const MyOrder = ({route}) => {
  const navigation = useNavigation();

  const product = useSelector(state => state?.order?.orderList1);

  const cource = useSelector(state => state?.order?.orderCource?.data);

  const loading1 = useSelector(state => state?.order?.loading);
  const [selectedTab, setSelectedTab] = useState('Remedies');
  const focus = useIsFocused();
  const dispatch = useDispatch();
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
    setSelectedTab(route?.params?.data);
    if (focus) {
      apicall();
      const backAction = () => {
        navigation.reset({
          index: 0,
          routes: [{name: 'UserProfile'}],
        });
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [navigation]);

  const apicall = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');
      const userData = await AsyncStorage.getItem('user_data');

      if (!token || !userid) {
        console.error('Token or User ID is missing.');
        return;
      }

      // orderlistcource({id: userid, token: token, url: 'fetch-courses-order'}),

      await dispatch(
        orderlistapi({
          id: userid,
          token: token,
          url: 'shopify-customer-order-list',
          accessToken: JSON.parse(userData).shopify_access_token,
        }),
      );
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const OrderDetails1 = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      courceorderDetail({
        id: userid,
        token: token,
        url: 'fetch-courses-order-details',
        orderid: item.id,
        navigation,
      }),
    );
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderNo}>Order No: {item?.node?.orderNumber}</Text>

      <View style={styles.horizontalSeparator} />
      <View style={styles.productContainer}>
        <Image
          source={
            item?.node?.lineItems?.edges[0].node?.variant?.product
              ?.featuredImage?.url
              ? {
                  uri: `${item?.node?.lineItems?.edges[0].node?.variant?.product?.featuredImage?.url}`,
                }
              : require('../../../assets/otherApp/order3.png')
          }
          style={styles.productImage}
        />
        {console.log(item, 'venom')}
        <View style={styles.productDetails}>
          <Text style={styles.productName}>
            {item?.node?.lineItems?.edges[0].node?.variant?.product?.title}
          </Text>
          <Text style={styles.productQuantity}>
            Total Quantity:{' '}
            {item?.node?.lineItems?.edges?.reduce(
              (total, currentItem) =>
                total + (currentItem?.node?.quantity || 0),
              0,
            )}
          </Text>
          <Text style={styles.productName}>
            Total: ₹ {item?.node?.originalTotalPrice.amount}
          </Text>
        </View>
      </View>
      {item?.status?.label ? (
        <Text
          style={[
            styles.statusText,
            {
              color:
                item?.status?.value == 'processing'
                  ? '#4299e1'
                  : item?.status?.value == 'canceled'
                  ? '#d63939'
                  : item?.status?.value == 'completed'
                  ? '#2fb344'
                  : null,
            },
          ]}>
          {item?.status?.label}
        </Text>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OrderDetail', {data: item});
        }}
        style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
  const renderOrderItem1 = ({item}) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderNo}>Order No: {item.code}</Text>

      <View style={styles.horizontalSeparator} />
      <View style={styles.productContainer1}>
        <Image
          source={
            item?.course?.image
              ? {uri: `${Imagepath.Path}${item?.course?.image}`}
              : require('../../../assets/otherApp/order3.png')
          }
          resizeMode="contain"
          style={styles.productImage1}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item?.course_title}</Text>
          {/* <Text style={styles.productQuantity}>
           Total Quantity:{' '}
            {item?.products?.reduce(
              (sum, product) => sum + (product.qty || 0),
              0,
            )}
            {''}
          </Text> */}
          <Text style={styles.productName}>Total: ₹ {item?.amount}</Text>
        </View>
      </View>
      {/* {item?.status ? (
        <Text
          style={[
            styles.statusText,
            {
              color:
                item?.status == 'processing'
                  ? '#4299e1'
                  : item?.status == 'canceled'
                  ? '#d63939'
                  : item?.status == 'completed'
                  ? '#2fb344'
                  : item?.status == 'pending'
                  ? '#f6ad55'
                  : null,
            },
          ]}>
          {item?.status}
        </Text>
      ) : null} */}
      <TouchableOpacity
        onPress={
          () => OrderDetails1(item)
          // navigation.navigate('OrderDetail')
        }
        style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'UserProfile'}],
            })
          }>
          <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
        </TouchableOpacity>

        <Text style={styles.logoText}>My Orders</Text>
      </View>
      {/* {loading1?<Loader/>:null} */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: heightPercent(10)}}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
              <SearchIcon width={wp(5)} height={wp(5)} />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder={displayedText}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
            <FilterIcon width={wp(5)} height={wp(5)} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContainer}>
          {['Remedies', 'Courses', 'Consultation'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === tab && styles.activeTabButtonText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedTab == 'Remedies' ? (
          <FlatList
            data={product ? [...product].reverse() : []}
            keyExtractor={(item, index) => index}
            scrollEnabled={false}
            renderItem={renderOrderItem}
            contentContainerStyle={styles.ordersList}
          />
        ) : selectedTab == 'Courses' ? (
          <FlatList
            data={cource}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={renderOrderItem1}
            contentContainerStyle={styles.ordersList}
          />
        ) : (
          <Text>Consultation</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default MyOrder;
