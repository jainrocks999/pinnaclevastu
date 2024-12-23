import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated
} from 'react-native';
import styles from './styles';
import { colors } from '../../../Component/colors';
import { Rating } from 'react-native-ratings';
import { widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';
import { useNavigation } from '@react-navigation/native';
const ResidentalScreen = ({ navigation }) => {

  const buttonAnimatedValue = useRef(new Animated.Value(1)).current;
  const data2 = [
    {
      id: '1',
      image: require('../../../assets/image/house.png'),
      name: 'Residential Vastu',
    },
    {
      id: '3',
      image: require('../../../assets/image/industry.png'),
      name: 'Industrial Vastu',
    },
    {
      id: '5',
      image: require('../../../assets/image/Layer_x.png'),
      name: 'Gemstone',
    },
  ];
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonAnimatedValue, {
        toValue: 0.96,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnimatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Appoiment');
    });
  };
  const renderItem = ({ item }) => {
    let backgroundColor;


    if (item.name === 'Residential Vastu') {
      backgroundColor = colors.card4;
    } else if (item.name === 'Industrial Vastu') {
      backgroundColor = colors.card3;
    } else if (item.name === 'Gemstone') {
      backgroundColor = colors.card2;
    } else {
      backgroundColor = colors.card3;
    }

    return (
      <TouchableOpacity style={[styles.cardContainer, { backgroundColor }]}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const renderItem3 = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
        style={[styles.cardContainer1]}>
        <View style={styles.reviewCard}>
          <View style={{ paddingLeft: 5 }}>
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
          <View style={[styles.card, { paddingLeft: 10 }]}>
            <Text style={styles.third1}>{item.name}</Text>

            <Text style={[styles.third2, { marginTop: -8 }]}>{item.msg}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                style={styles.cardImage}
                source={require('../../../assets/image/Rectangle.png')}
              />

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
              <Text style={styles.third1}>{'Shreni Rajbhandary'}</Text>

              <Text style={[styles.third2, { marginBottom: 3 }]}>Services :
                {' Residential Vastu, Industrial Vastu, Gemstone'}
              </Text>
              <Text style={styles.third2}>{'Marathi, Hindi, English'}</Text>
              <Text style={styles.third2}>Exp: {'6 Years'}</Text>
              <Text style={styles.priceText}>
                Price: {'₹ 500 to ₹ 25000'}
              </Text>
            </View>
          </View>
        </View>


        <View style={styles.contain}>
          <Text style={styles.service}>Specialist</Text>
        </View>
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignSelf: 'center',
            gap: 15,
            paddingHorizontal: 0,
          }}
        />
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.cont}>
            {
              '“Many people say that an individual’s positive energy and young per numerology. Pinnacle Vastu is gratified to share light and knowledge with and through Shreni Rajbhandary.'
            }
          </Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.cont}>
            {
              '“Many people say that an individual’s positive energy and young per numerology. and knowledge with and through Shreni Rajbhandary.'
            }
          </Text>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.cont}>
            {
              '“Many people say that an individual’s positive energy lights up the room,  involved in the environment and urban planning sector since 2017. While doing so, she was curious about spaces and how traditionally, spaces were developed in this part of the world. With this curiosity, she started to uncover more about Vastu Shastra. She is not just developing Vastu-compliant properties but is also involved in Vastu-compliant urban spaces. Her clients are primarily from the government, development,'
            }
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.cont}>
            {
              '“Many people say that an individual’s positive energy and young per numerology. Pinnacle Vastu is gratified to share light and knowledge with and through Shreni Rajbhandary.'
            }
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.cont}>
            {
              '“Many people say that an individual’s positive energy is gratified to share light and knowledge.'
            }
          </Text>
        </View>


        <View style={styles.shareview}>
          <View style={styles.rowSection}>
            <Image
              style={styles.shareIcon}
              source={require('../../../assets/otherApp/share.png')}
            />

            <Text style={[styles.cont, { marginTop: 0 }]}>{'Share it :'}</Text>
            <Image
              style={styles.socialImg}
              source={require('../../..//assets/drawer/fb.png')}
            />
            <Image
              style={styles.socialImg}
              source={require('../../../assets/drawer/instagram.png')}
            />
            <Image
              style={styles.socialImg}
              source={require('../../../assets/drawer/copy.png')}
            />
          </View>
          {/* <View style={styles.smallBtnShadow}> */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.btext}>Write a Review</Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.contain}>
            <Text style={styles.service}>User Reviews (22)</Text>
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

        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
          <Animated.View
            style={[
              styles.book,
              {
                transform: [{ scale: buttonAnimatedValue }],
                backgroundColor: colors.orange,
              },
            ]}
          >
            <Text style={styles.btext1}>BOOK NOW</Text>
          </Animated.View>
        </TouchableOpacity>
      </ScrollView>
      {/* <ButtomTab /> */}
    </View>
  );
};

export default ResidentalScreen;

const data1 = [
  {
    id: '1',
    image: require('../../../assets/image/Ellipse1.png'),
    name: 'Vikash',
    msg: 'Thanku so much madam ji ',
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
