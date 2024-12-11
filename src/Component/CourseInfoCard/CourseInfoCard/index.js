import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

const CourseInfoCard = () => {
  return (
    <View style={styles.section}>
      <Image
        style={styles.image}
        source={require('../../../assets//otherApp/courseCard1.png')}
      />
      <View style={styles.infoSection}>
        <Text style={styles.TitleText}>Live Course</Text>
        <View>
          <Text style={styles.subHeadText}>Date</Text>
          <Text style={styles.regularText}>20 Nov 2024</Text>
        </View>
        <View>
          <Text style={styles.subHeadText}>Time</Text>
          <Text style={styles.regularText}>6:40 to 8:30 PM</Text>
        </View>
      </View>
    </View>
  );
};

export default CourseInfoCard;
