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

const Remedies = ({navigation}) => {
  const renderItem2 = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductList')}
        style={[styles.cardContainer1]}>
        <ImageBackground
          source={item.image}
          style={{height: '100%', width: '100%'}}>
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
      <ScrollView contentContainerStyle={styles.searchContainer}>
        <View style={styles.contain1}>
          <Image
            style={styles.image}
            source={require('../../../assets/image/Group1x.png')}
          />
        </View>
        <FlatList
          data={data3}
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
