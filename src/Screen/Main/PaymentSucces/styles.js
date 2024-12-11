import { StyleSheet } from 'react-native';
import { fontSize } from '../../../Component/fontsize';
import { colors } from '../../../Component/colors';
import { widthPrecent as wp } from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141C26',
    gap: 15,
  },
  profileImg: {
    height: wp(15),
    width: wp(15),
    resizeMode: 'contain',
    marginHorizontal: 'auto',
    marginTop: 40,
    marginBottom: 15,
  },
  containerText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
  },
  bankNameSection: {
    flexDirection: "row",
    justifyContent: "center", alignItems: "center", gap: 10
  },
  upiText: {
    margin: 8,
  },
  amountText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: wp(12),
    fontFamily: 'Poppins-Regular',
  },
  bottomSection: {
    width: '100%',
    paddingTop: 18,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#242E3A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    paddingHorizontal: 30,
  },
  bottomSmallText: {
    color: '#fff',
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
  },
  middleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2.5),
    marginVertical: 20,
  },
  bankImg: {
    width: wp(16),
    height: wp(16),
  },
  bankNameTxt: {
    fontSize: fontSize.Sixteen,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  payBtn: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
    borderRadius: 28,
  },
  blueDot: {
    backgroundColor: '#3694E6',
    height: wp(2.5),
    width: wp(2.5),
    borderRadius: 20,
  },
  imageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  logoImg: {
    width: '25%',
    height: wp(5),
    resizeMode: 'contain',
  },
  line: {
    borderColor: '#777c82',
    backgroundColor: '#777c82',
    height: wp(3),
    borderWidth: 1,
  },

  book: {
    backgroundColor: '#6CABF4',
    width: '85%',
    height: wp(13),
    borderRadius: 28,
    justifyContent:"center",
    alignItems:"center",
   marginHorizontal:"auto"
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },

  closeBtn: {
    height: wp(7),
    width: wp(7),
    position: 'absolute',
    top: 10,
    left: 10,
  },
  arrowDownIcon:{
    position:"absolute",
    right:10,
    height:wp(5),
    width:wp(5),

  }
});
