import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  LayoutAnimation,
  Alert,
  ScrollView,
  Linking,
} from 'react-native';

import {
  useNavigation,
  DrawerActions,
  useIsFocused,
  useRoute,
} from '@react-navigation/native';
import {fontSize} from '../fontsize';
import {colors} from '../colors';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerApi} from '../../Redux/Slice/HomeSlice';
import Imagepath from '../Imagepath';

const Drawer = props => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [visible, setVisibles] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state.home?.Drawerdata?.services);
  useEffect(() => {
    apicall();
  }, []);

  const apicall = async () => {
    await dispatch(DrawerApi({url: 'draw-menu'}));
  };

  const openApp = async (url, fallbackUrl) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        if (fallbackUrl) {
          await Linking.openURL(fallbackUrl);
        } else {
          Alert.alert(
            'App Not Installed',
            'The app is not installed on your device.',
          );
        }
      }
    } catch (error) {
      // Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  const manageDashboard = () => {
    // navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Home', {
      screen: 'Home1',
      params: {screen: 'Consultancy'},
    });
  };
  const manageDashboard1 = () => {
    // navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Remedies');
  };
  const Loggout = () => {
    Alert.alert(
      'Are you sure you want to log out?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => {
            cancelable: false;
          },
          style: 'cancel',
        },
        {text: 'ok', onPress: () => Logout()},
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
    style={styles.listRow}
    // style={true ? styles.specialListRow : styles.listRow}
    // onPress={item.onPress ? item.onPress : null}
    onPress={() => {
      navigation.navigate('Home', {
        screen: 'Home1',
          params: {
            screen: 'Consultancy',
            params: {
              itemId: item?.id,
              servicesName: item?.services_name,
            },
          },
        });
      }}>
      {/* <View style={styles.rowContent}> */}
      <Image
        style={styles.icon}
        source={{uri: `${Imagepath.Path}${item?.logo}`}}
      />
      <Text style={styles.listText}>{item.services_name}</Text>
      {/* </View> */}
      {/* {item.isSpecial && (
        <Image source={require('../../assets/drawer/right.png')} />
      )} */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={require('../../assets/image/header.png')} />
        <TouchableOpacity
          style={{marginRight: -3}}
          onPress={() => props.navigation.closeDrawer()}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Image source={require('../../assets/drawer/close.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '88%',
          alignSelf: 'center',
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: '#DFE7EF',
        }}
      />
      <ScrollView>
        {/* <View style={styles.listContainer}>
          <TouchableOpacity
            onPress={() => manageDashboard()}
            style={styles.listRow}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/house.png')}
            />
            <Text style={styles.listText}>Residential Vastu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listRow}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/office.png')}
            />
            <Text style={styles.listText}>Commercial Vastu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listRow}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/industry.png')}
            />
            <Text style={styles.listText}>Industrial Vastu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listRow}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/numerology.png')}
            />
            <Text style={styles.listText}>Numerology</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listRow}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/Layer.png')}
            />
            <Text style={styles.listText}>Gemstone</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listRow}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/beads.png')}
            />
            <Text style={styles.listText}>Rudrakasha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.specialListRow}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                style={styles.icon}
                source={require('../../assets/drawer/app.png')}
              />
              <Text style={styles.listText}>{'More  '}</Text>
            </View>
            <Image source={require('../../assets/drawer/right.png')} />
          </TouchableOpacity>
        </View> */}

        <View style={styles.listContainer}>
          <FlatList
            data={data ? data : []}
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
          <TouchableOpacity style={styles.specialListRow}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Image
                style={styles.icon}
                source={require('../../assets/drawer/app.png')}
              />
              <Text style={styles.listText}>{'More  '}</Text>
            </View>
            <Image source={require('../../assets/drawer/right.png')} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.coursesListRow}
          onPress={() => {
            navigation.navigate('Home', {
              screen: 'Home1',
              params: {screen: 'Cources'},
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Image
              style={styles.icon}
              source={require('../../assets/drawer/Icon.png')}
            />
            <Text style={[styles.listText, {color: colors.white}]}>
              Courses
            </Text>
          </View>
          <Image
            style={{tintColor: '#fff', marginRight: 4}}
            source={require('../../assets/drawer/right.png')}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.sections}>
        <TouchableOpacity style={styles.extraListItem}>
          <Text style={[styles.extraListText, {color: '#C2961E'}]}>
            Numerology Calculator
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.extraListItem}>
          <Text style={[styles.extraListText, {color: colors.drawertitle}]}>
            Lucky Gemstone!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraListItem}>
          <Text style={[styles.extraListText, {color: '#1F5822'}]}>
            Astro Kundli Insights!
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.sections, {marginBottom: 0}]}>
        <View style={styles.socialLinksContainer}>
          <Text style={styles.headText}>Follow us On</Text>
          <Text style={styles.versionText}>Version 1.05.11</Text>
        </View>
        <View style={styles.socialIconContainer}>
          <TouchableOpacity
            onPress={() => openApp('fb://profile', 'https://facebook.com')}>
            <Image source={require('../../assets/drawer/fb.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openApp('instagram://app', 'https://instagram.com')}>
            <Image
              style={{marginLeft: 20}}
              source={require('../../assets/drawer/instagram.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openApp('vnd.youtube://', 'https://youtube.com')}>
            <Image
              style={{marginLeft: 20}}
              source={require('../../assets/drawer/youtube.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Drawer;
