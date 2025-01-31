import {StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingTop: 50,
  },
  main: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(12),
  },
  logoText: {
    fontSize: fontSize.Twentysix,

    color: colors.paymenttext,
    fontFamily: 'Poppins-Medium',
  },
  image: {
    height: wp(30),
    width: wp(31),
  },
  logoText1: {
    marginTop: hp(3),
    fontSize: fontSize.Sixteen,
    textDecorationLine: 'underline',
    color: '#69BE60',
    fontFamily: 'Poppins-Medium',
  },
  logoText12: {
    fontSize: fontSize.Sixteen,

    color: colors.paymenttext,
    fontFamily: 'Poppins-Regular',
  },
  book: {
    flex:1,
    backgroundColor: '#6CABF4',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '100%',
    height: wp(13),
    borderRadius: 28,
    marginTop: hp(2),
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  longMsgText: {
    fontSize: fontSize.Fifteen,
    width: '75%', 
    textAlign: 'center',
    // borderWidth:1
  },
  pressabelText:{
    color:"#6CABF4",
    textDecorationLine:"underline"
  }
});
