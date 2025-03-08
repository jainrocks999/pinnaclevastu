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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
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
    marginHorizontal: 15,
    marginVertical: 15,
    backgroundColor: colors.ordercolor,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    width: '80%',
    fontFamily: 'Poppins-Regular',
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
  arrowIcon: {
    height: wp(4),
    width: wp(2),
    resizeMode: 'contain',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: colors.Resident,
    paddingVertical: 10,
    marginRight: -5,
    marginLeft: -5,
  },
  title: {
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
    color: colors.cardcolor,
  },
  servicesContainer: {
    minHeight: '100%',
    marginHorizontal: 5,
    paddingBottom: hp(8),
  },
  nextBtn: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  listContainer: {
    margin: 10,
    paddingHorizontal: 5,
  },

  imgContainer: {
    width: '30%',
  },
  direction: {
    marginTop: 4,
    minHeight: 12,
  },

  cardContainer2: {
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
    elevation: 8,
    justifyContent: 'center',
  },
  card: {
    paddingLeft: 10,
    width: '65%',
  },
  cardImage: {
    borderRadius: wp(50),
    width: '100%',
    height: wp(30),
    resizeMode: 'cover',
  },

  third1: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
  },
  third2: {
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Regular',
  },
  priceText: {
    marginTop: 2,
    fontSize: fontSize.Fourteen,
    color: '#51575C',
    fontFamily: 'Poppins-Medium',
  },
  backBtn: {
    marginRight: 10,
    marginTop:-8
  },
  emptyMessageContainer: {
    margin: 'auto',
    width: '60%',
    padding: 10,
  },
  emptyMessage: {
    fontSize: fontSize.Fourteen,
    color: '#929292',
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
