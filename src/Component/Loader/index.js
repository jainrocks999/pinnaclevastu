// import React from 'react';
// import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
// import {colors} from '../colors';

// const Loader = () => {

//   return (

//       <View style={styles.modalBackground}>
//         <View style={styles.staticCircle}>
//           <ActivityIndicator
//             size="79.8"
//             color={colors.orange}
//             style={styles.loader}
//           />
//         </View>
//       </View>

//   );
// };

// const styles = StyleSheet.create({
//   modalBackground: {
//     position: 'absolute', // Overlay effect
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex:3,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#00000040',
//   },
//   staticCircle: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     borderWidth: 6,
//     borderColor: '#009FDF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loader: {
//     position: 'absolute',
//     transform: [{scale: -1.2}],
//   },
// });

// export default Loader;

// // import React from "react";
// // import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
// // import { colors } from "../colors";

// // const Loader = (props) => {
// //     const { loadingi1 } = props;

// //     return (
// //         <Modal
// //             transparent={true}
// //             animationType={"none"}
// //             visible={loadingi1}
// //             onRequestClose={() => {
// //                 // console.log("close modal");
// //             }}
// //         >
// //             <View style={styles.modalBackground}>
// //                 <View style={styles.activityIndicatorWrapper}>
// //                     <ActivityIndicator
// //                         animating={loadingi1}
// //                         size="large"
// //                         color={colors.orange}
// //                     />
// //                 </View>
// //             </View>
// //         </Modal>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     modalBackground: {
// //         flex: 1,
// //         alignItems: "center",
// //         flexDirection: "column",
// //         justifyContent: "space-around",
// //         backgroundColor: "#00000040",
// //     },
// //     activityIndicatorWrapper: {
// //         backgroundColor: "#FFFFFF",
// //         height: 100,
// //         width: 100,
// //         borderRadius: 10,
// //         display: "flex",
// //         alignItems: "center",
// //         justifyContent: "space-around",
// //     },
// // });

// // export default Loader;

import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";

// Create an animated version of the Svg Path component
const AnimatedPath = Animated.createAnimatedComponent(Path);

const Loader = () => {
  const screenWidth = Dimensions.get("window").width;
  const r = 15; // Radius for the "S" shape
  const c = Math.round(r / Math.SQRT2); 
  const l = Math.ceil((3 * Math.PI + 4) * r); // Total length of the path
  const d = Math.floor(Math.PI * r); // Length of the dash
  const dashOffset = useRef(new Animated.Value(l)).current;

  useEffect(() => {
    // Infinite loop animation
    Animated.loop(
      Animated.timing(dashOffset, {
        toValue: 0,
        duration: 2000, // 2 seconds
        useNativeDriver: true,
      })
    ).start();
  }, [dashOffset]);

  // Corrected "S" shape path where both sides meet in the middle
  const dPath = `M${c},${-c} A${r},${r} 0 1 1 ${c},${c} L${-c},${-c} A${r},${r} 0 1 0 ${-c},${c} z`;

  return (
    <View style={styles.container}>
      <Svg
        width={screenWidth * 0.5}
        height={screenWidth * 0.25}
        viewBox={`${-screenWidth * 0.25} ${-screenWidth * 0.125} ${screenWidth * 0.5} ${screenWidth * 0.25}`}
      >
        <Path
          d={dPath}
          fill="none"
          stroke="#009FDF"
          opacity={1}
          strokeLinecap="round"
          strokeWidth="2%"
        />
        <AnimatedPath
          d={dPath}
          fill="none"
          stroke="#FF9770" 
          strokeLinecap="round"
          strokeWidth="2%"
          strokeDasharray={`${d} ${l - d}`}
          strokeDashoffset={dashOffset}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     position: 'absolute', // Overlay effect
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex:3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000040",// Background color of the container
  },
});

export default Loader;
