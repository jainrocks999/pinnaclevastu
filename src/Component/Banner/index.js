import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../ResponsiveScreen/responsive';
import {colors} from '../colors';

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

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (autoplay && data?.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          let nextIndex;
          if (direction === 'right') {
            nextIndex = (prevIndex + 1) % data?.length;
            if (nextIndex === data?.length - 1) setDirection('left');
          } else {
            nextIndex = (prevIndex - 1 + data.length) % data.length;
            if (nextIndex === 0) setDirection('right');
          }

          flatListRef?.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 4000); // Slower autoplay interval

      return () => clearInterval(interval);
    }
  }, [autoplay, direction, data?.length]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width,
          alignSelf: 'center',
          justifyContent: 'center',
          height: iscollection ? 110 : height1,
          paddingHorizontal: 12,
        }}
        activeOpacity={1}
        onPressIn={() => setAutoplay(false)}
        onPressOut={() => setAutoplay(true)}
        onPress={() => onPress(item)}>
        <Animated.Image
          style={[
            {
              height: '100%',
              width: '100%',
              borderRadius: 10,
              // borderWidth: 0.2,
              // resizeMode: 'center',
            },
          ]}
          source={height1 == wp(60) ?{uri: item.image} : {uri: item.image}}
        />
      </TouchableOpacity>
    );
  };

  const handleMomentumScrollEnd = event => {
    const contentOffsetX = event?.nativeEvent?.contentOffset?.x || 0;
    const newIndex = Math.round(contentOffsetX / width);

    if (newIndex >= 0 && newIndex < data.length) {
      setCurrentIndex(newIndex);
    } else {
      console.warn(`Invalid index: ${newIndex}`);
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      {/* <Animated.FlatList
        data={data?data:[]}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        snapToAlignment="center"
        decelerationRate="normal"
        snapToInterval={width} 
        onMomentumScrollEnd={event => {
          const contentOffset = event?.nativeEvent?.contentOffset.x;
          const newIndex = Math?.round(contentOffset / width);
          if (newIndex !== currentIndex) setCurrentIndex(newIndex);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      /> */}

      <Animated.FlatList
        data={data && data?.length > 0 ? data : []} // Ensure data is valid
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width} // Ensures snapping
        onMomentumScrollEnd={handleMomentumScrollEnd} // Validate newIndex
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />

      {local ? (
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
                  width: index === currentIndex ? 30 : 10, // Change width for active dot
                  backgroundColor:
                    index === currentIndex ? colors.Headertext : 'grey',
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
    bottom: -20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default BannerSlider;
