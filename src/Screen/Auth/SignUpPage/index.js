import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {colors} from '../../../Component/colors';
import SelectModal from '../../../Component/dropdown';
import {useNavigation} from '@react-navigation/native';
import {fontSize} from '../../../Component/fontsize';
const SignUpPage = () => {
  const [setdata, setSedata] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    label: '',
    value: '',
  });
  const navigation = useNavigation();
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
      <SelectModal
        search={search}
        data={data}
        setSearch={setSearch}
        visible={visible}
        onSelect={onSelect}
        onClose={value => setVisible(value)}
      />
      <ScrollView
        contentContainerStyle={styles.main1} // Added to fix scrolling
        keyboardShouldPersistTaps="handled" // Dismisses keyboard on tap outside
      >
        <View style={styles.subt}>
          <Text style={styles.title}>Sign up</Text>

          <Text style={styles.title1}>{'Hello there !\nwelcome to you.'}</Text>
        </View>
           
<View style={{paddingHorizontal:5}}>

        <View style={styles.inputmain}>
          <Text style={styles.title2}>Full Name*</Text>
          <View style={[styles.input, styles.inputShadow]}>
            <TextInput
              style={styles.inputText}
              placeholder="Name"
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Email*</Text>
          <View style={[styles.input, styles.inputShadow]}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Mobile Number*</Text>
          <View style={[styles.input, styles.inputShadow]}>
            <TextInput
              style={styles.inputText}
              placeholder="Mobile Number"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
            />
          </View>
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Gender*</Text>

          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={[
              styles.input,
              styles.inputShadow,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={{
                color: companyName ? '#000' : colors.placeholder,
                fontSize: fontSize.Sixteen,
                // marginTop: 2,
                fontFamily: 'Poppins-Regular',
              }}>
              {companyName ? companyName : 'Gender'}
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
          <View style={[styles.input, styles.inputShadow]}>
            <TextInput
              style={styles.inputText}
              placeholder="Current City Pincode"
              placeholderTextColor={colors.placeholder}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputmain}>
          <Text style={styles.title2}>Date of Birth</Text>
          <View
            style={[
              styles.input,
              styles.inputShadow,
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
            <Image
              style={{
                height: 20,
                width: 20,
              }}
              source={require('../../../assets/image/cale.png')}
            />
          </View>
        </View>

        <View style={styles.inputmain}>
          <Text style={styles.title2}>Time of Birth</Text>
          <View
            style={[
              styles.input,
              styles.inputShadow,
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
          <View style={[styles.input, styles.inputShadow]}>
            <TextInput
              style={styles.inputText}
              placeholder="Place of Birth"
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>
        <View style={styles.inputmain}>
          <Text style={styles.title2}>Upload Photo</Text>
          <View
            style={[
              styles.input,
              styles.inputShadow,
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              },
            ]}>
            <TextInput
              style={styles.input1}
              placeholder="Upload Photo"
              placeholderTextColor={colors.placeholder}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('OTP')}
              style={styles.buttoncontainer1}>
              <Text style={[styles.btext, {fontSize: fontSize.Fourteen}]}>
                {'Browse'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.uppload}>Maximum upload file size 2mb.</Text>
        </View>
        <View >
          <TouchableOpacity
            onPress={() => navigation.navigate('OTP')}
            style={styles.buttoncontainer}>
            <Text style={styles.btext}>{'SUBMIT'}</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpPage;
