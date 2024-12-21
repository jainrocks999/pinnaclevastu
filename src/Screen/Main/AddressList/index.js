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

const DeliveryAddress = () => {
  const  navigation =useNavigation();
  const isLoading=useSelector(state=>state.address.loading);
  const addresstoget=useSelector(state=>state.address?.getaData?.data);
  console.log('sfjsfslk',addresstoget);
  
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

  const [data, setData] = useState('');

  const toggleDefaultAddress = id => {
    const updatedData = addresstoget?.map(item =>
      item.id === id ? {...item, isDefault: true} : {...item, isDefault: false},
    );
    setData(updatedData);
  };

  const handleEdit = id => {
    Alert.alert('Edit', `Editing address with ID: ${id}`);
  };
  const cartRemove = async item => {
    const token = await AsyncStorage.getItem('Token');
    const userid = await AsyncStorage.getItem('user_id');
console.log('fgfdg',item);

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
      {console.log('dfmlks',item)}
      
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

      <View style={styles.direction1}>
        <View style={styles.radioButtonWrapper}>
          <RadioButton
            value={item.id}
            status={item.is_default==1 ? 'checked' : 'unchecked'}
            onPress={() => toggleDefaultAddress(item.is_default)}
            color={colors.Headertext}
            uncheckedColor={colors.light_gr}
          />
        </View>
        <View style={styles.makeview}>
          <Text style={styles.maketext}>
            {item.isDefault
              ? 'Make this my default address'
              : 'Make this my default address'}
          </Text>
        </View>
      </View>
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
{isLoading?<Loader/>:null}
      <ScrollView contentContainerStyle={styles.scrollview}>
        <FlatList
          data={addresstoget}
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
      <View style={styles.scrollview}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', {data1: 'Remedies'})}
          style={styles.book}>
          <Text style={styles.btext}>CONIFORM PAYMENT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryAddress;
