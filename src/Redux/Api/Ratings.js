import { ToastAndroid } from "react-native";
import { API_PSW } from "../../common/constants";
import axios from "axios";
const judgeme_api_token= "VZW6n1uKwqk8sBEACxfjMlMd7X4"
const shop_domain='pinnaclevastu-in.myshopify.com'
const judgeme_base_url='https://judge.me/api/v1/'
export const handleRating = async (
  star,
  reviewTitle,
  reviewDes,
  productId,
  userDetails
) => {
  if (star == "") {
    ToastAndroid.show("Please select rating", ToastAndroid.SHORT);
  } else if (reviewTitle == "") {
    ToastAndroid.show("Please write a title", ToastAndroid.SHORT);
  } else if (reviewDes == "") {
    ToastAndroid.show("Please write your review", ToastAndroid.SHORT);
  } else {
    try {
      let data = JSON.stringify({
        shop_domain: "pinnaclevastu-in.myshopify.com",
        platform: "shopify",
        id: productId,
        email: userDetails?.email,
        name: userDetails?.displayName,
        reviewer_name_format: "",
        rating: star,
        title: reviewTitle,
        body: reviewDes,
        picture_urls: [""],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `https://judge.me/api/v1/reviews?shop_domain=pinnaclevastu-in.myshopify.com&api_token=${judgeme_api_token}`,
        headers: {
          "X-Shopify-Access-Token": API_PSW,
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config); 
      ToastAndroid.show(response?.data?.message, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    };
  }
};



export  default  getReviewList = async (id) => {
  // console.log('datata are coming......1',id);
  let reviewId = null;
  let reviewsList = [];
  let count = 0;

  try {
    
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${judgeme_base_url}products/-1?api_token=${judgeme_api_token}&external_id=${id}&shop_domain=${shop_domain}`,
      headers: {},
    };
    // console.log('datata are coming......1',config);

    const productResponse = await axios.request(config);
    if (productResponse.data.product) {
      reviewId = productResponse.data.product.id;

      const config1 = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${judgeme_base_url}reviews?api_token=${judgeme_api_token}&shop_domain=${shop_domain}&product_id=${reviewId}&page=1&per_page=10`,
        headers: {},
      };

      const reviewsResponse = await axios.request(config1);

      // console.log('datata are coming......1',reviewsResponse);
      
      if (reviewsResponse.data.reviews.length > 0) {
        reviewsList = reviewsResponse.data.reviews;
      }
      const config2 = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${judgeme_base_url}reviews/count?api_token=${judgeme_api_token}&shop_domain=${shop_domain}&product_id=${reviewId}`,
        headers: {},
      };

      const countResponse = await axios.request(config2);
      // console.log('datata are coming......3',countResponse);
      count = countResponse?.data?.count || 0;
    }
  } catch (err) {
    console.log(err);
    return {
      reviewId:null,
      reviewsList:[],
      count:0,
    };
  } finally {
    return {
      reviewId,
      reviewsList,
      count,
    };
  }
};
