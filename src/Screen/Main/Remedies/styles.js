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
    paddingHorizontal: 16,
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
  searchContainer: {
    paddingBottom: hp(10),
    // paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    color: '#555',
    paddingVertical: 10,
  },
  welcomeCard: {
    // width: '100%',
    marginTop:15,
    borderRadius: 15,
    //  marginHorizontal: 2,
    // padding: 15,
    // elevation: 5,
  },

  servicesContainer: {
    paddingHorizontal: 10,
    paddingBottom: hp(10),
  },

  listContainer: {
    paddingHorizontal: 5,
    // paddingTop: hp(2),
  },

  cardContainer1: {
    width: wp(46), // Adjust to fit your design
    height: wp(36),
    borderRadius: 10,
    margin: 5,
    borderWidth: 0.4,
    overflow: 'hidden',
  },
  cardContainer2: {
    width: wp(90),
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    shadowColor: '#D8E3E9',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6, // For Android shadow effect
    paddingHorizontal: 5,
    margin: 5,
    justifyContent: 'center',
    marginVertical: 10,
  },
  card: {
    width: '55%',
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
  third2: {
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Regular',
  },
  contain: {
    marginLeft: 10,
    marginTop: hp(5),
  },

  contain1: {
    marginVertical: hp(1),
    height: wp(40),
    width: wp(95),
    borderRadius: 10,
    marginHorizontal: 'auto',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
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
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
    width: '90%',
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10,
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
    marginTop: -5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  bagBtn: {
    // borderWidth:1,

    // height: wp(4),
    // width: wp(4),
    resizeMode: 'contain',
    // right: 15,
  },
  itemCount: {
    backgroundColor: '#EF6024',
    borderRadius: 10,
    zIndex: 1,
    bottom: -10,
    left: 7,
    marginTop:-15,
    height: 15,
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
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     elevation: 2,
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
//   searchContainer: {
//     paddingBottom: hp(10),
//     // paddingHorizontal: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 15,
//     color: '#555',
//     paddingVertical: 10,
//   },
//   welcomeCard: {
//     // width: '100%',
//     borderRadius: 15,
//     //  marginHorizontal: 2,
//     // padding: 15,
//     // elevation: 5,
//   },

//   servicesContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: hp(10),
//   },

//   listContainer: {
//     paddingHorizontal: 5,
//     // paddingTop: hp(2),
//   },

//   cardContainer1: {
//     width: wp(46), // Adjust to fit your design
//     height: wp(36),
//     borderRadius: 10,
//     margin: 5,
//     borderWidth:0.4,
//     overflow: 'hidden',
//   },
//   cardContainer2: {
//     width: wp(90),
//     height: 150,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#DFE7EF',
//     shadowColor: '#D8E3E9',
//     shadowOffset: {width: 0, height: 6},
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 6, // For Android shadow effect
//     paddingHorizontal: 5,
//     margin: 5,
//     justifyContent: 'center',
//     marginVertical: 10,
//   },
//   card: {
//     width: '55%',
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
//   third2: {
//     fontSize: fontSize.Fourteen,
//     color: '#51575C',
//     fontFamily: 'Poppins-Regular',
//   },
//   contain: {
//     marginLeft: 10,
//     marginTop: hp(5),
//   },

//   contain1: {
//     marginVertical: hp(1),
//     height: wp(40),
//     width: wp(95),
//     borderRadius: 10,
//     marginHorizontal: 'auto',
//   },
//   image: {
//     height: '100%',
//     width: '100%',
//     resizeMode: 'contain',
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
//     fontFamily: 'Poppins-SemiBold',
//     color: colors.white,
//     width:'90%',
//     textAlign: 'center',
//     position: 'absolute',
//     right: 0,
//     left: 0,
//     bottom: 10,
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
//     marginTop:-5,
//     height: wp(4),
//     width: wp(2.3),
//     resizeMode: 'stretch',
//     marginRight: 20,
//   },
//   bagBtn: {
//     // borderWidth:1,

//     // height: wp(4),
//     // width: wp(4),
//     resizeMode: 'contain',
//     // right: 15,
//   },
// });
