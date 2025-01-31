import {StyleSheet, Dimensions} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
const {width} = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    //  justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
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
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    height: 55,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.ordercolor,
  },
  tab: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 4,
    backgroundColor: colors.ordercolor,
  },
  activeTab: {
    alignSelf: 'center',
    height: 43,
    backgroundColor: colors.orange,
    borderRadius: 10,
    shadowColor: colors.orange,
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabText: {
    fontSize: fontSize.Thirteen,
    color: colors.recorded,
    fontFamily: 'Poppins-Regular',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
  },
  activeTabText: {
    color: colors.white,
  },
  appointmentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: colors.lightGrey,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#1A1A1A',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
  },

  appointmentImage: {
    resizeMode: 'contain',
    width: 120,
    height: 125,
    marginRight: 8,
    marginLeft: -3,
    borderRadius: 20,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTitle: {
    marginTop: -2,
    width: '115%',
    marginBottom: 3,
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  appointmentTitle1: {
    marginTop: -2,
    marginBottom: 1,
    fontSize: fontSize.Twelve,
    color: colors.paymenttext,
    fontFamily: 'Poppins-Medium',
  },
  appointmentDate: {
    paddingTop: 5,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-SemiBold',
    color: colors.Headertext,
  },
  appointmentTime: {
    // marginLeft: 4,
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-SemiBold',
    color: colors.Headertext,
    paddingTop: 5,
    // color: '#52B1E9',
  },
  redText: {
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-SemiBold',
    color: '#F50E0E',
  },
  arrowButton: {
    padding: 5,
  },

  horizontalSeparator: {
    width: '200%',
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  direction1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateimg: {
    width: wp(3.3),
    height: wp(3.3),
    marginRight: 5,
  },

  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -3,
  },
  cardStar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  starContainer: {
    marginVertical: 7,
    alignSelf: 'flex-start',
    borderWidth: 0.1,
  },
  ratingText: {
    fontSize: fontSize.Thirteen,
    color: '#949494',
  },
  upcomingTitleStyle: {
    fontSize: fontSize.Fourteen,
    marginTop: -15,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  upcomingTitle1Style: {
    fontSize: fontSize.Twelve,
    marginBottom: 1,
    color: colors.paymenttext,
    fontFamily: 'Poppins-Medium',
  },
  upcomingDateStyle: {
    fontSize: fontSize.Twelve,
    marginBottom: 3,
  },
  upcomingTimeStyle: {
    fontSize: fontSize.Twelve,
  },
  emptyMessageContainer: {
    margin: 'auto',
    width: '60%',
    padding: 10,
    // borderWidth:1,
  },
  emptyMessage: {
    fontSize: fontSize.Fourteen,
    color: '#929292',
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
