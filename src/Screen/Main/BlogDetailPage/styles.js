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
    // backgroundColor: '#F6F6F6',
    backgroundColor: colors.white,
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
  cardInfo: {
    padding: 15,
    gap: 6,
  },
  scroll: {
    flexGrow: 1,
    paddingBottom:hp(10)
  },
  viewinner:{
    alignItems:'center',
    justifyContent:'center'
  },
  viewinner1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: hp(2),
     marginTop: hp(1),
     marginBottom: hp(5),
     backgroundColor: colors.white,
    width: '100%',
    gap:6,
   
    // elevation: 5,
  },
  blogCard: {
    margin: 0,
    // marginLeft: 15,
    backgroundColor: '#fff',
     width:wp(95),
    borderRadius: 10,
    overflow: 'hidden',
  },
  DateText: {
    color: colors.Headertext,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
  },

  blogCardHeadText: {
    minHeight: wp(11),
    marginTop: -6,
    fontSize: fontSize.Eighteen,
    color: '#143F71',
    fontFamily: 'Poppins-Medium',
    textTransform:'capitalize'
  },
  blogCardContantText: {
    color: '#001227',
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
  },
  blogCardBtnText: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
    color: colors.orange,
    marginTop: 10,
    borderRadius: 6,
  },
  formContainer: {
    marginHorizontal: 10   ,
    paddingHorizontal: 15,
    paddingVertical: wp(8),
    // paddingVertical: 20,
    borderRadius: 20,
    marginBottom: -hp(25),
  },
  smallHeadText: {
    color: colors.white,
    textDecorationLine: 'none',
    marginBottom: -10,
  },
  service1: {
    fontSize: fontSize.Fourteen,
    color: colors.Headertext,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Medium',
  },
  extraBoldText: {
    color: colors.white,
    fontSize: fontSize.TwentyTwo,
    fontFamily: 'Poppins-Bold',
  },
  textInputContainer: {
    height: wp(14),
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    width:'90%',
    alignSelf:'center',
    // paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    marginBottom: 10,
  },
  textInput: {
    marginVertical: 'auto',
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: wp(13),
    width: '100%',
    backgroundColor: 'white',
    borderColor: colors.lightGrey,
  },
  inputText: {
    height: '100%',
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  selectedText: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  submitBtn: {
    borderColor: colors.white,
    width: '90%',
    alignSelf:'center',
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Medium',
    borderWidth: 1,
    paddingVertical: 13,
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
  textContainer: {
    paddingVertical: hp(4),
    paddingHorizontal: 18,
  },
  cardStar:{
    flexDirection:'row',
    justifyContent:"center",
    alignItems:"center",
    gap:5
  },
  ratingText:{
  fontSize:fontSize.Twelve,
  color:"#949494"
  },
  smallText: {
    fontSize:fontSize.Fourteen,
    color: colors.paymenttext,
    fontFamily:'Poppins-Regular',
    lineHeight: wp(4.5),
  },
  reviewForm: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 20,
    gap: 10,
    borderRadius:10,
    marginTop:10
  },
  formHeadText: {
    fontSize: fontSize.Eighteen,
    fontFamily:'Poppins-Medium',
    textAlign: 'center',
    color:colors.heading,
  },
  textInputContainer: {
    backgroundColor:colors.white,
    paddingHorizontal: 15,
    paddingVertical:7,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#E9E9E9',
    marginBottom:5
  },
  lableText: {
    fontSize:fontSize.Fourteen,
    fontFamily:'Poppins-Medium',
    color:colors.heading,marginLeft:5
  },
  textInput: {
    fontSize: fontSize.Fourteen,
    color:colors.heading,
    fontFamily:'Poppins-Regular',
  },
  starContainer: {
    marginVertical: 5,
    alignSelf:"flex-start",
    borderWidth:0.1
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  submitBtn: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    height: wp(12),
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    borderRadius:10,
    shadowColor: '#E5C8C1',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
    marginVertical:15,
  },
  heightInput:{
    height:120
  },

  shareview: {
    marginHorizontal: 15,
    borderTopColor: colors.lightGrey,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingTop: 18,
    marginTop: hp(3),
   
    width:wp(96)
    // alignItems: 'center',
  },

  shareIcon: {
    
  },
  rowSection: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  
  socialImg: {
    height: wp(4.5),
    width: wp(4.5),
    marginLeft: 8,
  },
});
