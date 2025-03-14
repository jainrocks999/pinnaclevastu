import {Dimensions, StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {heightPercent, widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    height: wp(28),
    width: '100%',
    backgroundColor: '#FBF5F2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    padding: 10,
  },

  headerview: {
    marginTop: 5,
  },

  logoText: {
    fontSize: fontSize.Eighteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
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
  backIcon: {
    height: '100%',
    width: '100%',
  },

  settingsButton: {
    position: 'absolute',
    right: 16,
    top:18,
    height: wp(10),
    width: wp(10),
    backgroundColor:"#fff",
    borderRadius:10,
  },
  settingsIcon: {
    margin:"auto"
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: heightPercent(10),
  },
  profileSection: {
    marginTop: wp(17),
    gap: wp(0.5),
    alignItems: 'center',
  },
  profileImage: {
    position: 'absolute',
    width: wp(26),
    height: wp(26),
    borderRadius: wp(15),
    top: -wp(30),
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 50,
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: '#F9F9F9',
  },
  profileName: {
    fontSize: fontSize.Seventeen,
    color: colors.orange,
    fontFamily: 'Poppins-Medium',
    marginBottom: 2,
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
 
  editProfileButton: {
    backgroundColor: colors.orange,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: colors.orange,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
  modalOverlay: {
    zIndex: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
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
    gap: 20,
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
    fontSize: fontSize.Fourteen,
    fontFamily: 'Poppins-Regular',
  },
});
