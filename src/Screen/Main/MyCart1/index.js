import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { fontSize } from '../../../Component/fontsize';
import { colors } from '../../../Component/colors';
import { Rating } from 'react-native-ratings';
import { widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';
const Remedies12SecondComponent = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('RemediesInnerScreenFirst');
  };

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

  ];


  const renderItem2 = ({ item },
  ) => (
    <View >
      <View style={styles.slide}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>

          <Image source={item.source1} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.third, styles.titleText]}>{item.title}</Text>
          <Text style={[styles.third, { marginTop: 10, }]}>{item.price}</Text>

          <View style={styles.direction}>
            <Rating
              type="custom"
              tintColor={colors.ordercolor}
              ratingCount={5}
              imageSize={wp(4)}
              startingValue={item.rating}
              ratingColor="#52B1E9"
              readonly
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
            />
          </View>
          <TouchableOpacity style={styles.buttonstylefirst}>
            <Text style={styles.buttonstyle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );



  const renderItem = ({ item }) => (
    <View style={styles.viewinner}>
      <Image source={item.image} style={styles.image1} />
      <View style={styles.contentContainer}>
        <Text style={styles.textstyle}>{item.title}</Text>
        <View style={styles.ruupebutton}>
          <View style={styles.rupees}>
            <Text style={styles.rupeestext}>{item.price}</Text>
          </View>
          <View style={[styles.headerview, styles.quantitySection]}>
            <TouchableOpacity style={styles.touch}>
              <Text style={[styles.third1, styles.quantityBtns]}>{'-'}</Text>
            </TouchableOpacity>
            <Text style={[styles.third1, { marginLeft: 5, marginTop: 3 }]}>
              1
            </Text>
            <TouchableOpacity style={[styles.touch, { marginLeft: 0 }]}>
              <Text style={[styles.third1, styles.quantityBtns]}>{'+'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.crossIcon} onPress={handleNavigation}>
        <View style={styles.closeButton}>
          <Text style={styles.closeIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../../assets/image/Drawer.png')} />
          </TouchableOpacity>
          <Image
            style={{ marginLeft: 15 }}
            source={require('../../../assets/image/header.png')}
          />
        </View>
        <TouchableOpacity>
          <Image source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.headerview,
          {
            elevation: 3,
            paddingVertical: 10,
            paddingHorizontal: 18,
            backgroundColor: '#fff',
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Cart</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.viewinner1}
          />
   


        <View style={styles.main}>
          <Text style={styles.header1}>You May Also Like</Text>
          <FlatList
            data={data2}
            renderItem={renderItem2}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginBottom:15}}
          />
        </View>


      </ScrollView>
      <View style={styles.subtotalsavingyview}>
        <View style={styles.summaryview}>
          <Text style={styles.subtotaltext1}>Price Summary</Text>
        </View>

        <View style={styles.horizontalLine} />

   

          <View style={[styles.direction1,{marginBottom:-10}]}>
            <Text style={styles.subtotaltext}>SubTotal</Text>
            <View style={styles.rupees}>
              {/* <FontAwesome name="rupee" size={12} color="#324356" /> */}
              <Text style={styles.rupeestext}>₹ 1,855</Text>
            </View>
          </View>

          <View style={styles.direction1}>
            <Text style={[styles.subtotaltext,{paddingBottom:10}]}>Saving :</Text>
            <View style={styles.rupees}>
              {/* <FontAwesome name="rupee" size={12} color="#324356" /> */}
              <Text style={styles.rupeestext}>₹ 0</Text>
            </View>
          </View>
       

        <View style={styles.horizontalLine} />

        <View style={styles.direction1}>
          <Text style={[styles.subtotaltext1,{paddingBottom:5}]}>Grand Total :</Text>
          <View style={styles.rupees}>
            {/* <FontAwesome name="rupee" size={12} color="#324356" /> */}
            <Text style={styles.rupeestext}>₹ 1,855</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() =>  navigation.navigate('AddressList')} style={styles.book}>
          <Text style={styles.btext1}>
            PLACE ORDER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Remedies12SecondComponent;

const data = [
  {
    id: '1',
    title: 'Aluminium Metal Strip Vastu',
    price: '₹ 725.00',
    image: require('../../../assets/image/Remedies/ab.png'),
  },
  {
    id: '2',
    title: 'Aluminium Metal Strip Vastu',
    price: '₹ 725.00',
    image: require('../../../assets/image/Remedies/ab.png'),
  },
  // Add more items as needed
];
