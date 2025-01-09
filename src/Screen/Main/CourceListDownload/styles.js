import {StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {heightPercent, widthPrecent as wp} from '../../../Component/ResponsiveScreen/responsive';
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
    // elevation: 3,
    marginHorizontal: 15,
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
  searchIcon: {
    width: wp(3.5),
    height: '100%',
    resizeMode: 'contain',
    borderWidth: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 15,
    height: wp(13),
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.ordercolor,
  },
  tabButton: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderRadius: 15,
    marginHorizontal: 4,
    backgroundColor: colors.ordercolor,
  },
  activeTabButton: {
    alignSelf: 'center',
    paddingVertical: wp(2.5),
    backgroundColor: colors.orange,
    borderRadius: 8,
    shadowColor: colors.orange, // Light pink color for the shadow
    shadowOffset: {width: 0, height: 6}, // Offset 0px horizontally, 6px vertically
    shadowOpacity: 0.5, // Opacity of the shadow (transparent but visible)
    shadowRadius: 10, // Blur radius of 10px

    // Android Elevation
    elevation: 5,
  },
  tabButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: fontSize.Thirteen,
    color: colors.recorded,
    fontFamily: 'Poppins-Regular',
  },
  activeTabButtonText: {
    color: colors.white,
  },
  horizontalSeparator: {
    width: '200%',
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  courseToggle1: {
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(3),
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    // marginBottom: wp(2),
    paddingHorizontal: wp(5),
    marginHorizontal: 18,
  },
  activeCourseToggle: {
    // marginBottom: -15,
    // width: '93%',
    alignSelf: 'center',
    backgroundColor: colors.ordercolor,
    borderColor: '#EAEAEA',
    //  borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  coursetext2: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginLeft: 10,
  },
  coursetext1: {
    fontSize: fontSize.Fourteen,
    color: colors.Headertext,
    fontFamily: 'Poppins-Medium',
  },
  activeTitleColor: {
    color: colors.orange,
  },
  activeTitleColor1: {
    color: colors.Headertext,
  },
  toggleIcon2: {
    width: wp(3),
    height: wp(3),
    resizeMode: 'contain',
  },
  toggleIcon23: {
    width: wp(5),
    height: wp(5),
  },
  subItemContainer: {
    // marginTop: 15,
    width: '93%',
    alignSelf: 'center',
    backgroundColor: colors.ordercolor,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#EAEAEA',
    marginBottom: 10,
    paddingHorizontal: wp(5),
    // marginHorizontal:18
  },
  singleSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginBottom: 20,
  },
  subItemIcon: {
    backgroundColor:"#f3dacd",
    width: wp(10),
    height: wp(10),
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'contain',
    // borderWidth:1,
  },
  subItemTitle: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    width:"80%"
  },
  subItemSubtitle: {
    fontSize: fontSize.Eleven,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  subItemDownloadIcon: {
    width: wp(8),
    height: wp(8),
  },
  downloadIconContainer: {
    position: 'absolute',
    right: 0,
    // alignItems: 'center',
    // marginLeft: 5,
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginTop: -5,
    height: wp(4),
    width: wp(2.3),
    resizeMode: 'stretch',
    marginRight: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: wp(100),
    // transform: [{ rotate: '90deg' }],
  },
  modelBackBtn: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
  },
  modelBackIcon: {
    height: 25,
    width: 20,
    resizeMode: 'contain',
  },
});
