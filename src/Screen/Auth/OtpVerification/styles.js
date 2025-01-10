import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../Component/colors/index';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
 scroll:{
    paddingHorizontal:15,
    marginTop:hp(19)
 },
 main:{
    marginTop:hp(5),
   marginLeft:wp(2)
 },
  title1: {
    marginTop: hp(1),
    fontSize: fontSize.Seventeen,
    color: colors.light_gr,
     textAlign:"center",
    fontFamily: 'Poppins-Regular',
  },
  title:{
   marginTop:hp(-0.5),
    fontSize: fontSize.Seventeen,
    color: colors.heading,
    textAlign:"center",
    fontFamily: 'Poppins-Medium',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '99%',
    marginTop:hp(5),
  },
  codeInput: {
    width: width * 0.12,
    height: width * 0.12,
    backgroundColor: colors.white,
    color: colors.heading,
    fontSize: fontSize.Eighteen,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    opacity: 0.9,
    textAlign: 'center',
    elevation:10
  },
  
  buttoncontainer:{
    height: wp(13),
    width: '100%',
    backgroundColor: colors.orange,
    borderRadius: 10,
    marginTop: hp(5),
    paddingHorizontal: 15,
   justifyContent:'center',
   alignItems: 'center',
   shadowColor: "#ad3803",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12, 
    shadowRadius: 1,
    elevation: 12,
  },
  touch:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  btext:{
    fontSize:fontSize.Eighteen,
    color:colors.white,
    fontFamily:'Poppins-Regular'
  },
  endview:{
    marginTop:hp(3),
    flexDirection:'row',
    borderWidth:0.01,
    justifyContent:'center'
  },
  endtext:{
    fontSize:fontSize.Sixteen,
   fontFamily:'Poppins-Regular',
   color:colors.light_gr,
   textAlign:'center'
  },
  resend:{  
    marginTop: hp('2%'),
    
    // marginRight: wp('10%'),
  }
});
