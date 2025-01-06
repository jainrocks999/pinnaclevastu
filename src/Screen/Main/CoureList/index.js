import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  Animated
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {heightPercent} from '../../../Component/ResponsiveScreen/responsive';

const CoureList = ({navigation}) => {
  const myCourseData = [
    {id: 1, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 2, image: require('../../../assets/otherApp/courseCard2.png')},
    {id: 3, image: require('../../../assets/otherApp/courseCard1.png')},
    {id: 4, image: require('../../../assets/otherApp/courseCard2.png')},
  ];

  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');
  const [scaleAnims, setScaleAnims] = useState({});

  useEffect(() => {
    let currentIndex = 0;

    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setDisplayedText(placeholderText.slice(0, currentIndex + 1));
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
  }, [placeholderText]);


  const handlePress = (id) => {
    const newScaleAnims = { ...scaleAnims };

    if (!newScaleAnims[id]) {
      newScaleAnims[id] = new Animated.Value(1); // Initialize scale for this item if not present
    }

    setScaleAnims(newScaleAnims); // Update state with the new scale values

    // Perform the scale animation for the clicked item
    Animated.sequence([
      Animated.timing(newScaleAnims[id], {
        toValue: 0.97,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(newScaleAnims[id], {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('CourceListDownload'); // Navigate after animation
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          //  onPress={() =>
          //     navigation.reset({
          //       index: 0,
          //       routes: [{name: 'UserProfile'}],
          //     })}
          onPress={() => navigation.goBack()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
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
              <Image source={require('../../../assets/image/SearchIcon.png')} />
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
          contentContainerStyle={{
            gap: 10,
          }}
          data={myCourseData}
          renderItem={({item}) => {
            // Retrieve the animation value for each item based on its unique id
            const itemScaleAnim = scaleAnims[item.id] || new Animated.Value(1);

            return (
              <Animated.View
                style={{
                  transform: [{scale: itemScaleAnim}], // Apply the scale animation
                }}>
                <TouchableOpacity
                  onPress={() => handlePress(item.id)} // Pass item id to trigger animation
                  style={styles.card}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.headingText}>Advance Vastu Course</Text>
                    <Text style={styles.dateText}>
                      Date: <Text style={styles.smallText}>20 Nov 2024</Text>
                    </Text>
                    <View style={styles.progressSection}>
                      <View style={styles.prograssbarContainer}>
                        <View style={[styles.prograss, {width: '30%'}]}></View>
                      </View>
                      <Text style={styles.lightText}>30%</Text>
                    </View>
                  </View>

                  <Image style={styles.cardImg} source={item.image} />
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
