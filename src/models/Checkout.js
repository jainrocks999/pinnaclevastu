
import Config from "../common/config.json";

export const checkout = async (product, navigation) => {
  let lineItemsToAdd = product.map((item) => ({
    merchandiseId: item.id, // Cart API ke liye merchandiseId ka use hota hai
    quantity: item.qty,
  }));

  const query = `
    mutation CartCreate {
      cartCreate(input: {
        lines: ${JSON.stringify(lineItemsToAdd).replace(/"([^"]+)":/g, '$1:')}
      }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;

  console.log("GraphQL Query:", JSON.stringify({ query }));

  try {
    const response = await fetch(Config.Shopify.graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": Config.Shopify.storeAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const jsonResponse = await response.json();
   
    console.log("Shopify Response:", jsonResponse?.data?.cartCreate?.cart);
    const checkoutUrl = jsonResponse?.data?.cartCreate?.cart?.checkoutUrl;
   
    if (checkoutUrl) {


      navigation.navigate('CartWeb', {
                             Url: checkoutUrl,
                              name: 'cart',
                         });
      return checkoutUrl;
    } else {
      Alert.alert("Error", "Failed to create checkout.");
      return null;
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong.");
    console.error("Checkout Error:", error);
    return null;
  }
};

// const CheckoutScreen = () => {
//   const [checkoutUrl, setCheckoutUrl] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCheckoutUrl = async () => {
//       const url = await createCheckout();
//       setCheckoutUrl(url);
//       setLoading(false);
//     };

//     fetchCheckoutUrl();
//   }, []);

//   return (
//     <View style={{ flex: 1 }}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1 }} />
//       ) : checkoutUrl ? (
//         <WebView source={{ uri: checkoutUrl }} />
//       ) : (
//         Alert.alert("Error", "Checkout URL not found.")
//       )}
//     </View>
//   );
// };

// export default CheckoutScreen;



// import {SHOPIFY_CLIENT} from '../common/shopifyClient';
// import {getUserInfo} from './UserInfo';
// import {store} from '../Redux/store/store';
// import axios from 'axios';
// import {LARAVEL_URL} from '../common/constants';
// import {userAlert} from './ResultAlert';
// import DeviceInfo from 'react-native-device-info';
// import {convertVariantId} from '../common/shopifyConverter';
// import {Platform} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { clearLocalCartData } from '../Redux/Slice/CartSlice';

// export const checkout = async (product, navigation) => {

//   var af_userid = '';
//   let lineItemsToAdd = [];
//   let checkoutUrl = '';
//   // let state = store.getState(state => state);
//   // let GiftWrapQty = state.cart.GiftWrapQty;
//   // console.log('in checkout', GiftWrapQty);

//   //PASS ONLY VARIANT ID AND QTY
//   for (let index = 0; index < product.length; index++) {
//     const element = product[index];
//     let productObj = {};
//     console.log("product-checkout", element.id);
//     productObj.variantId = element.id
//     // await convertVariantId(element.id);
//     productObj.quantity = element.qty;
//     lineItemsToAdd.push(productObj);
//   }
//   console.log("product-checkout", lineItemsToAdd);
//   SHOPIFY_CLIENT.checkout
//     .create()
//     .then(async checkout => {
//       console.log('checkout', checkout);

//       checkoutUrl = checkout.webUrl;
//       const checkoutId = checkout.id;

//       const userInfo = await getUserInfo();
//       const input = {
//         customAttributes: [
//           {key: 'webview', value: 'true'},
//           {key: 'order_source', value: 'mobile'},
//           {key: 'platform', value: Platform.OS},
//         ],
//       };

//       SHOPIFY_CLIENT.checkout
//         .updateAttributes(checkoutId, input)
//         .then(c => {
//           console.log('c', c);
//           SHOPIFY_CLIENT.checkout
//             .addLineItems(checkoutId, lineItemsToAdd)
//             .then(async checkout => {
//               console.log('checkout add line items', checkout);
//               let deviceUniqueId = await DeviceInfo.getUniqueId();
//               console.log('checkout add line items1', deviceUniqueId);
//               if (checkout.lineItems.length != 0) {
//                 const checkOutWebUrl =
//                   checkout.webUrl + `&uuid=${deviceUniqueId}&webview=true`;
               
//                 // console.log(
//                 //   'checkOutWebUrl--------------------------------------------------------',
//                 //   userInfo,
//                 // );
              
//                 if (true) {
//                    console.log("LARAVEL-checkout", checkoutMultipass);
//                   store.dispatch(clearLocalCartData())

//                   // navigation.navigate('CartWeb', {
//                   //   Url: checkOutWebUrl,
//                   //   name: 'cart',
//                   // });
//                 } else {
//                   userAlert('Oops', "Coudn't checkout.");
//                   store.dispatch(clearLocalCartData())
//                 }
//               } else {
//                 console.log(
//                   'checkout.lineItems.length' +
//                     checkout.lineItems.length +
//                     ' ' +
//                     JSON.stringify(checkout) +
//                     ' ' +
//                     product.length,
//                 );
//                 if (product.length == 1) {
//                   userAlert(
//                     'Oops',
//                     'Please visit the website to buy the product',
//                   );
//                 } else {
//                   userAlert(
//                     'Oops',
//                     'Please visit the website to buy the products',
//                   );
//                 }

//                 store.dispatch(clearLocalCartData());
//               }
//             })
//             .catch(error => {
//               console.log('error112233', error);
//               // store.dispatch(modalToggle(!store.getState().Search.isModalOpen));
//               store.dispatch(clearLocalCartData());
//               // console.log("ADD LINE ITEM ERROR", error);
//             });
//         })
//         .catch(err => {
//           console.log('not update checkout att', err);
//         });
//     })
//     .catch(error => {
//       //CREATE CHECKOUT ERROR
//       console.log('CREATE CHECKOUT_ERROR', error);
//     });
// };

// export const webLogin = (mobile_no, checkoutUrl) => {
//   return new Promise((resolve, reject) => {
//     try {
//       //CREATE CUSTOMER ACCESS TOKEN
//       // resolve()
//       // console.log("email, checkoutUrl", email, "-", checkoutUrl);
//       let data = JSON.stringify({
//         url: checkoutUrl,
//         mobile_no: mobile_no,
//       });
//       var config = {
//         method: 'post',
//         url: `${LARAVEL_URL}/multipass-login`,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         data: data,
//       };

//       axios(config)
//         .then(res => {
//           if (res.data.success) {
//             console.log('checkout login responce' + JSON.stringify(res.data));
//             resolve(res.data.data);
//           } else {
//             reject('err');
//           }
//         })
//         .catch(err => {
//           reject('err');
//         });
//     } catch (error) {
//       reject('err');
//     }
//   });
// };
