import {View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {fonts} from '../../../assets/fonts/fonts';
import { colors } from '../../../colors';

const Input = ({placeholder, value, onChangeText, secureTextEntry}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        width: '100%',
        height: 43,
        borderColor: colors.lightGrey,
        paddingLeft: 10,
        marginTop:20
      }}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.grey}
        style={{
          color: colors.black,
          flex: 1,
          fontFamily: fonts.OpenSans_Medium,
        }}
      />
    </View>
  );
};
export default Input
