import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {colors} from '../../../Component/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAddress, RemoveAddress } from '../../../Redux/Slice/Addresslice';
import Loader from '../../../Component/Loader';

const DeliveryAddress = ({route}) => {
  const item=route?.params
  const  navigation =useNavigation();
  const isLoading=useSelector(state=>state.address.loading);
  const addresstoget=useSelector(state=>state.address?.getaData?.data);
  console.log('fkglkf',addresstoget);
  
  const [addresstoget1, setAddresstoget] = useState(addresstoget); // Address list
  const [defaultAddress, setDefaultAddress] = useState(null); 
   const dispatch = useDispatch()
   const focus=useIsFocused();
 useEffect(()=>{
 if(focus){
   AddressList();
 }
  
 },[focus])
 const AddressList = async()=>{
 
 const token = await AsyncStorage.getItem('Token');
 const userid = await AsyncStorage.getItem('user_id');
 await  dispatch(getAddress({  
   user_id: userid,
   
   token: token,
  
   url:'fetch-customer-address',
   // navigation,
 }));
 }


 useEffect(() => {
  // Set initial default address
  const defaultItem = addresstoget1?.find((item) => item?.is_default === 1);
  setDefaultAddress(defaultItem);
}, [addresstoget1]);

const toggleDefaultAddress = (item) => {
 
  const updatedAddresses = addresstoget1.map((addr) =>
    addr.id === item.id
      ? { ...addr, is_default: 1 }
      : { ...addr, is_default: 0 }
  );
  setAddresstoget(updatedAddresses);
  setDefaultAddress(item);
  console.log('Default address saved locally:', item);
};

 
  const cartRemove = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');


    await dispatch(
      RemoveAddress({
        user_id: userid,
        customer_address_id:item,
        token: token,
        url: 'delete-customer-address',
        navigation,
      }),
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
     
      
      <View style={styles.cardContentWrapper}>
        <View style={styles.textWrapper}>
          <View style={styles.direction}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.editDeleteWrapper}>
              <TouchableOpacity onPress={() =>
                
                navigation.navigate('Address', {data: false, item:item})}>
                <Text style={styles.editDeleteText1}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.viewLine} />
              <TouchableOpacity onPress={() =>cartRemove(item.id)}>
                <Text style={styles.editDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardDescription}>{item?.address} {item.apartment}  {item?.city} ({item?.zip_code})</Text>
          <Text style={styles.cardPhone}>{item.phone}</Text>
        </View>
      </View>
    {  addresstoget1?.length==1?null:(
      <View style={styles.direction1}>
        <View style={styles.radioButtonWrapper}>
          <RadioButton
            value={item.id}
            status={item.is_default==1 ? 'checked' : 'unchecked'}
            onPress={() => toggleDefaultAddress(item)}
            color={colors.Headertext}
            uncheckedColor={colors.light_gr}
          />
        </View>
        <View style={styles.makeview}>
          <Text style={styles.maketext}>{'Make this my default address'}</Text>
        </View>
      </View>
    )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Select Delivery Address</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollview}>
      {isLoading?<Loader/>:null}
        <FlatList
          data={addresstoget1==null? addresstoget:addresstoget1}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
 


       
      </ScrollView>
      <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            navigation.navigate('Address', {data: true, item: {}})}
          // navigation.navigate('Address')}
          >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      <View style={styles.scrollview1}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', {data1: 'Remedies',data: item, adress: defaultAddress})}
          style={styles.book}>
          <Text style={styles.btext}>CONIFORM PAYMENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryAddress;
