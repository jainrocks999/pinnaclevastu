import {StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    backgroundColor: '#F9F9F9',
    // paddingTop: 50,
    elevation: 4,
    // opacity:0.9
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',

    elevation: 2,
  },
  headerview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },

  buttoncontainer: {
    height: 50,
    width: '50%',

    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btext: {
    fontSize: fontSize.Eighteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
  },

  scrollview: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: hp(2),
    // borderWidth:1
  },
  scrollview1: {
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: hp(2),
    // borderWidth:1
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
   
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  cardContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  radioButtonWrapper: {},
  textWrapper: {
    flex: 1,
  },
  cardTitle: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  cardDescription: {
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
  cardPhone: {
    fontSize: fontSize.Twelve,
    color: colors.paymenttext,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
    marginLeft: 0,
  },

  editDeleteWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    // borderWidth:1
  },
  editDeleteText1: {
    color: '#F4996C',
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.orange,
    marginBottom: -3,
    // paddingVertical: 5,
  },
  editDeleteText: {
    color: '#FF0000',
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Meduim',
    // marginLeft: wp(3.5),
    // paddingVertical: 5,
  },
  direction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  direction1: {
    flexDirection: 'row',
    marginTop: 5,
  },
  makeview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  maketext: {
    color: colors.heading,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
  },

  fab: {
    backgroundColor: '#F4996C',
    width: wp(14),
    height: wp(14),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    position:'absolute',
    // marginTop: hp(25),
    alignSelf: 'flex-end',
    zIndex:1,
    bottom:hp(16),
    right:wp(4)
  },
  fabText: {
    color: colors.orange,
    fontSize:fontSize.Sixteen,
  },

  placeOrderButton: {
    backgroundColor: '#F4996C',
    paddingVertical: 12,
    width: '100%',

    borderRadius: 10,

    alignItems: 'center',
  },
  placeOrderText: {
    color: '#FFF5F5',
    fontSize: 16,
  },

  book: {
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: wp(13),
    borderRadius: 10,
    marginTop: hp(2),
    shadowColor: "#ad3803",
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8, 
    shadowRadius: 10, 

    elevation: 8,
  },
  btext1: {
    fontFamily: 'Poppins-Medium',
    fontSize: fontSize.Eighteen,
    color: colors.white,
  },
  customIcon: {
    fontSize: fontSize.Fifteen,
    color: colors.paymenttext, // Custom icon color
    // marginRight: 10,
  },

  backBtn: {
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  viewLine: {
    height: 12,
    borderWidth: 0.5,
    alignSelf: 'center',
  },
});
