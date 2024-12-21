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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import Imagepath from '../../../Component/Imagepath';

const RemediesProductDetail = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const [checked, setChecked] = useState(true);
  const Detail = useSelector(state => state.home?.RemeiesDetail?.data);
  const newArray = [];
  (Detail?.image_data || []).forEach(item => {
    const updatedItem = {
      ...item,
      image: `${Imagepath.Path}${item.image}`,
    };

    newArray.push(updatedItem);
  });

  const calculateAverageRating = (reviews) => {
    const totalRatings = reviews?.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews?.length > 0 ? totalRatings / reviews.length : 0;
    return averageRating.toFixed(2); // Round to 2 decimal places
  };
  
  const averageRating = calculateAverageRating(Detail?.reviews);
  console.log("Average Rating:", averageRating)

  const [checkedItems, setCheckedItems] = useState({}); // Object to track checked status by item ID

  const toggleCheckbox = id => {
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id], // Toggle the checkbox status for the specific ID
    }));
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleImageChange = index => {
    setCurrentIndex(index);
  };

  const increment = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const Addtocard = async item => {
    try {
      const existingCart = await AsyncStorage.getItem('cartItems');
      // console.log('virendra', existingCart);

      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      // const uniqueId = `${Date.now()}-${Math.random()
      //   .toString(36)
      //   .substr(2, 9)}`;

      const itemWithId = {
        ...item,
        quantity: quantity,
        // uniqueId: uniqueId,
        addedAt: new Date().toISOString(),
      };

      let existingItemIndex = cartItems.findIndex(
        cartItem => cartItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex] = {
          ...cartItems[existingItemIndex],
          ...itemWithId,
          // updatedQuantity:
          // quantity: quantity,
        };
      } else {
        cartItems.push(itemWithId);
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      // console.log('Item added to cart:', itemWithId);
      Toast.show('Item added to cart successfully');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
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
            <Image
              style={styles.reviewImage}
              source={
                item?.customer_image != null
                  ? {uri: `${Imagepath?.Path}${item?.customer_image}`}
                  : require('../../../assets/image/Ellipse1.png')
              }
            />

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
            <Text style={styles.reviewText}>{item.customer_name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>
              {item?.comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const [selectedItems, setSelectedItems] = useState(
    Detail?.cross_sales?.map(() => true),
  );

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
    return Detail?.cross_sales?.reduce((total, product, index) => {
      return selectedItems[index] ? total + product.price : total;
    }, 0);
  };

  const renderItem = ({item, index}) => (
    <View>
      <View style={styles.productCard}>
        <Image
          source={
            item?.image
              ? {uri: `${Imagepath.Path}${item.image}`}
              : require('../../../assets/image/Remedies/vk.png')
          }
          style={styles.productImage}
        />
        <Text style={[styles.productName, {}]}>{item.name}</Text>
        <Text style={[styles.productName]}>₹ {item.price}</Text>
        <View
          style={[
            styles.checkboxWrapper,
            checkedItems[item.id] && styles.checkedBackground,
          ]}>
          <Checkbox
            status={checkedItems[item.id] ? 'checked' : 'unchecked'}
            onPress={() => toggleCheckbox(item.id)}
            color="#FFF"
            uncheckedColor="#DFE7EF"
          />
        </View>
      </View>
      {index !== Detail?.cross_sales?.length - 1 ? (
        <Text style={styles.plusBtn}>+</Text>
      ) : null}
    </View>
  );

  const renderItem2 = ({item}) => (
    <View>
      <View style={styles.slide}>
        <TouchableOpacity
          disabled
          onPress={() => navigation.navigate('ProductDetail')}>
          <Image
            source={
              item?.image
                ? {uri: `${Imagepath.Path}${item?.image}`}
                : require('../../../assets/image/Remedies/vk.png')
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={[styles.thirdCard, styles.titleText]}>{item.name}</Text>
          <Text style={[styles.thirdCard, {marginTop: 10}]}>{item.price}</Text>

          <View style={styles.direction}>
            <Rating
              type="custom"
              tintColor={colors.ordercolor}
              ratingCount={5}
              imageSize={16}
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
        onPress={() => toggleSection(item.desc_data_id)}
        style={[
          styles.courseToggle1,
          expandedSection === item.desc_data_id && styles.activeCourseToggle,
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
              expandedSection === item.desc_data_id && styles.activeTitleColor,
            ]}>
            {item.label}
          </Text>
        </View>
        <Image
          source={
            expandedSection === item.desc_data_id
              ? require('../../../assets/otherApp/updown.png')
              : require('../../../assets/image/arrow_icon.png')
          }
          style={styles.toggleIcon2}
        />
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== item.desc_data_id}>
      <View style={styles.subItemContainer}>
        <RenderHTML
          contentWidth={width}
          source={{
            html: item.description
          }}
        />
         </View>
        {/* <View style={styles.subItemContainer}>
          <FlatList
            data={item.subItems}
            keyExtractor={(subItem, index) => index.toString()}
            renderItem={renderSubItems}
          />
        </View> */}
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home', {screen: 'MyCart'});
          }}>
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.servicesContainer}>
       {newArray?.length!=0?
        <View style={styles.welcomeCard}>
          <BannerSlider
            onPress={item => {}}
            data={newArray}
            local={true}
            height1={wp(60)}
          />
        </View>
:null}
        <View style={styles.contain}>
          {/* Aluminium Metal Strip Vastu */}
          <Text style={styles.service}>
            {Detail?.name}
            {/* {Array.isArray(Detail) && Detail[0]?.name ? Detail[0]?.name : ''} */}
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
                startingValue={averageRating}
                ratingColor="#52B1E9"
                ratingBackgroundColor={colors.lightGrey} // Unfilled star color
              />
            </View>
            {Detail?.reviews?.length > 0 && (
              <>
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
                  {Detail.reviews.length}
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
              </>
            )}
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
          {/* <View style={{paddingHorizontal: 10}}>
            {Detail?.[0]?.description ? (
              <RenderHTML
                contentWidth={width}
                source={{
                  html: isExpanded
                    ? Detail[0]?.description
                    : Detail[0]?.description
                        .replace(/<[^>]*>/g, '')
                        .slice(0, 80) + '...',
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
          </View> */}
          <Text style={styles.cont}>
            {Detail?.short_description}
            {/* {
              'Iron strip for vastu, spacial metel strips for vastu, 10 pieces metel strips for vastu, 100 metel vastu strips, 8 feet metel strip vastu, aluminium metel strips direction south west, artificial strip for vastudosh, mahavastu aluminium strip, steel strip remedy vastu'
            } */}
          </Text>
          <Text style={[styles.third1, {marginTop: 15, marginHorizontal: 15}]}>
            {`₹ ${Detail?.price}`}
          </Text>
          <View
            style={[styles.headerview, {marginTop: 15, marginHorizontal: 15}]}>
            <Text style={[styles.third2, {color: colors.heading}]}>
              Quantity:
            </Text>
            <View style={[styles.headerview, styles.quantitySection]}>
              <TouchableOpacity
                style={styles.touch}
                onPress={() => decrement()}>
                <Text style={[styles.third1, styles.quantityBtns]}>{'-'}</Text>
              </TouchableOpacity>
              <Text style={[styles.third1, {marginLeft: 5, marginTop: 3}]}>
                {quantity}
              </Text>
              <TouchableOpacity
                style={[styles.touch, {marginLeft: 0}]}
                onPress={() => increment()}>
                <Text style={[styles.third1, styles.quantityBtns]}>{'+'}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
            data={Detail?.desc_data}
            keyExtractor={item => item.id}
            renderItem={renderItems}
          />
        </View>
        {Detail?.cross_sales?.length != 0 ? (
          <View style={[styles.productsContainer, {gap: 0}]}>
            <Text style={[styles.header1, {marginLeft: 20}]}>
              Frequently Bought Together
            </Text>

            <FlatList
              data={Detail?.cross_sales}
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
                ADD {selectedItems?.filter(Boolean)?.length} ITEMS TO CART
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {Detail?.top_best_seller?.length != 0 ? (
          <View style={styles.suggestItemContainer}>
            <Text style={styles.header1}>Top Best Sellers</Text>

            <FlatList
              data={Detail?.top_best_seller}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem2}
              horizontal
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const contentOffsetX = e.nativeEvent.contentOffset.x;
                const slideWidth = styles.slide.width; // Assuming styles.slide.width defines the width of each slide
                const currentIndex = Math.round(contentOffsetX / slideWidth); // Use Math.round for more accurate calculation
                setCurrentIndex(currentIndex); // Update state with the calculated index
              }}
            />

            <View style={styles.dotContainer}>
              {Detail?.top_best_seller.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index && styles.activeDot,
                  ]}
                  onPress={() => handleImageChange(index)}
                />
              ))}
            </View>
          </View>
        ) : null}
        <View style={{backgroundColor: '#F1F1F1'}}>
          <View style={styles.shareview}>
            {Detail?.reviews?.length == 0 ? null : (
              <View style={{marginBottom: -20}}>
                <Text
                  style={
                    styles.service
                  }>{`User Reviews (${Detail?.reviews?.length})`}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.button1}>
              <Text style={styles.btext}>Write a Review</Text>
            </TouchableOpacity>
          </View>
          {Detail?.reviews?.length == 0 ? null : (
            <FlatList
              data={Detail?.reviews}
              renderItem={renderItem3}
              keyExtractor={item => item.id}
              //   numColumns={3}
              showsVerticalScrollIndicator={false}
            />
          )}

          <Text style={styles.seeall}>See all Reviews</Text>
        </View>
        <TouchableOpacity
          onPress={() => Addtocard(Detail)}
          style={[styles.book, {marginTop: 10, marginBottom: 10}]}>
          <Text style={styles.btext1}>ADD TO CART </Text>
        </TouchableOpacity>
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
      // {
      //   title: '●',
      //   subtitle:
      //     'Metal Strip Tehnique is used to remove faults in a building and correct the elemental disbalance in a space.',
      // },

      // {
      //   title: '●',
      //   subtitle:
      //     'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      // },
      // {
      //   title: '●',
      //   subtitle:
      //     'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      // },
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

      // {
      //   title: '●',
      //   subtitle:
      //     'metal strip is drilled in floor to block anti-activity (normally toilets or incorrect entrance).',
      // },
      // {
      //   title: '●',
      //   subtitle:
      //     'Aluminium Metal Strip is used to balance East, East North East, East South East.',
      // },
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
