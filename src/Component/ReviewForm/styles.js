import {StyleSheet} from 'react-native';
import { fontSize } from '../fontsize';
import { colors } from '../colors';
import { heightPercent as hp, widthPrecent as wp } from '../ResponsiveScreen/responsive';


export default StyleSheet.create({

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
});