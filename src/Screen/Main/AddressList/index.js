import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {colors} from '../../../Component/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  RemoveAddress,
  removeShopifyUserAddress,
} from '../../../Redux/Slice/Addresslice';
import Loader from '../../../Component/Loader';
import {checkout} from '../../../models/Checkout';

const DeliveryAddress = ({route}) => {
  const item = route?.params;
  const navigation = useNavigation();

  const {userDetails, isLoading} = useSelector(state => state.Login);
  console.log('dsfjksdhfjskfhsjkf', userDetails);

  const addresstoget = useSelector(state => state.address?.getaData);
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const [selectedId, setSelectedId] = useState('');
  const [addresstoget1, setAddresstoget] = useState(addresstoget); // Address list
  const [defaultAddress1, setDefaultAddress1] = useState('');
  const [sortedAddresses, setSortedAddresses] = useState([]);
  const dispatch = useDispatch();
  const focus = useIsFocused();

  useEffect(() => {
    const defaultItem = userDetails?.defaultAddress;

    if (defaultItem) {
      setDefaultAddress1(defaultItem);
      setSelectedId(defaultItem.id);
    }

    // const sortedData = [...userDetails?.addresses?.edges]?.sort((a, b) => b.id - a.id);
    const sortAddresses = (addresses, defaultItem) => {
      if (!addresses || !defaultItem) return []; // If data is not available, return empty array

      return [
        ...addresses.filter(item => item?.node?.id === defaultItem.id), // Default address at the top
        ...addresses.filter(item => item?.node?.id !== defaultItem.id), // Remaining addresses
      ];
    };

    // Usage
    const sortedData = sortAddresses(
      userDetails?.addresses?.edges || [],
      defaultItem,
    ); // Pass array and default item
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

      // navigation.navigate('Payment', {
      //   data1: 'Remedies',
      //   data: item,
      //   adress: defaultAddress1,
      // });
    });
  };

  const cartRemove = async item => {
    const token = '615c78ef801b0e22521f80174b4dae2d';

    dispatch(removeShopifyUserAddress(token, item?.node?.id));

    // const token = await AsyncStorage.getItem('Token');
    // const userid = await AsyncStorage.getItem('user_id');

    // await dispatch(
    //   RemoveAddress({
    //     user_id: userid,
    //     customer_address_id:item,
    //     token: token,
    //     url: 'delete-customer-address',
    //     navigation,
    //   }),
    // );
  };

  const renderItem = ({item}) => (
    // { borderColor:selectedId == item?.id?colors?.orange: '#DFE7EF',  }
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
            {/* {item?.address} {item.apartment}  {item?.city} ({item?.zip_code}) */}
          </Text>
          <Text style={styles.cardPhone}>{`Mobile :${
            item?.node?.phone ?? ''
          }`}</Text>
        </View>
      </View>

      {/* <View style={styles.direction1}>
        <View style={styles.radioButtonWrapper}>
          <RadioButton
            value={item.id}
            status={selectedId==item?.is_default ? 'checked' : 'unchecked'}
            onPress={() => toggleDefaultAddress(item)}
            color={colors.Headertext}
            uncheckedColor={colors.light_gr}
          />
        </View>
        <View style={styles.makeview}>
          <Text style={styles.maketext}>{'Make this my default address'}</Text>
        </View>
      </View> */}
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
          />
        ) : (
          <View style={{}}>
            <Text>No Address Found</Text>
          </View>
        )}
      </ScrollView>
      {/* <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            navigation.navigate('Address', {data: true, item: {}})}
          // navigation.navigate('Address')}
          >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity> */}
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
