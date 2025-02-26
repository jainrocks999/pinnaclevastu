import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import {useIsFocused} from '@react-navigation/native';
import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';
import {fetchCategory} from '../../../Redux/Slice/collectionSlice';

const Remedies = ({navigation}) => {
  const Remediesproduct = useSelector(state => state.home?.Remedi?.data);
  const category = useSelector(state =>
    state.collection?.CategoryList?.filter(
      item => item.title !== 'Recorded Courses' && item.title !== 'Live Course',
    ),
  );
  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  // const newArray = [];
  // (
  //   Remediesproduct?.remedies_categories_banner?.[0]?.slider_items || []
  // ).forEach(item => {
  //   const updatedItem = {
  //     ...item,
  //     image: `${Imagepath.Path}${item.image}`,
  //   };

  //   newArray.push(updatedItem);
  // });
  const dispatch = useDispatch();

  const RemediesProductcategory = async item => {
    navigation.navigate('Home1', {
      screen: 'Remedie12',
      params: {
        screen: 'ProductList',
        params: {
          item: item,
          Id: false,
        },
      },
    });
  };

  const focus = useIsFocused();

  useEffect(() => {
    if (focus) {
      apicall();
    }
  }, [focus]);

  const apicall = async () => {
    await dispatch(fetchCategory());
  };

  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => RemediesProductcategory(item)}
        style={[styles.cardContainer1]}>
        <ImageBackground
          
          source={
            item?.image
              ? {uri: item?.image?.url}
              : require('../../../assets/image/Remedies/Image-not.png')
          }
          style={{height: '100%', width: '100%'}}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.75)']}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
            }}
          />
          <Text style={styles.text1}>{item.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Remedies</Text>
        </View>
        <TouchableOpacity
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <Image
            style={styles.bagBtn}
            source={require('../../../assets/image/small_bag.png')}
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.searchContainer}>
        <View style={styles.contain1}>
          <Image
            style={styles.image}
            source={require('../../../assets/image/Group1x.png')}
          />
        </View>
        
        <View>
          <FlatList
            data={category ? category : []}
            renderItem={renderItem2}
            numColumns={2}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
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


