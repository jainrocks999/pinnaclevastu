import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Animated, Dimensions, Easing, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const AnimatedLine = () => {
    const navigation = useNavigation();
    const [lineWidth, setLineWidth] = useState(0);
    const translateX = new Animated.Value(0); // Shared value for animation

    useEffect(() => {
        // Start the animation and loop it indefinitely
        Animated.loop(
            Animated.timing(translateX, {
                toValue: 1,
                duration: 100, // Adjust duration for speed (this controls how fast the line moves)
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const handleLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setLineWidth(width);
    };

    return (
        <View>
            <View
                style={styles.container}
                onLayout={handleLayout}
            >
                <View style={styles.fixedBackground} />

                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                {
                                    translateX: translateX.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-lineWidth, width], // Keep moving from left to right
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#F5A623', '#32CD32', '#90ee90', '#F5A623']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradient}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 3,
        overflow: 'hidden',
        position: 'relative',
    },
    fixedBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F6A400',
        borderRadius: 5,
    },
    animatedView: {
        position: 'absolute',
        height: '100%',
        width: '100%', // Double the width to create the illusion of continuous movement
    },
    gradient: {
        flex: 1,
        borderRadius: 5,
    },
});

export default AnimatedLine;
