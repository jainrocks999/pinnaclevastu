import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DrawerIcon from '../../../assets/image/Drawer.svg';
import BagIcon from '../../../assets/image/bagIcon.svg';
import styles from './styles';

import {useDispatch, useSelector} from 'react-redux';
import DrawerIcon from '../../../assets/image/Drawer.svg';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../../Component/ResponsiveScreen/responsive';

import {fontSize} from '../../../Component/fontsize';

import LinearGradient from 'react-native-linear-gradient';

const BlogList = () => {
  const dispatch = useDispatch();
  const blog = useSelector(state => state?.HomeBanner);
  const navigation = useNavigation();

  const cartTotalQuantity = useSelector(
    state => state?.cart?.cartTotalQuantity,
  );

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  const renderItem = ({item}) => (
    <View style={styles.viewinner}>
      <TouchableOpacity style={styles.blogCard}>
        <Image
          source={
            item?.node?.image?.url
              ? {uri: item?.node?.image?.url}
              : require('../../../assets/otherApp/demo3.png')
          }
          style={{
            borderRadius: 10,
            width: '100%',
            height: hp(27),
          }}
        />
        <View style={styles.cardInfo}>
          {item?.node?.publishedAt ? (
            <Text style={styles.DateText}>
              {formatDate(item?.node?.publishedAt)}
            </Text>
          ) : null}
          <Text style={styles.blogCardHeadText}>
            {item?.node?.handle
              ? item?.node?.handle?.length > 55
                ? `${item?.node?.handle?.substring(0, 55)}...`
                : item?.node?.handle
              : ' '}
          </Text>

          <Text style={styles.blogCardContantText}>
            {item?.node?.content
              ? item?.node?.content?.length > 100
                ? `${item?.node?.content?.substring(0, 100)}...`
                : item?.node?.content
              : ' '}
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate('Home', {
                screen: 'BlogDetail',
                params: {item: item},
              })
            }>
            <Text style={styles.blogCardBtnText}>{'View Details >'}</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerview}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <DrawerIcon />
          </TouchableOpacity>
          <Image
            style={{marginLeft: 15}}
            source={require('../../../assets/image/header.png')}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home', {screen: 'MyCart'})}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          style={styles.bagBtn}>
          {cartTotalQuantity > 0 && (
            <View style={styles.itemCount}>
              <Text style={styles.countText}>{cartTotalQuantity}</Text>
            </View>
          )}
          <BagIcon width={wp(5)} height={wp(5)} style={styles.bagBtn} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View
          style={{marginTop: hp(3), marginBottom: hp(2), marginLeft: wp(3)}}>
          <Text
            style={{
              fontSize: fontSize.TwentyThree,
              color: '#143F71',
              fontFamily: 'Poppins-Medium',
              textTransform: 'capitalize',
            }}>
            {blog?.featured_blog_section?.content?.heading}
          </Text>
        </View>

        <FlatList
          data={blog?.featured_blogs ? blog?.featured_blogs : []}
          scrollEnabled={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.viewinner1}
        />

        {/* <LinearGradient
          colors={['#52B0E8', '#FF9770']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.formContainer}>
          <Text style={[styles.extraBoldText, {marginBottom: 20}]}>
            Start Learning From World’s Best Vedic Science Expert
          </Text>

          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter Email Address"
              placeholderTextColor={'#7B93AF'}
              style={styles.textInput}
              // value={formData.email}
              // onChangeText={text => handleInputChange('email', text)}
            />
          </View>

          <TouchableOpacity onPress={() => handleSubmit()}>
            <Text style={[styles.cardBtn, styles.submitBtn]}>
              Subscribe Now
            </Text>
          </TouchableOpacity>
        </LinearGradient> */}
      </ScrollView>
    </View>
  );
};

export default BlogList;
