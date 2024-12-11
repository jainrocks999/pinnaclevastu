import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import styles from './styles';
import { colors } from '../../../Component/colors';

const CourseDetail = ({ navigation }) => {
  const images = [
    require('../../../assets/otherApp/reviewslider.png'),
    require('../../../assets/otherApp/reviewslider.png'),
    require('../../../assets/otherApp/reviewslider.png'),
    require('../../../assets/otherApp/reviewslider.png'),
    // Add more images as needed
  ];

  const dummyDatas = [
    {
      id: '1',
      title: 'Benefits to Join',
      subItems: [
        'Benefit 1: In-depth study of topic A',
        'Benefit 2: In-depth study of topic B',
        'Benefit 3: In-depth study of topic C',
      ],
    },
    {
      id: '2',
      title: 'Vastu Course Content',
      subItems: [
        'Topic 1: Introduction to Vastu',
        'Topic 2: Advanced Vastu Practices',
        'Topic 3: Practical Vastu Applications',
      ],
    },
    {
      id: '3',
      title: 'Numerology Course Content',
      subItems: [
        'Topic 1: Basics of Numerology',
        'Topic 2: Advanced Numerology Concepts',
        'Topic 3: Numerology Applications',
      ],
    },
  ];

  const dummyData = [
    {
      id: '1',
      title: 'Course Description',
      subItems: [
        '● : In-depth study of Five Elements.',
        '● : Understanding Control Cycles.',
        '● : Practical Applications.',
        '● : Practical Applications.',
        '● : Practical Applications.',
        '● : Practical Applications.',
        '● : Practical Applications.',
      ],
    },
    {
      id: '2',
      title: 'Numerology Expertise',
      subItems: ['Numerology Basics', 'Advanced Numerology Techniques'],
    },
    {
      id: '3',
      title: 'Rudraksha Science',
      subItems: ['Introduction to Rudraksha', 'Types and Significance'],
    },
  ];

  const toggleCollapsed = index => {
    setCollapsedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [collapsedStates, setCollapsedStates] = useState(
    dummyData?.map(() => true),
  ); // Initialize all collapsed
  const handleImageChange = index => {
    setCurrentIndex(index);
  };

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = sectionId => {
    setExpandedSection(prevSection =>
      prevSection === sectionId ? null : sectionId,
    );
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  const renderItems = ({ item, index  }) => (
    <View style={styles.paddings}>
              <TouchableOpacity
                onPress={() => toggleSection(item.id)}
                style={[
                  styles.courseToggle1,
                  expandedSection === item.id && styles.activeCourseToggle,
                ]}>
                <View style={styles.direction1}>

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
                  style={styles.toggleIcon2}
                />
              </TouchableOpacity>

              <Collapsible collapsed={expandedSection !== item.id}>
                <View style={styles.subItemContainer}>

                  {item.subItems.map((subItem, subIndex) => (
                    <Text key={subIndex} style={styles.subItemText}>
                      {subItem}
                    </Text>
                  ))}
                </View>

              </Collapsible>
            </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Course Detail</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.firstimgview}>
          <Image
            source={require('../../../assets/otherApp/coursedetail.png')}
            style={styles.img1}
          />
        </View>
        <View style={styles.advanceview}>
          <Text style={styles.advancetext}>Advance Vastu Course</Text>
          <Text style={styles.learntext}>
            Learn The Most Effective Numero Vastu Techniques
          </Text>
          <View style={styles.direction}>
            <Text style={styles.ruppestext}>₹ 7250.00</Text>
            <Image
              source={require('../../../assets/otherApp/share.png')}
              style={styles.shareimage}
            />
          </View>
        </View>
        <View style={styles.horizontalLine} />
        {/* Card Component */}
        <View style={styles.card}>
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Languages</Text>
            <Text style={styles.languagetext1}>Hindi, English</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Date</Text>
            <Text style={styles.languagetext1}>20 Nov 2024</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Time</Text>
            <Text style={styles.languagetext1}>6:40 to 8:30</Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.cardItem}>
            <Image
              source={require('../../../assets/otherApp/cardimg1.png')}
              style={styles.cardimg1}
            />
            <Text style={styles.languagetext}>Trained</Text>
            <Text style={styles.languagetext1}>2000+ Students</Text>
          </View>
        </View>

        <FlatList
          data={dummyData}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <View style={styles.paddings}>
              <TouchableOpacity
                onPress={() => toggleSection(item.id)}
                style={[
                  styles.courseToggle1,
                  expandedSection === item.id && styles.activeCourseToggle,
                ]}>
                <View style={styles.direction1}>

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
                  style={styles.toggleIcon2}
                />
              </TouchableOpacity>

              <Collapsible collapsed={expandedSection !== item.id}>
                <View style={styles.subItemContainer}>

                  {item.subItems.map((subItem, subIndex) => (
                    <Text key={subIndex} style={styles.subItemText}>
                      {subItem}
                    </Text>
                  ))}
                </View>

              </Collapsible>
            </View>
          )}
        />

        <View style={styles.needview}>
          <Text style={styles.needtext}>Need Help? Get in Touch</Text>
          <Text style={styles.havetext}>
            Have questions about teaching and career opportunities?
          </Text>
        </View>

        <View style={styles.whatsview}>
          <View style={styles.whatsapp}>
            <Image source={require('../../../assets/otherApp/whatsapp.png')} />
            <Text style={styles.textnumber}>+91 812 072 76 90</Text>
          </View>
          <View style={styles.call}>
            <Image source={require('../../../assets/otherApp/call.png')} />
            <Text style={styles.textnumber}>+91 812 072 76 90</Text>
          </View>
        </View>

        <View style={styles.firstimgview}>
          <Text style={styles.demotext}>Demo Lecture</Text>
          <Image
            source={require('../../../assets/otherApp/coursedetail.png')}
            style={styles.img1}
          />
        </View>
        <FlatList
          data={dummyDatas}
          keyExtractor={item => item.id}
          renderItem={renderItems}
        />

        <View style={styles.trainerview}>
          <Text style={styles.demotext}>Know Your Trainer</Text>
        </View>

        <View style={styles.knowview}>
          <View style={styles.acharyaview}>
            <Image
              source={require('../../../assets/otherApp/trainer.png')}
              style={styles.imgtrainer}
            />
          </View>
          <View>
            <Text style={styles.acharya}>Acharya Vikul Bansal,</Text>
            <Text style={styles.acharya1}>
              an exceptionally driven passionate individual who is constantly in
              pursuit to bring out and serve best with authenticity when it
              comes to occultism.
            </Text>
          </View>
        </View>

        <View style={styles.journeyview}>
          <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field.
          </Text>
          <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field began
            in year 2012 which gradually acted as a gamechanger when he realized
            the potential of occult field.
          </Text>
          <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field.
          </Text>
          <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized began in year 2012 which gradually
            acted as a gamechanger when he realized the potential of occult
            field the potential of occult field.
          </Text>
          <Text style={styles.journeytext}>
            His journey of occultism began in year 2012 which gradually acted as
            a gamechanger when he realized the potential of occult field.
          </Text>
          <Text style={styles.journeytext}>
            His journey of began in year 2012 which gradually acted as a
            gamechanger when he realized the potential of occult field occultism
            began in year 2012 which gradually acted as a gamechanger when he
            realized the potential of occult field.
          </Text>
        </View>
        <View style={styles.courseview}>
          <Text style={styles.demotext}>Course Review By Student</Text>

          <FlatList
            data={images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image source={item} style={styles.reviewImage} />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={e => {
              const contentOffsetX = e.nativeEvent.contentOffset.x;
              const currentIndex = Math.floor(
                contentOffsetX / styles.reviewImage.width,
              );
              setCurrentIndex(currentIndex);
            }}
          />

          <View style={styles.dotContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={() => handleImageChange(index)}
              />
            ))}
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <FlatList
            data={data1}
            numColumns={2} // Display items in 2 columns
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.listItem}>
          <Text style={styles.listItemText}>Advance Vastu Course at</Text>
          <Text style={styles.listitem1}>₹ 3200.00</Text>
        </View>
        {/* Join Course Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', { data1: 'Cources' })}
          style={styles.book}>
          <Text style={styles.btext1}>Join Course</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CourseDetail;

const data1 = [
  {
    id: '1',
    icon: require('../../../assets/otherApp/trusted.png'), // Replace with actual icon
    title: 'Trusted Content',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '2',
    icon: require('../../../assets/otherApp/trusted1.png'), // Replace with actual icon
    title: 'Experienced Teachers',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '3',
    icon: require('../../../assets/otherApp/trusted2.png'), // Replace with actual icon
    title: 'Lifetime Access',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
  {
    id: '4',
    icon: require('../../../assets/otherApp/trusted3.png'), // Replace with actual icon
    title: 'Certification',
    description:
      'Content specially created to understand Vastu Techniques in easy way.',
  },
];
