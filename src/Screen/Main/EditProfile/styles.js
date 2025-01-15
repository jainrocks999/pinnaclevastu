import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../Component/colors/index';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  main1: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  main: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    // backgroundColor: colors.white,
  },
  title: {
    fontSize: fontSize.Eighteen,
    color: colors.orange,
    fontFamily: 'Poppins-SemiBold',
  },
  subt: {
    marginTop: hp(1),
  },
  inputmain: {
    marginHorizontal: 10,
    marginTop: hp(1),
  },
  title1: {
    marginTop: hp(1),
    fontSize: fontSize.Nineteen,
    color: colors.cardcolor,
    // opacity: 1,
    fontFamily: 'Poppins-Regular',
  },
  title2: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Medium',
    marginVertical: 5,
  },
  input: {
    height: wp(12),
    width: '100%',
    color: colors.heading,
    fontSize: fontSize.Sixteen,
    // marginTop: 2,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
  },
  input1: {
    color: colors.heading,
    fontSize: fontSize.Sixteen,
    // height:"100%",
    fontFamily: 'Poppins-Regular',
    width: '60%',
    marginLeft: wp(-1),

    // borderRadius: 10,
    // borderWidth: 0.5,
    // paddingHorizontal:15
  },
  uppload: {
    fontSize: fontSize.Twelve,
    color: colors.please,
    marginLeft: wp(2),
    fontFamily: 'Poppins-Regular',
  },
  buttoncontainer1: {
    // height: 45,
    height: '80%',
    width: '43%',
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.orange, // Shadow color
    shadowOffset: {width: 0, height: 4}, // Shadow direction
    shadowOpacity: 0.8, // Shadow intensity
    shadowRadius: 6, // Shadow blur radius
    // Elevation for Android
    elevation: 5,
  },
  buttoncontainer: {
    height: wp(13),
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: 10,
    marginTop: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: "#ad3803", 
    shadowOffset: {width: 0, height: 4}, 
    shadowOpacity: 0.8, 
    shadowRadius: 6, 
    elevation: 5,
  },
  btext: {
    fontSize: fontSize.Eighteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
  endview: {
    marginTop: hp(2),
    justifyContent: 'center',
  },
  endtext: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    textAlign: 'center',
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
  backBtn: {
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: wp(15),
    borderRadius: 10,
    height: wp(40),
    width: '90%',
    gap: '10%',
  },
  modalTitle: {
    position: 'absolute',
    top: 10,
    fontSize: fontSize.Sixteen,
    color:colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalBtn: {
    height: '80%',
    paddingVertical: 15,
    width: '35%',
    backgroundColor: colors.orange,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D87C51',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  modalBtnIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  selectedText: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  itemText: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
});
