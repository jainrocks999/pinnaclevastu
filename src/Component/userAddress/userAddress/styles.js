import {StyleSheet} from 'react-native';
import {colors} from '../../colors';
import {fontSize} from '../../fontsize';
import {widthPrecent as wp} from '../../ResponsiveScreen/responsive';

export default StyleSheet.create({
  section: {
    borderWidth: 1,
    borderColor: '#DFE7EF',
    backgroundColor:colors.white,
    padding: 20,
    gap: wp(1.2),
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#DFE7EF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 12,
    marginTop: 20,
  },
  titleText: {
    fontSize: fontSize.Sixteen,
    color: colors.orange,
    paddingVertical: 4,
    fontFamily: 'Poppins-SemiBold',
  },
  NameText: {
    fontFamily: 'Poppins-Bold',
    fontSize: fontSize.Fifteen,
    color: colors.heading,
  },
  smallText: {
    fontSize: fontSize.Twelve,
    fontFamily: 'Poppins-Regular',
    color: colors.light_gr,
    lineHeight: wp(5),
    width: '85%',
  },
  checkboxWrapper: {
    height: 21,
    width: 21,
    position: 'absolute',
    bottom: '60%',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{scaleX: 1.2}, {scaleY: 1.2}],
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  checkedBackground: {
    backgroundColor: '#009FDF',
  },
});
