import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {clearRemedis, Remedie} from '../../../Redux/Slice/HomeSlice';
import Loader from '../../../Component/Loader';
import {useIsFocused} from '@react-navigation/native';
import BannerSlider from '../../../Component/Banner';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';

const Remedies = ({navigation}) => {
  const Remediesproduct = useSelector(state => state.home?.Remedi?.data);
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const newArray = [];
  (
    Remediesproduct?.remedies_categories_banner?.[0]?.slider_items || []
  ).forEach(item => {
    const updatedItem = {
      ...item,
      image: `${Imagepath.Path}${item.image}`,
    };

    newArray.push(updatedItem);
  });
  const isLoading = useSelector(state => state.home?.loading);
  const dispatch = useDispatch();

  const RemediesProductcategory = async item => {
    dispatch(clearRemedis())
    navigation.navigate('Home1', {
      screen: 'Remedie12',
      params: {screen: 'ProductList',params: {item:item,Id:false}},
    });
  
  };

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      apicall();
    }
  }, [focus]);

  const apicall = async () => {
    await dispatch(Remedie({url: 'remedies'}));
    // await dispatch(Service({url: 'fetch-franchise-services'}));
    // await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
  };

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => RemediesProductcategory(item)}
        style={[styles.cardContainer1]}>
        <ImageBackground
          resizeMode="contain"
          source={{uri: `${Imagepath.Path}${item.image}`}}
          style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
          <Text style={styles.text1}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity onPress={() => navigation.goBack()}  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Remedies</Text>
        </View>
        <TouchableOpacity  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/Group.png')}
          />
        </TouchableOpacity>
      </View>
      {isLoading ? <Loader /> : null}
      <ScrollView contentContainerStyle={styles.searchContainer}>
        {/* <View style={styles.contain1}>
          <Image
            style={styles.image}
            source={require('../../../assets/image/Group1x.png')}
          />
        </View> */}
        <View style={styles.welcomeCard}>
          {newArray?.length != 0 ? (
            <BannerSlider
              onPress={item => {}}
              height1={widthPrecent(40)}
              data={newArray ? newArray : []}
              local={false}
            />
          ) : null}
        </View>
        <View>
          <FlatList
            data={
              Remediesproduct?.remedies_categories
                ? Remediesproduct?.remedies_categories
                : []
            }
            renderItem={renderItem2}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 0,
              alignSelf: 'center',
              marginTop: widthPrecent(5),
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Remedies;

const data3 = [
  {
    id: '1',
    image: require('../../../assets/image/Remid.png'),
    name: 'Bracelets',
  },
  {
    id: '2',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
  {
    id: '3',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
  {
    id: '1',
    image: require('../../../assets/image/Remid.png'),
    name: 'Bracelets',
  },
  {
    id: '2',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
  {
    id: '3',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
  {
    id: '3',
    image: require('../../../assets/image/Remid.png'),
    name: '3d-Remedies',
  },
];



// import {
//   FlatList,
//   Image,
//   ImageBackground,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, { useEffect } from 'react';
// import styles from './styles';
// import LinearGradient from 'react-native-linear-gradient';
// import { useDispatch, useSelector } from 'react-redux';
// import Imagepath from '../../../Component/Imagepath';
// import { Remedie, RemediesCategory } from '../../../Redux/Slice/HomeSlice';
// import Loader from '../../../Component/Loader';
// import { useIsFocused } from '@react-navigation/native';
// import BannerSlider from '../../../Component/Banner';
// import { widthPrecent } from '../../../Component/ResponsiveScreen/responsive';

// const Remedies = ({navigation}) => {
//   const Remediesproduct = useSelector(state => state.home?.Remedi?.data);
//   const newArray = [];
//   (Remediesproduct?.remedies_categories_banner?.[0]?.slider_items|| []).forEach(item => {
//     const updatedItem = {
//       ...item, 
//       image: `${Imagepath.Path}${item.image}`,
//     };

//     newArray.push(updatedItem);
//   });
//   const isLoading = useSelector(state => state.home?.loading);
//   const dispatch =useDispatch();

//   const RemediesProductcategory=async(item)=>{
 
//     // navigation.navigate('ProductList')
//    await dispatch(RemediesCategory({url: 'remedies-by-product',category_id:item.id,navigation,name:item.name, id:false}));
//   }

//   const focus = useIsFocused();

//   useEffect(() => {
//     if (focus) {
//       apicall();
//     }
//   }, [focus]);

//   const apicall = async () => {
   
//      await dispatch(Remedie({url: 'remedies'}));
//     // await dispatch(Service({url: 'fetch-franchise-services'}));
//     // await dispatch(CourceLis({url: 'fetch-courses', slug: 'live'}));
//   };


//   const renderItem2 = ({item}) => {
//     return (
//       <TouchableOpacity
//         onPress={() => RemediesProductcategory(item) }
//         style={[styles.cardContainer1]}>
//         <ImageBackground
//             resizeMode="contain"
//             source={{uri: `${Imagepath.Path}${item.image}`}}
//           style={{height: '100%', width: '100%'}}>
//             <LinearGradient
//             colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
//             style={{
//               position: 'absolute',
//               height: '100%',
//               width: '100%',
//             }}
//           />
//           <Text style={styles.text1}>{item.name}</Text>
//         </ImageBackground>
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerview}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}>
//             <Image
//               style={styles.backBtn}
//               source={require('../../../assets/drawer/Back1.png')}
//             />
//           </TouchableOpacity>
//           <Text style={styles.logoText}>Remedies</Text>
//         </View>
//         <TouchableOpacity   onPress={() => navigation.navigate('Home', {screen: 'MyCart'})} >
//           <Image 
//           style={styles.bagBtn}
//           source={require('../../../assets/image/Group.png')} />
//         </TouchableOpacity>
//       </View>
//       {/* {isLoading?<Loader/>:null} */}
//       <ScrollView contentContainerStyle={styles.searchContainer}>
//         {/* <View style={styles.contain1}>
//           <Image
//             style={styles.image}
//             source={require('../../../assets/image/Group1x.png')}
//           />
//         </View> */}
//          <View style={styles.welcomeCard}>
//           {newArray?.length != 0 ? (
//             <BannerSlider
//               onPress={item => {}}
//               height1={widthPrecent(40)}
//               data={newArray ? newArray : []}
//               local={false}
//             />
//           ) : null}
//         </View>
//         <View >     
//             <FlatList
//           data={Remediesproduct?.remedies_categories?Remediesproduct?.remedies_categories:[]}
//           renderItem={renderItem2}
//           numColumns={2}
//           keyExtractor={item => item.id}
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{paddingHorizontal: 0, alignSelf: 'center',marginTop:widthPrecent(5)}}
//         />
//         </View>
 
//       </ScrollView>
    
//     </View>
//   );
// };

// export default Remedies;

// const data3 = [
//   {
//     id: '1',
//     image: require('../../../assets/image/Remid.png'),
//     name: 'Bracelets',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
//   {
//     id: '1',
//     image: require('../../../assets/image/Remid.png'),
//     name: 'Bracelets',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
//   {
//     id: '3',
//     image: require('../../../assets/image/Remid.png'),
//     name: '3d-Remedies',
//   },
// ];
