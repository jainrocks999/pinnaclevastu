import {

  Text,
  View,
  FlatList,
  TouchableOpacity,

  ScrollView,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  removeShopifyUserAddress,
} from '../../../Redux/Slice/Addresslice';
import Loader from '../../../Component/Loader';
import {checkout} from '../../../models/Checkout';

const DeliveryAddress = ({route}) => {
  const item = route?.params;
  const navigation = useNavigation();

  const {userDetails, isLoading} = useSelector(state => state.Login);
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const [selectedId, setSelectedId] = useState('');

  const [sortedAddresses, setSortedAddresses] = useState([]);
  const dispatch = useDispatch();
 

  useEffect(() => {
    const defaultItem = userDetails?.defaultAddress;

    if (defaultItem) {
      setSelectedId(defaultItem.id);
    }

    const sortAddresses = (addresses, defaultItem) => {
      if (!addresses || !defaultItem) return [];

      return [
        ...addresses.filter(item => item?.node?.id === defaultItem.id), 
        ...addresses.filter(item => item?.node?.id !== defaultItem.id),
      ];
    };


    const sortedData = sortAddresses(
      userDetails?.addresses?.edges || [],
      defaultItem,
    ); 
    setSortedAddresses(sortedData);
  }, [userDetails?.defaultAddress]);

  const toggleDefaultAddress = async item => {
    setDefaultAddress1(item);
    setSelectedId(item?.id);
  };

  const handleConformPayment = () => {
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
     
    
        
        
        checkout(item?.item, navigation);
    ;
    });
  };

  const cartRemove = async item => {
    const userStatus = await AsyncStorage.getItem('user_data');
    const userData = JSON.parse(userStatus)
    dispatch(removeShopifyUserAddress(userData?.shopify_access_token, item?.node?.id));

    
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => toggleDefaultAddress(item.node)}
      style={[
        styles.card,
        {
          borderColor:
            selectedId == item?.node?.id ? colors?.orange : '#DFE7EF',
        },
      ]}>
      <View style={styles.cardContentWrapper}>
        <View style={styles.textWrapper}>
          <View style={styles.direction}>
            <Text style={styles.cardTitle}>
              {item.node?.firstName} {item.node?.lastName}
            </Text>
            <View style={styles.editDeleteWrapper}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Address', {
                    data: false,
                    item: item?.node,
                  })
                }>
                <Text style={styles.editDeleteText1}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.viewLine} />
              <TouchableOpacity onPress={() => cartRemove(item)}>
                <Text style={styles.editDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardDescription}>
            {' '}
            {(item.node.address1 ? item.node.address1 : '') +
              (item.node.address2 ? ' ' + item.node.address2 : '')}{' '}
            {item?.node?.city ?? ''} {item?.node?.zip ?? ''}
          </Text>
          <Text style={styles.cardPhone}>{`Mobile :${
            item?.node?.phone ?? ''
          }`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {isLoading ? <Loader /> : null}
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Select Delivery Address</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollview}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 3,
            marginBottom: 15,
            marginHorizontal:15
          }}>
          <Text style={styles.cardTitle}>{'Saved Address'}</Text>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() =>
              navigation.navigate('Address', {data: true, item: {}})
            }>
            <Text style={[styles.cardTitle, {color: colors.orange}]}>
              <Text style={styles.fabText}>+</Text>
              {'Add New Address'}
            </Text>
          </TouchableOpacity>
        </View>
        {sortedAddresses != 0 ? (
          <FlatList
            data={sortedAddresses}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={item => item?.node.id}
            contentContainerStyle={{paddingVertical:20}}
          />
        ) : (
          <View style={{}}>
            <Text>No Address Found</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.scrollview1}>
        <Animated.View
          style={[
            {
              transform: [{scale: buttonAnimatedValue}],
            },
            {marginTop: 15},
          ]}>
          <TouchableOpacity onPress={handleConformPayment} style={styles.book}>
            <Text style={styles.btext}>CONFORM PAYMENT</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

export default DeliveryAddress;
