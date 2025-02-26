import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  Linking,
  Alert,
  Share,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {Rating} from 'react-native-ratings';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
import {useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-simple-toast';
import Collapsible from 'react-native-collapsible';
import RenderHTML from 'react-native-render-html';

const ResidentalScreen = ({navigation}) => {
  const userDetail = useSelector(state => state?.Auth?.userData);

  const data = useSelector(state => state.consultation.ConsultationDetail);

  const [scaleAnims, setScaleAnims] = useState({});
  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
  };

  const openApp = async (url, fallbackUrl) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        if (fallbackUrl) {
          await Linking.openURL(fallbackUrl);
        } else {
          Alert.alert(
            'App Not Installed',
            'The app is not installed on your device.',
          );
        }
      }
    } catch (error) {
      console.log('error :', error);
    }
  };
  const share = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing app: https://example.com',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  const copyToClipboard = async () => {
    const textToCopy = 'This is the text you want to copy';
    try {
      await Clipboard.setString(textToCopy);
      Toast.show({
        type: 'success',
        text1: 'Copied!',
        text2: 'Text copied to clipboard successfully!',
      });
    } catch (error) {
      console.log('error', error);

      Alert.alert('Error', 'Failed to copy text.');
    }
  };

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonAnimatedValue, {
        toValue: 0.94,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (userDetail.length === 0) {
        navigation.navigate('Login', {from: 'profile'});
      } else {
        navigation.navigate('Appoiment');
      }
    });
  };

  const handleItemClick = index => {
    const newScaleAnims = {...scaleAnims};

    if (!newScaleAnims[index]) {
      newScaleAnims[index] = new Animated.Value(1);
    }

    setScaleAnims(newScaleAnims);

    Animated.sequence([
      Animated.timing(newScaleAnims[index], {
        toValue: 0.96,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(newScaleAnims[index], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const renderItem = ({item, index}) => {
    const itemScaleAnim = scaleAnims[index] || new Animated.Value(1);
    return (
      <Animated.View
        style={[
          {
            transform: [{scale: itemScaleAnim}],
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.cardContainer,
            {
              backgroundColor:
                item?.color_code != null ? item?.color_code : colors.card3,
            },
          ]}
          onPress={() => handleItemClick(index)}>
          <Image
            source={
              item.logo
                ? {uri: `${Imagepath.Path}${item.logo}`}
                : require('../../../assets/image/Remedies/Image-not.png')
            }
            style={styles.image}
          />
          <Text style={styles.text}>{item.service_name}</Text>
        </TouchableOpacity>
      </Animated.View>
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
                item?.images
                  ? {uri: `${Imagepath?.Path}${item.images}`}
                  : require('../../../assets/image/Remedies/Image-not.png')
              }
            />
            <Rating
              type="custom"
              tintColor={colors.white}
              ratingCount={5}
              imageSize={wp(3.5)}
              startingValue={item.star}
              ratingColor="#52B1E9"
              readonly
              ratingBackgroundColor={colors.lightGrey}
            />
          </View>
          <View style={[styles.card, {paddingLeft: 10}]}>
            <Text style={styles.third1}>{item.customer_name}</Text>

            <Text style={[styles.third2, {marginTop: -8}]}>
              {item?.comment}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const calculateAverageRating = reviews => {
    const totalRatings = reviews?.reduce(
      (sum, review) => sum + JSON.parse(review.star),
      0,
    );

    const averageRating =
      reviews?.length > 0 ? totalRatings / reviews.length : 0;
    return averageRating.toFixed(1);
  };

  const averageRating = calculateAverageRating(data?.reviews);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={styles.cardContainer1}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
            <View style={styles.imgContainer}>
              <Image
                source={
                  data?.logo
                    ? {uri: `${Imagepath.Path}${data?.logo}`}
                    : require('../../../assets/image/Remedies/Image-not.png')
                }
                style={styles.cardImage}
              />

              <View style={styles.direction}>
                {averageRating != 0 ? (
                  <Rating
                    type="custom"
                    tintColor={colors.white}
                    ratingCount={5}
                    imageSize={wp(3.8)}
                    startingValue={averageRating}
                    ratingColor="#52B1E9"
                    readonly
                    ratingBackgroundColor={colors.lightGrey}
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.third1}>{data?.franchise_name}</Text>

              <Text style={[styles.third2, {marginBottom: 3}]}>
                Services:{' '}
                {data?.franchise_services
                  ?.map(service => service.service_name)
                  .join(', ')}
              </Text>

              <Text style={styles.third2}>
                {' '}
                {data?.language?.map(language => language).join(', ')}
              </Text>
              <Text style={styles.third2}>
                Exp: {data?.experience_of_year} year
              </Text>

              <Text style={styles.priceText}>Price: ₹ {data?.charges}</Text>
            </View>
          </View>
        </View>

        <View style={styles.contain}>
          <Text style={styles.service}>Specialist</Text>
        </View>

        <FlatList
          data={data?.franchise_services}
          renderItem={renderItem}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginHorizontal: 8,
            gap: 15,
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingVertical: 10,
          }}
        />
        {data?.short_description && (
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.cont}>{data?.short_description}</Text>
          </View>
        )}

        {data?.content && (
          <View style={{paddingHorizontal: 15}}>
            <Text style={styles.cont}>{data?.content}</Text>
          </View>
        )}

        {data?.label1 || data?.label2 || data?.label3 ? (
          <View>
            <View style={{paddingVertical: 10, marginHorizontal: 15}}>
              <Text style={styles.service}>{data?.label1}</Text>

              <RenderHTML
                source={{
                  html: data?.description1,
                }}
              />
            </View>

            <View style={{paddingVertical: 10, marginHorizontal: 15}}>
              <Text style={styles.service}>{data?.label2}</Text>

              <RenderHTML
                source={{
                  html: data?.description2,
                }}
              />
            </View>
            <View style={{paddingVertical: 10, marginHorizontal: 15}}>
              <Text style={styles.service}>{data?.label3}</Text>
              <RenderHTML
                source={{
                  html: data?.description3,
                }}
              />
            </View>
          </View>
        ) : null}

        <View style={styles.shareview}>
          <View style={styles.rowSection}>
            <TouchableOpacity style={styles.shareIcon} onPress={() => share()}>
              <Image
                style={styles.shareIcon}
                source={require('../../../assets/otherApp/share.png')}
              />
            </TouchableOpacity>

            <Text style={[styles.cont, {marginTop: 0}]}>{'Share it :'}</Text>

            <TouchableOpacity
              onPress={() => openApp('fb://profile', 'https://facebook.com')}>
              <Image
                style={styles.socialImg}
                source={require('../../..//assets/drawer/fb.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openApp('instagram://app', 'https://instagram.com')
              }>
              <Image
                style={styles.socialImg}
                source={require('../../../assets/drawer/instagram.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => copyToClipboard()}>
              <Image
                style={styles.socialImg}
                source={require('../../../assets/drawer/copy.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        {data?.faqdata != undefined
          ? data?.faqdata[0]?.answer != null &&
            data?.faqdata[0]?.question != null && (
              <View style={styles.contain}>
                <Text style={styles.service}>FAQ</Text>
                <FlatList
                  scrollEnabled={false}
                  data={data?.faqdata}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View style={{marginTop: 10}}>
                      <TouchableOpacity
                        onPress={() => toggleSection(index)}
                        style={[
                          styles.courseToggle1,
                          expandedSection === index &&
                            styles.activeCourseToggle,
                        ]}>
                        <View style={styles.direction1}>
                          <Text
                            style={[
                              styles.coursetext2,
                              expandedSection === index &&
                                styles.activeTitleColor,
                            ]}>
                            Q{index + 1}. {item.question}
                          </Text>
                        </View>
                        <Image
                          source={
                            expandedSection === index
                              ? require('../../../assets/otherApp/updown1.png')
                              : require('../../../assets/image/arrow_icon.png')
                          }
                          style={[styles.toggleIcon2]}
                        />
                      </TouchableOpacity>

                      <Collapsible collapsed={expandedSection !== index}>
                        <View style={styles.subItemContainer}>
                          <Text
                            style={[styles.primText, {marginHorizontal: 15}]}>
                            Ans :- {item?.answer}
                          </Text>
                        </View>
                      </Collapsible>
                    </View>
                  )}
                />
              </View>
            )
          : null}
        {data?.reviews?.length != 0 ? (
          <View style={styles.reviewSection}>
            <View style={styles.contain}>
              <Text style={styles.service}>
                User Reviews ({data?.reviews?.length})
              </Text>
            </View>
            <FlatList
              data={data?.reviews}
              scrollEnabled={false}
              renderItem={renderItem3}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 15,
              }}
            />
            {data?.reviews?.length >= 5 ? (
              <Text style={styles.seeall}>See all Reviews</Text>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
      <TouchableOpacity onPress={handlePress} activeOpacity={1}>
        <Animated.View
          style={[
            styles.book,
            {
              transform: [{scale: buttonAnimatedValue}],
              backgroundColor: colors.orange,
            },
          ]}>
          <Text style={styles.btext1}>BOOK NOW</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default ResidentalScreen;
