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
    backgroundColor: colors.background,
  },
  imgbcg: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center content when keyboard is hidden
    paddingBottom:20
  },
  main: {
    paddingHorizontal: 15,
    paddingVertical:20,
    marginTop:hp(50),
    backgroundColor: "rgba(50, 67, 86, 0.8)",
    borderRadius: 20,
    width: '90%', // Ensure responsiveness
    alignSelf: 'center',
    // elevation: 5, // Add shadow for better visibility
  },
  title: {
    fontSize: fontSize.Nineteen,
    color: colors.orange,
    fontFamily: 'Poppins-SemiBold',
  },
  title1: {
    marginTop: 10,
    fontSize: fontSize.Nineteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
  inputcontainer: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputtext: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
  },
  line: {
    height: 20,
    width: 0.5,
    backgroundColor: colors.heading,
    marginHorizontal: 10,
  },
  inputbox: {
    flex: 1, // Take the remaining width
    fontSize:fontSize.Sixteen,
    color:colors.heading
  },
  buttoncontainer: {
    height: wp(13),
    backgroundColor: colors.orange,
    borderRadius: 10,
    marginTop:10,
    paddingHorizontal:15,
    justifyContent: 'center',
    shadowColor: "#E5C8C1", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow direction
    shadowOpacity: 0.8, // Shadow intensity
    shadowRadius: 10, // Shadow blur radius
    // Elevation for Android
    elevation: 5,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btext: {
    fontSize: fontSize.Eighteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },
  endview: {
    marginVertical: 10,
    justifyContent: 'center',
  },
  endtext: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
    textAlign: 'center',
  },
});


// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.background,
//   },
//   imgbcg: {
//     flex: 1,

//     // height:'100%',
//     // width:'100%'
//   },
//   main: {
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     backgroundColor: colors.cardcolor,
//     height: hp(45),
//     opacity: 1,
//      width: wp(93),
//      position: 'relative',
//     borderRadius: 20,
//     alignSelf: 'center',
//     top:0,
//      bottom: 210,
//   },
//   title: {
//     fontSize: fontSize.Nineteen,
//     color: colors.orange,
//     fontFamily: 'Poppins-SemiBold',
//   },
//   subt: {
//     marginTop: hp(1),
//   },
//   title1: {
//     marginTop: hp(1),
//     fontSize: fontSize.Nineteen,
//     color: colors.white,
//     // opacity: 1,
//     fontFamily: 'Poppins-Regular',
//   },
//   inputcontainer: {
//     height: 50,
//     width: '100%',
//     backgroundColor: colors.white,
//     borderRadius: 10,
//     opacity: 1,
//     // borderWidth:1,
//     marginTop: hp(4),
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   inputtext: {
//     fontSize: fontSize.Eighteen,
//     color: colors.heading,
//   },
//   line: {
//     height: 20,
//     width: 0.5,
//     backgroundColor: colors.heading,
//     marginLeft: wp(1),
//   },
//   inputbox:{
//     width:'90%',
//     height:40,
//     // borderWidth:2
//   },
//   buttoncontainer:{
//     height: 50,
//     width: '100%',
//     backgroundColor: colors.orange,
//     borderRadius: 10,
//     // opacity: 1,
//     // borderWidth:1,
//     marginTop: hp(2),
//     paddingHorizontal: 15,
//    justifyContent:'center'
  
//   },
//   touch:{
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent:'space-between'
//   },
//   btext:{
//     fontSize:fontSize.Eighteen,
//     color:colors.white,
//     fontFamily:'Poppins-Regular'
//   },
//   endview:{
//     marginTop:hp(2),justifyContent:'center'
//   },
//   endtext:{
//     fontSize:fontSize.Sixteen,
//    fontFamily:'Poppins-Regular',
//    color:colors.white,
//    textAlign:'center'
//   }
// });
