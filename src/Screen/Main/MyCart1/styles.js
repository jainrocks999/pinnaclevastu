import {StyleSheet} from 'react-native';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.white,

    elevation: 3,
  },
  headerview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  scroll: {
    paddingHorizontal: 0,
    paddingBottom: '55%',
    flexGrow: 1,
  },
  direction1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: hp(1),
    paddingTop:10,
    
  },
  subtotalsavingyview: {
    paddingHorizontal: 10,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FBF5F2',
    // marginBottom: hp(2),
    position: 'absolute',
    bottom: 0,
  },
  subtotaltext: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  subtotaltext1: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  main: {
    // borderWidth:1,
    backgroundColor:colors.white,
    marginTop:hp(1),
    paddingHorizontal: 10,
  },
  rupees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeestext: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp(1),
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    opacity: 0.4,
  },

  summaryview: {
    // marginLeft: wp(4),
    marginBottom: hp(1),
  },

  summarytext: {
    marginLeft: wp(-4),
    fontSize: 14,
    color: '#324356',
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  titleText: {
    minHeight: wp(10),
  },
  image1: {
    height: hp(15),
    width: wp(40),
    borderRadius: 20,
    marginBottom: hp(2),
  },
  textContainer: {
    backgroundColor:colors.ordercolor,
    paddingHorizontal: wp(2),
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(1),
  },
  price: {
    fontSize: wp(4),
    color: 'black',
    marginBottom: hp(2),
  },
  viewinner: {
    flexDirection: 'row',
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'space-between',

    marginTop: hp(2),
    elevation: 3,
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    // shadowColor:'#000',
    shadowOpacity: 0.8,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  viewinner1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp(2),
    marginBottom: hp(1),
    backgroundColor: colors.white,
    width: '100%',
    elevation:5
  },
  image: {
    height: hp(15),
    width: wp(80),
  },
  contentContainer: {
    gap: 5,
    flex: 1,
    justifyContent: 'center',
    marginLeft: wp(5),
  },
  textstyle: {
    color: colors.heading,
    width: '80%',
    fontSize: fontSize.Thirteen,
    fontFamily: 'Poppins-Medium',
  },
  buttonview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
    marginLeft: wp(2),
    borderWidth: 1,
    marginRight: wp(3),
  },
  filterview: {
    padding: wp(3),
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: wp(1),
  },
  filterstyle: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    color: '#000',
  },
  crossIcon: {position: 'absolute', top: 8, right: 10},
  closeButton: {
    backgroundColor: '#E65555',
    height: wp(5),
    width: wp(5),
    borderRadius: wp(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: '#fff',
    fontSize: wp(3.5),
    transform: [{rotate: '45deg'}],
  },


 
  placeOrderButton: {
    backgroundColor: '#F4996C', // Or any color you prefer
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  touch: {
    // height: 20,
    // width: 20,
    // marginTop: hp(-1),
  },
  third1: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },

  header1: {
    marginTop: 10,
    fontSize: fontSize.Eighteen,
    fontFamily: 'Poppins-Medium',
    color: colors.heading,
    marginBottom: 15,
    marginLeft: wp(1.2),
    // textAlign: 'center',
  },
  slide: {
    width: wp(44.5),
    borderRadius: 10, // Border radius scaled with wp
    backgroundColor: colors.white,
    borderWidth:0.5,
    borderColor:colors.lightGrey,
    // shadowColor: colors.black,
    // shadowOffset: { width: 0, height: wp(0.5) }, // Shadow offset with wp
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    elevation: 1,
    margin: 5,
    overflow:"hidden"
  },
  image: {
    width: '100%',
    height: wp(30),
    borderRadius: 10,
  },

   buttonstyle: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
  },
  quantitySection: {
    backgroundColor: colors.ordercolor,
    borderRadius: 20,
    width: '80%',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  quantityBtns: {
    fontSize: fontSize.TwentyTwo,
    color: colors.orange,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  price: {
    fontSize: wp(4),
    color: 'black',
    marginBottom: hp(2),
  },
  buttonstylefirst: {
    backgroundColor: colors.orange,
    width:"70%",
    borderRadius: 10,
    height: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  
  },


  direction: {
    marginLeft: 0,
    alignSelf: 'flex-start',
    paddingBottom: 20,
  },

  third: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },

  third2: {
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Regular',
  },

  book: {
    backgroundColor: colors.orange,
    justifyContent:"center",
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    height: wp(13),
    marginTop: hp(2),
   shadowColor: "#ad3803",
    shadowOffset: {width: 0, height: 6}, 
    shadowOpacity: 0.8,
    shadowRadius: 10, 
    
    elevation: 8,
  },
  counterText: {
    fontSize: fontSize.TwentyTwo,
    color: colors.orange,
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  backBtn: {
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
});
