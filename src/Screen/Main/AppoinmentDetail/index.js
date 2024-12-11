import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Rating} from 'react-native-ratings';

import {widthPrecent} from '../../../Component/ResponsiveScreen/responsive';

const AppointmentDetails = ({ navigation }) => {
  const [sessionOver, setSessionOver] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.backBtn}
              source={require('../../../assets/drawer/Back1.png')}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Residential Vastu</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.ProfileInfoSection}>
          <View style={styles.imageSection}>
            <Image
              style={styles.mainImg}
              source={require('../../../assets/otherApp/circleimg.png')}
            />
          </View>
          <View style={styles.InfoSection}>
            <Text style={styles.nameText}>
              <Text style={{color: '#F4996C'}}> Shreni Rajbhandary </Text>{' '}
              Residential Vastu
            </Text>

            <Text style={styles.sectionText}>Appointment</Text>
            <View style={styles.dateInfoContainer}>
              <Image
                style={styles.ImgIcon}
                source={require('../../../assets/image/cale.png')}
              />
              <Text
                style={[
                  styles.dateText,
                  {color: sessionOver ? '#F50E0E' : '#52B1E9'},
                ]}>
                25 Jan 2024
              </Text>
            </View>

            <View style={styles.dateInfoContainer}>
              <Image
                style={styles.ImgIcon}
                source={require('../../../assets/image/Layer.png')}
              />
              <Text
                style={[
                  styles.dateText,
                  {color: sessionOver ? '#F50E0E' : '#52B1E9'},
                ]}>
                02.30 PM
              </Text>
            </View>

            {sessionOver ? (
              <View style={styles.cardStar}>
                <Rating
                  type="custom"
                  ratingColor="#52B1E9"
                  // readonly={true}
                  startingValue={5}
                  tintColor="#F5FAFF"
                  imageSize={widthPrecent(3.5)}
                  style={styles.starContainer}
                />
                <Text style={styles.ratingText}> 5 reviews</Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.nameText, {textAlign: 'left'}]}>
            About Residential Vastu
          </Text>
          <Text style={styles.smallText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>

        {sessionOver ? (
          <View style={styles.reviewForm}>
            <Text style={styles.formHeadText}>Review Form</Text>
            <Text style={styles.lableText}>Title</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="Title"
                placeholderTextColor={'#D2D2D2'}
                style={styles.textInput}
              />
            </View>
            <Text style={styles.lableText}>Rate</Text>
            <View style={styles.textInputContainer}>
              <TextInput
                placeholder="How would you rate this services"
                placeholderTextColor={'#D2D2D2'}
                style={styles.textInput}
              />
              <View style={{marginLeft: 14}}>
                <Rating
                  type="custom"
                  ratingColor="#4A4A4A"
                  minValue={5}
                  tintColor="#FFFFFF"
                  ratingCount={5}
                  imageSize={20}
                  style={styles.starContainer}
                />
              </View>
            </View>
            <Text style={styles.lableText}>Write a Review</Text>
            <View style={[styles.textInputContainer, styles.heightInput]}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor={'#D2D2D2'}
                style={styles.textInput}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn}>
              <Text style={styles.btext1}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
     
    </View>
  );
};

export default AppointmentDetails;
