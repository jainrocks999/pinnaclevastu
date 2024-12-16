import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import BannerSlider from '../../../Component/Banner';
import {fontSize} from '../../../Component/fontsize';
import Collapsible from 'react-native-collapsible';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {Checkbox} from 'react-native-paper';
import {useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
const RemediesProductDetail = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const [checked, setChecked] = useState(true);
  const Detail = useSelector(state => state.home?.RemeiesDetail?.data);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageChange = index => {
    setCurrentIndex(index);
  };

  const renderItem4 = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.cardContainer]}>
          <Image source={item.image} style={styles.sevicesImg} />
          <Text style={styles.text}>{item.name}</Text>
          <Text style={[styles.text, {fontSize: fontSize.Ten}]}>
            {item.title}
          </Text>
        </TouchableOpacity>
        {item.id !== '3' ? <View style={styles.viewLine} /> : null}
      </View>
    );
  };
  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
        style={[styles.cardContainer1]}>
        <View style={styles.reviewCard}>
          <View style={{paddingLeft: 5}}>
            <Image style={styles.reviewImage} source={item.image} />

            <Rating
              type="custom"
              tintColor={colors.white}
              ratingCount={5}
              imageSize={wp(3.5)}
              startingValue={item.rating}
              ratingColor="#52B1E9"
              ratingBackgroundColor={colors.lightGrey} // Unfilled star color
            />
          </View>
          <View style={[styles.card, {paddingLeft: 10}]}>
            <Text style={styles.reviewText}>{item.name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>{item.msg}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const [selectedItems, setSelectedItems] = useState(products?.map(() => true));

  const toggleSelection = index => {
    const updatedSelection = [...selectedItems];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedItems(updatedSelection);
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
  };
  const getTotalPrice = () => {
    return products.reduce((total, product, index) => {
      return selectedItems[index] ? total + product.price : total;
    }, 0);
  };

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={[styles.productName, {}]}>{item.name}</Text>
        <Text style={[styles.productName]}>₹ {item.price}.00</Text>
        <View
          style={[styles.checkboxWrapper, checked && styles.checkedBackground]}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color="#FFF"
            uncheckedColor="#DFE7EF"
          />
        </View>
      </View>
      {index !== 2 ? <Text style={styles.plusBtn}>+</Text> : null}
    </View>
  );

  const renderItem2 = ({item}) => (
    <View>
      <View style={styles.slide}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
          <Image source={item.source1} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.thirdCard, styles.titleText]}>{item.title}</Text>
          <Text style={[styles.thirdCard, {marginTop: 10}]}>{item.price}</Text>

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
    </View>
  );

  const renderSubItems = ({item}) => (
    <View style={styles.singleSubItem}>
      <Text style={styles.subItemTitle}>{item.title}</Text>
      <Text style={styles.subItemSubtitle}>{item.subtitle}</Text>
    </View>
  );

  const renderItems = ({item}) => (
    <View style={styles.paddings}>
      <TouchableOpacity
        onPress={() => toggleSection(item.id)}
        style={[
          styles.courseToggle1,
          expandedSection === item.id && styles.activeCourseToggle,
        ]}>
        <View style={styles.direction1}>
          {/* <Text
            style={[
              styles.coursetext1,
              expandedSection === item.id && styles.activeTitleColor1,
            ]}>
            {item.title0}
          </Text> */}
          <Text
            style={[
              styles.coursetext2,
              expandedSection === item.id && styles.activeTitleColor,
            ]}>
            {item.title}
          </Text>
        </View>
        <Image
          source={
            expandedSection === item.id
              ? require('../../../assets/otherApp/updown.png')
              : require('../../../assets/image/arrow_icon.png')
          }
          style={styles.toggleIcon2}
        />
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== item.id}>
        <View style={styles.subItemContainer}>
          <FlatList
            data={item.subItems}
            keyExtractor={(subItem, index) => index.toString()}
            renderItem={renderSubItems}
          />
        </View>
      </Collapsible>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Product Detail</Text>
        </View>
        <TouchableOpacity>
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.welcomeCard}>
          <BannerSlider
            onPress={item => {}}
            data={data7}
            local={true}
            height1={wp(60)}
          />
        </View>

        <View style={styles.contain}>
          {/* Aluminium Metal Strip Vastu */}
          <Text style={styles.service}>
            {' '}
            {Array.isArray(Detail) && Detail[0]?.name ? Detail[0]?.name : ''}
          </Text>
        </View>
        <View style={styles.main}>
          <View style={styles.headerview}>
            <View style={{marginTop: -5}}>
              <Rating
                type="custom"
                tintColor={colors.white}
                ratingCount={5}
                imageSize={wp(4)}
                startingValue={2}
                ratingColor="#52B1E9"
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
            </View>
            <Text
              style={[
                styles.third1,
                {
                  fontSize: fontSize.Twelve,
                  color: colors.heading,
                  marginLeft: 8,
                },
              ]}>
              {'('}
            </Text>
            <Text
              style={[
                styles.third1,
                {fontSize: fontSize.Twelve, color: '#27C571'},
              ]}>
              {'22'}
            </Text>

            <Text
              style={[
                styles.third1,
                {fontSize: fontSize.Twelve, color: colors.heading},
              ]}>
              {')'}
            </Text>
            <Text
              style={[
                styles.third1,
                {fontSize: fontSize.Fourteen, color: colors.light_gr},
              ]}>
              {' reviews'}
            </Text>
          </View>
          <View style={styles.dividerView} />
          <Text
            style={[
              styles.third1,
              {
                fontSize: fontSize.Twelve,
                color: colors.light_gr,
                textDecorationLine: 'underline',
              },
            ]}>
            {'write a review'}
          </Text>
          <Image
            style={styles.shareIcon}
            source={require('../../../assets/otherApp/share.png')}
          />
        </View>
        <View>
          <View style={{paddingHorizontal: 10}}>
            {Detail?.[0]?.description ? (
              <RenderHTML
                contentWidth={width}
                source={{
                  html: isExpanded
                    ? Detail[0]?.description 
                    : Detail[0]?.description.replace(/<[^>]*>/g, '').slice(0, 80) + '...' 
                }}
              />
            ) : (
              <Text style={styles.cont}> No content available</Text>
            )}

            <TouchableOpacity onPress={toggleExpand}>
              <Text
                style={{
                  color: 'blue',
                  textDecorationLine: 'underline',
                  marginTop: 10,
                  // textAlign: 'center',
                }}>
                {isExpanded ? 'View Less' : 'View More'}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <Text style={styles.cont}> 
          
            {
              'Iron strip for vastu, spacial metel strips for vastu, 10 pieces metel strips for vastu, 100 metel vastu strips, 8 feet metel strip vastu, aluminium metel strips direction south west, artificial strip for vastudosh, mahavastu aluminium strip, steel strip remedy vastu'
            }
          </Text> */}
          <Text style={[styles.third1, {marginTop: 15, marginHorizontal: 15}]}>
            {`₹ ${Detail[0]?.price}`}
          </Text>
          <View
            style={[styles.headerview, {marginTop: 15, marginHorizontal: 15}]}>
            <Text style={[styles.third2, {color: colors.heading}]}>
              Quantity:
            </Text>
            <View style={[styles.headerview, styles.quantitySection]}>
              <TouchableOpacity style={styles.touch}>
                <Text style={[styles.third1, styles.quantityBtns]}>{'-'}</Text>
              </TouchableOpacity>
              <Text style={[styles.third1, {marginLeft: 5, marginTop: 3}]}>
                1
              </Text>
              <TouchableOpacity style={[styles.touch, {marginLeft: 0}]}>
                <Text style={[styles.third1, styles.quantityBtns]}>{'+'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
            style={[styles.book, {marginTop: 15}]}>
            <Text style={styles.btext1}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            data={data5}
            renderItem={renderItem4}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        </View>

        <View style={{marginTop: 10, marginHorizontal: 15}}>
          <FlatList
            data={dummyDatas}
            keyExtractor={item => item.id}
            renderItem={renderItems}
          />
        </View>

        <View style={[styles.productsContainer, {gap: 0}]}>
          <Text style={[styles.header1, {marginLeft: 20}]}>
            Frequently Bought Together
          </Text>

          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.productsContainer,
              {paddingVertical: 0, paddingRight: 25},
            ]}
          />
          <View style={styles.viewBorder} />
          <Text style={styles.totalText}>Total: ₹ {getTotalPrice()}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Appoiment')}
            style={styles.book}>
            <Text style={styles.btext1}>
              ADD {selectedItems.filter(Boolean).length} ITEMS TO CART
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestItemContainer}>
          <Text style={styles.header1}>Top Best Sellers</Text>

          <FlatList
            data={data2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem2}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.floor(
                contentOffsetX / styles.reviewImage.width,
              );
              setCurrentIndex(currentIndex);
            }}
          />

          <View style={styles.dotContainer}>
            {data2.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={() => handleImageChange(index)}
              />
            ))}
          </View>
        </View>

        <View style={{backgroundColor: '#F1F1F1'}}>
          <View style={styles.shareview}>
            <View style={{marginBottom: -20}}>
              <Text style={styles.service}>User Reviews (22)</Text>
            </View>
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.btext}>Write a Review</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={data1}
            renderItem={renderItem3}
            keyExtractor={item => item.id}
            //   numColumns={3}
            showsVerticalScrollIndicator={false}
          />

          <Text style={styles.seeall}>See all Reviews</Text>
        </View>
      </ScrollView>
      {/* <ButtomTab /> */}
    </View>
  );
};

