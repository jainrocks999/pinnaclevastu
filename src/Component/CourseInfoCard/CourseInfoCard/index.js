import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Imagepath from '../../Imagepath';

const CourseInfoCard = ({data}) => {
  return (
    <View style={styles.section}>

     
    
      <Image
        style={styles.image}

        source={
          data?.image
            ? {uri: `${Imagepath.Path}${data?.image}`}
            : require('../../../assets//otherApp/courseCard1.png')
        }
        
      />
      <View style={styles.infoSection}>
        <Text style={styles.TitleText}>{data?.category?.name}</Text>
        <View>
          <Text style={styles.subHeadText}>Date</Text>
          <Text style={styles.regularText}>{data?.start_date}</Text>
        </View>
        <View>
          {data?.start_time?(
            <>
          <Text style={styles.subHeadText}>Time</Text>
          <Text style={styles.regularText}>{`${data?.start_time} to ${data?.end_time}`}</Text>
          </>  ) :null}
          </View>
      </View>
    </View>
  );
};

export default CourseInfoCard;
