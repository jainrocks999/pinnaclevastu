import axios from "axios";
import { GraphQlConfig, menuQuerry, policyQuerry } from "./../common/queries";

export const fetchMenuFromGql = async (handle) => {
  try {
    let data = JSON.stringify({
      query: menuQuerry,
      variables: {
        handle,
      },
    });
    const response = await axios.request(GraphQlConfig(data));
   
    
   
    if (response?.data?.data?.menu) {
      return response?.data?.data?.menu;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const fetStorePolicy = async (storeHandle) => {
  try {
    let data = JSON.stringify({
      query: policyQuerry,
      variables: {
        storeHandle,
      },
    });
    const response = await axios.request(GraphQlConfig(data));

    if (response?.data?.data?.shop) {
      return Object.values(response?.data?.data?.shop);
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
