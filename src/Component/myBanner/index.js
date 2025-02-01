import React, { useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const ImageSlider = ({ data, onPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageHeights, setImageHeights] = useState({}); // Store dynamic heights

  const IMAGE_WIDTH = width * 0.9; // Width of the image
  const SPACING = 20; // Space between images

  const handleMomentumScrollEnd = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (IMAGE_WIDTH + SPACING));
    setActiveIndex(slide);
  };

  const handleImageLoad = (event, id) => {
    const { width: imgWidth, height: imgHeight } = event.nativeEvent.source;
    const calculatedHeight = (IMAGE_WIDTH * imgHeight) / imgWidth; 
    setImageHeights((prev) => ({ ...prev, [id]: calculatedHeight }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled={false}
        snapToInterval={IMAGE_WIDTH + SPACING}
        decelerationRate="fast"
        snapToAlignment="center"
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPress(item, index)}
            style={[styles.imageContainer, { width: IMAGE_WIDTH, marginRight: 10}]}>
            
            <Image
              source={{ uri: item.image }}
              style={[
                styles.image,
                { height: imageHeights[item.id]||100}, // Default height before calculation
              ]}
              onLoad={(e) => handleImageLoad(e, item.id)}
              resizeMode="cover" // Change to 'cover' for no extra space
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{
          paddingLeft: SPACING / 2,
          paddingRight: SPACING / 2,
        }}
      />

      <View style={styles.pagination}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    borderRadius: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#718A9A',
  },
  activeDot: {
    width: 25,
    backgroundColor: '#52B1E9',
  },
});

export default ImageSlider;




// import React, { useState } from 'react';
// import {
//   View,
//   Dimensions,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from 'react-native';
// import AutoHeightImage from 'react-native-auto-height-image';

// const { width } = Dimensions.get('window');

// const ImageSlider = ({   data,
//   width1,
//   mobileWidth,
//   height1,
//   mobileHeight,
//   local,
//   navigation,
//   onPress,}) => {
//   const [activeIndex, setActiveIndex] = useState(0);


 

//   const IMAGE_WIDTH = width * 0.9; // Width of the image
//   const SPACING = 20; // Space between images

//   const handleMomentumScrollEnd = (event) => {
//     const slide = Math.round(event.nativeEvent.contentOffset.x / (IMAGE_WIDTH + SPACING));
//     setActiveIndex(slide);
  
    
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         horizontal
//         pagingEnabled={false}
//         snapToInterval={IMAGE_WIDTH + SPACING}
//         decelerationRate="fast"
//         snapToAlignment="center"
//         keyExtractor={(item) => item.id}
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={handleMomentumScrollEnd}
//         renderItem={({ item,index }) => (
//           <TouchableOpacity onPress={()=>onPress(item,index)}
//           style={[styles.imageContainer, { width: IMAGE_WIDTH, marginRight:10}]}>
//             <AutoHeightImage
//               source={{uri:item.image}}
//               width={IMAGE_WIDTH}
//               style={styles.image}
//             /> 
//           </TouchableOpacity>
//         )}
//         // contentContainerStyle={{
//         //   paddingHorizontal: (width - IMAGE_WIDTH) / 2, // Center first and last images
//         // }}
//         contentContainerStyle={{
//           paddingLeft: SPACING / 2, // Small padding to space the first image correctly
//           paddingRight: SPACING / 2, // Optional if you want similar padding on the right
//         }}
//       />

     
//       <View style={styles.pagination}>
//         {data.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.dot,
//               activeIndex === index && styles.activeDot,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//     marginVertical:15
//   },
//   imageContainer: {
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   image: {
//     borderRadius: 10,
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 15,
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     marginHorizontal: 5,
//     backgroundColor: '#718A9A',
//   },
//   activeDot: {
//     width: 25,
//     backgroundColor: '#52B1E9',
//   },
// });

// export default ImageSlider;
