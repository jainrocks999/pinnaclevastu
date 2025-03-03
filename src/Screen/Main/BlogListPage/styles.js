import {StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F6F6F6',
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.white,
    elevation: 3,
  },
  headerview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  itemCount: {
    backgroundColor: '#EF6024',
    borderRadius: 10,
    zIndex: 1,
    bottom: -10,
    left: 7,
    height: 15,
    marginTop: -15,
    width: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    fontSize: fontSize.Ten,
  },
  cardInfo: {
    padding: 15,
    gap: 6,
  },
  scroll: {
   
    flexGrow: 1,
    paddingBottom:hp(30)
  },
  viewinner:{
    alignItems:'center',
    justifyContent:'center'
  },
  viewinner1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: hp(2),
     marginTop: hp(1),
     marginBottom: hp(5),
     backgroundColor: colors.white,
    width: '100%',
    gap:6,
   
    // elevation: 5,
  },
  blogCard: {
    margin: 0,
    // marginLeft: 15,
    backgroundColor: '#fff',
     width:'98%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  DateText: {
    color: colors.Headertext,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
  },

  blogCardHeadText: {
    minHeight: wp(11),
    marginTop: -6,
    fontSize: fontSize.Eighteen,
    color: '#143F71',
    fontFamily: 'Poppins-Medium',
    textTransform:'capitalize'
  },
  blogCardContantText: {
    color: '#001227',
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
  },
  blogCardBtnText: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
    color: colors.orange,
    marginTop: 10,
    borderRadius: 6,
  },
  formContainer: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingVertical: wp(8),
    // paddingVertical: 20,
    borderRadius: 20,
    marginBottom: -hp(25),
  },
  smallHeadText: {
    color: colors.white,
    textDecorationLine: 'none',
    marginBottom: -10,
  },
  service1: {
    fontSize: fontSize.Fourteen,
    color: colors.Headertext,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },
  extraBoldText: {
    color: colors.white,
    fontSize: fontSize.TwentyTwo,
    fontFamily: 'Poppins-Bold',
  },
  textInputContainer: {
    height: wp(14),
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    width:'90%',
    alignSelf:'center',
    // paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    marginBottom: 10,
  },
  textInput: {
    marginVertical: 'auto',
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: wp(13),
    width: '100%',
    backgroundColor: 'white',
    borderColor: colors.lightGrey,
  },
  inputText: {
    height: '100%',
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  selectedText: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  submitBtn: {
    borderColor: colors.white,
    width: '90%',
    alignSelf:'center',
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Medium',
    borderWidth: 1,
    paddingVertical: 13,
  },
  cardBtn: {
    marginVertical: 5,
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
    backgroundColor: colors.orange,
    padding: 10,
    width: '45%',
    textAlign: 'center',
    borderRadius: 6,
  },

});
