import {Dimensions, StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../Component/ResponsiveScreen/responsive';

const screenWidth = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
     paddingBottom: hp(7),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
    elevation: 5,
    gap: 15,
  },
  headerview: {
    flexDirection: 'row',
  },
  logoText: {
    fontSize: fontSize.Twenty,
    fontWeight: 'bold',
    color: colors.Headertext,
    fontFamily: 'Poppins-SemiBold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: colors.ordercolor,
    borderRadius: 20,
    elevation: 3,
    paddingHorizontal: 15,
  },
  searchInput: {
    width: '80%',
    // flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Fourteen,
    paddingHorizontal: 10,
    color: colors.heading,
    paddingVertical: 10,
  },
  welcomeCard: {
    marginTop: 10,
    // width: '100%',
    // borderRadius: 15,
    //  marginHorizontal: 2,
    // padding: 15,
    // elevation: 5,
  },

  servicesContainer: {
    paddingHorizontal: 0,
    paddingBottom: 25,
  },

  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 5,
  },

  bottomCardContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    // alignSelf: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 4,
    marginHorizontal: 15,
    marginTop: wp(6),
  },
  bottomCard: {
    // backgroundColor: '#E2E3E580',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(0.8),
  },
  cardContainer: {
    height: wp(22),
    width: wp(30),
    margin: 5,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 4,
  },
  smallCardContainer: {
    height: wp(23),
    // height:92,
    width: wp(30),
    margin: 5,
    // paddingVertical:10,
    backgroundColor: '#FFF1CC',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    paddingHorizontal: 4,
  },
  itemContainer: {
    height: wp(29),
    width: screenWidth <= 750 ? wp(30) : wp(34),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer1: {
    width: wp(46), // Adjust to fit your design
    height: wp(40),
    borderRadius: 10,
    borderWidth:0.4,
    margin: 5,
    overflow: 'hidden',
  },
  cardContainer2: {
    width: wp(90),
    // height: wp(35),
    backgroundColor: colors.white,
    padding:6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    shadowColor: '#a2adb3',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6, // For Android shadow effect
    // paddingHorizontal: 6,
    justifyContent: 'center',
    marginHorizontal: 5,
  },

  third: {
    fontSize: fontSize.Fifteen,
    color: colors.orange,
    fontFamily: 'Poppins-Medium',
  },
  third1: {
    marginTop: -8,
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  third2: {
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Regular',
  },
  contain: {
    marginHorizontal: 13,
    marginTop: hp(5),
    marginBottom: 5,
  },

  contain1: {
    // borderWidth:1,
    paddingHorizontal: 15,
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  service: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  service1: {
    fontSize: fontSize.Fourteen,
    color: colors.Headertext,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },
  text: {
    marginTop: hp(1),
    paddingHorizontal: 5,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    textAlign: 'center',
  },
  smallCardtext: {
    marginTop: 8,
    paddingHorizontal: 0,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    textAlign: 'center',
  },
  imageOpacity: {
    // opacity: 0.5, // Adjust the opacity to make the text stand out
  },
  text1: {
    marginTop: hp(1),
    width:'90%',
    fontSize: fontSize.Seventeen,
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10,
  },
  bottomCardtext: {
    marginTop: hp(1),
    paddingHorizontal: 5,
    fontSize: fontSize.Thirteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    textAlign: 'center',
    maxWidth: '85%',
  },

  cardContainer5: {
    // margin: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  cardContainer0: {
    // margin: 10,
    paddingRight: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },

  card: {
    width: wp(65),
    backgroundColor: '#FBF5F2',
    borderRadius: 10,
  },
  cardImg: {
    width: '100%',
    height: wp(50),
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    //  resizeMode: 'contain',
    // marginTop: -wp(2),
  },
  cardInfo: {
    // marginTop: -5,
    padding: 15,
    gap: 6,
  },
  DateText: {
    color: colors.Headertext,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
  },
  titleText: {
    marginTop:-6,
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  regularText: {
    color: '#51575C',
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    width: '90%',
  },
  price: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Bold',
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
  filterBtn: {
    position: 'absolute',
    right: 8,
    backgroundColor: colors.white,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  itemImg: {
    height: '30%',
    width: '30%',
    resizeMode: 'contain',
  },

  switchBtnContainer: {
    marginHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF5F2',
    padding: wp(2),
    borderRadius: 10,
  },
  button: {
  },
  
  switchBtn: {
    flex: 1,
    marginHorizontal: 2, 
    justifyContent:"center",
    alignItems:"center",
    paddingVertical: wp(2),
  },
  switchText:{
    textAlign: 'center',
    fontSize: fontSize.Sixteen, 
    color: colors.recorded, 
    fontFamily: 'Poppins-Regular',
  },
  activeBtn: {
    backgroundColor: colors.orange, 
    color: colors.white,
    borderRadius: wp(2),
    shadowColor: "#D87C51", 
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 12,
  },
  bagIcon: {
    position: 'absolute',
    right: 15,
  },
  consultationSection: {
    backgroundColor: '#F1FBFF',
    paddingBottom: 30,
  },
  cardImage: {
    borderRadius: 10,
    width: '36%',
    height: '93%',
    resizeMode: 'contain',
  },
  infoSection: {
    width: '64%',
    gap: 3,
  },
  arrowNext: {
    position: 'absolute',
    height: 20,
    width: 20,
    right: -2,
    alignSelf: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
    backgroundColor: colors.Headertext, // Active dot color
    width: '8%',
  },
  viewLine: {
    alignSelf: 'center',
    width: 0.5,
    height: '80%',
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
  },
  bannerContainer: {
    height: wp(40),
    width: wp(85),
    marginHorizontal: 10,
    // borderWidth: 1,
  },
  bannerImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom:10
  },
});
