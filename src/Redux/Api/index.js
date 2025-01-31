import axios from "axios";
import { GraphQlAdminConfig, ProductMetafieldsQuery } from "../../common/queries";
import { convertProductId } from "../../common/shopifyConverter";



export const getProductMetafieldsApiCall = (product_id) => {
    try {
      return new Promise((resolve, reject) => {
        // api
        //   .getMain(`products/${product_id}/metafields.json`)
        //   .then((response) => {
        //     // console.log("ResponseGetAllData" + JSON.stringify(response.body));
        //     if (response.body.IsSuccess) {
        //       resolve(response.body);
        //     } else {
        //       resolve(response.body);
        //     }
        //   })
        //   .catch(reject);
        getProductMetafields(product_id)
          .then((metafield) => {
            resolve({ metafields: metafield });
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (error) {
      reject(error);
    }
  };
  export const getProductMetafields = async (id) => {
    try {
      const data = JSON.stringify({
        query: ProductMetafieldsQuery,
        variables: {
          id:
            typeof id == "string" && id.includes("gid://shopify/Product")
              ? id
              : convertProductId(id), // Replace with the actual product ID
        },
      });
  
      const response = await axios.request(GraphQlAdminConfig(data));
      console.log('sdlklsdkklssld',response);
      
      const assetval = response.data?.data?.product?.metafields?.edges;
      if (assetval) {
        const processedData = assetval.map((item) => item.node);
        return processedData;
      } else {
        return [];
      }
    } catch (err) {
      console.log("errror in product metafileds");
      console.log(err);
      throw err;
    }
  };