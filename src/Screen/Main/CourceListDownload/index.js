import React, {useEffect, useState} from 'react';

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import Collapsible from 'react-native-collapsible';

import styles from './styles';
import {colors} from '../../../Component/colors';
import {
  heightPercent,
  widthPrecent,
} from '../../../Component/ResponsiveScreen/responsive';
import WebView from 'react-native-webview';
import axios from 'axios';
import Loader from '../../../Component/Loader';
const {width} = Dimensions.get('window');

// const dummyDatas = [
//   {
//     id: '1',
//     title0: '01',
//     title: 'Astro Vastu Classes',
//     subItems: [
//       {
//         title: 'Class 01',
//         subtitle: 'video',
//         video:
//           'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//       },
//       {
//         title: 'Class 02',
//         subtitle: 'video',
//         video:
//           'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//       },
//       {
//         title: 'Class 03',
//         subtitle: 'video',
//         video:
//           'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
//       },
//       {
//         title: 'Class 04',
//         subtitle: 'video',
//         video:
//           'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//       },
//       {
//         title: 'Class 05',
//         subtitle: 'video',
//         video:
//           'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
//       },
//     ],
//   },
//   {
//     id: '2',
//     title0: '02',
//     title: 'Astro - Vastu Course Material',
//     subItems: [
//       {title: 'Class 01', subtitle: 'video'},
//       {title: 'Class 02', subtitle: 'video'},
//       {title: 'Class 03', subtitle: 'video'},
//       {title: 'Class 04', subtitle: 'video'},
//       {title: 'Class 05', subtitle: 'video'},
//       {title: 'Class 06', subtitle: 'video'},
//       {title: 'Class 07', subtitle: 'video'},
//       {title: 'Class 08', subtitle: 'video'},
//     ],
//   },
//   {
//     id: '3',
//     title0: '03',
//     title: 'Doubt Class',
//     subItems: [
//       {title: 'Class 01', subtitle: 'video'},
//       {title: 'Class 02', subtitle: 'video'},
//       {title: 'Class 03', subtitle: 'video'},
//       {title: 'Class 04', subtitle: 'video'},
//       {title: 'Class 05', subtitle: 'video'},
//       {title: 'Class 06', subtitle: 'video'},
//       {title: 'Class 07', subtitle: 'video'},
//       {title: 'Class 08', subtitle: 'video'},
//     ],
//   },
// ];

const CourceListDownload = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videoUri, setVideoUri] = useState('');

  const [selectedTab, setSelectedTab] = useState('Curriculum');
  const [expandedSection, setExpandedSection] = useState(null);

  const [tutorialData, setTutorialData] = useState([]);

  const toggleSection = index => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const placeholderText = 'Search';
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    const startAnimation = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < placeholderText.length) {
          setDisplayedText(placeholderText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          currentIndex = 0;
          setDisplayedText('');
        }
      }, 450);

      return intervalId;
    };

    const intervalId = startAnimation();

    return () => clearInterval(intervalId);
  }, [placeholderText]);

  useEffect(() => {
    apicall();
  }, []);

  const apicall = async () => {
    try {
      setIsLoading(true);
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://pinnaclevastuconsultants.edmingle.com/nuSource/api/v1/public/tutor/class/curriculum/61780?institution_bundle_id=65841`,
        headers: {
          ORGID: '5396',
        },
      };

      const response = await axios.request(config);

      if (response.status == 200) {
        setTutorialData(response?.data?.course_curriculum);
        console.log('response data cource ', tutorialData.resources);
        // return response?.data;
      } else {
        // Toast.show(response.data.msg);
        console.log('Unexpected response status:', response);
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error('Error in API call:', error);
    }
  };
  // console.log(tutorialData, 'asdmlkasdmlasd');

  const openVideoModel = item => {
    if (item.video && item.video !== '') {
      setVideoUri(item?.video);
      setIsModalVisible(true);
    }
    console.log(videoUri, 'sdjsdkdkal');
  };

  const renderSubItems = ({item, index}) => (
    <View style={styles.singleSubItem}>
      {/* {console.log(item,"sandeep,.....")} */}
      <View style={[styles.direction]}>
        <TouchableOpacity onPress={() => openVideoModel(item)}>
          <Image
            source={
              item.type?.includes('mp4')
                ? require('../../../assets/otherApp/vedio.png')
                : item.type?.includes('pdf')
                ? require('../../../assets/otherApp/fileIcon.png')
                : null
            }
            // Replace with your icon
            style={styles.subItemIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.subItemTitle}>{item.material_name}</Text>
          <Text style={styles.subItemSubtitle}>
            {item.type?.includes('mp4')
              ? 'Video'
              : item.type?.includes('pdf')
              ? 'PDF'
              : null}
          </Text>
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

  const renderItems = ({item, index}) => (
    <View>
      {/* {console.log(item, 'assasdkmlsa')} */}
      <TouchableOpacity
        onPress={() => toggleSection(index)}
        style={[
          styles.courseToggle1,
          expandedSection === index && styles.activeCourseToggle,
        ]}>
        <View style={styles.direction}>
          <Text
            style={[
              styles.coursetext1,
              expandedSection === index && styles.activeTitleColor1,
            ]}>
            {(index + 1).toString().padStart(2, '0')}
          </Text>
          <Text
            style={[
              styles.coursetext2,
              expandedSection === index && styles.activeTitleColor,
            ]}>
            {item.section_name}
          </Text>
        </View>

        <Image
          source={
            expandedSection === index
              ? require('../../../assets/otherApp/updown.png')
              : require('../../../assets/image/arrow_icon.png')
          }
          style={[
            styles.toggleIcon2,
            expandedSection === index && styles.toggleIcon23,
          ]}
        />
      </TouchableOpacity>

      <Collapsible collapsed={expandedSection !== index}>
        <View style={styles.subItemContainer}>
          <View style={{backgroundColor: '#EAEAEA', height: 1}} />
          <FlatList
            data={item.resources}
            scrollEnabled={false}
            keyExtractor={(item, index) =>
              item.material_id?.toString() || index.toString()
            }
            renderItem={renderSubItems}
          />
        </View>
      </Collapsible>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setExpandedSection(null);
            navigation.goBack();
          }}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
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
      {isLoading?<Loader/>:null}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: widthPrecent(25),
          marginTop: 15,
        }}>
        <View style={styles.searchContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => console.log('khlkljh')}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Image source={require('../../../assets/image/SearchIcon.png')} />
            </TouchableOpacity>

            <TextInput
              style={styles.searchInput}
              placeholder={displayedText}
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
          data={tutorialData?.resources}
          // keyExtractor={index => index.toString()}
          keyExtractor={(item, index) =>
            item.section_id?.toString() || index.toString()
          }
          renderItem={renderItems}
          scrollEnabled={false}
          contentContainerStyle={{gap: 10}}
        />
      </ScrollView>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        // onConfirm={() => removerItem(itemToRemove)}
      >
        <View style={styles.modalOverlay} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.modelBackBtn}
            onPress={() => setIsModalVisible(false)}>
            <Image
              source={require('../../../assets/otherApp/arrowBack.png')}
              style={styles.modelBackIcon}
            />
          </TouchableOpacity>
          <WebView
            source={{
              uri: videoUri,
            }}
            style={styles.modalContent}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            allowsFullscreenVideo={true}
          />
        </View>
      </Modal>
    </View>
  );
};

export default CourceListDownload;
