import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {colors} from '../../../Component/colors';
import {fontSize} from '../../../Component/fontsize';
import SelectModal from '../../../Component/dropdown';
import {Checkbox} from 'react-native-paper';

const ResidentalScreen = ({navigation}) => {
  const [isResident,setIsresident]=useState(true)
  const [isIndustrial,setIsindustrial]=useState(false)
  const [isGemstone,setIsGemstone]=useState(false)

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: '',
    value: '',
  });

  const [companyName, setCompanyName] = useState('');
  const [search, setSearch] = useState('');
  const onSelect = item => {
    setSelectedItem(item);
    setCompanyName(item.label);
    setVisible(false);
  };

  const data = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Transgender', value: 'Transgender'},
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.backBtn}
            source={require('../../../assets/drawer/Back1.png')}
          />
        </TouchableOpacity>

        <View style={styles.headerview}>
          <Text style={styles.logoText}>Make a Appointment</Text>
        </View>
      </View>

      <SelectModal
        search={search}
        data={data}
        setSearch={setSearch}
        visible={visible}
        onSelect={onSelect}
        onClose={value => setVisible(value)}
      />
      <ScrollView contentContainerStyle={styles.servicesContainer}>
        <View style={[styles.cardContainer2]}>
          <Text
            style={[
              styles.service,
              styles.widthOfSevices1,
              {fontSize: fontSize.Fifteen},
            ]}>
            Services
          </Text>
          <View>
            <View style={styles.serviceSection}>
              <View
                style={[
                  styles.checkboxWrapper,
                  isResident && styles.checkedBackground
                ]}>
                <Checkbox
                  status={isResident ? 'checked' : 'unchecked'}
                  onPress={() => setIsresident(!isResident)}
                  color="#FFF"
                  uncheckedColor="#DFE7EF"
                />
              </View>

              <Text style={styles.labelText}>Residential Vastu</Text>
              <Text style={styles.priceText}>₹ 5000</Text>
            </View>
            <View
              style={[
                styles.serviceSection,
                {
                  borderColor: colors.lightGrey,
                  borderTopWidth: 0.5,
                  borderBottomWidth: 0.5,
                },
              ]}>
              <View
                style={[
                  styles.checkboxWrapper,
                  isIndustrial && styles.checkedBackground
                ]}>
                <Checkbox
                  status={isIndustrial ? 'checked' : 'unchecked'}
                  onPress={() => setIsindustrial(!isIndustrial)}
                  color="#FFF"
                  uncheckedColor="#DFE7EF"
                />
              </View>

              <Text style={styles.labelText}>Industrial Vastu</Text>
              <Text style={styles.priceText}>₹ 25000</Text>
            </View>

            <View style={styles.serviceSection}>
            <View
                style={[
                  styles.checkboxWrapper,
                  isGemstone ?styles.checkedBackground:null,
                ]}>
                <Checkbox
              
                  status={isGemstone ? 'checked' : 'unchecked'}
                  onPress={() => setIsGemstone(!isGemstone)}
                  color="#FFF"
                  uncheckedColor="#DFE7EF"
                />
              </View>
              <Text style={styles.labelText}>Gemstone</Text>
              <Text style={styles.priceText}>₹ 500</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardContainer2}>
          <Text style={[styles.service, {fontSize: fontSize.Fifteen}]}>
            Personal Detail
          </Text>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Full Name*</Text>
            <TextInput
              style={[styles.input, {elevation: 5}]}
              placeholder="Name"
              placeholderTextColor={colors.placeholder}
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Email*</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Mobile Number*</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={colors.placeholder}
              maxLength={10}
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Gender*</Text>

            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={{
                  color: companyName ? colors.heading : colors.placeholder,
                  fontSize: fontSize.Fifteen,
                  // marginTop: 2,
                  fontFamily: 'Poppins-Regular',
                }}>
                {companyName == '' ? 'Gender' : companyName}
              </Text>
              <Image
                style={{
                  height: 8,
                  width: 15,
                }}
                source={require('../../../assets/image/arrow_icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Current City Pincode*</Text>
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              placeholderTextColor={colors.placeholder}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Date of Birth</Text>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                style={styles.input1}
                placeholder="Date of Birth"
                placeholderTextColor={colors.placeholder}
                keyboardType="number-pad"
              />
              <Image source={require('../../../assets/image/cale.png')} />
            </View>
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Time of Birth</Text>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}>
              <TextInput
                style={styles.input1}
                placeholder="Time of Birth"
                placeholderTextColor={colors.placeholder}
                keyboardType="number-pad"
              />
              <Image
                style={{
                  height: 20,
                  width: 20,
                }}
                source={require('../../../assets/image/Layer.png')}
              />
            </View>
          </View>

          <View style={styles.inputmain}>
            <Text style={styles.title2}>Place of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Place of Birth"
              placeholderTextColor={colors.placeholder}
            />
          </View>
          <View style={styles.inputmain}>
            <Text style={styles.title2}>Additional Information Message</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Type here..."
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Payment', {data1: 'Residental'})}
          style={styles.book}>
          <Text style={styles.btext1}>SUBMIT</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <ButtomTab /> */}
    </View>
  );
};

export default ResidentalScreen;
