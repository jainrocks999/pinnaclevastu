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
    backgroundColor: colors.white,
  },
  main1: {
    //  paddingHorizontal: 15,
    // paddingVertical: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: fontSize.Eighteen,
    color: colors.orange,
    fontFamily: 'Poppins-SemiBold',
  },
  subt: {
    backgroundColor: colors.ordercolor,
    paddingVertical: hp(2),
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputmain: {
    // marginTop: hp(2.5),
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title1: {
    marginTop: hp(1),
    fontSize: fontSize.Nineteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },
  title2: {
    marginBottom: 5,
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Medium',
  },
  input: {
    height: wp(13),
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
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

  input1: {
    // height: '100%',
    width: '60%',
    marginLeft: wp(-1),
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    paddingHorizontal: 10,
  },

  inputText: {
    height: '100%',
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  uppload: {
    fontSize: fontSize.Twelve,
    color: colors.please,
    marginTop: 10,
    marginLeft: wp(2),
    fontFamily: 'Poppins-Regular',
  },
  buttoncontainer1: {
    height: wp(10),
    width: '30%',
    backgroundColor: colors.orange,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#D87C51', // Shadow color
    shadowOffset: {width: 0, height: 3}, // Shadow direction
    shadowOpacity: 0.12, // Shadow intensity
    shadowRadius: 10, // Shadow blur radius
    // Elevation for Android
    elevation: 8,
  },
  buttoncontainer: {
    marginHorizontal: 15,
    height: wp(13),
    // width: '90%',
    backgroundColor: colors.orange,
    borderRadius: 10,
    // opacity: 1,
    // borderWidth:1,
    marginTop: hp(2),
    marginBottom: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ad3803',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 10,

    elevation: 8,
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
  inputShadow: {
    shadowColor: '#c2c0c0',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
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
    color: colors.heading,
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
  addIconBtn: {
    // position: 'absolute',
    // right: 20,
    // width: 28,
  },
  addIcon: {
    backgroundColor: colors.placeholder,
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSize.Eighteen,
    padding: 15,
    borderRadius: 10,
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
  serviceSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 7,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  inputSearchStyle: {
    // height: wp(10),
    borderRadius: 10,
    fontSize: 16,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
});
