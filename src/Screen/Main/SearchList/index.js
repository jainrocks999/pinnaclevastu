import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../Component/colors';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
import {fetchProduct, InitProduct} from '../../../Redux/Slice/productSlice';
import SearchIcon from '../../../assets/image/searchIcon.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import BackIcon from '../../../assets/image/backIcon.svg';
import Cross from '../../../assets/svg/blackCross.svg';
import {
  InitSearch,
  searchResult,
  searchResultLoadMore,
} from '../../../Redux/Slice/searchSlice';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import Loader from '../../../Component/Loader';

const CollectionScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [value, setValue] = useState('');
  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const selector = useSelector(state => state?.search);
  const search = useSelector(state => state?.search?.isLoading);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );
  useEffect(() => {
    let currentIndex = 0;
    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setDisplayedText(prev => placeholderText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          currentIndex = 0;
          setDisplayedText('');
        }
      }, 450);

      return intervalId;
    };

    const intervalId = startAnimation();

    return () => clearInterval(intervalId);
  }, []);

  const getProductDetails = async (product, id) => {
    navigation.navigate('ProductDetail', {itemId: id});
  };

  useEffect(() => {
    dispatch(InitSearch());
  }, [0]);

  const loadMoreData = () => {
    dispatch(
      searchResultLoadMore(value, selector.endCursor, selector?.products),
    );
  };

  const handleSearch = val => {
    if (val == '') {
      console.log('this is last search', val);
      dispatch(InitSearch());
    } else {
      dispatch(searchResult(val));
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 18,
          paddingVertical: 10,
          backgroundColor: '#fff',
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
            //
          >
            <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: fontSize.Eighteen,
              color: colors.heading,
              fontFamily: 'Poppins-Regular',
            }}>
            {'Search Item'}
          </Text>
        </View>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
          onPress={() => {
            navigation.navigate('Home', {screen: 'MyCart'});
          }}>
          {cartTotalQuantity > 0 && (
            <View
              style={{
                backgroundColor: '#EF6024',
                borderRadius: 10,
                zIndex: 1,
                bottom: -10,
                left: 7,
                height: 15,
                marginTop: -15,
                width: 13,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins-Regular',
                  color: colors.white,
                  fontSize: fontSize.Ten,
                }}>
                {cartTotalQuantity}
              </Text>
            </View>
          )}
          <BagIcon width={wp(5)} height={wp(5)} style={styles.bagBtn} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 15,
          marginHorizontal: 12,
          backgroundColor: colors.ordercolor,
          borderRadius: 20,

          paddingHorizontal: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
            <SearchIcon width={wp(5)} height={wp(5)} />
          </TouchableOpacity>

          <TextInput
            placeholder={displayedText}
            style={{
              fontFamily: 'Poppins-Regular',
              width: '88%',
              fontSize: fontSize.Fourteen,
              paddingHorizontal: 10,
              color: colors.heading,
              paddingVertical: 10,
            }}
            placeholderTextColor={colors.searchBarTextColor}
            value={input}
            onChangeText={val => {
              setInput(val);
              setValue(val);
              handleSearch(val);
            }}
          />
          {input == '' ? null : (
            <TouchableOpacity
              style={{
                height: 20,
                width: 20,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: '#4c4a4a',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setInput('');
                setValue('');
                dispatch(InitSearch());
              }}>
              <Cross width={9} height={9} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {search ? <Loader /> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 15}}>
          {selector?.products?.length > 0 ? (
            <FlatList
              data={selector?.products}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 40,
                marginTop: 15,
              }}
              renderItem={({item}) => {
                return (
                  <Pressable
                    onPress={() => getProductDetails(item, item?.node?.id)}
                    style={{
                      marginBottom: 30,
                      backgroundColor: '#fff',
                    }}>
                    <View style={{position: 'relative'}}>
                      {item?.node?.images?.edges[0]?.node?.originalSrc ? (
                        <Image
                          style={{
                            width: '100%',
                            height: widthPrecent(60),
                            borderRadius: 10,
                          }}
                          resizeMode="contain"
                          source={{
                            uri: item?.node?.images?.edges[0]?.node
                              ?.originalSrc,
                          }}
                        />
                      ) : null}
                      {item?.node?.variants?.edges[0]?.node?.compareAtPrice
                        ?.amount ? (
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            width: 80,
                            height: 35,
                            borderBottomLeftRadius: 15,
                            backgroundColor: 'Red',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              color: '#fff',
                              fontWeight: '700',
                              fontSize: fontSize.Sixteen,
                            }}>{`${(
                            ((item?.node?.variants?.edges[0]?.node
                              ?.compareAtPrice?.amount -
                              item?.node?.variants?.edges[0]?.node?.price
                                ?.amount) /
                              item?.node?.variants?.edges[0]?.node
                                ?.compareAtPrice?.amount) *
                            100
                          ).toFixed(0)}% OFF`}</Text>
                        </View>
                      ) : null}
                    </View>
                    <View
                      style={{
                        height: 100,
                        paddingHorizontal: 10,
                        paddingVertical: 15,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: '#000',
                            fontFamily: 'Poppins-Medium',
                            fontSize: fontSize.Fifteen,
                            width: '65%',
                          }}>
                          {item?.node?.title}
                        </Text>
                        <View
                          style={{
                            borderWidth: 1,
                            paddingHorizontal: 15,
                            paddingVertical: 4,
                            backgroundColor: colors.ordercolor,
                            borderColor: 'grey',
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              marginTop: 2,
                              color: 'grey',
                              fontSize: fontSize.Thirteen,
                              fontFamily: 'Poppins-Medium',
                            }}>
                            {'MORE INFO'}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            color: '#000',
                            fontSize: fontSize.Sixteen,
                            fontFamily: 'Poppins-SemiBold',
                          }}>{`₹ ${parseFloat(
                          item?.node?.variants?.edges[0]?.node?.price?.amount,
                        ).toFixed(2)}`}</Text>
                        {item?.node?.variants?.edges[0]?.node?.compareAtPrice
                          ?.amount ? (
                          <Text
                            style={{
                              color: '#121212BF',
                              marginLeft: 10,
                              textDecorationLine: 'line-through',
                              fontSize: fontSize.Thirteen,
                              fontFamily: 'Poppins-Regular',
                            }}>{`MRP: ${parseFloat(
                            item?.node?.variants?.edges[0]?.node?.compareAtPrice
                              ?.amount,
                          ).toFixed(2)}`}</Text>
                        ) : null}
                      </View>
                    </View>
                  </Pressable>
                );
              }}
              ListFooterComponent={() => (
                <View style={{alignItems: 'center'}}>
                  {console.log(
                    selector?.products?.length,
                    'selector.endCursor',
                  )}
                  {selector?.products?.length > 9 && (
                    <TouchableOpacity
                      onPress={() => loadMoreData()}
                      style={{
                        backgroundColor: colors.orange,
                        paddingHorizontal: 15,
                        paddingVertical: 8,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: fontSize.Fifteen,
                          color: '#fff',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {'Load More'}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          ) : (
            <View
              style={{
                height: Dimensions.get('window').height / 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontSize.Sixteen,
                  color: '#000',
                  fontFamily: 'Poppins-Regular',
                }}>
                {selector?.totalCount == '0'
                  ? 'No Results'
                  : 'Search For Products'}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            marginTop: 0,
            height: 1,
            width: '100%',
            backgroundColor: colors?.default_grey,
          }}
        />

        <View style={{height: 75}} />
      </ScrollView>
    </View>
  );
};
export default CollectionScreen;
