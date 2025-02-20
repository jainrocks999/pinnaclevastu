import axios from "axios";
import { GraphQlAdminConfig, ProductMetafieldsQuery, similarproduct } from "../../common/queries";
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
            console.log('metafeild datat getjhjjhh',metafield);
            
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

  export  const fetchProductData = async (id) => {
    try {
      console.log('sghkjsfhgjkfsghjkfghkjsg',id);
      const data = JSON.stringify({
        query: similarproduct,
        variables: {
          id:
            typeof id == "string" && id.includes("gid://shopify/Product")
              ? id
              : convertProductId(id), // Replace with the actual product ID
        },
      });





      const response = await axios.request(GraphQlAdminConfig(data));



  
      // const jsonResponse = await response.json();
     
  
      const product = response?.data?.data?.product;
    
      console.log('Combined Data:1221', product?.id);
      if (product) {
        const mediaUrl = product.media.edges.map(edge => edge.node.preview.image.url)?.[0];
       
        const variants = product.variants.edges.map(edge => ({
         
          id: edge.node.id,
          title: product.title,
          image:mediaUrl,
          productId:product?.id,
          height: edge.node.image?.height || null,
          width: edge.node.image?.width || null,
          price: edge.node.price,
          compareAtPrice: edge.node.compareAtPrice,
        }));
  
        // Combine media & variants into one array
        const combinedData = 
         { ...variants[0]}
        ;
  
         console.log('Combined Data:1221', combinedData);
        return combinedData ;
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };