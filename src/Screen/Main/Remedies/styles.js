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
    paddingHorizontal: 16,
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
    paddingBottom: hp(10),
  },

  cardContainer1: {
    width: wp(46),
    height: wp(36),
    borderRadius: 10,
    margin: 5,
    borderWidth: 0.4,
    overflow: 'hidden',
  },

  contain1: {
    marginVertical: hp(1),
    height: wp(40),
    width: wp(95),
    borderRadius: 10,
    marginHorizontal: 'auto',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  text1: {
    marginTop: hp(1),
    fontSize: fontSize.Seventeen,
    fontFamily: 'Poppins-SemiBold',
    color: colors.white,
    width: '90%',
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 10,
  },

  backBtn: {
    marginTop: -5,
    marginRight: 10,
  },
  bagBtn: {
    marginTop:-5,
  },
  itemCount: {
    backgroundColor: '#EF6024',
    borderRadius: 10,
    zIndex: 1,
    bottom: -5,
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
