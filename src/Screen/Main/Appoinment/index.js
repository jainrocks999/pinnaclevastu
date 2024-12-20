import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';
import styles from './styles';

import { Rating } from 'react-native-ratings';
import { heightPercent } from '../../../Component/ResponsiveScreen/responsive';

const upcomingAppointments = [
  {
    id: '1',
    title: 'Residential Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '02:30 PM',
    image: require('../../../assets/otherApp/upcomings2.png'),
  },
  {
    id: '2',
    title: 'Industrial Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    image: require('../../../assets/otherApp/upcomings1.png'),
  },
  {
    id: '3',
    title: 'Gemstone',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    image: require('../../../assets/otherApp/upcomings3.png'),
  },
];

const completedAppointments = [
  {
    id: '4',
    title: 'Shreni Rajbhandary - Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '02:30 PM',
    reviews: '5 Reviews',
    image: require('../../../assets/otherApp/upcomings2.png'),
  },
  {
    id: '5',
    title: 'Industrial Vastu',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    reviews: '5 Reviews',
    image: require('../../../assets/otherApp/upcomings1.png'),
  },
  {
    id: '6',
    title: 'Gemstone',
    title1: 'Appointment',
    date: '25 Jan 2024',
    time: '07:00 PM',
    reviews: '5 Reviews',
    image: require('../../../assets/otherApp/upcomings3.png'),
  },
];

const Appointment = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Upcoming');
  const [appointmentsData, setAppointmentsData] = useState(upcomingAppointments);
  const [sessionOver, setSessionOver] = useState(true);

  const handleTabClick = tab => {
    setSelectedTab(tab);
    if (tab === 'Upcoming') {
      setAppointmentsData(upcomingAppointments);
    } else {
      setAppointmentsData(completedAppointments);
    }
  };


  const renderAppointment = ({ item }) => (
    <TouchableOpacity
      style={styles.appointmentContainer}
      onPress={() => navigation.navigate('AppoinmentDetail')}
    >
      <Image source={item.image} style={styles.appointmentImage} />
      <View style={styles.appointmentDetails}>
        <Text
          style={[
            styles.appointmentTitle,
            selectedTab === 'Upcoming' && styles.upcomingTitleStyle, 
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.appointmentTitle1,
            selectedTab === 'Upcoming' && styles.upcomingTitle1Style, // Conditional style
          ]}
        >
          {item.title1}
        </Text>
        <View style={styles.direction1}>
          <Image
            source={require('../../../assets/image/cale.png')}
            style={styles.dateimg}
          />
          <Text
            style={[
              styles.appointmentDate,
              selectedTab === 'Completed' && styles.redText,
              selectedTab === 'Upcoming' && styles.upcomingDateStyle, // Conditional styling for date
            ]}
          >
            {item.date}
          </Text>
        </View>
        <View style={styles.direction1}>
          <Image
            source={require('../../../assets/image/Layer.png')}
            style={styles.dateimg}
          />
          <Text
            style={[
              styles.appointmentTime,
              selectedTab === 'Completed' && styles.redText,
              selectedTab === 'Upcoming' && styles.upcomingTimeStyle, // Conditional styling for time
            ]}
          >
            {item.time}
          </Text>
        </View>
        {selectedTab === 'Completed' && (
          <View style={styles.reviewContainer}>
          {sessionOver ? (
              <View style={styles.cardStar}>
                <Rating
                  type="custom"
                  ratingColor="#52B1E9"
                  // readonly={true} 
                  startingValue={5}
                  tintColor='#fff'
                  imageSize={12}
                  style={styles.starContainer}
                />
                <Text style={styles.ratingText}> 5 reviews</Text>
              </View>
            ) : null}
          </View>
        )}
      </View>
      <View style={styles.arrowButton}>
        <Image
          source={require('../../../assets/otherApp/arrowcom.png')}
          // style={styles.arrowIcon}
          style={[
            styles.arrowIcon,
            selectedTab === 'Upcoming' && styles.arrowIconup, 
          ]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            style={{ height: 20, width: 30 }}
            // onPress={() =>
            //   navigation.reset({
            //     index: 0,
            //     routes: [{name: 'UserProfile'}],
            //   })}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={{ height: 15, width: 10 }}
              source={require('../../../assets/drawer/Back.png')}
            />
          </TouchableOpacity>
          <Text style={styles.logoText}>Appointments</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 ,paddingBottom:heightPercent(10)}}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Upcoming' && styles.activeTab]}
            onPress={() => handleTabClick('Upcoming')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Upcoming' && styles.activeTabText,
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'Completed' && styles.activeTab]}
            onPress={() => handleTabClick('Completed')}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === 'Completed' && styles.activeTabText,
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={appointmentsData}
          renderItem={renderAppointment}
          keyExtractor={item => item.id}
        />
      </ScrollView>
     
    </View>
  );
};

export default Appointment;
