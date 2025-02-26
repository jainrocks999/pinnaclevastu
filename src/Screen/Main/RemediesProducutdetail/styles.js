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

  titleText: {
    minHeight: wp(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
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
  welcomeCard: {
    marginTop: 20,
  },
  shareIcon: {
    resizeMode: 'contain',
    height: wp(6),
    width: wp(12),
    borderRadius: wp(20),
  },
  main: {
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 10,
    borderColor: colors.lightGrey,
    borderBottomWidth: 0.5,
  },
  suggestItemContainer: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: colors.cardcolor,
  },

  dividerView: {
    borderWidth: 1,
    height: '70%',
    backgroundColor: colors.lightGrey,
    borderColor: colors.lightGrey,
  },
  servicesContainer: {
    marginBottom: 30,
  },
  listContainer: {
    backgroundColor: colors.cardm,
    margin: 8,
    marginHorizontal: 15,
    gap: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContainer: {
    width: wp(30),
    backgroundColor: colors.cardm,
    alignItems: 'center',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 5,
    paddingVertical: 25,
  },
  text: {
    width: '90%',
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    textAlign: 'center',
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

  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  card: {
    paddingLeft: 15,
    width: '70%',
  },

  third1: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },

  reviewText: {
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
  touch: {
    height: wp(6),
    width: wp(6),
    marginTop: wp(-3),
  },

  plusBtn: {
    width: 30,
    height: 30,
    color: '#324356',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 2,
    borderRadius: 20,
    fontSize: 18,
    fontWeight: '700',
    borderColor: '#324356',
    position: 'absolute',
    right: -33,
    top: 80,
  },

  contain: {
    marginHorizontal: 15,
    marginTop: hp(5),
  },
  service: {
    fontSize: fontSize.Seventeen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  cont: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
    opacity: 1,
    marginTop: hp(2),
    marginHorizontal: 15,
  },
  shareview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: hp(3),
  },
  button1: {
    paddingVertical: wp(1.2),
    alignItems: 'center',
    backgroundColor: colors.orange,
    width: '35%',
    borderRadius: wp(1),
    shadowColor: '#ad3803',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  btext: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Fourteen,
    color: colors.white,
  },
  seeall: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
    color: colors.orange,
    marginVertical: hp(3),
    textAlign: 'right',
    marginRight: 15,
  },
  book: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: wp(13),
    marginBottom: 10,
    marginHorizontal: 15,
    shadowColor: '#ad3803',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },

  courseToggle1: {
    width: '99%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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

  activeTitleColor: {
    color: colors.orange,
  },

  toggleIcon2: {
    width: 16,
    height: 16,
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
    padding: 5,
    paddingHorizontal: 20,
  },

  subItemSubtitle: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Normal',
    color: colors.light_gr,
    marginLeft: wp(3),
    marginBottom: 15,
  },

  direction1: {
    flexDirection: 'row',
    borderWidth: 0.1,
  },

  coursetext2: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },

  header1: {
    fontSize: fontSize.Eighteen,
    fontFamily: 'Poppins-Medium',
    color: colors.heading,
    marginBottom: 5,
    marginLeft: 6,
  },
  productsContainer: {
    marginTop: 10,
    marginBottom: 16,
    paddingVertical: 20,
    marginHorizontal: 15,
    backgroundColor: colors.cardm,
    borderRadius: 15,
    gap: 35,
  },
  productCard: {
    width: wp(38),
    minHeight: wp(45),
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: wp(25),
    borderRadius: 9,
    marginBottom: 8,
  },
  productName: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Medium',
    color: colors.heading,
    marginLeft: wp(3),
    marginBottom: 4,
  },
  totalText: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-SemiBold',
    color: colors.heading,
    textAlign: 'center',
    marginVertical: 10,
  },

  slide: {
    width: wp(44.5),
    elevation: 5,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    borderRadius: 10,
    backgroundColor: colors.white,
    elevation: 1,
    margin: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: wp(30),
    borderRadius: 10,
  },
  textContainer: {
    backgroundColor: colors.ordercolor,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  buttonstylefirst: {
    backgroundColor: colors.orange,
    width: wp(30),
    paddingVertical: 7,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonstyle: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
  },

  direction: {
    minHeight: wp(6),
    marginBlock: 5,
    alignSelf: 'flex-start',
  },

  thirdCard: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },

  quantitySection: {
    backgroundColor: colors.ordercolor,
    marginLeft: 20,
    borderRadius: 20,
    width: '40%',
    justifyContent: 'space-around',
  },
  quantityBtns: {
    fontSize: fontSize.TwentyTwo,
    color: colors.orange,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  checkboxWrapper: {
    height: 21,
    width: 21,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#009FDF',
    backgroundColor: '#fff',
  },
  checkedBackground: {
    backgroundColor: '#009FDF',
  },
  reviewImage: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'cover',
    borderRadius: 60,
    marginBottom: 5,
  },
  dotContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.grey,
    margin: 5,
  },
  activeDot: {
    backgroundColor: colors.Headertext,
    width: '8%',
  },
  backBtn: {
    marginTop: -5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },

  backBtn1: {
    marginTop: 2,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 10,
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
  sevicesImg: {
    width: wp(10),
    height: wp(10),
  },
  viewLine: {
    width: 1,
    height: '80%',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor: colors.lightGrey,
  },
  viewBorder: {
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  headerdouble: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  directionsytyle: {
    flexDirection: 'row',
  },

  logoText1: {
    marginTop: -2,
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
    marginLeft: 20,
  },

  book1: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: wp(13),
    marginBottom: 10,
    marginHorizontal: 15,
    elevation: 10,
  },
});
