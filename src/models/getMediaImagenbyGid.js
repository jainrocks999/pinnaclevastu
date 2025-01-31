import axios from 'axios';
import {GraphQlConfig, mediaImageQuery} from '../common/queries';

export const getImageByGid = async id => {
  try {
    let data = JSON.stringify({
      query: mediaImageQuery,
      variables: {
        id: id,
      },
    });
    const response = await axios.request(GraphQlConfig(data));
    return {image: {uri: response.data?.data?.node?.image.src}};
  } catch (err) {
    throw err;
  }
};
