import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import CustomText from './CustomText';
import {TextInput} from 'react-native';
import {moderateScale} from '../../scalling';
import {colors} from '../../colors';
import {fontSize} from '../../fontSize';
import {DownArrow} from '../../assets/svgIcon';
import {fonts} from '../../assets/fonts/fonts';

const AddressInput = ({
  label,
  onChangeText,
  value,
  dropdown,
  keyboardType,
  onPress,
  maxLength,
}) => {
  return (
    <View style={{marginTop: 15, width: '100%'}}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'height' : 'position'}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPress}
          disabled={dropdown ? false : true}
          style={{
            borderWidth: 1,
            borderColor: colors.lightGrey,
            marginTop: 5,
            // borderRadius: 12,
            paddingHorizontal: 10,
            height: moderateScale(60),
            flexDirection: dropdown ? 'row' : 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {!dropdown ? (
            <TextInput
              keyboardType={keyboardType} //keyboardType
              onChangeText={onChangeText}
              placeholderTextColor={colors.grey}
              value={value}
              style={{
                height: '100%',
                color: colors['black'],
                fontSize: fontSize.Sixteen,
                width: '100%',
                fontFamily: fonts.OpenSans_Medium,
              }}
              placeholder={label}
              maxLength={maxLength}
            />
          ) : (
            <>
              <CustomText
                style={{
                  fontSize: fontSize.Sixteen,
                  marginLeft: 5,
                  color: value == '' ? colors.grey : colors.black,
                  fontFamily: fonts.OpenSans_Medium,
                }}>
                {value == '' ? label : value}
              </CustomText>
              <View style={{marginRight: 5}}>
                <DownArrow />
              </View>
            </>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default AddressInput;
