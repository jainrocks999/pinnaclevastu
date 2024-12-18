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
import React from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import Imagepath from '../../../Component/Imagepath';
import { RemediesCategory } from '../../../Redux/Sclice/HomeSclice';
import Loader from '../../../Component/Loader';

const Remedies = ({navigation}) => {
  const Remediesproduct = useSelector(state => state.home?.Remedi?.data);
  const isLoading = useSelector(state => state.home?.loading);
  const dispatch =useDispatch();

  const RemediesProductcategory=async(item)=>{
 
    // navigation.navigate('ProductList')
   await dispatch(RemediesCategory({url: 'remedies-by-product',category_id:item.id,navigation,name:item.name, id:false}));
  }




  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => RemediesProductcategory(item) }
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Remedies</Text>
        </View>
        <TouchableOpacity>
          <Image 
          style={styles.bagBtn}
          source={require('../../../assets/image/Group.png')} />
        </TouchableOpacity>
      </View>
      {isLoading?<Loader/>:null}
      <ScrollView contentContainerStyle={styles.searchContainer}>
        <View style={styles.contain1}>
          <Image
            style={styles.image}
            source={require('../../../assets/image/Group1x.png')}
          />
        </View>
        <FlatList
          data={Remediesproduct}
          renderItem={renderItem2}
          numColumns={2}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 0, alignSelf: 'center'}}
        />
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
