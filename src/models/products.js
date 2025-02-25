import axios from 'axios';
import {GraphQlConfig, productRecommendationsQuery} from '../common/queries';
import { getSimilarProductMetafieldValue } from '../Redux/Api';

export const getProductRecomendation = async productId => {
  try {
    let data = JSON.stringify({
      query: productRecommendationsQuery,
      variables: {
        productId,
      },
    });
    const response = await axios.request(GraphQlConfig(data));
    const productRecommendations = response?.data?.data?.productRecommendations || [];
    const updatedProducts = await Promise.all(
      productRecommendations.map(async (product) => {
        const review = await getSimilarProductMetafieldValue(product?.id);
        let parsedReview = null;
    
        if (review && review.value && review.value.trim() !== '') {
          try {
            parsedReview = JSON.parse(review.value);
          } catch (error) {
            console.error(
              'JSON Parse error:',
              error.message,
              'with value:',
              review.value
            );
          }
        } else {
          console.log('No valid JSON string to parse for product id', product?.id);
        }
    
        // Return the updated product while preserving all other data
        return {
          ...product,
          review: parsedReview,
        };
      })
    );
    
    console.log('Updated Products:', updatedProducts);
    
    // Return the entire data object with the updated productRecommendations
    return {
      ...response.data.data,
      productRecommendations: updatedProducts,
    };
  } catch (err) {
    throw err;
  }
};
