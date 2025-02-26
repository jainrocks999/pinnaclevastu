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
    backgroundColor: '#F9F9F9',
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
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
    marginTop: -5,
  },
  servicesContainer: {
    paddingBottom: 15,
    paddingHorizontal: 15,
  },

  cardContainer2: {
    width: '100%',
    paddingVertical: 10,
    marginTop: 15,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    shadowColor: '#D8E3E9',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
    paddingHorizontal: 15,

    justifyContent: 'center',
  },
  card45: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(0.5),
  },

  appBottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 5,
  },

  otherIcons: {
    height: wp(10),
    width: wp(15),
    resizeMode: 'center',
    borderWidth: 1,
    borderColor: '#DFE7EF',
    borderRadius: 10,
    marginRight: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#DFE7EF',
    paddingTop: 10,
    paddingBottom: 10,
  },
  radioBtnContainer: {
    position: 'absolute',
    right: 10,
  },

  otherIconText: {
    color: colors.paymenttext,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Eleven,
  },

  third3: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  third1: {
    fontSize: fontSize.Thirteen,
    color: colors.paymenttext,
    fontFamily: 'Poppins-Regular',
  },
  third2: {
    fontSize: fontSize.Thirteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
    marginTop: hp(1),
  },

  book: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    height: wp(13),
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
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
  inputmain: {
    marginTop: hp(2),
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderRadius: 10,
    borderWidth: 0.1,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  input1: {
    width: '59.5%',
    fontSize: fontSize.Fourteen,
    marginTop: 3,
    paddingHorizontal: 15,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },

  buttoncontainer1: {
    height: wp(8),
    width: '23%',
    backgroundColor: '#D6D6D6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btext: {
    fontSize: fontSize.Sixteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
  payment: {
    marginTop: 5,
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Medium',
    color: colors.paymenttext,
  },
  payment1: {
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.paymenttext,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8,
  },

  smallText: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Thirteen,
    color: colors.cardcolor,
  },
  shapeDot: {
    height: 8,
    width: 8,
    backgroundColor: '#bfbdbd',
    margin: 5,
    borderRadius: '50%',
  },
});
