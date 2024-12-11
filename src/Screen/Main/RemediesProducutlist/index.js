import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import styles from './styles';

import { Rating } from 'react-native-ratings';
import { colors } from '../../../Component/colors';
import { widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';
const Remedies = ({ navigation }) => {
  // const updateRating = (id, newRating) => {
  //     const updatedItems = data2.map(item =>
  //       item.id === id ? { ...item, rating: newRating } : item
  //     );

  //   };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
        <Image source={item.source1} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.third, styles.titleText]}>{item.title}</Text>
        <Text style={[styles.third, styles.priceText]}>{item.price}</Text>

        <View style={styles.direction}>
          <Rating
            type="custom"
            tintColor={colors.ordercolor}
            ratingCount={5}
            imageSize={wp(4)}
            startingValue={item.rating}
            ratingColor="#52B1E9"
            ratingBackgroundColor={colors.lightGrey} // Unfilled star color
          />
        </View>
        <TouchableOpacity style={styles.buttonstylefirst}>
          <Text style={styles.buttonstyle}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Strips</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.Scroll}>
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
        <FlatList
          data={data2}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
        />

      </ScrollView>
  
    </View>
  );
};

export default Remedies;

const data2 = [
  {
    id: '1',
    source1: require('../../../assets/image/Remedies/ab.png'),
    title: 'Aluminium Metal Strip Vastu',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '2',
    source1: require('../../../assets/image/Remedies/vk.png'),
    title: 'Copper Metal Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '3',
    source1: require('../../../assets/image/Remedies/dk.png'),
    title: 'Iron Metal Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '4',
    source1: require('../../../assets/image/Remedies/dk.png'),
    title: 'Brass Metal Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '5',
    source1: require('../../../assets/image/Remedies/dk.png'),
    title: 'Steel Strip',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
  {
    id: '6',
    source1: require('../../../assets/image/Remedies/vk.png'),
    title: 'Blue Tap For Vastu',
    price: '₹725.00',
    rating: 3,
    reviewCount: 2,
  },
];
