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
import {fontSize} from '../../../Component/fontsize';

import styles from './styles';
import {heightPercent} from '../../../Component/ResponsiveScreen/responsive';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {courceorderDetail, orderDetail, orderlistapi, orderlistcource} from '../../../Redux/Slice/orderSclice';
import Imagepath from '../../../Component/Imagepath';
import Loader from '../../../Component/Loader';

const {width} = Dimensions.get('window');

const MyOrder = ({route}) => {
  const navigation = useNavigation();


  const product = useSelector(state => state?.order?.orderList1?.data);
  
  const cource =useSelector(state => state?.order?.orderCource?.data);

  const loading1 = useSelector(state => state?.order?.loading); 
  const [selectedTab, setSelectedTab] = useState('Remedies');
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const placeholderText = "Search"; 
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
    setSelectedTab(route?.params?.data);
    if (focus) {
      apicall()
      const backAction = () => {
        navigation.reset({
          index: 0,
          routes: [{name: 'UserProfile'}],
        })
        return true; 
      };
      
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
      return () => backHandler.remove(); 
    }
  }, [navigation]);

  const apicall = async () => {
  
    try {

      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');

      if (!token || !userid) {
        console.error('Token or User ID is missing.');
        return;
      }
       await dispatch(
        orderlistcource({id: userid, token: token, url: 'fetch-courses-order'}),
      );
      await dispatch(
        orderlistapi({id: userid, token: token, url: 'fetch-order'}),
      );
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };


  const OrderDetails = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
    await dispatch(
      orderDetail({
        id: userid,
        token: token,
        url: 'fetch-order-details',
        orderid: item.id,
        code: item?.code,
        navigation,
      }),
    );
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

 


  const orders = [
    {
      id: '1',
      orderNo: 'IN324576',
      productImage: require('../../../assets/otherApp/order1.png'), // Replace with your actual image path
      productName: 'Aluminium Metal Strip Vastu',
      quantity: 2,
      price: 'Total: ₹ 1450.00',
    },
    {
      id: '2',
      orderNo: 'IN324576',
      productImage: require('../../../assets/otherApp/order2.png'), // Replace with your actual image path
      productName: '6 Mukhi Rudraksha',
      quantity: 1,
      price: 'Total: ₹ 1130.00',
    },
    {
      id: '3',
      orderNo: 'IN102354',
      productImage: require('../../../assets/otherApp/order3.png'), // Replace with your actual image path
      productName: 'Vastu 7 Chakras Bracelet',
      quantity: 1,
      price: 'Total: ₹ 905.00',
    },
  ];

  const renderOrderItem = ({item}) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderNo}>Order No: {item.code}</Text>

      <View style={styles.horizontalSeparator} />
      <View style={styles.productContainer}>
        <Image
          source={
            item?.products?.[0]?.product_image
              ? {uri: `${Imagepath.Path}${item?.products?.[0]?.product_image}`}
              : require('../../../assets/otherApp/order3.png')
          }
          style={styles.productImage}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>
            {item?.products?.[0]?.product_name}
          </Text>
          <Text style={styles.productQuantity}>
            Total Quantity:{' '}
            {item?.products?.reduce(
              (sum, product) => sum + (product.qty || 0),
              0,
            )}
          </Text>
          <Text style={styles.productName}>Total: ₹ {item?.amount}</Text>
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
        onPress={
          () => OrderDetails(item)
          // navigation.navigate('OrderDetail')
        }
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
          resizeMode='contain'
          style={styles.productImage1}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>
            {item?.course_title}
          </Text>
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
      {item?.status? (
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
                  :item?.status == 'pending'?'#f6ad55':null ,
            },
          ]}>
          {item?.status}
        </Text>
      ) : null}
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
          hitSlop={{bottom:10,top:10,left:10,right:10}}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'UserProfile'}],
            })
          }
          //  navigation.goBack()}
        >
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <Text style={styles.logoText}>My Orders</Text>
      </View>
      {/* {loading1?<Loader/>:null} */}
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: heightPercent(10)}}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity   hitSlop={{bottom:10,top:10,left:10,right:10}}>
                          <Image source={require('../../../assets/image/SearchIcon.png')} />
          </TouchableOpacity>
          <TextInput
                    style={styles.searchInput}
                    placeholder={displayedText} 
                    placeholderTextColor={colors.searchBarTextColor}
                  />
          </View>
          <TouchableOpacity style={styles.filterBtn}   hitSlop={{bottom:10,top:10,left:10,right:10}}>
            <Image source={require('../../../assets/image/Vector.png')} />
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
       {selectedTab=='Remedies'?
       ( <FlatList
          data={product}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.ordersList}
        />):
        
        selectedTab=='Courses'?

        (
          
          <FlatList
          data={cource}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          renderItem={renderOrderItem1}
          contentContainerStyle={styles.ordersList}
        />
      
      ):(<Text>Consultation</Text>)
        
        }
      </ScrollView>
      {/* {console.log(product, 'sandeep...')} */}
    </View>
  );
};

export default MyOrder;
