import axios from "axios";
import { API_PSW, themsUrl } from "../common/constants";

export const getThemdata = async (query) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${themsUrl}?${query}`,
    headers: {
      "X-Shopify-Access-Token": API_PSW,
    },
  };

  const response = await axios.request(config);
  return response.data;
};
