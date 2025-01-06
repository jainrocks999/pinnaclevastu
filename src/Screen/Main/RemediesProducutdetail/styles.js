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

  titleText: {
    // minHeight: wp(10),
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
    // marginHorizontal: 15,
    // overflow:"hidden",
  },
  shareIcon: {
    resizeMode: 'contain',
    height: wp(6),
    width: wp(12),
    borderRadius: wp(20),
    // backgroundColor: colors.ordercolor,
    // position: 'absolute',
    // right: 5,
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

  reviewUser: {
    height: wp(16),
    width: wp(16),
    alignSelf: 'center',
  },
  servicesContainer: {
    marginBottom: 30,
    // paddingHorizontal: 10,
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
    // margin: 5,
    width: wp(30),
    backgroundColor: colors.cardm,
    alignItems: 'center',
    gap: 5,
    // justifyContent: 'center',
    // elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    padding: 5,
    paddingVertical: 25,
  },
  text: {
    // marginTop: hp(1),
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
    elevation: 5, /// For Android shadow effect
    // margin:5,

    justifyContent: 'center',
    // marginVertical: 10,
  },

  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // padding: 10,
  },
  card: {
    paddingLeft: 15,
    width: '70%',
  },
  third: {
    fontSize: fontSize.Fifteen,
    color: colors.orange,
    fontFamily: 'Poppins-Medium',
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
    // marginLeft:10,
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
    // textAlign:'center'
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
    shadowColor: '#ad3803', // Shadow color
    shadowOffset: {width: 0, height: 6}, // Shadow direction
    shadowOpacity: 0.8, // Shadow intensity
    shadowRadius: 10, // Shadow blur radius
    // Elevation for Android
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
    shadowColor: '#ad3803', // Shadow color
    shadowOffset: {width: 0, height: 6}, // Shadow direction
    shadowOpacity: 0.8, // Shadow intensity
    shadowRadius: 5, // Shadow blur radius
    // Elevation for Android
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
  activeTitleColor1: {
    fontSize: 16,
    color: '#F4996C',
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
  singleSubItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },

  subItemTitle: {
    fontSize: fontSize.Thirteen,
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
    // textAlign: 'center',
    marginLeft: 6,
  },
  productsContainer: {
    marginTop: 10,
    marginBottom: 16,
    paddingVertical: 20,
    //  paddingHorizontal: 10,
    marginHorizontal: 15,
    backgroundColor: colors.cardm,
    borderRadius: 15,
    gap: 35,
  },
  productCard: {
    width: wp(38),
    minHeight: wp(45), // Fixed width for each card
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 3,
    // Add horizontal margin between cards
  },
  productImage: {
    width: '100%',
    height: wp(25),
    borderRadius: 9,
    //  resizeMode: 'contain',
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
  button: {
    backgroundColor: '#FF8C66',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  slide: {
    width: wp(44.5),
    elevation: 5,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    borderRadius: 10, // Border radius scaled with wp
    backgroundColor: colors.white,
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: wp(0.5) }, // Shadow offset with wp
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
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
    paddingHorizontal: 10, // Horizontal padding based on width
    paddingTop:10
  },

  price: {
    fontSize: wp(4), // Price font size responsive to width
    color: 'black',
    marginBottom: hp(2), // Margin bottom based on height
  },
  buttonstylefirst: {
    backgroundColor: colors.orange,
    width: wp(30), // Width based on screen width
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
    minHeight:wp(6),
    marginBlock: 5,
    alignSelf: 'flex-start',
    // marginLeft: 0,
    // width: 70,
    // paddingBottom: 20,
  },

  thirdCard: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },

  quantitySection: {
    backgroundColor: colors.ordercolor,
    marginLeft: 20,
    // borderWidth: 1,
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
  imageContainer: {
    margin: 5,
    width: 325, 
    height: 180,
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
    backgroundColor: colors.Headertext, // Active dot color
    width: '8%',
  },
  backBtn: {
    marginTop: -5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },

  backBtn1:{
    marginTop: 2,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 10,
  },
  // bagBtn: {
  //   // height: wp(4),
  //   // width: wp(4),
  //   // marginTop: -5,
  //   resizeMode: 'contain',
  //   // position:"absolute",
  //   top:-10,
  // },
 
  itemCount: {
    backgroundColor: '#EF6024',
    borderRadius: 10,
    zIndex: 1,
    bottom: -10,
    left: 7,
    height: 15,
    marginTop:-15,
    width: 13,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical:.5
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


 directionsytyle:{

     flexDirection: 'row'
  },

 logoText1:{
    marginTop: -2,
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
    marginLeft:20
  },

  book1:{
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



// import {StyleSheet} from 'react-native';
// import {fontSize} from '../../../Component/fontsize';
// import {colors} from '../../../Component/colors';
// import {
//   widthPrecent as wp,
//   heightPercent as hp,
// } from '../../../Component/ResponsiveScreen/responsive';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     // paddingTop: 50,
//   },

//   titleText: {
//     minHeight: wp(10),
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     elevation: 5,
//   },
//   headerview: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logoText: {
//     fontSize: fontSize.Eighteen,
//     color: colors.heading,
//     fontFamily: 'Poppins-Regular',
//   },
//   welcomeCard: {
//     marginTop: 20,
//     // marginHorizontal: 15,
//     // overflow:"hidden",
//   },
//   shareIcon: {
//     resizeMode: 'contain',
//     height: wp(6),
//     width: wp(12),
//     borderRadius: wp(20),
//     backgroundColor: colors.ordercolor,
//     position: 'absolute',
//     right: 5,
//   },
//   main: {
//     marginHorizontal: 15,
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     gap: 15,
//     paddingVertical: 10,
//     borderColor: colors.lightGrey,
//     borderBottomWidth: 0.5,
//   },
//   suggestItemContainer: {
//     marginHorizontal: 15,
//   },
//   title: {
//     fontSize: fontSize.Fourteen,
//     fontFamily: 'Poppins-Regular',
//     color: colors.cardcolor,
//   },

//   dividerView:{
//     borderWidth:1,
//     height:"70%",
//     backgroundColor:colors.lightGrey,
//     borderColor:colors.lightGrey
//   },

//   reviewUser: {
//     height: wp(16),
//     width: wp(16),
//     alignSelf: 'center',
//   },
//   servicesContainer: {
//     marginBottom: 30,
//     // paddingHorizontal: 10,
//   },
//   listContainer: {
//     backgroundColor: colors.cardm,
//     margin: 8,
//     marginHorizontal: 15,
//     gap: 10,
//     borderRadius: 10,
//     overflow: 'hidden',
//   },
//   cardContainer: {
//     // margin: 5,
//     width: wp(30),
//     backgroundColor: colors.cardm,
//     alignItems: 'center',
//     gap: 5,
//     // justifyContent: 'center',
//     // elevation: 3, // Shadow for Android
//     shadowColor: '#000', // Shadow for iOS
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     padding: 5,
//     paddingVertical: 25,
//   },
//   text: {
//     // marginTop: hp(1),
//     width: '90%',
//     fontSize: fontSize.Fourteen,
//     fontFamily: 'Poppins-Regular',
//     color: colors.heading,
//     textAlign: 'center',
//   },

//     cardContainer1: {
//       marginHorizontal:15,
//       padding: 10,
//       marginTop: 15,
//       backgroundColor: '#FFFFFF',
//       borderRadius: 10,
//       borderWidth: 1,
//       borderColor: '#DFE7EF',
//       shadowColor: '#bdc3c7',  
//       shadowOffset: { width: 0, height: 6 }, 
//       shadowOpacity: 0.5, 
//       shadowRadius: 10,
//       elevation: 5, /// For Android shadow effect
//       // margin:5,
  
//       justifyContent: 'center',
//       // marginVertical: 10,
//     },

//     reviewCard: {
//       flexDirection: 'row',
//       justifyContent: 'flex-start',
//       // alignItems: 'center',
//       // padding: 10,
//     },
//   card: {
//     paddingLeft:15,
//       width: '70%',
//   },
//   third: {
//     fontSize: fontSize.Fifteen,
//     color: colors.orange,
//     fontFamily: 'Poppins-Medium',
//   },
//   third1: {
//     fontSize: fontSize.Eighteen,
//     color: colors.heading,
//     fontFamily: 'Poppins-Medium',
//   },

//   reviewText:{
//     marginBottom:5,
//     fontSize: fontSize.Sixteen,
//     color: colors.heading,
//     fontFamily: 'Poppins-Medium',
//   },
//   third2: {
//     fontSize: fontSize.Fourteen,
//     color: '#51575C',
//     fontFamily: 'Poppins-Regular',
//   },
//   touch: {
//     height: wp(6),
//     width: wp(6),
//     marginTop: wp(-3),
//   },

//   plusBtn: {
//     width: 30,
//     height: 30,
//     color: '#324356',
//     textAlign: 'center',
//     textAlignVertical: 'center',
//     borderWidth: 2,
//     borderRadius: 20,
//     fontSize: 18,
//     fontWeight: '700',
//     borderColor: '#324356',
//     position: 'absolute',
//     right: -33,
//     top: 80,
//   },

//   contain: {
//     // marginLeft:10,
//     marginHorizontal: 15,
//     marginTop: hp(5),
//   },
//   service: {
//     fontSize: fontSize.Seventeen,
//     color: colors.heading,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   cont: {
//     fontSize: fontSize.Fourteen,
//     color: colors.cardcolor,
//     fontFamily: 'Poppins-Regular',
//     opacity: 1,
//     marginTop: hp(2),
//     marginHorizontal: 15,
//     // textAlign:'center'
//   },
//   shareview: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     marginHorizontal:15,
//     marginTop: hp(3),
//   },
//   button1: {
//     paddingVertical: wp(1.2),
//     alignItems: 'center',
//     backgroundColor: colors.orange,
//     width: '35%',
//     borderRadius: wp(1),
//     shadowColor: "#ad3803", // Shadow color
//     shadowOffset: {width: 0, height: 6}, // Shadow direction
//     shadowOpacity: 0.8, // Shadow intensity
//     shadowRadius: 10, // Shadow blur radius
//     // Elevation for Android
//     elevation: 8,
//   },
//   btext: {
//     fontFamily: 'Poppins-Regular',
//     fontSize: fontSize.Fourteen,
//     color: colors.white,
//   },
//   seeall: {
//     fontSize: fontSize.Fifteen,
//     fontFamily: 'Poppins-Regular',
//     color: colors.orange,
//     marginVertical: hp(3),
//     textAlign: 'right',
//     marginRight: 15,
//   },
//   book: {
//     backgroundColor: colors.orange,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     height: wp(13),
//     marginBottom: 10,
//     marginHorizontal: 15,
//     shadowColor: "#ad3803", // Shadow color
//     shadowOffset: {width: 0, height: 6}, // Shadow direction
//     shadowOpacity: 0.8, // Shadow intensity
//     shadowRadius: 5, // Shadow blur radius
//     // Elevation for Android
//     elevation: 10,
//   },
//   btext1: {
//     fontFamily: 'Poppins-Medium',
//     fontSize: fontSize.Eighteen,
//     color: colors.white,
//   },

//   courseToggle1: {
//     width: '99%',
//     alignSelf: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#F6F6F6',
//     marginVertical: 1,
//     borderRadius: 5,

//     marginBottom: 10,
//   },
//   activeCourseToggle: {
//     marginBottom: -20,
//     width: '99%',
//     alignSelf: 'center',
//     backgroundColor: colors.ordercolor,
//   },

//   activeTitleColor: {
//     color: colors.orange,
//   },
//   activeTitleColor1: {
//     fontSize: 16,
//     color: '#F4996C',
//   },
//   toggleIcon2: {
//     width: 16,
//     height: 16,
//   },
//   subItemContainer: {
//     marginTop: 15,
//     width: '99%',
//     alignSelf: 'center',
//     backgroundColor: colors.ordercolor,
//     borderBottomLeftRadius: 8,
//     borderBottomRightRadius: 8,
//     borderColor: '#EAEAEA',
//     marginBottom: 10,
//     padding: 5,
//     paddingHorizontal:20
//   },
//   singleSubItem: {
//     flexDirection: 'row',
//     paddingHorizontal: 15,
//   },

//   subItemTitle: {
//     fontSize: fontSize.Thirteen,
//     fontFamily: 'Poppins-Medium',
//     color: colors.heading,
//   },
//   subItemSubtitle: {
//     fontSize: fontSize.Fourteen,
//     fontFamily: 'Poppins-Normal',
//     color: colors.light_gr,
//     marginLeft: wp(3),
//     marginBottom: 15,
//     // marginLeft: 16,
//     // marginBottom: 15,
//   },

//   direction1: {
//     flexDirection: 'row',
//     borderWidth: 0.1,
//   },

//   coursetext2: {
//     fontSize: fontSize.Fourteen,
//     color: colors.heading,
//     fontFamily: 'Poppins-SemiBold',
//   },

//   header1: {
//     fontSize: fontSize.Eighteen,
//     fontFamily: 'Poppins-Medium',
//     color: colors.heading,
//     marginBottom: 5,
//     // textAlign: 'center',
//     marginLeft: 6,
//   },
//   productsContainer: {
//     marginTop: 10,
//     marginBottom: 16,
//     paddingVertical: 20,
//     //  paddingHorizontal: 10,
//     marginHorizontal: 15,
//     backgroundColor: colors.cardm,
//     borderRadius: 15,
//     gap: 35,
//   },
//   productCard: {
//     width: wp(38),
//     minHeight: wp(45), // Fixed width for each card
//     backgroundColor: colors.white,
//     borderRadius: 10,
//     elevation: 3,
//     // Add horizontal margin between cards
//   },
//   productImage: {
//     width: '100%',
//     height: wp(25),
//     borderRadius: 9,
//     //  resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   productName: {
//     fontSize: fontSize.Fourteen,
//     fontFamily: 'Poppins-Medium',
//     color: colors.heading,
//     marginLeft: wp(3),
//     marginBottom: 4,
//   },
//   totalText: {
//     fontSize: fontSize.Sixteen,
//     fontFamily: 'Poppins-SemiBold',
//     color: colors.heading,
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   button: {
//     backgroundColor: '#FF8C66',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },

 

//   slide: {
//     width: wp(44.5),
//     elevation: 5,
//     borderWidth: 0.5,
//     borderColor: colors.lightGrey,
//     borderRadius: 10, // Border radius scaled with wp
//     backgroundColor: colors.white,
//     // shadowColor: colors.black,
//     // shadowOffset: { width: 0, height: wp(0.5) }, // Shadow offset with wp
//     // shadowOpacity: 0.1,
//     // shadowRadius: 10,
//     elevation: 1,
//     margin: 5,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: wp(30),
//     borderRadius: 10,
//   },
//   textContainer: {
//     backgroundColor: colors.ordercolor,
//     paddingHorizontal: 10, // Horizontal padding based on width
//   },

//   price: {
//     fontSize: wp(4), // Price font size responsive to width
//     color: 'black',
//     marginBottom: hp(2), // Margin bottom based on height
//   },
//   buttonstylefirst: {
//     backgroundColor: colors.orange,
//     width: wp(30), // Width based on screen width
//     paddingVertical: 7,
//     borderRadius: 10,

//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonstyle: {
//     color: colors.white,
//     fontSize: fontSize.Twelve,
//     fontFamily: 'Poppins-Regular',
//   },

//   direction: {
//     marginLeft: 0,
//     // width: 70,
//     alignSelf: 'flex-start',
//     paddingBottom: 20,
//   },

//   thirdCard: {
//     fontSize: fontSize.Fourteen,
//     color: colors.cardcolor,
//     fontFamily: 'Poppins-Regular',
//   },

//   quantitySection: {
//     backgroundColor: colors.ordercolor,
//     marginLeft: 20,
//     // borderWidth: 1,
//     borderRadius: 20,
//     width: '40%',
//     justifyContent: 'space-around',
//   },
//   quantityBtns: {
//     fontSize: fontSize.TwentyTwo,
//     color: colors.orange,
//     textAlign: 'center',
//     textAlignVertical: 'center',
//   },
//   checkboxWrapper: {
//     height: 21,
//     width: 21,
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     transform: [{scaleX: 1.2}, {scaleY: 1.2}],
//     borderRadius: 4,
//     borderWidth: 1,
//     borderColor: '#009FDF',
//     backgroundColor: '#fff',
//   },
//   checkedBackground: {
//     backgroundColor: '#009FDF',
//   },
//   imageContainer: {
//     margin: 5,
//     width: 325, // Set the width of the images
//     height: 180,
//   },
//   reviewImage: {
//     width: wp(20), 
//     height: wp(20),
//     resizeMode:"cover",
//     borderRadius: 60,
//     marginBottom:5
//   },
//   dotContainer: {
//     flexDirection: 'row',
//     marginVertical: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: colors.grey,
//     margin: 5,
//   },
//   activeDot: {
//     backgroundColor: colors.Headertext, // Active dot color
//     width: '8%',
//   },
//   backBtn: {
//     marginTop:-5,
//     height: wp(4),
//     width: wp(2.3),
//     resizeMode: 'stretch',
//     marginRight: 20,
//   },
//   bagBtn: {
//     height: wp(4),
//     width: wp(4),
//     marginTop:-5,
//     resizeMode: 'contain',
//   },
//   sevicesImg: {
//     width: wp(10),
//     height: wp(10),
//   },
//   viewLine: {
//     width: 1,
//     height: '80%',
//     borderWidth: 0.5,
//     alignSelf: 'center',
//     borderColor: colors.lightGrey,
//   },
//   viewBorder: {
//     borderWidth: 0.5,
//     borderColor: colors.lightGrey,
//     width: '90%',
//     alignSelf: 'center',
//     marginBottom: 5,
//   },
// });
