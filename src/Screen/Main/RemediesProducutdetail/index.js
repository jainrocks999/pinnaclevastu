import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Share as SocialShare,
  Pressable,
  BackHandler,
  Alert,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import BackIcon from '../../../assets/image/backIcon.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import ShareIcon from '../../../assets/image/share.svg';
import PluseIcon from '../../../assets/image/pluesRoundIcon.svg';
import DownarrowIcon from '../../../assets/image/down_grey_icon.svg';
import UparrowIcon from '../../../assets/image/org_up_arrow_icon.svg';
import ProdStockIcon from '../../../assets/image/now-in-stock.svg';
import SpeedDeliveryIcon from '../../../assets/image/commerce-and-shopping.svg';
import PaymentIcon from '../../../assets/image/credit-card.svg';
import BannerSlider from '../../../Component/Banner';
import {fontSize} from '../../../Component/fontsize';
import Collapsible from 'react-native-collapsible';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import {addToCart} from '../../../Redux/Slice/CartSlice';
import Imagepath from '../../../Component/Imagepath';
import {useNavigation} from '@react-navigation/native';
import AnimatedLine from '../../../Component/progressbar';
import {convertVariantId} from '../../../common/shopifyConverter';
import {fetchProductData} from '../../../Redux/Api';
import {getProductRecomendation} from '../../../models/products';
import {fetchProduct, InitProduct} from '../../../Redux/Slice/productSlice';
import {getReviewList} from '../../../Redux/Api/Ratings';
import Reviewform from '../../../Component/ReviewForm';

