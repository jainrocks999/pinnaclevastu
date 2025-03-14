import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {
  heightPercent,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {useDispatch, useSelector} from 'react-redux';
import BackIcon from '../../../assets/image/backIcon.svg';
import SearchIcon from '../../../assets/image/searchIcon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {orderlistcource} from '../../../Redux/Slice/orderSclice';
import Imagepath from '../../../Component/Imagepath';

const CoureList = ({navigation}) => {
  const cource = useSelector(state => state?.order?.orderCource?.data);

  const dispatch = useDispatch();

  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const [scaleAnims, setScaleAnims] = useState({});

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

    apicall();
    const intervalId = startAnimation();

    return () => clearInterval(intervalId);
  }, []);

  const apicall = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      const userid = await AsyncStorage.getItem('user_id');

      if (!token || !userid) {
        console.error('Token or User ID is missing.');
        return;
      }
      await dispatch(
        orderlistcource({id: userid, token: token, url: 'fetch-courses-order'}),
      );
    } catch (error) {
      console.error('Error in API call:', error);
    }
  };

  const formatDate = itemDate => {
    const date = new Date(itemDate);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-GB', {month: 'short'});
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const handlePress = item => {
    const newScaleAnims = {...scaleAnims};

    if (!newScaleAnims[item.id]) {
      newScaleAnims[item.id] = new Animated.Value(1);
    }
    setScaleAnims(newScaleAnims);

    Animated.sequence([
      Animated.timing(newScaleAnims[item.id], {
        toValue: 0.97,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(newScaleAnims[item.id], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('CourceListDownload');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <BackIcon width={wp(4)} height={wp(4)} style={styles.backBtn} />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>My Courses</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{margin: 20, paddingBottom: heightPercent(8)}}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <SearchIcon width={wp(5)} height={wp(5)} />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder={displayedText}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
        </View>
        <Text style={[styles.headingText, {marginVertical: 8}]}>
          Continue Learning
        </Text>

        <FlatList
          scrollEnabled={false}
          contentContainerStyle={{
            gap: 10,
          }}
          data={cource}
          renderItem={({item}) => {
            const itemScaleAnim = scaleAnims[item.id] || new Animated.Value(1);

            return (
              <Animated.View
                style={{
                  transform: [{scale: itemScaleAnim}],
                }}>
                <TouchableOpacity
                  onPress={() => handlePress(item)}
                  style={styles.card}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.headingText}>
                      {item.course.title
                        ? item.course.title.length > 20
                          ? `${item.course.title.substring(0, 20)}...`
                          : item.course.title
                        : ''}
                    </Text>
                    <Text style={styles.dateText}>
                      Date:{' '}
                      <Text style={styles.smallText}>
                        {formatDate(item?.course?.start_date)}
                      </Text>
                    </Text>
                    <View style={styles.progressSection}>
                      <View style={styles.prograssbarContainer}>
                        <View style={[styles.prograss, {width: '30%'}]}></View>
                      </View>
                      <Text style={styles.lightText}>30%</Text>
                    </View>
                  </View>

                  <Image
                    style={styles.cardImg}
                    source={
                      item?.course?.image
                        ? {uri: `${Imagepath.Path}${item?.course?.image}`}
                        : require('../../../assets/otherApp/order3.png')
                    }
                  />
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />

        <View style={styles.cardContainer}></View>
      </ScrollView>
    </View>
  );
};

export default CoureList;
