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
import React, {useState} from 'react';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {colors} from '../../../Component/colors';

const DeliveryAddress = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Tejash Shah',
      description:
        'Lorem ipsum is simply dummy text of the printing and typesetting industry. -123456',
      phone: '+91 123456789',
      isDefault: true,
    },
    {
      id: '2',
      title: 'Tejash Shah',
      description:
        'Lorem ipsum is simply dummy text of the printing and typesetting industry. -123456',
      phone: '+91 123456789',
      isDefault: false,
    },
  ]);

  const toggleDefaultAddress = id => {
    const updatedData = data.map(item =>
      item.id === id ? {...item, isDefault: true} : {...item, isDefault: false},
    );
    setData(updatedData);
  };

  const handleEdit = id => {
    Alert.alert('Edit', `Editing address with ID: ${id}`);
  };

  const handleDelete = id => {
    Alert.alert('Delete', `Deleting address with ID: ${id}`);
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardContentWrapper}>
        <View style={styles.textWrapper}>
          <View style={styles.direction}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.editDeleteWrapper}>
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
                <Text style={styles.editDeleteText1}>Edit</Text>
              </TouchableOpacity>
              <View style={styles.viewLine} />
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.editDeleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardPhone}>{item.phone}</Text>
        </View>
      </View>

      <View style={styles.direction1}>
        <View style={styles.radioButtonWrapper}>
          <RadioButton
            value={item.id}
            status={item.isDefault ? 'checked' : 'unchecked'}
            onPress={() => toggleDefaultAddress(item.id)}
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

      <ScrollView contentContainerStyle={styles.scrollview}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() =>  navigation.navigate('Address')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
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
