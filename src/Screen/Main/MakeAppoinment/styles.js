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
  servicesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: wp(5),
    gap: 30,
  },

  cardContainer2: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    shadowColor: '#D8E3E9',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
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
    fontFamily: 'Poppins-Regular',
    backgroundColor: colors.white,
    color: colors.heading,
    elevation: 10,
    shadowColor: '#bdc3c7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },

  input1: {
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
    shadowColor: '#ad3803',
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

  messageInput: {
    height: wp(30),
    textAlignVertical: 'top',
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E9E9E9',
    paddingHorizontal: 15,
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
    backgroundColor: colors.white,
    color: colors.heading,
    elevation: 10,
    shadowColor: '#bdc3c7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 15,
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
  },
  boldText: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize.Twelve,
    color: colors.cardcolor,
  },
  smallText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Twelve,
    color: colors.cardcolor,
  },
  editBtn: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 5,
  },
  editText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Eleven,
    color: 'red',
    textDecorationLine: 'underline',
  },
  errorText: {
    marginTop: 5,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: 'red',
  },
});
