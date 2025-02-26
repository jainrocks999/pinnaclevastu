import {StyleSheet} from 'react-native';
import {
  widthPrecent as wp,
  heightPercent as hp,
} from '../../../Component/ResponsiveScreen/responsive';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: colors.white,
    elevation: 5,
    gap: 15,
  },
  bagIcon: {
    position: 'absolute',
    right: 15,
  },
  itemCount: {
    backgroundColor: '#EF6024',
    borderRadius: 10,
    zIndex: 1,
    bottom: -10,
    left: 7,
    height: 15,
    marginTop:-15,
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginVertical: 15,
    backgroundColor: colors.ordercolor,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: fontSize.Fourteen,
    paddingHorizontal: 15,
    color: colors.heading,
    paddingVertical: 10,
  },

  filterBtn: {
    position: 'absolute',
    right: 8,
    backgroundColor: colors.white,
    height: 30,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },

  scroll: {
    paddingBottom: hp(8),
    flex:1
  },

  switchBtnContainer: {
    margin: wp(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBF5F2',
    padding: wp(2),
    borderRadius: 10,
  },

  switchBtn: {
    flex: 1,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  switchText: {
    textAlign: 'center',
    fontSize: fontSize.Sixteen,
    color: colors.recorded,
    fontFamily: 'Poppins-Regular',
  },
  activeBtn: {
    backgroundColor: colors.orange,
    color: colors.white,
    borderRadius: wp(2),
    shadowColor: '#D87C51',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 12,
  },
  cardContainer: {
    marginTop: wp(5),
    marginHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  card: {
    width: wp(45),
    backgroundColor: '#FBF5F2',
    borderRadius: 10,
    marginBottom: 10,
    marginRight:10,
    overflow:'hidden',
  },
  cardImg: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardInfo: {
    marginTop: 0,
    padding: 10,
    gap: 6,
  },
  DateText: {
    color: colors.Headertext,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
  },
  titleText: {
    minHeight: wp(10),
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-SemiBold',
  },
  regularText: {
    color: '#51575C',
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    width: '90%',
  },
  shortDescription:{
    minHeight: wp(14),
  },
  price: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Bold',
  },
  cardBtn: {
    marginVertical: 5,
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Medium',
    backgroundColor: colors.orange,
    paddingVertical: 6,
    width: '60%',
    textAlign: 'center',
    borderRadius: 6,
  },
});