export default RemediesProductDetail;

const data5 = [
  {
    id: '1',
    image: require('../../../assets/otherApp/services1.png'),
    name: 'Speedy Delivery',
    title: 'We ensure express & fast deliver',
  },
  {
    id: '2',
    image: require('../../../assets/otherApp/services2.png'),
    name: '100% Payment Secure',
    title: 'We assure 100% payment Security',
  },
  {
    id: '3',
    image: require('../../../assets/otherApp/services3.png'),
    name: 'Over 3000 Products',
    title: "India's largest healing crystal store",
  },
];
const dummyDatas = [
  {
    id: '1',

    title: 'Description',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

      {
        title: '●',
        subtitle:
          'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      },
      {
        title: '●',
        subtitle:
          'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      },
    ],
  },
  {
    id: '2',

    title: 'Aluminium strip for Vastu',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

      {
        title: '●',
        subtitle:
          'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      },
      {
        title: '●',
        subtitle:
          'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      },
    ],
  },
  {
    id: '3',

    title: 'Aluminium strip for Home',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

      {
        title: '●',
        subtitle:
          'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      },
      {
        title: '●',
        subtitle:
          'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      },
    ],
  },
  {
    id: '4',

    title: 'Aluminium strip for Toilet',
    subItems: [
      {title: '●', subtitle: '1 inch wide and 8 Feet Long.'},
      {
        title: '●',
        subtitle:
          'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      },

      {
        title: '●',
        subtitle:
          'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      },
      {
        title: '●',
        subtitle:
          'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      },
    ],
  },
];
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

const data7 = [
  {id: '1', image: require('../../../assets/image/Remedies/ab.png')},
  {id: '2', image: require('../../../assets/image/Remedies/dk.png')},
  {id: '3', image: require('../../../assets/image/Remedies/vk.png')},
];

const data1 = [
  {
    id: '1',
    image: require('../../../assets/image/Ellipse1.png'),
    name: 'Vikash',
    msg: 'Thanku so much madam ji',
  },
  {
    id: '3',
    image: require('../../../assets/image/Ellipse2.png'),
    name: 'Sudhir',
    msg: 'Thanku so much madam ',
  },
  {
    id: '5',
    image: require('../../../assets/image/Ellipse3.png'),
    name: 'Hemant',
    msg: 'VeryNice',
  },
];

const products = [
  {
    id: 1,
    name: 'Aluminium Metal Strip Vastu',
    price: 725,
    image: require('../../../assets/image/Remedies/ab.png'), // Replace with your image path
  },
  {
    id: 2,
    name: 'Lapis Lazulli',
    price: 905,
    image: require('../../../assets/image/Remedies/vk.png'),
  },
  {
    id: 3,
    name: 'Lazulli',
    price: 905,
    image: require('../../../assets/image/Remedies/dk.png'),
  },
];
