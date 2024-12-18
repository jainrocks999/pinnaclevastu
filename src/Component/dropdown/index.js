import React, {memo} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { heightPercent, widthPrecent } from '../ResponsiveScreen/responsive';
import { colors } from '../colors';
import { fontSize } from '../fontsize';


const SelectModal = ({visible, search, setSearch, data, onSelect, onClose}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity
        onPress={() => {
          onClose(false);
        }}
        activeOpacity={1}
        style={{
        //   backgroundColor: 'rgba(0,0,0,0.5)',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableWithoutFeedback>
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical:10,
              height: heightPercent(30),
              width: widthPrecent(90),
              marginHorizontal: '5%',
              elevation: 5,
              shadowColor: '#fff',
              borderRadius: 10,
              borderColor:colors.lightGrey,
              borderWidth:0.5
            }}>
            <View style={{height: '3%'}} />
            <Text
              style={{
                color: 'grey',
                textAlign: 'center',
                fontSize: fontSize.Fourteen,
                fontFamily: 'Poppins-Regular',
              }}>
              Select Gender
            </Text>
            <View />
            <TextInput
              placeholder="Search"
              placeholderTextColor={colors.placeholder}
              value={search}
              onChangeText={value => setSearch(value)}
              style={{
                marginHorizontal: '5%',
                height: widthPrecent(13),
                paddingLeft: '5%',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: colors.lightGrey,
                fontSize: fontSize.Sixteen,
                fontFamily: 'Poppins-Regular',
                color: colors.heading,
              }}
            />
            <View style={{height: '4%'}} />
            <View style={{height: '60%', paddingLeft: '8%'}}>
              <FlatList
                data={data}
                keyExtractor={item => item.value.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item);
                    }}
                    style={{marginVertical: '4%'}}>
                    <Text
                      style={{
                        fontSize: fontSize.Thirteen,
                        fontFamily: 'Poppins-Regular',
                        color: colors.heading,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default memo(SelectModal);
