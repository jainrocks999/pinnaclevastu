import { StyleSheet } from 'react-native';
import { fontSize } from '../../../Component/fontsize';
import { colors } from '../../../Component/colors';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    backgroundColor: '#F9F9F9',
    // paddingTop: 50,
    elevation: 4,
    // opacity:0.9
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',


    elevation: 2,
  },
  headerview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },

  buttoncontainer: {
    height: wp(12),
    width: '50%',

    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btext: {
    fontSize: fontSize.Eighteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },

  scrollview: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  addresstext: {
    fontSize: fontSize.Sixteen,
    color: colors.paymenttext,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    marginTop: 10,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderWidth:0.5,
    height: wp(13),
    borderColor: colors.lightGrey,
    width: '100%',
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: colors.heading,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfWidth: {
    width: '48%',
  },
  placeholder: {
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  selectedText: {
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  itemText: {
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  checkboxWrapper: {
    height: 21,
    width: 21,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkedBackground: {
    backgroundColor: '#009FDF',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: ,
  },
  checkboxText: {
    color: colors.heading, // Change the text color to red
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    marginLeft: 5,
  },

  book: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: wp(13),
    borderRadius: 10,

    marginTop: hp(5),
     shadowColor: "#ad3803",
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8, 
    shadowRadius: 10, 

    elevation: 8,

  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  customIcon: {
    fontSize: fontSize.Fifteen,
    color: colors.paymenttext, // Custom icon color
    // marginRight: 10,
  },
  backBtn: {
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
});
