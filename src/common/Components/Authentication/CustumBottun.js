import {TouchableOpacity} from 'react-native';
import CustomText from '../CustomText';
import {fonts} from '../../../assets/fonts/fonts';
import {colors} from '../../../colors';
import {fontSize} from '../../../fontSize';

const Button = ({title, onPress, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        {
          width: '100%',
          height: 43,
          paddingLeft: 10,
          width: '60%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.black,
          marginTop: 30,
          alignSelf: 'center',
        },
        style,
      ]}>
      <CustomText
        fontFamily={fonts.OpenSans_SemiBold}
        size={fontSize.Fifteen}
        color={colors.white}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};
export default Button;
