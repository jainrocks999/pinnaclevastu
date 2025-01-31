import React, {useRef, useEffect} from 'react';
import {FlatList, View, Dimensions, Image, StyleSheet} from 'react-native';
import {fontSize} from '../../fontSize';
import CustomText from './CustomText';
import {fonts} from '../../assets/fonts/fonts';

const windowWidth = Dimensions.get('window').width;

const data = [
  {
    image:
      'https://cdn.shopify.com/s/files/1/0293/6448/6192/files/Group_4767.png?v=1661434886',
    title: 'Easy Returns',
    desc: 'Hassle-free returns/exchange within 7 days of delivery.',
  },
  {
    image:
      'https://cdn.shopify.com/s/files/1/0293/6448/6192/files/Group_4766.png?v=1661434849',
    title: 'Cash on Delivery',
    desc: 'We offer cash on delivery all over India.',
  },
  {
    image:
      'https://cdn.shopify.com/s/files/1/0293/6448/6192/files/image_7297bb59-748b-4320-9e7c-7906048c0417.png',
    title: 'Fast Delivery',
    desc: 'We ensure express shipping & fast delivery',
  },
];

const ShippingPolicy = ({style}) => {
  const listRef = useRef(null);

  // Add buffer items for cyclic behavior
  const cyclicData = [
    data[data.length - 1], // Last item as buffer at the start
    ...data,
    data[0], // First item as buffer at the end
  ];

  useEffect(() => {
    // Start the list at the "real" first item
    setTimeout(() => {
      listRef.current.scrollToIndex({index: 1, animated: false});
    }, 0);
  }, []);

  const handleScrollEnd = ({nativeEvent}) => {
    const {contentOffset} = nativeEvent;
    const itemWidth = windowWidth - 50;
    const totalItems = cyclicData.length;

    // Get the current index based on scroll position
    const currentIndex = Math.round(contentOffset.x / itemWidth);

    if (currentIndex === totalItems - 1) {
      // If scrolled to the end buffer, reset to the "real" start
      listRef.current.scrollToIndex({index: 1, animated: false});
    } else if (currentIndex === 0) {
      // If scrolled to the start buffer, reset to the "real" end
      listRef.current.scrollToIndex({
        index: totalItems - 2,
        animated: false,
      });
    }
  };

  return (
    <FlatList
      ref={listRef}
      data={cyclicData}
      horizontal
      pagingEnabled
      snapToInterval={windowWidth - 50}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
          <View style={[styles.textContainer, style]}>
            <CustomText fontFamily={fonts.OpenSans_SemiBold}>
              {item.title}
            </CustomText>
            <CustomText mTop={5} size={fontSize.Fourteen}>
              {item.desc}
            </CustomText>
          </View>
        </View>
      )}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      onMomentumScrollEnd={handleScrollEnd}
      getItemLayout={(_, index) => ({
        length: windowWidth - 50,
        offset: (windowWidth - 50) * index,
        index,
      })}
      onScrollToIndexFailed={info => {
        console.warn('Scroll to index failed:', info);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  card: {
    width: windowWidth - 50,
    marginHorizontal: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 65,
    width: 65,
    marginLeft: 10,
  },
  textContainer: {
    width: '60%',
    marginLeft: 20,
  },
});

export default ShippingPolicy;
