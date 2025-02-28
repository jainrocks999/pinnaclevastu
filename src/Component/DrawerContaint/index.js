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
  Animated,
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
import {SvgUri} from 'react-native-svg';

const Drawer = props => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [visible, setVisibles] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const data = useSelector(state => state?.HomeBanner?.our_services);
  const service = useSelector(state => state?.drawerSlice?.Data);

  const [expandedItem, setExpandedItem] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const services_Imgs = useSelector(state => state?.HomeBanner?.our_services);
  const toggleExpand = title => {
    if (expandedItem === title) {
      setExpandedItem(null);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      setExpandedItem(title);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const emptyItems = [];
  const nonEmptyItems = [];

  service?.sidebarMenu?.forEach(item => {
    if (item.items.length > 0) {
      nonEmptyItems.push(item);
    } else {
      emptyItems.push(item);
    }
  });

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
      onPress={() => {
        navigation.navigate('Home', {
          screen: 'Home1',
          params: {
            screen: 'Consultancy',
            params: {
              shopifyName: item.title,
            },
          },
        });
      }}>
      {/* <View style={styles.rowContent}> */}

      {item?.CardImage?.toLowerCase()?.endsWith('.svg') ? (
        <View style={styles.icon}>
          <SvgUri width="100%" height="100%" uri={item?.CardImage} />
        </View>
      ) : (
        <Image
          style={styles.icon}
          source={{uri: `${item?.CardImage}`}}
          resizeMode="contain"
        />
      )}

      <Text style={styles.listText}>{item.title}</Text>
      {/* </View> */}
      {/* {item.isSpecial && (
        <Image source={require('../../assets/drawer/right.png')} />
      )} */}
    </TouchableOpacity>
  );

  const renderItem1 = ({item}) => {
    const isExpanded = expandedItem === item.title;
    return (
      <View style={item.title != 'Courses' ? styles.listContainer : null}>
        <TouchableOpacity
          style={
            item.title === 'Courses'
              ? styles.coursesListRow
              : styles.specialListRow
          }
          onPress={() => toggleExpand(item.title)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.icon}
              source={
                item.title === 'Courses'
                  ? require('../../assets/drawer/Icon.png')
                  : require('../../assets/drawer/app.png')
              }
            />
            <Text
              style={[
                styles.listText,
                item.title === 'Courses' ? {color: 'white'} : {},
              ]}>
              {item.title}
            </Text>
          </View>
          <Image
            style={
              item.title === 'Courses'
                ? {tintColor: '#fff', marginRight: 4}
                : {}
            }
            source={require('../../assets/drawer/right.png')}
          />
        </TouchableOpacity>
        {isExpanded && (
          <Animated.View
            style={[
              styles.specialListRow,
              {
                maxHeight: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                }),
              },
            ]}>
            {item.items.map(subItem => (
              <Text key={subItem.id} style={styles.listText}>
                {subItem.title}
              </Text>
            ))}
          </Animated.View>
        )}
      </View>
    );
  };

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
            // data={emptyItems ? emptyItems : []}
            data={
              emptyItems
                ? emptyItems.map((item, index) => ({
                    ...item,
                    CardImage: services_Imgs[index]?.CardImage, // Add CardImage from services_Imgs
                  }))
                : []
            }
            renderItem={renderItem}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
          {/* <TouchableOpacity style={styles.specialListRow}>
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
          </TouchableOpacity> */}
        </View>
        <FlatList
          data={nonEmptyItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem1}
        />
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </ScrollView>

      <View style={styles.sections}>
        <FlatList
          data={service?.sidebarMenuLinks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.extraListItem}>
              <Text
                style={[
                  styles.extraListText,
                  {
                    color:
                      item?.title == 'Numerology Calculator'
                        ? '#C2961E'
                        : item?.title == 'Lucky Gemstone!'
                        ? colors.drawertitle
                        : '#1F5822',
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* <TouchableOpacity style={styles.extraListItem}>
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
        </TouchableOpacity> */}
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
