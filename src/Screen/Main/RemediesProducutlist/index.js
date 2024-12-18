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
import { useDispatch, useSelector } from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import { useNavigation } from '@react-navigation/native';
import {  productDetail1 } from '../../../Redux/Slice/HomeSlice';
import Loader from '../../../Component/Loader';
const RemediesProductList = ({route}) => {
  const  name1  = route?.params?.name1; 
 
  console.log('lnkslks',route.params.id);
  
  
  const navigation =useNavigation();
  const dispatch =useDispatch();
  const RemediesCategory = useSelector(state => state.home?.RemeiesCat?.data);
  const isLoading = useSelector(state => state.home?.loading);
  const PRoductDeta =async(item)=>{
   
    
     await dispatch(productDetail1({url:'fetch-single-product',product_id:item.id,navigation}))
    //  navigation.navigate("ProductDetail")
  }
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <TouchableOpacity onPress={() =>PRoductDeta(item)}>
        <View style={styles.image}>
        <Image source={
    item?.image 
      ? { uri: `${Imagepath.Path}${item.image}` } :
      require("../../../assets/image/Remedies/ab.png")}
     
   style={{height:'100%',width:'100%',borderRadius:10}} />
  </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={[styles.third, styles.titleText]}>{item.name}</Text>
        <Text style={[styles.third, styles.priceText]}>{`₹ ${item.price}`}</Text>

        <View style={styles.direction}>
          <Rating
            type="custom"
            tintColor={colors.ordercolor}
            ratingCount={5}
            imageSize={wp(4)}
            startingValue={5}
            ratingColor="#52B1E9"
            ratingBackgroundColor={colors.lightGrey} // Unfilled star color
          />
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate("ProductDetail")} style={styles.buttonstylefirst}>
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
            onPress={() =>
              route.params.id?navigation.goBack():
              navigation.reset({
                  index: 0,
                  routes: [{name: 'Home1', params: {screen: 'Remedie12'}}],
                })}
            
            // 
            >
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>{name1}</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      {isLoading?<Loader/>:null}
      <ScrollView contentContainerStyle={styles.Scroll}
      scrollEnabled={false}
      >
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
          data={RemediesCategory}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={item => item.id}
          nestedScrollEnabled={true} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{  }}
        />

      </ScrollView>
  
    </View>
  );
};

export default RemediesProductList;

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
