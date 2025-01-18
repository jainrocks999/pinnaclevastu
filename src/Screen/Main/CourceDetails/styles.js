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
    //    backgroundColor: '#F9F9F9',
    // paddingTop: 50,
    // elevation:4,
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

  scrollview: {
    paddingBottom:hp(3),
    paddingHorizontal: 15,
  },

  firstimgview: {
    marginTop: 20,
    width: '100%',
    marginBottom: 20,
  },
  img1: {
     width: '100%',
    height: wp(50),
    // borderRadius: 15,
  },
  advanceview: {
    marginTop: 10,
  },
  advancetext: {
    fontSize: fontSize.Sixteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  learntext: {
    marginTop: hp(0.5),
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: '#51575C',
  },
  direction: {
    marginTop: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ruppestext: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  shareimage: {
    // width: '10%',
    // height: '100%',
    marginRight:5,
    width: wp(7),
    height: wp(7),
    borderRadius: wp(3),
  },
  horizontalLine: {
    marginTop: hp(2),
    height: 1,
    backgroundColor: '#DFE7EF',
    width: '100%',
  },
  card: {
    marginTop: 20,
    width: '100%',
    height: hp(17),
    backgroundColor: colors.cardm,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  cardItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  verticalLine: {
    width: 1,
    height: '75%',
    backgroundColor: '#DFE7EF',
    alignSelf: 'center',
  },
  cardimg1: {
    width: wp(10),
    height: wp(8),
    marginBottom: 5,
  },
  languagetext: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  languagetext1: {
    fontSize: fontSize.Ten,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  coursediscriptionview: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#FBF5F2',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  coursediscriptionview1: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  coursetext: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Medium',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignSelf: 'center',
  },

  listItemText: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppin-Medium',
    color: colors.paymenttext,
  },
  listitem1: {
    fontSize: fontSize.Sixteen,
    color: colors.paymenttext,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp(2),
  },

  styleview: {
    padding: 20,
    marginTop: 0,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#FBF5F2',
    marginBottom: 10,
  },

  subItemText: {
    fontSize: fontSize.Fourteen,
    color: colors.light_gr,
    marginBottom: 10,
    paddingHorizontal:20
  },
  needview: {
    marginTop: 30,
    marginHorizontal:5
  },
  needtext: {
    fontSize: fontSize.Twenty,
    fontFamily: 'Poppins-Medium',
    color: colors.heading,
  },
  havetext: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  whatsview: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:5
  },
  whatsapp: {
    width: '48%',
    height: wp(30),
    backgroundColor: '#DEF2F4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  call: {
    width: '48%',
    height: wp(30),
    backgroundColor: '#E5E2FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  textnumber: {
    fontSize: fontSize.Sixteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  demotext: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  trainerview: {
    marginTop: 15,
  },
  knowview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // borderWidth: 2,
    backgroundColor: '#E7F4FC',
    padding: 20,
    borderRadius: 20,
  },
  acharya: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 15,
  },
  acharya1: {
    lineHeight: wp(6),
    width: '15%',
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginLeft: 15,
  },
  acharyaview: {
    width: '47%',
  },
  imgtrainer: {
    width: '100%',
    height: wp(50),
    borderRadius: 5,
  },

  courseToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
  },

  book: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent:"center",
    width: '100%',
    height: wp(13),
    borderRadius: 10,
    marginTop: hp(1),
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

  journeyview: {
    marginTop: 10,
  },
  journeytext: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    marginBottom: 15,
  },

  courseview: {
    // alignItems: 'center',
    marginVertical:10
  },

  imageContainer: {
    margin: 5,
     // Set the width of the images
    height: wp(42),
  },
  reviewImage: {
    width: '100%', // Set the width of the images
    height: '100%', // Set the height of the images
   resizeMode:'contain'
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(4),
    backgroundColor: colors.grey,
    margin: 5,
  },
  activeDot: {
    backgroundColor: colors.Headertext, // Active dot color
    width: '8%',
  },

  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
    marginHorizontal: 8,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    borderWidth: 0.1,
    shadowColor: colors.light_gr,
    borderColor: colors.light_gr,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: wp(10),
    height: wp(10),
    // marginRight: 15,
  },
  textContainer: {
    flex: 1,
    // paddingHorizontal:15
  },
  title: {
    fontSize: fontSize.Twelve,
    marginTop: 10,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  description: {
    marginTop: 5,
    fontSize: fontSize.Ten,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },

  toggleIcon2: {
    width: wp(3.5),
    height: wp(3.5),
    marginRight:10,
    resizeMode:"contain"
  },
  backBtn: {
    marginTop:-5,
    height: wp(4),
    width: wp(2.3),
    // resizeMode: 'stretch',
    marginRight:20
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

  activeTitleColor: {
    color: colors.orange,
  },
  activeTitleColor1: {
    fontSize: 16,
    color: '#F4996C',
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
    paddingVertical:10
  },
  singleSubItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  subItemTitle: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Medium',
    color: colors.heading,
  },
  subItemSubtitle: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Normal',
    color: colors.light_gr,
    marginLeft: wp(3),
    marginBottom: 15,
    // marginLeft: 16,
    // marginBottom: 15,
  },

  direction1: {
    flexDirection: 'row',
    borderWidth: 0.1,
    padding:5,
  },

  coursetext2: {
    fontSize: fontSize.Sixteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
   loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

});
