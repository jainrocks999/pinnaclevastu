import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const BannerSlider = ({
  data,
  width1,
  mobileWidth,
  height1,
  mobileHeight,
  local,
  navigation,
  onPress,
  iscollection,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const {height, width} = Dimensions.get('window');
  const aspectRatio = height / width;
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState('right');
  const IsIPAD = aspectRatio < 1.6;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          let nextIndex;
          if (direction === 'right') {
            nextIndex = (prevIndex + 1) % data.length;
            if (nextIndex === data.length - 1) setDirection('left');
          } else {
            nextIndex = (prevIndex - 1 + data.length) % data.length;
            if (nextIndex === 0) setDirection('right');
          }

          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true, // Remove animation during scroll
          });
          return nextIndex;
        });
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [autoplay, direction, data.length]);

  const renderItem = ({item}) => {
    if (!data || data.length === 0) {
      return (
        <View>
          <Text>No banners available</Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => setAutoplay(false)}
        onPressOut={() => setAutoplay(true)}
        onPress={() => onPress(item)}>
        <Image
          style={{
            width,
            height: iscollection ? 110 : 452,
            resizeMode: 'cover',
          }}
          source={{uri: item.image.uri}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{alignItems: 'center'}}>
      <FlatList
        scrollEventThrottle={16}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        snapToAlignment="center"
        decelerationRate="normal"
        onMomentumScrollEnd={event => {
          const contentOffset = event.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffset / width);
          if (newIndex !== currentIndex) setCurrentIndex(newIndex);
        }}
      />
      {!iscollection ? (
        <View
          style={[
            styles.dotsContainer,
            {width: IsIPAD ? width1 : mobileWidth},
          ]}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? 'black'
                      : 'rgba(255, 255, 255,0.4)',
                },
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255,0.4)',
    marginLeft: 10,
  },
});

export default BannerSlider;
