import {Dimensions, StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';

const screenWidth = Dimensions.get('screen').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
  backIcon: {
    width: 14,
    height: 14,
    color: '#324356',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  orderId: {
    position: 'absolute',
    right: 10,
    fontSize: 14,
    color: '#4A4A4A',
    fontWeight: '500',
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8E3E980',
    shadowColor: '#bdc3c7',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
    padding: 15,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 13,
    marginTop: 6,
    borderRadius: 10,
    // borderWidth:1,
    // borderColor: '#D8E3E980',
    // shadowColor: '#bdc3c7',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.5,
    // shadowRadius: 12,
    //  elevation: 0.3,
    // paddingHorizontal: 15,
    paddingVertical:5
  },
  ImageBtn:{
    width: wp(34),
    height:wp(20),
    borderWidth:1,
    borderColor: '#D8E3E980',
    borderRadius: 5,
  },
  cardImg: {
    // width: wp(34),
    resizeMode: 'contain',
    height: '100%',
  },
  cardInfo: {
    width: '55%',
  },
  productName: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  itemNameText:{
    fontSize: fontSize.Fifteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  quantitySection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  cancleBtn: {
    backgroundColor: colors.white,
    padding: wp(3),
    borderRadius: 6,
    borderWidth:1,
    borderColor:colors.placeholder,
  },
  cancleBtnText:{
    textAlign: 'center',
    color: colors.grey,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-SemiBold',
  },
  OrderTrackcontainer: {
    height: wp(60),
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#DFE7EF',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#DFE7EF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },

  titleText: {
    color: colors.heading,
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Medium',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: '#DFE7EF',
    marginBottom: 10,
  },
  lebleText: {
    width: 200,
    marginLeft: 10,
    fontFamily: 'Poppins-Medium',
  },
  stepCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#8E959E',
    borderColor: 'red',
  },
  activeStepCircle: {
    backgroundColor: '#02A883',
  },
  finieshedStepCircle: {
    backgroundColor: '#02A883',
  },

  sectionTitle: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    paddingBottom: 5,
    marginBottom: 5,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  TaxText: {
    font: fontSize.Fourteen,
    color: '#324356',
  },
  totalText: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },

  addressSection: {
    gap: 2,
  },
  customerName: {
    fontSize: fontSize.Fourteen,
    color: colors.orange,
    fontFamily: 'Poppins-Bold',
  },
  addressText: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },

  dropdown: {
    height: wp(6),
    width: wp(14),
    borderColor: '#D8E3E980',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 6,
    marginTop: -3,
  },

  OrderstatusMsgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    marginBottom: 10,
    borderColor: '#D8E3E980',
    borderBottomWidth: 1,
  },
  cancleOrderImg: {
    height: wp(5),
    width: wp(5),
    resizeMode: 'cover',
    marginRight: 5,
  },
  StatusMsgText: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Medium',
    color: colors.paymenttext,
  },
  checkedIcon: {
    margin: 'auto',
    height: '70%',
    width: '70%',
  },
  trakIdSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  copyIcon: {
    height: wp(4),
    width: wp(4),
  },
  copyBtn: {
    borderWidth: 1,
    gap: 10,
    // width: 90,
    padding: 8,
    borderRadius: 8,
    borderColor: '#DFE7EF',
    borderWidth: 1,
    shadowColor: '#D8E3E980',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  btnText: {
    color: '#707070',
    fontSize: fontSize.Fourteen,
    textAlignVertical: 'center',
  },
  tarkIdText: {
    fontSize: fontSize.Fourteen,
    color: '#324356',
    textAlignVertical: 'center',
    marginRight: 5,
    fontWeight: 500,
  },
  backBtn: {
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  input: {
    borderWidth: 1,
    height: 'auto',
    // width:'95%',
    // minHeight: 50,
    borderRadius:5,
    borderColor: colors.placeholder,
    padding:15,
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginBottom:20
  },
});
