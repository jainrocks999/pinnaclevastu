import axios from 'axios';
import {GraphQlConfig, productRecommendationsQuery} from '../common/queries';

export const getProductRecomendation = async productId => {
  try {
    let data = JSON.stringify({
      query: productRecommendationsQuery,
      variables: {
        productId,
      },
    });
    const response = await axios.request(GraphQlConfig(data));
    return response.data?.data;
  } catch (err) {
    throw err;
  }
};
