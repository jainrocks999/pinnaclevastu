import {StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
import {
  heightPercent,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';
export default styles = StyleSheet.create({
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
    shadowColor: colors.orange,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 10,
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

    paddingHorizontal: wp(5),
    marginHorizontal: 18,
  },
  activeCourseToggle: {
    alignSelf: 'center',
    backgroundColor: colors.ordercolor,
    borderColor: '#EAEAEA',

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
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  subItemTitle: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    width: '60%',
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
    padding:12,
    borderRadius:5,
    backgroundColor:'#FFFBF9'
  },
  videoIcon:{
    padding:12,
    borderRadius:10,
    backgroundColor:'#F3DACD',
    marginRight:10,
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginTop: -5,
    marginRight: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: wp(100),
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
