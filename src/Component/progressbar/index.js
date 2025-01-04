import React, { useEffect } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../colors';
const { width } = Dimensions.get('window');

const AnimatedLine = () => {
  const translateX = new Animated.Value(-width); 

  useEffect(() => {
    // Start the continuous animation
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width, 
        duration: 500,
        useNativeDriver: true, 
      })
    ).start();
  }, [translateX]);

  return (
    <View style={styles.lineContainer}>
      <Animated.View
        style={[
          styles.animatedLine,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, width],
                  outputRange: [-width, 1], 
                }),
              },
            ],
          },
        ]}
      >
        <LinearGradient
        //  colors={['#F5A623', '#32CD32', '#90ee90', '#F5A623']} // Gradient colors
         colors={['#F5A623', '#32CD32', '#90ee90', '#F5A623']}

          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    position: 'absolute',
       height: 3.5,
    width: '150%',
    borderRadius: 9,
    // backgroundColor: '#E5E2FF',
    backgroundColor: colors.orange,
    overflow: 'hidden',
    position: 'relative',
  },
  animatedLine: {
    position: 'absolute',
    height: '100%', 
    width: width * 2, 
  },
  gradient: {
    flex: 1, 
    
  },
});

export default AnimatedLine;


