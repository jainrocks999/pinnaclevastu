import {Dimensions, StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';

const screenWidth = Dimensions.get('screen').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    height: wp(28),
    // height:  screenWidth >= 750 ? wp(38) : wp(28),
    width: '100%',
    backgroundColor: '#FBF5F2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    padding: 10,
  },

  headerview: {
    //    marginLeft:wp(3)
    marginTop: 5,
  },

  logoText: {
    fontSize: fontSize.Eighteen,

    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },

  backButton: {
    padding: 8,
    color: '#324356',
    marginBottom: 10,
  },

  backBtn: {
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginTop: wp(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  backIcon: {height: '100%', width: '100%'},
  headerTitle: {
    left: 10,
    fontSize: 16,
    color: '#324356',
  },
  settingsButton: {
    position: 'absolute',
    right: 16,
    height: wp(10),
    width: wp(10),
    top: 10,
  },
  settingsIcon: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flex: 1,
    paddingBottom: '15%',
  },
  profileSection: {
    // marginTop: 60,
    marginTop: wp(17),
    gap: wp(0.5),
    alignItems: 'center',
  },
  profileImage: {
    position: 'absolute',
    width: wp(26),
    height: wp(26),
    borderRadius: wp(15),
    // top: screenWidth >= 750 ? -wp(22) : -wp(28),
    top:  -wp(30),
    shadowColor: "#1A1A1A",
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  profileName: {
    fontSize: fontSize.Seventeen,
    color: colors.orange,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
    // marginTop: 5,
  },
  profileID: {
    fontSize: fontSize.Fifteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginBottom: 1,
  },
  profileEmail: {
    fontSize: fontSize.Thirteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
  },
  profilePhone: {
    fontSize: 12,
    color: '#324356',
    marginBottom: 12,
  },
  editProfileButton: {
    backgroundColor: colors.orange,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: colors.orange, // Shadow color
    shadowOffset: {width: 0, height: 4}, // Shadow direction
    shadowOpacity: 0.1, // Shadow intensity
    shadowRadius: 6, // Shadow blur radius
    // Elevation for Android
    elevation: 5,
  },
  editProfileText: {
    fontSize: fontSize.Eleven,
    fontFamily: 'Poppins-Regular',
    color: colors.white,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    marginBottom: 10,
    padding: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSize.Twenty,
    color: colors.heading,
    fontFamily: 'Poopins-SemiBold',
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statLabel: {
    fontSize: fontSize.Thirteen,
    color: colors.light_gr,
    fontFamily: 'Poppins-Regular',
  },
  withBorder: {
    borderRightWidth: 1,
    borderRightColor: '#EAEAEA',
  },
  horizontalSeparator: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  actionList: {
    paddingHorizontal: 16,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: wp(5.2),
    height: wp(5.2),
    marginRight: 16,
  },
  actionText: {
    fontSize: fontSize.Fourteen,
    color: colors.paymenttext,
    fontFamily: 'Poppins-Regular',
  },
  arrowIcon: {
    width: wp(4),
    height: wp(4),
  },
  arrowl: {
    marginTop: 8,
  },
  modalOverlay: {
    zIndex:3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    // height: wp(40),
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: wp(2),
  },
  modalMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: fontSize.Fourteen,
    textAlign: 'center',
    marginBottom: wp(2),
  },
  modalButtons: {
    marginTop: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap:20
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize:fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
  },
});
