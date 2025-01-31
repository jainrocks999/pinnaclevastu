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
    // paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',

    elevation: 5,
  },
  headerview: {
    //    marginLeft:wp(3)
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
    elevation: 3,
    paddingHorizontal: 15,
  },
  searchInput: {
    width: '80%',
    // flex: 1,
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
    // paddingHorizontal:15
    marginHorizontal: 5,
    paddingBottom: hp(8),
  },
  nextBtn: {
    // borderWidth:1,
    height: wp(5),
    width: wp(2.5),
    tintColor: colors.orange,
    alignSelf: 'center',
    // marginRight: 10,
    resizeMode: 'contain',
  },
  listContainer: {
    margin: 10,
    paddingHorizontal: 5,
    // paddingTop: hp(2),
  },

  imgContainer: {
    width: '30%',
  },
  direction: {
    marginTop: 4,
    minHeight:12
  },

  cardContainer2: {
    // width: wp(90),
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
    elevation: 8, /// For Android shadow effect
    // margin:5,

    justifyContent: 'center',
    // marginVertical: 10,
  },
  card: {
    paddingLeft: 10,
    width: '65%',
  },
  cardImage: {
    borderRadius: 10,
    width: '100%',
    height: wp(30),
    resizeMode: 'cover',
  },

  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  third: {
    fontSize: fontSize.Fifteen,
    color: colors.orange,
    fontFamily: 'Poppins-Medium',
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
    marginTop: -5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  emptyMessageContainer: {
    // borderWidth: 1,
    // marginTop:wp(8),
    margin: 'auto',
    width:"60%",
    padding:10,
    // borderWidth:1
  },
  emptyMessage: {
    fontSize: fontSize.Fourteen,
    color: "#929292",
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
