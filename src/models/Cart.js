import axios from "axios";
import { BASE_URL, MEMBERSHIP_SKU, MEMBERSHIP_TAG } from "../common/constants";
import { DATABASE } from "../Database";
import { store } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCart } from "../redux/features/CartSlice";
export const getUserCart = (email, isNewUser) => {
  return new Promise(async (resolve, reject) => {
    const cartdb = await AsyncStorage.getItem(DATABASE.CART);
    var accessToken = await AsyncStorage.getItem("accessToken");
    try {
      if (email) {
        //IF EMAIL IT MEANS USER LOGGED IN AND WE CAN FETCH CART FROM BACKEND
        const FormData = require("form-data");
        let data = new FormData();
        data.append("email", email);
        data.append("sos_access_token", accessToken);

        let config = {
          method: "post",
          url: `${BASE_URL}/storecart-secure`,
          headers: {},
          data: data,
        };
        // var config = {
        //   method: "get",
        //   url: `${BASE_URL}/storecart?customerId=${email}`,
        //   headers: {},
        //   data: "",
        // };
        //GET DATA FROM BACKEND
        axios(config)
          .then(async (response) => {
            const { cart } = response.data;

            // console.log(
            //   "cart-get-api",
            //   cart[0].product_type,
            //   accessToken,
            //   email
            // );
            // console.log("cart-get-api", cart[0].quantity);
            if (isNewUser) {
              const cartdb = await AsyncStorage.getItem(DATABASE.CART);
              const existingcart = JSON.parse(cartdb);
              existingcart.forEach((element) => {
                setUserCart(element);
              });

              getUserCart(email, false);
            } else {
              //SET DATA IN REDUX
              setCartInApp(cart);
            }
          })
          .catch((error) => {
            console.log("error123", error, JSON.stringify(config));
            // SHOW EXISTING OR BLANK CART
            setCartInApp(JSON.parse(cartdb));
          });
      } else {
        console.log("USER NOT LOGGED IN SO WE GET CART FROM ASYNC");

        //USER NOT LOGGED IN SO WE GET CART FROM ASYNC
        setCartInApp(JSON.parse(cartdb));
      }
    } catch (error) {
      reject("err");
    }
  });
};
export const setUserCart = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const userInfo = "bharvi.binary@gmail.com";
      var accessToken = await AsyncStorage.getItem("accessToken");

      const userInfo = store.getState().SSO.userDetails.email;
      //OBJECT MODIFICATION AS PER CART API REQUIREMENT

      console.log("product.properties", product);
      const price = product?.selectedVarient?.price.amount;

      // blank array or object ()

      let cartProduct;

      console.log("In else properties", JSON.stringify(product));

      cartProduct = {
        // ...product,
        id: product.id,
        quantity: product.quantity,
        title: product.title,
        price: price,
        original_price: price,
        discounted_price: price,
        line_price: product.price,
        original_line_price: product.price,
        total_discount: 0,
        sku: product.sku,
        vendor: product.vendor,
        taxable: false,
        product_id: product.product_id,
        product_has_only_default_variant: false,
        gift_card: false,
        final_price: price,
        final_line_price: product.price,
        url: product.image, //need to check
        featured_image: product.images[0],
        image: product.image,
        handle: product.handle,
        requires_shipping: true,
        product_type: product.productType,
        product_title: product.title,
        product_description: product.description,
        variant_title: product.selectedVarient.title,
        variant_options: product.variants,
        options_with_values: product.options,
        line_level_total_discount: 0,
      };

      console.log("cartProduct", cartProduct);

      if ( Object.keys(cartProduct).length > 0) {
        // const cartData = JSON.stringify({
        //   email_id: userInfo,
        //   cart_item: cartProduct,
        // });
        const cartData = JSON.stringify({
          email: userInfo,
          sos_access_token: accessToken,
          cart_item: cartProduct,
        });

        try {
          // var config = {
          //   method: "post",
          //   // url: `${BASE_URL}/mobile-cart-add-secure`,
          //   url: `${BASE_URL}/mobile-cart-add`,
          //   headers: { "Content-Type": "application/json" },
          //   data: cartData,
          // };

          // let config = {
          //   method: "post",
          //   url: `${BASE_URL}/mobile-cart-add-secure`,
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   data: cartData,
          // };

          //SET DATA IN BACKEND
          // console.log("config", config);
          // axios(config)
          //   .then((response) => {
          //     console.log("SET DATA IN BACKEND", response.data);
          //   })
          //   .catch((error) => {
          //     console.log("SET DATA IN BACKEND-error", error);
          //   });
          // FIRST GET EXISTING CART ITEMS
          // APPEND NEW PRODUCT AND CHECK QTY AND PRICE MANAGEMENT
          // POST API CALL FOR SYNC IN WEBSITE
        } catch (error) {
          console.log("error", error);
        }
      } else {
        console.log("User not logged in");
      }
    } catch (error) {
      console.log("errorerror", error);
    }
  });
};

export const setCartInApp = (cartList) => {
  // console.log("--setCartInApp--", cartList);
  if (cartList != null) {
    store.dispatch(setCart(cartList, null));
  }
};

export const removeProduct = async (product) => {
  try {
    var accessToken = await AsyncStorage.getItem("accessToken");
    // const userInfo = "bharvi.binary@gmail.com";
    const userInfo = store.getState().SSO.userDetails.email;

    if (userInfo) {
      // console.log("userInfo", product);
      var data = JSON.stringify({
        id: product.product_id,
        email: userInfo,
        sos_access_token: accessToken,
      });
      // console.log("userInfo", JSON.parse(data));

      var config = {
        method: "post",
        url: `${BASE_URL}/mobile-cart-remove-secure`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      // var config = {
      //   method: "post",
      //   url: `${BASE_URL}/mobile-cart-remove`,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   data: data,
      // };

      axios(config)
        .then((res) => {
          // console.log("res12145");
          // console.log("res", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

//THI FUNCTION CALL WHEN USER FIRST TIME LOGIN
export const userCartSync = async (test) => {
  try {
    // CHECK ASYNC STORAGE HAVE DATA
    const cartdb = await AsyncStorage.getItem(DATABASE.CART);
    const userInfo = store.getState().SSO.userDetails.email;
    if (cartdb != null) {
      // console.log("CART ASYNC STORAGE HAVE DATA", cartdb);
      //FOR LOOP TO ADD PRODUCT IN CART
      getUserCart(userInfo, true);
      //GET API
    } else {
      // console.log("CART ASYNC STORAGE NOT HAVE DATA");
      getUserCart(userInfo, false);
    }

    // CART GET API CALL
    // MERGE ASYNC DATA + GET API DATA
    // POST API CALL
    // UPDATE DATA IN ASYNC , REDUX SROTE
  } catch (error) {
    console.log("error-userCartSync", error);
  }
};
