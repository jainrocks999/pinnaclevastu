import {StyleSheet} from 'react-native';
import {fontSize} from '../../../Component/fontsize';
import {colors} from '../../../Component/colors';
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
    elevation: 4,
    paddingVertical: 12,
    backgroundColor: colors.white,
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
    marginHorizontal: 18,
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
  searchIcon: {
    width: 35,
    height: 25,
  },
  tabContainer: {
    // borderWidth:2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 18,
    height: wp(12),
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: colors.ordercolor,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: colors.ordercolor,
  },
  activeTabButton: {
    alignSelf: 'center',
    backgroundColor: colors.orange,
    borderRadius: 8,
    shadowColor: "#ad3803",
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 5, 
    elevation: 8,
  },
  tabButtonText: {
    fontSize: fontSize.Fourteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
  },
  activeTabButtonText: {
    color: colors.white,
  },
  ordersList: {
    paddingHorizontal: 18,
  },
  orderCard: {
    height:wp(40),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: wp(2),
    padding: 12,
    marginBottom: 12,
    width: '100%',
    shadowColor: '#bdc3c7',
    shadowOffset: { width: 0, height: 63}, 
    shadowOpacity: 0.5, 
    shadowRadius: 10, 
    
    elevation: 5,
    overflow:"hidden",
  },
  orderNo: {
    fontSize: fontSize.Fourteen,
    color: colors.paymenttext,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  productContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical:8,
    height:"75%"
  },
  productImage: {
    width: '40%',
    height: '100%',
    borderRadius: 8,
    marginRight: '5%',
    resizeMode: 'contain',
    borderWidth:0.5,
    borderColor:colors.lightGrey
  },
  productImage1: {
    width: '40%',
    height: '100%',
    borderRadius: 8,
    marginRight: '5%',
    // resizeMode: 'contain',
    borderWidth:0.5,
    borderColor:colors.lightGrey
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: fontSize.Thirteen,
    color: colors.heading,
    fontFamily: 'Poppins-Medium',
    marginBottom: 8,
  },
  productQuantity: {
    fontSize: fontSize.Thirteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 12,
    color: '#324356',
  },
  detailsButton: {
    position:"absolute",
    bottom:0,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: colors.orange,
    borderTopLeftRadius: wp(2),
    borderBottomRightRadius: wp(2),
    width: wp(21),
    height: wp(8),
  },
  detailsButtonText: {
    // padding: 10,
    fontSize: fontSize.Fourteen,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  horizontalSeparator: {
    height: 1,
    width:'98.3%',
    alignSelf:'center',
    backgroundColor: '#EAEAEA',
  },
  backBtn: {
    marginTop:-5,
    height: wp(4),
    width: wp(2.3),
    // resizeMode: 'stretch',
    marginRight: 20,
  },
  statusText:{
    position:"absolute",
    fontSize: fontSize.Ten,
    // color: colors.white,
    fontFamily: 'Poppins-Regular',
    top:0,
    right:0,
    paddingVertical:5,
    paddingHorizontal:8,
    // borderBottomLeftRadius:10
  }
});
