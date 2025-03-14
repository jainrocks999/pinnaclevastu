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
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },
  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  cardImage: {
    height: wp(30),
    // width: wp(28),
    width: "100%",
    borderRadius: wp(50),
  },

  direction: {
    marginTop: 5,
    minHeight: 12,
  },
  card: {
    paddingLeft: 15,
    width: '70%',
  },

  image: {
    marginTop: wp(3),
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },

  servicesContainer: {
    paddingBottom: 15,
  },

  cardContainer1: {
    marginHorizontal: 15,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    shadowColor: '#bdc3c7',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: 'center',
  },

  priceText: {
    marginTop: 3,
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Medium',
  },

  imgContainer: {
    width: '35%',
  },
  third1: {
    marginBottom: 5,
    fontSize: fontSize.Sixteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  third2: {
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Regular',
  },
  cardContainer: {
    height: wp(23),
    width: wp(30),
    paddingHorizontal: 5,
    marginHorizontal: wp(1),
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#bdc3c7',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  text: {
    marginTop: wp(2),
    fontSize: fontSize.Thirteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    textAlign: 'center',
  },
  contain: {
    marginTop: hp(2),
    marginHorizontal: 15,
  },
  service: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  primText: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },
  cont: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
    opacity: 1,
    marginTop: hp(2),
  },
  shareview: {
    marginHorizontal: 15,
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingTop: 18,
    marginTop: hp(3),
    alignItems: 'center',
  },

  socialImg: {
    height: wp(4.5),
    width: wp(4.5),
    marginLeft: 8,
  },
  seeall: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
    color: colors.orange,
    marginVertical: hp(2),
    marginRight: 20,
    textAlign: 'right',
  },
  book: {
    marginHorizontal: 15,
    backgroundColor: colors.orange,
    alignItems: 'center',
    height: wp(13),
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: hp(1.3),
    marginBottom: hp(1.3),
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  reviewSection: {
    marginTop: 20,
    backgroundColor: '#F1F1F1',
  },
  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  reviewImage: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'cover',
    borderRadius: 60,
    marginBottom: 5,
  },
  rowSection: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  backBtn: {
    marginTop: -5,
    marginRight: 10,
  },
  subItemContainer: {
    marginTop: 15,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: colors.ordercolor,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderColor: '#EAEAEA',
    marginBottom: 10,
    paddingVertical: 10,
  },
  toggleIcon2: {
    width: wp(3.5),
    height: wp(3.5),
    marginRight: 10,
    resizeMode: 'contain',
  },
  activeTitleColor: {
    color: colors.orange,
  },

  coursetext2: {
    fontSize: fontSize.Sixteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  direction1: {
    flexDirection: 'row',
    borderWidth: 0.1,
    padding: 5,
  },
  courseToggle1: {
    width: '99%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#F6F6F6',
    marginVertical: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeCourseToggle: {
    marginBottom: -20,
    width: '99%',
    alignSelf: 'center',
    backgroundColor: colors.ordercolor,
  },
});
