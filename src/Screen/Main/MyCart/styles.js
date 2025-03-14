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
    backgroundColor: '#F6F6F6',
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
    paddingBottom: '65%',
    flexGrow: 1,
  },
  direction1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  subtotalsavingyview: {
    paddingHorizontal: 20,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#FBF5F2',
    position: 'absolute',
    bottom: 0,
  },
  subtotaltext: {
    fontSize: fontSize.Thirteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  subtotaltext1: {
    fontSize: fontSize.Fifteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  rupees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeestext: {
    fontSize: fontSize.Thirteen,
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
    marginBottom: hp(1),
  },
  
  image1: {
    height: hp(15),
    width: wp(35),
    borderRadius: 20,
    marginBottom: hp(2),
  },
  textContainer: {
    backgroundColor: colors.ordercolor,
    paddingHorizontal: wp(2),
    paddingTop: 10,
  },
  viewinner: {
    flexDirection: 'row',
    padding: wp(2),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
    elevation: 10,
    width: '100%',
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    shadowOpacity: 0.8,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  viewinner1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: hp(2),
    marginTop: hp(1),
    marginBottom: hp(1),
    backgroundColor: colors.white,
    width: '100%',
    elevation: 5,
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
    width: '90%',
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
    marginTop:-1,
    marginRight:-1
  },

  toview: {
    flexDirection: 'row',
  },
  textDeliver: {
    color: colors.paymenttext,
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
  },
  texttejash: {
    fontSize: fontSize.Fifteen,
    color: colors.paymenttext,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: wp(1)
  },
  loremtext: {
    fontSize: fontSize.Twelve,
    width: wp(70),
    color: '#888888',
    fontFamily: 'Poppins-Regular',
  },
  loremview: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  change: {
    fontSize: fontSize.Twelve,
    color: colors.Headertext,
    fontFamily: 'Poppins-Medium',
  },
  viewDeliver: {
    padding: wp(5),
    marginTop: hp(1),
    elevation: 5,
    backgroundColor: '#fff',
  },
 
  third1: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },

  slide: {
    width: wp(44.5),
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    elevation: 10,
    margin: 5,
    overflow: 'hidden',
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
    borderRadius: 5,
    width: '70%',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  quantityBtns: {
    fontSize: fontSize.TwentyTwo,
    color: colors.searchBarTextColor,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonstylefirst: {
    backgroundColor: colors.orange,
    width: '70%',
    borderRadius: 10,
    height: wp(9),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  direction: {
    minHeight: wp(6),
    marginBlock: 5,
    alignSelf: 'flex-start',
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
    alignItems: 'center',
    height: wp(13),
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: hp(1.3),
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  backBtn: {
    // height: wp(4),
    // width: wp(2.3),
    // resizeMode: 'stretch',
    marginRight: 10,
    marginTop: -5,
  },

  continueShoppingImg: {
    marginHorizontal: 'auto',
    width: '70%',
    resizeMode: 'contain',
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

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    height: wp(45),
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: wp(2),
  },
  modalMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Fourteen,
    textAlign: 'center',
    marginBottom: wp(2),
  },
  modalButtons: {
    marginTop: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
  },
});
