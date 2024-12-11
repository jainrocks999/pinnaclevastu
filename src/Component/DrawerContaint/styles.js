import {StyleSheet} from 'react-native';
import {fontSize} from '../fontsize';
import {colors} from '../colors';
import { widthPrecent as wp } from '../ResponsiveScreen/responsive';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    borderRadius: 10,
   overflow:"hidden",
  },
  topSection: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
   
    paddingHorizontal:20
  },

  listRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#DFE7EF',
  },
  specialListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 15,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DFE7EF',
  },
  listText: {
    fontSize: fontSize.Fifteen,
    color: colors.heading,
    fontFamily: 'Poppins-Regular',
    marginLeft: wp(3),
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical:5
    // borderWidth:1,
    // marginVertical: 10,
  },
  sections: {
    backgroundColor: '#FBF5F2',
    marginVertical: 10,
    paddingBottom: 10,
  },
  extraListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  extraListText: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Medium',
  },
  coursesListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    // height: 40,
    padding: 15,
    backgroundColor: colors.Headertext,
    alignItems: 'center',
  },
  alignbottom: {
    // position: 'absolute',
    // bottom: 0,
  },
  socialLinksContainer: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom:5
  },
  versionText: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
    color: colors.Headertext,
    // textDecorationLine:'underline'
  },
  headText: {
    fontSize: fontSize.Fifteen,
    fontFamily: 'Poppins-Regular',
    color: colors.heading,
  },
  socialIconContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  icon:{
    height:wp(4.5),
    width:wp(4.5)
  }
});
