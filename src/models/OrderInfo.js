import Axios from "axios";
import { GetOrdersQuery, GraphQlConfig } from "../common/queries";

export const GetOrders = (cursor, pageSize, accessToken) => {
  return new Promise((resolve, reject) => {
    try {
      let data = JSON.stringify({
        query: GetOrdersQuery,
        variables: {
          cursor: cursor,
          pageSize: pageSize,
          customerAccessToken: accessToken,
        },
      });

      Axios.request(GraphQlConfig(data))
        .then((response) => {
          console.log("this isisishmmmm",JSON.stringify(response.data));
          // console.log(
          //   "GraphQlConfig",
          //   JSON.stringify(response.data.data.customer.orders.edges)
          // );
          resolve(response.data.data?.customer?.orders?.edges);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
