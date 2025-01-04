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
    // paddingHorizontal:8
  },
  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 12,
    backgroundColor: colors.ordercolor,
    borderRadius: 20,
    elevation: 3,
    paddingHorizontal: 15,
  },
  searchInput: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: fontSize.Fourteen,
    paddingHorizontal: 10,
    color: colors.heading,
    paddingVertical: 10,
  },

  filterBtn: {
    backgroundColor: colors.white,
    height: 30,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 8,
  },
  direction: {
    minHeight:wp(6),
    marginBlock: 5,
    alignSelf: 'flex-start',
    // marginLeft: 0,
    // width: 70,
    // paddingBottom: 20,
  },

  third: {
    // borderWidth:1,
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },
  third1: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  third2: {
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Regular',
  },
  Scroll: {
    // paddingHorizontal: 12,
    paddingBottom: hp(10),
  },

  slide: {
    width: wp(46),
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    margin: 7,
    overflow: 'hidden',
    elevation: 1,
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: wp(0.5) }, // Shadow offset with wp
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: wp(30),
    borderRadius: 10,
  },
  textContainer: {
    padding: 10, // Horizontal padding based on width
    backgroundColor: colors.ordercolor,
  },

  price: {
    fontSize: wp(4), // Price font size responsive to width
    color: 'black',
    marginBottom: hp(2), // Margin bottom based on height
  },
  buttonstylefirst: {
    backgroundColor: colors.orange,
    width: wp(26), // Width based on screen width
    paddingVertical: 7,
    borderRadius: 8, // Border radius responsive to width
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonstyle: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
  },
  contain1: {
    paddingHorizontal: 5,
    marginTop: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  service: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  service1: {
    fontSize: fontSize.Seventeen,
    color: colors.Headertext,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },
  text: {
    marginTop: hp(1),
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
    textAlign: 'center',
  },
  text1: {
    marginTop: hp(1),
    fontSize: fontSize.Seventeen,
    fontFamily: 'Poppins-Medium',
    color: colors.white,
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10,
  },

  titleText: {
    // minHeight: wp(11),
  },
  priceText: {
    marginTop: 5,
    flexDirection: 'row',
    gap:5
  },

  buttoncontainer: {
    height: 50,
    width: '50%',

    borderRadius: 10,
    // opacity: 1,
    // borderWidth:1,
    // marginTop: hp(2),
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btext: {
    fontSize: fontSize.Eighteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
  backBtn: {
    height: wp(4),
    marginTop: -5,
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  // bagBtn: {
  //   resizeMode: 'contain',
  //   top:-8,
  //   // position:"absolute",
  //   // height: wp(4),
  //   // width: wp(4),
  //   // marginTop:-5,
  //   // resizeMode: 'contain',
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
//     // paddingHorizontal:8
//   },
//   logoText: {
//     fontSize: fontSize.Eighteen,
//     color: colors.heading,
//     fontFamily: 'Poppins-Regular',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 15,
//     marginHorizontal: 12,
//     backgroundColor: colors.ordercolor,
//     borderRadius: 20,
//     elevation: 3,
//     paddingHorizontal: 15,
//   },
//   searchInput: {
//     fontFamily: 'Poppins-Regular',
//     width: '80%',
//     fontSize: fontSize.Fourteen,
//     paddingHorizontal: 10,
//     color: colors.heading,
//     paddingVertical: 10,
//   },

//   filterBtn: {
//     backgroundColor: colors.white,
//     height: 30,
//     width: 55,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 20,
//     position: 'absolute',
//     right: 8,
//   },
//   direction: {
//     marginTop: 5,
//     marginLeft: 0,
//     // width: 70,
//     alignSelf: 'flex-start',
//     paddingBottom: 20,
//   },

//   third: {
//     // borderWidth:1,
//     fontSize: fontSize.Fourteen,
//     color: colors.cardcolor,
//     fontFamily: 'Poppins-Regular',
//   },
//   third1: {
//     fontSize: fontSize.Eighteen,
//     color: colors.heading,
//     fontFamily: 'Poppins-Medium',
//   },
//   third2: {
//     fontSize: fontSize.Fourteen,
//     color: '#51575C',
//     fontFamily: 'Poppins-Regular',
//   },
//   Scroll: {
//     // paddingHorizontal: 12,
//     paddingBottom: hp(10),
//   },

//   slide: {
//     width: wp(46),
//     borderRadius: 10,
//     backgroundColor: colors.white,
//     borderWidth: 0.5,
//     borderColor: colors.lightGrey,
//     margin: 7,
//     overflow: 'hidden',
//     elevation: 1,
//     // shadowColor: colors.black,
//     // shadowOffset: { width: 0, height: wp(0.5) }, // Shadow offset with wp
//     // shadowOpacity: 0.1,
//     // shadowRadius: 10,
//   },
//   image: {
//     width: '100%',
//     height: wp(30),
//     borderRadius: 10,
//   },
//   textContainer: {
//     padding: 10, // Horizontal padding based on width
//     backgroundColor: colors.ordercolor,
//   },

//   price: {
//     fontSize: wp(4), // Price font size responsive to width
//     color: 'black',
//     marginBottom: hp(2), // Margin bottom based on height
//   },
//   buttonstylefirst: {
//     backgroundColor: colors.orange,
//     width: wp(26), // Width based on screen width
//     paddingVertical: 7,
//     borderRadius: 8, // Border radius responsive to width
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonstyle: {
//     color: colors.white,
//     fontSize: fontSize.Twelve,
//     fontFamily: 'Poppins-Regular',
//   },
//   contain1: {
//     paddingHorizontal: 5,
//     marginTop: hp(5),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   service: {
//     fontSize: fontSize.Twenty,
//     color: colors.heading,
//     fontFamily: 'Poppins-Medium',
//   },
//   service1: {
//     fontSize: fontSize.Seventeen,
//     color: colors.Headertext,
//     textDecorationLine: 'underline',
//     fontFamily: 'Poppins-Medium',
//   },
//   text: {
//     marginTop: hp(1),
//     fontSize: fontSize.Fourteen,
//     fontFamily: 'Poppins-Regular',
//     color: colors.heading,
//     textAlign: 'center',
//   },
//   text1: {
//     marginTop: hp(1),
//     fontSize: fontSize.Seventeen,
//     fontFamily: 'Poppins-Medium',
//     color: colors.white,
//     textAlign: 'center',
//     position: 'absolute',
//     right: 0,
//     left: 0,
//     bottom: 10,
//   },

//   titleText: {
//     minHeight: wp(11),
//   },
//   priceText: {
//     marginTop: 5,
//     flexDirection: 'row',
//     gap:5
//   },

//   buttoncontainer: {
//     height: 50,
//     width: '50%',

//     borderRadius: 10,
//     // opacity: 1,
//     // borderWidth:1,
//     // marginTop: hp(2),
//     paddingHorizontal: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btext: {
//     fontSize: fontSize.Eighteen,
//     color: colors.white,
//     fontFamily: 'Poppins-Regular',
//   },
//   backBtn: {
//     height: wp(4),
//     marginTop: -5,
//     width: wp(2.3),
//     resizeMode: 'stretch',
//     marginRight: 20,
//   },
//   bagBtn: {
//     // height: wp(4),
//     // width: wp(4),
//     // marginTop:-5,
//     // resizeMode: 'contain',
//   },
//   itemCount: {
//     backgroundColor: '#EF6024',
//     borderRadius: 10,
//     zIndex: 1,
//     bottom: -10,
//     left: 7,
//     height: 13,
//     width: 13,
//     display:"flex",
//     justifyContent:"center",
//     alignItems:"center"
//     // paddingVertical:.5
//   },
//   countText: {
//     textAlign:"center",
//     fontFamily: 'Poppins-Regular',
//     color: colors.white,
//     fontSize: fontSize.Ten,
//   },
// });
