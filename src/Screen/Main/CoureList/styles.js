import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../../Component/colors';
import {fontSize} from '../../../Component/fontsize';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.ordercolor,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  searchInput: {
    width: '95%',
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Fourteen,
    paddingHorizontal: 10,
    color: colors.heading,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8E3E980',
    shadowColor: '#DFE7EF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
  },
  cardInfo: {
    height: wp(20),
    width: '60%',
    gap: 5,
  },
  cardImg: {
    width: wp(30),
    height: wp(20),
    resizeMode: 'contain',
    borderRadius: 8,
    borderColor:colors.placeholder,
    borderWidth:1
  },
  dateText: {
    marginTop: -4,
    fontSize: fontSize.Twelve,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  smallText: {
    fontSize: fontSize.Ten,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  progressSection: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  prograssbarContainer: {
    backgroundColor: '#D4EFFF',
    height: wp(0.6),
    width: '85%',
  },
  prograss: {
    flex: 1,
    backgroundColor: '#52B1E9',
  },
  lightText: {
    fontSize: fontSize.Ten,
    fontFamily: 'Poppins-Regular',
    color: '#CBCBCB',
  },
  backBtn: {
    marginTop:-5,
    marginRight: 10,
  },
});
