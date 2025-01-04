import {StyleSheet} from 'react-native';
import { colors } from '../../colors';
import { fontSize } from '../../fontsize';
import { widthPrecent as wp} from '../../ResponsiveScreen/responsive';

export default StyleSheet.create({
  section: {
    flexDirection: 'row',
    // alignItems:"center",
    borderWidth: 1,
    borderColor: '#DFE7EF',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical:10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#D8E3E9',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6, 
    marginTop:20,
  },
  image: {
    height:"90%",
    width: '55%',
    //  resizeMode: 'center',
  },
  infoSection: {
     marginTop: -7,
    padding: 5,
    gap:3
  },
  TitleText: {
    color: colors.heading,
    fontSize: fontSize.Twenty,
    fontFamily:'Poppins-Medium',
    marginLeft:8,
    width:'90%'
  },
  subHeadText: {
    color: colors.heading,
    fontSize: fontSize.Fourteen,
    fontFamily:'Poppins-Medium',
    marginLeft:8
  },
  regularText:{
    color: colors.heading,
    fontSize: fontSize.Twelve,
    fontFamily:'Poppins-Regular',
    marginLeft:8
  }
});
