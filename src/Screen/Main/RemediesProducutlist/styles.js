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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
    elevation: 5,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 12,
    backgroundColor: colors.ordercolor,
    borderRadius: 20,

    paddingHorizontal: 15,
  },
  searchInput: {
    fontFamily: 'Poppins-Regular',
    width: '80%',
    fontSize: fontSize.Fourteen,
    paddingHorizontal: 10,
    color: colors.heading,
    paddingVertical: 10,
  },

  filterBtn: {
    backgroundColor: colors.white,
    height: 30,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 8,
  },
  direction: {
    minHeight: wp(6),
    marginBlock: 5,
    alignSelf: 'flex-start',
  },

  third: {
    fontSize: fontSize.Fourteen,
    color: colors.cardcolor,
    fontFamily: 'Poppins-Regular',
  },

  Scroll: {
    paddingBottom: hp(7),
  },

  slide: {
    width: wp(46),
    borderRadius: 10,
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    margin: 7,
    overflow: 'hidden',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: wp(30),
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: colors.ordercolor,
  },

  buttonstylefirst: {
    backgroundColor: colors.orange,
    width: wp(26),
    paddingVertical: 7,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonstyle: {
    color: colors.white,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
  },

  titleText: {
    minHeight: wp(11),
  },
  priceText: {
    marginTop: 5,
    flexDirection: 'row',
    gap: 5,
  },

  backBtn: {
    marginTop: -5,
    marginRight: 10,
  },
  itemCount: {
    backgroundColor: '#EF6024',
    borderRadius: 10,
    zIndex: 1,
    bottom: -10,
    left: 7,
    height: 15,
    marginTop: -15,
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
});
