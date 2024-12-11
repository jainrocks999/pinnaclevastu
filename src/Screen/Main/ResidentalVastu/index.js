import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import { colors } from '../../../Component/colors';
import BannerSlider from '../../../Component/Banner';

import { Rating } from 'react-native-ratings';
import { widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';
const ResidentalScreen = ({ navigation }) => {
  const renderItem3 = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
        style={[styles.cardContainer2]}>
        <View
          style={{
            flexDirection: 'row',
            // gap: 15,
            alignItems: 'flex-start',
          }}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.cardImage}
              source={item.image} />

            <View style={styles.direction}>
              <Rating
                type="custom"
                tintColor={colors.white}
                ratingCount={5}
                imageSize={wp(3.8)}
                startingValue={2}
                ratingColor="#52B1E9"
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.third1}>{item.name}</Text>

            <Text style={[styles.third2,{marginBottom:2}]}>Services : {item.services}</Text>
            <Text style={styles.third2}>{item.languages}</Text>
            <Text style={styles.third2}>Exp: {item.experience}</Text>
            <Text style={styles.priceText}>Price: {item.price}</Text>
          </View>
          <Image
            style={styles.nextBtn}
            source={require('../../../assets/drawer/raero.png')}
          />
        </View>
      </TouchableOpacity>
  
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Residential Vastu Experts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.servicesContainer}>
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

        <View style={styles.main}>
          <Image
            style={styles.arrowIcon}
            source={require('../../../assets/drawer/aero.png')}
          />
          <Text style={styles.title}>Which direction boosts success?</Text>
          <Image
            style={styles.arrowIcon}
            source={require('../../../assets/drawer/raero.png')}
          />
        </View>
        <FlatList
          data={DATA}
          renderItem={renderItem3}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
     
    </View>
  );
};

export default ResidentalScreen;

const DATA = [
  {
    id: '1',
    name: 'Shreni Rajbhandary',
    services: 'Residential Vastu, Industrial Vastu, Gemstone',
    languages: 'Marathi, Hindi, English',
    experience: '6 Years',
    price: '₹ 500 to ₹ 25000',
    image: require('../../../assets/image/Rectangle.png'), // Replace with your image path
  },
  {
    id: '2',
    name: 'Deepika',
    services: 'Commercial Vastu, Numerology, Rudraksha',
    languages: 'Marathi, Hindi, English',
    experience: '5 Years',
    price: '₹ 600 to ₹ 20000',
    image: require('../../../assets/image/Im.png'),
  },
  {
    id: '2',
    name: 'Payal Gupta',
    services: 'Commercial Vastu, Numerology, Rudraksha',
    languages: 'Marathi, Hindi, English',
    experience: '5 Years',
    price: '₹ 600 to ₹ 20000',
    image: require('../../../assets/image/Imag.png'),
  },
  {
    id: '1',
    name: 'Shreni Rajbhandary',
    services: 'Residential Vastu, Industrial Vastu, Gemstone',
    languages: 'Marathi, Hindi, English',
    experience: '6 Years',
    price: '₹ 500 to ₹ 25000',
    image: require('../../../assets/image/Rectangle.png'), // Replace with your image path
  },
  {
    id: '2',
    name: 'Deepika',
    services: 'Commercial Vastu, Numerology, Rudraksha',
    languages: 'Marathi, Hindi, English',
    experience: '5 Years',
    price: '₹ 600 to ₹ 20000',
    image: require('../../../assets/image/Im.png'),
  },
  {
    id: '2',
    name: 'Payal Gupta',
    services: 'Commercial Vastu, Numerology, Rudraksha',
    languages: 'Marathi, Hindi, English',
    experience: '5 Years',
    price: '₹ 600 to ₹ 20000',
    image: require('../../../assets/image/Imag.png'),
  },
];
