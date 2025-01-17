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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
    gap: 5,
  },
  headerview: {},
  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },

  backBtn: {
    marginTop: -5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },

  title: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: colors.cardcolor,
  },
  servicesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: wp(5),
    gap: 30,
  },

  cardContainer2: {
    // marginVertical: 20,
    width: '100%',
    paddingVertical: 10,
    // marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    shadowColor: '#D8E3E9', // Light pink color for the shadow
    shadowOffset: {width: 0, height: 6}, // Offset 0px horizontally, 6px vertically
    shadowOpacity: 0.5, // Opacity of the shadow (transparent but visible)
    shadowRadius: 10, // Blur radius of 10px

    // Android Elevation
    elevation: 5, // For Android shadow effect
    paddingHorizontal: 15,
    // margin:5,

    justifyContent: 'center',
    // marginVertical: 10,
  },

  service: {
    position: 'absolute',
    top: -wp(2.8),
    left: wp(5),
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#fff',
  },
  widthOfSevices1: {
    width: wp(22),
    textAlign: 'center',
  },
  widthOfSevices2: {
    width: wp(35),
    textAlign: 'center',
  },
  cont: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
    opacity: 1,
    marginTop: hp(2),
    // textAlign:'center'
  },

  inputmain: {
    marginTop: hp(1.5),
  },

  title2: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    marginLeft: wp(1),
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  input: {
    height: wp(13),
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    paddingHorizontal: 15,
    fontSize: fontSize.Fifteen,
    // marginTop: 2,
    fontFamily: 'Poppins-Regular',
    backgroundColor: colors.white,
    color: colors.heading,
  },
  input1: {
    //  height: wp(13),
    width: '60%',
    marginLeft: wp(-1),
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    fontSize: fontSize.Fifteen,
  },

  checkboxWrapper: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#009FDF',
    backgroundColor: '#fff',
  },
  checkedBackground: {
    backgroundColor: '#009FDF',
  },

  book: {
    marginHorizontal: 15,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: wp(13),
    marginVertical: hp(1.3),
    shadowColor: '#ad3803', // Shadow color
    shadowOffset: {width: 0, height: 6}, // Shadow direction
    shadowOpacity: 0.8, // Shadow intensity
    shadowRadius: 10, // Shadow blur radius
    // Elevation for Android
    elevation: 8,
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },

  messageInput: {
    height: wp(30),
    textAlignVertical: 'top',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    paddingHorizontal: 15,
    fontSize: fontSize.Fifteen,
    // marginTop: 2,
    fontFamily: 'Poppins-Regular',
    backgroundColor: colors.white,
    color: colors.heading,
  },

  serviceSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 7,
  },
  priceText: {
    fontSize: fontSize.Thirteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
    position: 'absolute',
    right: 0,
  },
  labelText: {
    fontSize: fontSize.Thirteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },
  profileText: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize.Fifteen,
    color: colors.cardcolor,
    textAlign: 'center',
    // marginLeft:20
    // marginTop:5
  },
  boldText:{
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize.Twelve,
    color: colors.cardcolor,
  },
  smallText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Twelve,
    color: colors.cardcolor,
  },
  editBtn:{
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 5,

  },
  editText: {
    // borderWidth:1,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Eleven,
    color: 'red',
    textDecorationLine: 'underline',
  },
});
