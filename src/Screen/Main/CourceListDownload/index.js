import React, {useState} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import {colors} from '../../../Component/colors';
import { heightPercent, widthPrecent } from '../../../Component/ResponsiveScreen/responsive';
const {width} = Dimensions.get('window');

const dummyDatas = [
  {
    id: '1',
    title0: '01',
    title: 'Astro Vastu Classes',
    subItems: [
      {title: 'Class 01', subtitle: 'video'},
      {title: 'Class 02', subtitle: 'video'},
      {title: 'Class 03', subtitle: 'video'},
      {title: 'Class 04', subtitle: 'video'},
      {title: 'Class 05', subtitle: 'video'},
      {title: 'Class 06', subtitle: 'video'},
      {title: 'Class 07', subtitle: 'video'},
      {title: 'Class 08', subtitle: 'video'},
    ],
  },
  {
    id: '2',
    title0: '02',
    title: 'Astro - Vastu Course Material',
    subItems: [
      {title: 'Class 01', subtitle: 'video'},
      {title: 'Class 02', subtitle: 'video'},
      {title: 'Class 03', subtitle: 'video'},
      {title: 'Class 04', subtitle: 'video'},
      {title: 'Class 05', subtitle: 'video'},
      {title: 'Class 06', subtitle: 'video'},
      {title: 'Class 07', subtitle: 'video'},
      {title: 'Class 08', subtitle: 'video'},
    ],
  },
  {
    id: '3',
    title0: '03',
    title: 'Doubt Class',
    subItems: [
      {title: 'Class 01', subtitle: 'video'},
      {title: 'Class 02', subtitle: 'video'},
      {title: 'Class 03', subtitle: 'video'},
      {title: 'Class 04', subtitle: 'video'},
      {title: 'Class 05', subtitle: 'video'},
      {title: 'Class 06', subtitle: 'video'},
      {title: 'Class 07', subtitle: 'video'},
      {title: 'Class 08', subtitle: 'video'},
    ],
  },
];

const CourceListDownload = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Curriculum');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
  };

  const renderSubItems = ({item}) => (
    <View style={styles.singleSubItem}>
      <View style={[styles.direction, {}]}>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/otherApp/vedio.png')} // Replace with your icon
            style={styles.subItemIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.subItemTitle}>{item.title}</Text>
          <Text style={styles.subItemSubtitle}>{item.subtitle}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.downloadIconContainer}>
        <Image
          source={require('../../../assets/otherApp/download.png')} // Replace with your icon
          style={styles.subItemDownloadIcon}
        />
      </TouchableOpacity>
    </View>
  );

  const renderItems = ({item}) => (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => toggleSection(item.id)}
        style={[
          styles.courseToggle1,
          expandedSection === item.id && styles.activeCourseToggle,
        ]}>
        <View style={styles.direction}>
          <Text
            style={[
              styles.coursetext1,
              expandedSection === item.id && styles.activeTitleColor1,
            ]}>
            {item.title0}
          </Text>
          <Text
            style={[
              styles.coursetext2,
              expandedSection === item.id && styles.activeTitleColor,
            ]}>
            {item.title}
          </Text>
        </View>

        <Image
          source={
            expandedSection === item.id
              ? require('../../../assets/otherApp/updown.png')
              : require('../../../assets/image/arrow_icon.png')
          }
          style={[
            styles.toggleIcon2,
            expandedSection === item.id && styles.toggleIcon23,
          ]}
        />
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== item.id}>
        <View style={styles.subItemContainer}>
          <View style={{backgroundColor: '#EAEAEA', height: 1}} />
          <FlatList
            data={item.subItems}
            keyExtractor={(subItem, index) => index.toString()}
            renderItem={renderSubItems}
          />
        </View>
      </Collapsible>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>
            {' '}
            Advance Vastu Course - 20 Nov 2024
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom:widthPrecent(25),
          marginTop: 15,
        }}>
   
         <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../../../assets/image/SearchIcon.png')} />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
              placeholderTextColor={colors.searchBarTextColor}
            />
          </View>
        </View>
        <View style={styles.tabContainer}>
          {['Curriculum', 'Class Records', 'Announcements'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setSelectedTab(tab)}>
              <Text
                style={[
                  styles.tabButtonText,
                  selectedTab === tab && styles.activeTabButtonText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={dummyDatas}
          keyExtractor={item => item.id}
          renderItem={renderItems}
          contentContainerStyle={{gap: 10}}
        />
      </ScrollView>
   
    </View>
  );
};

export default CourceListDownload;
