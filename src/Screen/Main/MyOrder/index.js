import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { colors } from '../../../Component/colors';
import { fontSize } from '../../../Component/fontsize';

import styles from './styles';
import { heightPercent } from '../../../Component/ResponsiveScreen/responsive';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { orderlistapi } from '../../../Redux/Slice/orderSclice';

const { width } = Dimensions.get('window');

const MyOrder = () => {
const navigation =useNavigation();



const product = useSelector(state => state?.order?.orderList1?.data);
const loading1 = useSelector(state => state?.order?.loading);
console.log('jkfdkjhfdj',product?.data);

const focus = useIsFocused();
const dispatch = useDispatch();

useEffect(() => {
  if (focus) {
    apicall();
  }
}, [focus]);

const apicall = async () => {
  try {
    // Retrieve token and user_id from AsyncStorage
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');

    if (!token || !userid) {
      console.error('Token or User ID is missing.');
      return;
    }

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





  const [selectedTab, setSelectedTab] = useState('Remedies');

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

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderNo}>Order No: {item.code}</Text>

      <View style={styles.horizontalSeparator} />
      <View style={styles.productContainer}>
        <Image source={
          
          require('../../../assets/otherApp/order3.png')}
        
        style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.productName}</Text>
          <Text style={styles.productQuantity}>Quantity: {item?.qty}</Text>
          <Text style={styles.productName}>Total: ₹ {item?.amount}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetail')}
        style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'UserProfile'}],
            // })}
           navigation.goBack()}
          >
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <Text style={styles.logoText}>My Orders</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1,paddingBottom:heightPercent(10)}}>
        <View style={styles.searchContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

        <FlatList
          data={product?.data}
          keyExtractor={item => item.id}
          renderItem={renderOrderItem}
          contentContainerStyle={styles.ordersList}
        />
      </ScrollView>
  
    </View>
  );
};

export default MyOrder;


