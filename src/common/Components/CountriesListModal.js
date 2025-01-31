import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  useColorScheme,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors} from '../../colors';
import CustomText from './CustomText';
import {fontSize} from '../../fontSize';
const SelectModal = ({onSelect, onClose, data, visible}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={() => onClose(false)}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#333333',
            borderRadius: 25,
            zIndex: 1000,
            borderWidth: 1,
            borderColor: '#231F2033',
            width: Dimensions.get('window').width - 50,
            height: Dimensions.get('window').height - 250,
            padding: 15,
          }}>
          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors.white,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 14,
                zIndex: 500,
              }}>
              <Image
                source={require('../../assets/svgIcon/cross.png')}
                tintColor={colors.black}
                style={{height: 10, width: 10}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10}}>
            {Array.isArray(data) ? (
              <FlatList
                data={data}
                contentContainerStyle={{paddingBottom: 30}}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item, index);
                    }}
                    style={{
                      height: 35,
                      justifyContent: 'center',
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: colors.white,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={() => {
                  return (
                    <View
                      style={{
                        marginTop: 120,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <CustomText size={fontSize.Seventeen} color={'#fff'}>
                        No Data Found !
                      </CustomText>
                    </View>
                  );
                }}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default SelectModal;
