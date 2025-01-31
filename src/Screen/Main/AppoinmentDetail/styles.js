import {StyleSheet} from 'react-native';
import { fontSize } from '../../../Component/fontsize';
import { colors } from '../../../Component/colors';
import { heightPercent as hp, widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical:10,
    backgroundColor: '#FBF5F2',
    borderBottomWidth: 0.5,
    borderColor: '#DFE7EF',
    gap: 10,
  },
  backIcon: {
    width: 14,
    height: 14,
    color: '#324356',
  },
  headerView:{
    flexDirection: 'row', 
    alignItems: 'center',
    // marginTop:5,
  },
  headerTitle: {
    fontSize: fontSize.Sixteen,
    fontFamily:'Poppins-Regular',
    color:colors.heading,
  },
  imageSection: {
    backgroundColor: '#FBF5F2',
    width: '100%',
    height: 150,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  mainImg: {
    height: wp(30),
    width: wp(30),
    // resizeMode: 'contain',
    borderRadius: 80,
    margin: 'auto',
    borderWidth: 1,
    borderColor: '#D8E3E980',
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 12,
    marginBottom: -wp(15),
    zIndex: 1,
  },
  scroll:{
    // flex:1,
    paddingBottom:hp(6)
  },
  ProfileInfoSection: {
    overflow: 'hidden',
    backgroundColor: '#F5FAFF',
    marginTop:-21,
    // borderWidth: 1,
    borderColor: '#D8E3E980',
    shadowColor: '#00000029',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  InfoSection: {
    backgroundColor: '#F5FAFF',
    padding: 15,
    width: '100%',
    // height: 250,
    paddingTop:wp(16),
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
    shadowColor: '#EAF0F5', // Light pink color for the shadow
    shadowOffset: { width: 0, height: 6 }, // Offset 0px horizontally, 6px vertically
    shadowOpacity: 0.5, // Opacity of the shadow (transparent but visible)
    shadowRadius: 14, // Blur radius of 10px
    
    // Android Elevation
    elevation: 5,
  },
  nameText: {
    marginBottom: 5,
    color:colors.heading,
    lineHeight: wp(6),
    textAlign: 'center',
    fontSize: fontSize.Seventeen,
    fontFamily:'Poppins-Medium',
    width: wp(50),
  },
  dateInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  sectionText: {
    fontSize: fontSize.Twelve,
    fontFamily:'Poppins-Medium',
    color:colors.heading,
  },
  dateText: {
    fontSize: fontSize.Twelve,
    fontFamily:'Poppins-SemiBold',
  },
  ImgIcon: {
    height: wp(3.5),
    width: wp(3.5),
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
    // paddingHorizontal: 30,
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
    // padding:16,
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
  backBtn: {
    marginTop:-5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight:20
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
  reviewSection: {
    marginTop: 20,
    backgroundColor: '#F1F1F1',
  },
  reviewCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    // padding: 10,
  },
  reviewImage: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'cover',
    borderRadius: 60,
    marginBottom: 5,
  },
  card: {
    paddingLeft: 15,
    width: '70%',
    // borderWidth:1
  },
  third1: {
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
  seeall: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
    color: colors.orange,
    marginVertical: hp(2),
    marginRight: 20,
    textAlign: 'right',
  },
});
