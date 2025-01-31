import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../colors';
import {
  Menu,
  Maniya_Logo,
  Search,
  User,
  Bag,
  ForwardBlack,
  ManaiyaLogo,
} from '../../assets/svgIcon';
import {useNavigation} from '@react-navigation/native';
import Arrow from '../../assets/svgIcon/Arrow_left.svg';
import Modal from 'react-native-modal';
import Cross from '../../assets/svgIcon/blackCross.svg';
import {fontSize} from '../../fontSize';
import {fonts} from '../../assets/fonts/fonts';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProduct} from '../../redux/features/productSlice';
import {searchResult, InitSearch} from '../../redux/features/searchSlice';

// import Search from "../../assets/svgIcon/Search.svg";

export default function Header(props) {
  const navigation = useNavigation();
  const [visible, setVisible] = useState();
  const [input, setInput] = useState('');
  const [value, setValue] = useState('');
  const [searchResponse, setSearchResponse] = useState([]);

  const products = useSelector(state => state.search.products);
  const dispatch = useDispatch();

  const getProductDetails = async product => {
    setVisible(false), setInput('');
    dispatch(InitSearch());
    console.log('this is product and product details', product);
    if (Object.keys(product).length == 0) {
    } else {
      dispatch(InitSearch());
      dispatch(fetchProduct(product.node.id));
    }
    navigation.navigate('ProductDetails');
  };

  const handleSearch = val => {
    if (val == '') {
      dispatch(InitSearch());
    } else {
      dispatch(searchResult(val));
    }
  };

  const inputRef = useRef(null);

  // useEffect(() => {
  //   // Focus the TextInput to open the keyboard on page load
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  return (
    <View style={styles.container}>
      {props.home ? (
        // <TouchableOpacity
        //   onPress={() => {
        //     navigation.openDrawer();
        //   }}>
        //   <Menu height={20} width={20} />
        // </TouchableOpacity>
        <View />
      ) : (
        <TouchableOpacity
          onPress={() => {
            props.auth ? props.onPress() : navigation.goBack();
          }}>
          <Arrow height={16} width={16} />
        </TouchableOpacity>
      )}
      <View style={{borderWidth: 0}}>
        <ManaiyaLogo height={35} width={120} />
      </View>
      <View
      // style={styles.rightContainer}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Menu height={20} width={20} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => {
          setVisible(true)
          // dispatch(InitSearch())
          const timer = setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 100);
          return () => clearTimeout(timer);

        }} style={{ marginRight: 20 }}>
          <Search height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 20 }}>
          <User height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Bag height={20} width={20} />
        </TouchableOpacity> */}
      </View>

      <Modal
        style={{margin: 0, alignItems: 'center'}}
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
          // dispatch(InitSearch())
          // setSearchResponse([])
          setInput('');
        }}
        useNativeDriver={true} // Use native driver for performance
        hideModalContentWhileAnimating={true}>
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            padding: 15,
            height: 100,
            position: 'absolute',
            top: Platform.OS == 'ios' ? 60 : 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              height: 40,
              width: '90%',
              borderWidth: 1,
              // borderRadius: 10,
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Search"
              style={{
                color: colors.black,
                fontFamily: fonts.OpenSans_Medium,
                width: '90%',
              }}
              placeholderTextColor={colors.placeholder}
              value={input}
              ref={inputRef}
              onChangeText={val => {
                setInput(val);
                setValue(val);
                handleSearch(val);
              }}
            />
            <Search />
          </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              // dispatch(InitSearch())
            }}
            style={{}}>
            <Cross width={14} height={14} />
          </TouchableOpacity>
        </View>
        {input && products.length > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 70,
              width: '85%',
              backgroundColor: '#fff',
              alignSelf: 'flex-start',
              borderColor: colors.border,
              maxHeight: 355,
              zIndex: 1,
              left: 15,
              shadowOpacity: 0.9,
              shadowColor: colors.black,
              shadowOffset: {width: 0, height: 2},
              elevation: 4,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                paddingVertical: 7,
                borderBottomWidth: 1,
                borderColor: colors.borderColor,
              }}>
              <Text
                style={{
                  fontFamily: fonts.OpenSans_Medium,
                  color: '#121212B3',
                  fontSize: fontSize.Thirteen,
                }}>
                {'PRODUCTS'}
              </Text>
            </View>
            <FlatList
              data={products}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => getProductDetails(item)}
                  style={{
                    padding: 10,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.node.images.edges[0].node.originalSrc}}
                    style={{width: 50, height: 50}}
                  />
                  <Text
                    style={{
                      color: colors.black,
                      marginLeft: 20,
                      fontSize: fontSize.Fourteen,
                      fontFamily: fonts.OpenSans_SemiBold,
                    }}>
                    {item.node.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                setInput('');
                // dispatch(InitSearch())
                navigation.navigate('SearchList', {
                  value: value,
                });
              }}
              style={{
                borderTopWidth: 1,
                height: 40,
                borderColor: colors.borderColor,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: fontSize.Fifteen,
                  color: colors.black,
                  fontFamily: fonts.OpenSans_Bold,
                }}>{`Search for "${input}"`}</Text>
              <ForwardBlack width={20} height={20} />
            </TouchableOpacity>
          </View>
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    paddingVertical: 7,
  },
  rightContainer: {
    width: '42%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
