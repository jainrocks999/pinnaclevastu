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
    justifyContent: 'center', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    paddingBottom:20
  },
  main: {
    paddingHorizontal: 15,
    paddingVertical:20,
    marginTop:hp(50),
    backgroundColor: "rgba(50, 67, 86, 0.8)",
    borderRadius: 20,
    width: '90%', 
    alignSelf: 'center',
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
    flex: 1,
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
    shadowColor: "#E5C8C1", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 10, 
    
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