const RemediesProductDetail = ({route}) => {
  const product = route?.params?.itemId;
  const navigation = useNavigation();
  const Detail1 = useSelector(state => state?.Product?.productDetails);
  const isLoading = useSelector(state => state.Product?.isLoading);
  const imagearray = useSelector(state => state?.Product?.productImages);
  const Detail = useSelector(state => state.home?.RemeiesDetail?.data);
  const localCartDataList = useSelector(
    state => state?.cart?.localStorageCartData,
  );
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [similardata, setSimilarData] = useState([]);
  const [topBestSellerData, setTopBestSellerData] = useState([]);
  const [isMetaDataLoading, setIsMetaDataLoading] = useState(false);
  const [modelvisible, setmodelvisible] = useState(false);
  const [review, setReview] = useState('');
  const [reviewlist, setReviewList] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);

  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const animation = useRef(new Animated.Value(0)).current;
  const [buttonText, setButtonText] = useState('ADD TO CART');

  const halfFlipInterpolate = animation.interpolate({
    inputRange: [0, 90],
    outputRange: ['0deg', '90deg'],
  });

  const dataArray = [];
  const similarProduct = Detail1?.metafieldsData?.find(
    itm => itm.key === 'similar_product_',
  );
  if (similarProduct) {
    dataArray.push({
      id: similarProduct.value,
      key: similarProduct?.key,
    });
  }
  dataArray.push({
    id: product,
    key: 'product_title',
  });

  useEffect(() => {
    handleApi(route?.params?.itemId);
    setSimilarData([]);
    setReviewList('');
    setmodelvisible(false);
  }, [route?.params?.itemId]);

  useEffect(() => {
    if (!Detail1?.metafieldsData) return;

    const similarProduct = Detail1?.metafieldsData?.find(
      itm => itm.key === 'similar_product_',
    );

    if (similarProduct) {
      getSimilarrdata();
    } else {
      setIsMetaDataLoading(false);
      setSimilarData([]);
    }
  }, [Detail1?.metafieldsData]);

  const getSimilarrdata = async () => {
    try {
      const datawitharr = await Promise.all(
        dataArray.map(async item => {
          const similar = await fetchProductData(item?.id);

          return similar;
        }),
      );
      setSimilarData(datawitharr);
      setIsMetaDataLoading(false);
    } catch (error) {
      console.error('Error fetching similar data:', error);
    }
  };
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const handleApi = async id => {
    setIsMetaDataLoading(true);
    dispatch(InitProduct());
    dispatch(fetchProduct(id));
    const topBestSellerData = await getProductRecomendation(id);
    setTopBestSellerData(topBestSellerData?.productRecommendations);
  };

  const newArray = [];
  (imagearray?.image_data || []).forEach(item => {
    const updatedItem = {
      ...item,
      image: `${Imagepath.Path}${item.image}`,
    };

    newArray.push(updatedItem);
  });

  const [checkedItems, setCheckedItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (similardata) {
      const initialCheckedState = similardata?.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setCheckedItems(initialCheckedState);
      calculateTotalPrice(initialCheckedState);
    }
    const init = async () => {
      await getUserType();
    };
    const checkIfInCart = () => {
      const cartItem = localCartDataList.find(
        item => item.id === similardata?.id,
      );
    };

    checkIfInCart();
    init();
  }, [similardata]);

  const toggleCheckbox = itemId => {
    setCheckedItems(prevState => {
      const updatedState = {
        ...prevState,
        [itemId]: !prevState[itemId],
      };
      calculateTotalPrice(updatedState);
      return updatedState;
    });
  };

  const calculateTotalPrice = checkedState => {
    if (!similardata || similardata.length === 0) {
      setTotalPrice(0);
      return;
    }

    const total = similardata.reduce((sum, product) => {
      if (checkedState[product.id]) {
        const price = parseFloat(product?.price) || 0;
        return sum + price;
      }
      return sum;
    }, 0);
    setTotalPrice(total.toFixed(2));
  };

  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  const groupedMetafields = Detail1?.metafieldsData
    ?.filter(item => item?.key?.includes('question'))
    ?.map(question => {
      const keyPrefix = question?.key?.match(/\d+/)?.[0];
      const answer = Detail1?.metafieldsData
        ?.filter(item => item?.key?.includes('answer'))
        ?.find(ans => ans?.key?.includes(`${keyPrefix}_answer`));

      return {
        question,
        answer,
      };
    });

  const increment = () => {
    if (quantity < 100) {
      setIsInCart(false);
      setButtonText('ADD TO CART');
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setButtonText('ADD TO CART');
      setIsInCart(false);
      setQuantity(quantity - 1);
    }
  };

  const handleGoToCartAnimation = () => {
    if (isInCart) {
      navigation.navigate('Home', {screen: 'MyCart'});
    }
  };

  const handleAddToCart = async Detail => {
    try {
      const prod = Detail || {};
      if (!prod || Object.keys(prod).length === 0) {
        console.error('Error: Product details are missing!');
        return;
      }

      setButtonText('GO TO CART');
      setIsInCart(true);

      Animated.timing(animation, {
        toValue: 90,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Addtocart(prod, {qty: quantity});

        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const Addtocard1 = async item => {
    try {
      if (item?.variants?.length != 0) {
        const image = item.variants?.edges?.[0]?.node?.image?.src;
        let product = {...item};
        product.selectedVarient = item.variants?.edges?.[0];
        let productTemp = {
          ...product,
          image,
          qty: 1,
          productId: product?.id,
          compareAtPrice: item?.variants?.edges?.[0].node?.compareAtPrice,
          price: item?.variants?.edges?.[0].node?.price.amount,
          id: isNaN(product?.selectedVarient?.node?.id)
            ? await product?.selectedVarient?.node?.id
            : product?.selectedVarient?.node?.id,

          properties: {},
        };

        if (productTemp?.availableForSale) {
          dispatch(addToCart(productTemp));
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const Addtocart = async (item, {qty}) => {
    if (item?.variants?.length != 0) {
      const image = item?.images[0]?.src;
      let product = {...item};

      product.selectedVarient = product?.variants?.[0];
      let productTemp = {
        ...product,
        image,
        qty: qty,
        productId: product?.id,
        compareAtPrice: product?.variants?.[0]?.compare_at_price,
        price: product?.variants?.[0]?.price,
        id: isNaN(product?.selectedVarient.id)
          ? convertVariantId(product?.selectedVarient.id)
          : convertVariantId(product?.selectedVarient.id),

        properties: {},
      };
      dispatch(addToCart(productTemp));
    }
  };

  const share = async () => {
    const productUrl = `https://pinnaclevastu-in/products/${Detail1.handle}`; // Product URL to share
    const productDescription = `Check out this amazing product!`;
    try {
      await SocialShare.share({
        title: Detail1.title,
        message: `${productDescription} ${productUrl}`,
      });
    } catch (error) {
      console.error("Couldn't share to Instagram", error);
    }
  };

  const AddExtraItemInCart = async checkedItems => {
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
    ]).start(async () => {
      const selectedItems = Object.entries(checkedItems)
        .filter(([key, isChecked]) => isChecked)
        .map(([key, value]) => key);

      try {
        const userStatus = await AsyncStorage.getItem('user_data');
        const userData = JSON.parse(userStatus);

        const matchedItems = similardata?.filter(item =>
          selectedItems.includes(item.id.toString()),
        );

        for (const item of matchedItems) {
          dispatch(addToCart(item));
        }
      } catch (error) {
        console.log('Error adding items to cart:', error);
      }
    });
  };

  const [showAllReviews, setShowAllReviews] = useState(false);
  const reviewsToShow = showAllReviews
    ? Detail?.reviews
    : Detail?.reviews?.slice(0, 3);

  const renderItem4 = ({item}) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.cardContainer]}>
          {/* <Image source={item.image} style={styles.sevicesImg} /> */}
          {item.svg}
          <Text style={styles.text}>{item.name}</Text>
          <Text style={[styles.text, {fontSize: fontSize.Ten}]}>
            {item.title}
          </Text>
        </View>
        {item.id !== '3' ? <View style={styles.viewLine} /> : null}
      </View>
    );
  };
  const renderItem3 = ({item}) => {
    return (
      <TouchableOpacity style={[styles.cardContainer1]}>
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
              readonly
              ratingBackgroundColor={colors.lightGrey}
            />
          </View>
          <View style={[styles.card, {paddingLeft: 10}]}>
            <Text style={styles.reviewText}>{item?.reviewer?.name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>{item?.body}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
  };

  const renderItem = ({item, index}) => (
    <View>
      <Pressable
        onPress={() =>
          navigation.navigate('ProductDetail', {itemId: item?.productId})
        }
        style={styles.productCard}>
        <Image
          source={
            item?.image
              ? {uri: `${item?.image}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.productImage}
        />
        <Text style={[styles.productName]}>{item.title}</Text>
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
      </Pressable>
      {index !== similardata?.length - 1 ? (
        // <Text style={styles.plusBtn}>+</Text>
        <PluseIcon width={wp(3)} height={wp(3)} style={styles.plusBtn} />
      ) : null}
    </View>
  );

  const renderItem2 = ({item}) => (
    <View style={styles.slide}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {itemId: item?.id})
        }>
        <Image
          source={
            item?.variants?.edges[0]?.node?.image?.src
              ? {uri: `${item?.variants?.edges[0]?.node?.image?.src}`}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={[styles.thirdCard, styles.titleText]}>
            {' '}
            {item?.title
              ? item?.title?.length > 25
                ? `${item?.title?.substring(0, 25)}...`
                : item?.title
              : ' '}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <Text style={[styles.thirdCard, {marginTop: 10}]}>
              ₹ {item?.variants?.edges[0]?.node?.price?.amount}
            </Text>
            {item?.variants?.edges[0]?.node?.compareAtPrice && (
              <Text
                style={[
                  styles.thirdCard,
                  {marginTop: 10, textDecorationLine: 'line-through'},
                ]}>
                ₹ {item?.variants?.edges[0]?.node?.compareAtPrice?.amount}
              </Text>
            )}
          </View>
          <View style={styles.direction}>
            {item?.review != null ? (
              <Rating
                type="custom"
                tintColor={colors.ordercolor}
                ratingCount={item?.review?.scale_max}
                imageSize={item?.review?.value ? 16 : 16}
                startingValue={item?.review?.value}
                ratingColor="#52B1E9"
                readonly
                ratingBackgroundColor={colors.lightGrey}
              />
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.buttonstylefirst}
            onPress={() => Addtocard1(item, {qty: 1})}>
            <Text style={styles.buttonstyle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderItems = ({item, index}) => (
    <View style={styles.paddings}>
      <TouchableOpacity
        onPress={() => toggleSection(index)}
        style={[
          styles.courseToggle1,
          expandedSection === index && styles.activeCourseToggle,
        ]}>
        <View style={styles.direction1}>
          <Text
            style={[
              styles.coursetext2,
              expandedSection === index && styles.activeTitleColor,
            ]}>
            {item?.question?.value}
          </Text>
        </View>
      
        {expandedSection !== index ? (
          <DownarrowIcon
            width={wp(4)}
            height={wp(3)}
          />
        ) : (
          <UparrowIcon width={wp(4)} height={wp(3)} />
        )}
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== index}>
        <View style={styles.subItemContainer}>
          <Text style={styles.subItemSubtitle}>{item?.answer?.value}</Text>
        </View>
      </Collapsible>
    </View>
  );

  if (isLoading || isMetaDataLoading) {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerview}>
            <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />

            <Text style={styles.logoText}>Product Detail</Text>
          </View>
          <BagIcon width={wp(5)} height={wp(5)} />
        </View>
        <AnimatedLine />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}>
            <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
          </TouchableOpacity>
          <Text style={styles.logoText}>Product Detail</Text>
        </View>
        <TouchableOpacity
          hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
          onPress={() => {
            navigation.navigate('Home', {screen: 'MyCart'});
          }}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <BagIcon width={wp(5)} height={wp(5)} />
        </TouchableOpacity>
      </View>

      {Detail1 ? (
        <>
          <ScrollView contentContainerStyle={styles.servicesContainer}>
            {imagearray?.length != 0 ? (
              <View style={styles.welcomeCard}>
                {imagearray?.length < 1 ? (
                  <BannerSlider
                    onPress={item => {}}
                    data={imagearray}
                    local={true}
                    height1={wp(60)}
                  />
                ) : (
                  <Image
                    source={{uri: `${imagearray[0]?.image}`}}
                    style={{
                      width: '95%',
                      height: wp(60),
                      borderRadius: 15,
                      margin: 10,
                    }}
                  />
                )}
              </View>
            ) : (
              <View style={styles.welcomeCard}>
                <Image
                  source={require('../../../assets/image/Remedies/Image-not.png')}
                  style={{
                    width: '100%',
                    height: wp(60),
                    borderRadius: 15,
                  }}
                />
              </View>
            )}
            <View style={styles.contain}>
              <Text style={styles.service}>{Detail1?.title}</Text>
            </View>
            <View style={styles.main}>
              {Detail1?.rating && (
                <>
                  <View style={styles.headerview}>
                    <View style={{marginTop: -5}}>
                      <Rating
                        type="custom"
                        tintColor={colors.white}
                        ratingCount={Detail1?.rating?.value?.scale_max}
                        imageSize={16}
                        startingValue={Detail1?.rating?.value?.value}
                        ratingColor="#52B1E9"
                        readonly
                        ratingBackgroundColor={colors.lightGrey}
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
                      {Detail1?.reviews?.count}
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
                </>
              )}
              <Text
                onPress={() => setmodelvisible(true)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
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
              <TouchableOpacity
                style={styles.shareimage}
                onPress={() => share()}>
                <ShareIcon width={wp(4)} height={wp(4)} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.cont}>
                {Detail1?.description ||
                  Detail1?.metafieldsData?.find(item =>
                    item.key?.includes('description'),
                  )?.value}
              </Text>

              <View
                style={{
                  marginTop: 15,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Text style={[styles.third1]}>
                  {`₹ ${Detail1?.variants?.[0]?.price}`}
                </Text>
                {Detail1?.variants?.[0]?.compare_at_price &&
                  parseInt(Detail1?.variants?.[0]?.compare_at_price) > 0 && (
                    <Text
                      style={[
                        styles.third1,
                        {textDecorationLine: 'line-through'},
                      ]}>
                      ₹ {Detail1?.variants?.[0]?.compare_at_price}
                    </Text>
                  )}
              </View>
              <View
                style={[
                  styles.headerview,
                  {marginTop: 15, marginBottom: 10, marginHorizontal: 15},
                ]}>
                <Text style={[styles.third2, {color: colors.heading}]}>
                  Quantity:
                </Text>
                <View style={[styles.headerview, styles.quantitySection]}>
                  <TouchableOpacity
                    style={styles.touch}
                    hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
                    onPress={() => decrement()}>
                    <Text style={[styles.third1, styles.quantityBtns]}>
                      {'-'}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.third1, {marginLeft: 5, marginTop: 3}]}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    style={[styles.touch, {marginLeft: 0}]}
                    hitSlop={{bottom: 10, top: 10, left: 10, right: 10}}
                    onPress={() => increment()}>
                    <Text style={[styles.third1, styles.quantityBtns]}>
                      {'+'}
                    </Text>
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
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
              />
            </View>

            <View style={{marginTop: 10, marginHorizontal: 15}}>
              <FlatList
                data={groupedMetafields || []}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
                renderItem={renderItems}
              />
            </View>
            {similardata?.length != 0 ? (
              <View style={[styles.productsContainer, {gap: 0}]}>
                <Text style={[styles.header1, {marginLeft: 20}]}>
                  Frequently Bought Together
                </Text>
                <FlatList
                  data={similardata}
                  renderItem={renderItem}
                  keyExtractor={item => item?.id?.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={[
                    styles.productsContainer,
                    {paddingVertical: 0, paddingRight: 25},
                  ]}
                />
                <View style={styles.viewBorder} />
                {totalPrice != 0 ? (
                  <Text style={styles.totalText}>Total: ₹ {totalPrice}</Text>
                ) : null}
                {Object.values(checkedItems)?.filter(Boolean)?.length !== 0 ? (
                  <Animated.View
                    style={[
                      {
                        transform: [{scale: buttonAnimatedValue}],
                      },
                      // styles.book,
                      {marginTop: 15},
                    ]}>
                    <TouchableOpacity
                      onPress={() => AddExtraItemInCart(checkedItems)}
                      style={styles.book}>
                      <Text style={styles.btext1}>
                        ADD{' '}
                        {Object.values(checkedItems)?.filter(Boolean)?.length}{' '}
                        ITEMS TO CART
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                ) : null}
              </View>
            ) : null}

            {topBestSellerData?.length != 0 ? (
              <View style={styles.suggestItemContainer}>
                <Text style={styles.header1}>Top Best Sellers</Text>
                <FlatList
                  data={topBestSellerData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem2}
                  pagingEnabled
                  snapToAlignment="center"
                  decelerationRate="fast"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  onMomentumScrollEnd={e => {
                    const contentOffsetX = e.nativeEvent.contentOffset.x;
                    const slideWidth = styles.slide.width;
                    const currentIndex = Math.round(
                      contentOffsetX / slideWidth,
                    );
                    setCurrentIndex(currentIndex);
                  }}
                />

                <View style={styles.dotContainer}>
                  {topBestSellerData?.map((_, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>
            ) : null}

            <View style={{backgroundColor: '#F1F1F1'}}>
              {Detail1?.reviews?.count === 0 ? null : (
                <>
                  <View style={styles.shareview}>
                    <View style={{marginBottom: -20}}>
                      <Text
                        style={
                          styles.service
                        }>{`User Reviews (${Detail1?.reviews?.count})`}</Text>
                    </View>

                    <TouchableOpacity style={styles.button1}>
                      <Text style={styles.btext}>Write a Review</Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={Detail1?.reviews?.reviewsList}
                    renderItem={renderItem3}
                    scrollEnabled={false}
                    keyExtractor={index => index.toString()}
                    showsVerticalScrollIndicator={false}
                  />

                  <TouchableOpacity onPress={() => setShowAllReviews(true)}>
                    <Text style={styles.seeall}>
                      {Detail1?.reviews?.count > 3 && 'See all Reviews'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            {modelvisible ? (
              <Reviewform
                setmodelvisible={setmodelvisible}
                productId={route?.params?.itemId}
              />
            ) : null}
          </ScrollView>
          <View style={styles.bookContainer}>
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      rotateX: halfFlipInterpolate,
                    },
                  ],
                },
                styles.book1,
                {marginTop: 15},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  if (isInCart) {
                    handleGoToCartAnimation();
                  } else {
                    if (Detail1?.availableForSale == true) {
                      handleAddToCart(Detail1);
                    } else {
                      Toast.show(
                        'This product  is currently not available for sale',
                      );
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Animated.Text style={[styles.btext1]}>
                  {buttonText}
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default RemediesProductDetail;

const data5 = [
  {
    id: '1',
    svg: <SpeedDeliveryIcon width={wp(9)} height={wp(8)} />,
    name: 'Speedy Delivery',
    title: 'We ensure express & fast deliver',
  },
  {
    id: '2',
    svg: <PaymentIcon width={wp(8)} height={wp(8)} />,
    name: '100% Payment Secure',
    title: 'We assure 100% payment Security',
  },
  {
    id: '3',
    svg: <ProdStockIcon width={wp(8)} height={wp(8)} />,
    name: 'Over 3000 Products',
    title: "India's largest healing crystal store",
  },
];
