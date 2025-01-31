import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Share,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {
  CopyLink,
  FacebookPdp,
  InstagramPdp,
  Pintrest,
  Twitter,
  WhatsApp,
} from '../../assets/svgIcon';
import Clipboard from '@react-native-clipboard/clipboard';

const UnfoldingModal = ({visible,handle}) => {
  const productUrl = `https://manaiya.com/products/${handle}`; // Product URL to share
  const productDescription = `Check out this amazing product!`;
  const scaleValue = useRef(new Animated.Value(0)).current;
  const shareToFacebookWithContact = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      productUrl,
    )}`;

    Linking.openURL(facebookShareUrl).catch(err =>
      console.error('Error opening URL', err),
    );
  };
  const shareToTwitter = () => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      productUrl,
    )}&text=${encodeURIComponent(productDescription)}`;
    // Open Twitter share URL
    Linking.openURL(twitterShareUrl).catch(err =>
      console.error("Couldn't load page", err),
    );
  };
  const shareToPinterest = () => {
    const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
      productUrl,
    )}&description=${encodeURIComponent(productDescription)}`;
    Linking.openURL(pinterestShareUrl).catch(err =>
      console.error("Couldn't load page", err),
    );
  };
  const shareToInstagram = async () => {
    try {
      await Share.shareSingle({
        title: 'productTitle', // Optional, include if you have a title
        message: productDescription, // Optional, include if you want a descriptio
        social: Share.Social.INSTAGRAM,
      });
    } catch (error) {
      console.error("Couldn't share to Instagram", error);
    }
  };
  const shareToWhatsApp = () => {
    const whatsappMessage = `${productDescription} 
                           ${productUrl}`;
    const whatsappShareUrl = `whatsapp://send?text=${encodeURIComponent(whatsappMessage)}`;
  
    Linking.openURL(whatsappShareUrl).catch(err =>
      console.error("Couldn't open WhatsApp", err)
    );
  };
  const copyLink = () => {
    Clipboard.setString(productUrl);
    
    // Provide feedback to the user
    if (Platform.OS === 'android') {
      ToastAndroid.show('Link copied to clipboard!', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied!', 'Link copied to clipboard.');
    }
  };
  useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    // <Modal
    //   transparent
    //   visible={visible}
    //   animationType="fade"
    //   onRequestClose={onClose}
    // >
    //   <View style={styles.overlay}>
    <Animated.View
      style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
      <TouchableOpacity
        onPress={() => {
          shareToFacebookWithContact();
        }}
        style={{
          borderWidth: 0,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <FacebookPdp />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          shareToTwitter();
        }}
        style={{
          borderWidth: 0,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Twitter />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          shareToPinterest();
        }}
        style={{
          borderWidth: 0,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pintrest />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={shareToInstagram}
        style={{
          borderWidth: 0,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <InstagramPdp />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={shareToWhatsApp}
        style={{
          borderWidth: 0,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <WhatsApp />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={copyLink}
        style={{
          borderWidth: 0,
          height: 30,
          width: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CopyLink />
      </TouchableOpacity>
    </Animated.View>
    // </View>
    // </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '10%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    top: '46%',
    right: '5%',
    zIndex: 10,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UnfoldingModal;
