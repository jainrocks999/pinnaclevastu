import axios from 'axios';
import {
  customermetafeildgetid,
  GraphQlAdminConfig,
  ProductMetafieldsQuery,
  similarproduct,
} from '../../common/queries';
import {convertCustomerIdNum, convertProductId} from '../../common/shopifyConverter';
import { API_PSW, MAIN_URL } from '../../common/constants';

export const getProductMetafieldsApiCall = product_id => {
  try {
    return new Promise((resolve, reject) => {
      getProductMetafields(product_id)
        .then(metafield => {
          resolve({metafields: metafield});
        })
        .catch(err => {
          reject(err);
        });
    });
  } catch (error) {
    reject(error);
  }
};
export const getProductMetafields = async id => {
  try {
    const data = JSON.stringify({
      query: ProductMetafieldsQuery,
      variables: {
        id:
          typeof id == 'string' && id.includes('gid://shopify/Product')
            ? id
            : convertProductId(id),
      },
    });

    const response = await axios.request(GraphQlAdminConfig(data));
    const assetval = response.data?.data?.product?.metafields?.edges;
    if (assetval) {
      const processedData = assetval.map(item => item.node);
      return processedData;
    } else {
      return [];
    }
  } catch (err) {
    console.log('errror in product metafileds');
    console.log(err);
    throw err;
  }
};

export const fetchProductData = async id => {
  try {
    const data = JSON.stringify({
      query: similarproduct,
      variables: {
        id:
          typeof id == 'string' && id.includes('gid://shopify/Product')
            ? id
            : convertProductId(id),
      },
    });

    const response = await axios.request(GraphQlAdminConfig(data));

    const product = response?.data?.data?.product;
    if (product) {
      const mediaUrl = product.media.edges.map(
        edge => edge.node.preview.image.url,
      )?.[0];

      const variants = product.variants.edges.map(edge => ({
        id: edge.node.id,
        title: product.title,
        image: mediaUrl,
        productId: product?.id,
        height: edge.node.image?.height || null,
        width: edge.node.image?.width || null,
        price: edge.node.price,
        compareAtPrice: edge.node.compareAtPrice,
      }));

      const combinedData = {...variants[0]};
      return combinedData;
    }
  } catch (error) {
    console.error('Error fetching product data:', error);
  }
};

export const getSimilarProductMetafieldValue = async id => {
  try {
    if (!id) {
      throw new Error('Product ID is required');
    }

    const variables = {
      id:
        typeof id === 'string' && id.includes('gid://shopify/Product')
          ? id
          : convertProductId(id),
    };

    const data = JSON.stringify({
      query: `query ($id: ID!) {
          product(id: $id) {
           review: metafield(namespace: "reviews", key: "rating") {
              value
              type
            }
            title
          }
        }`,
      variables,
    });

    const response = await axios.request(GraphQlAdminConfig(data));
    if (response?.data?.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      return null;
    }
    return response?.data?.data?.product?.review || null;
  } catch (err) {
    console.error('Error fetching similar product metafield:', err);
    throw err;
  }
};





export const getCutomerMetafields = async customerId => {
  try {
    const data = JSON.stringify({
      query: customermetafeildgetid,
      variables: {
        id:
        typeof customerId === "string" && customerId.includes("gid://shopify/Customer/")
          ? customerId
          : `gid://shopify/Customer/${customerId}`
      },
    });


    const response = await axios.request(GraphQlAdminConfig(data));
    const assetval = response?.data?.data?.customer
    return assetval;
    // if (assetval) {
    //   const processedData = assetval.map(item => item.node);
    //   return processedData;
    // } else {
    //   return [];
    // }
  } catch (err) {
    console.log('errror in product metafileds');
    console.log(err);
    throw err;
  }
};









export const updateCustomerMetafields = async (customerId, metafields) => {
  try {
    console.log("📌 Received customerId:", customerId);
    console.log("📌 Received metafields:", metafields);

    // ✅ Convert customerId to Shopify format if needed
    const ownerId =
      typeof customerId === "string" && customerId.includes("gid://shopify/Customer/")
        ? customerId
        : `gid://shopify/Customer/${customerId}`;

    // ✅ Properly formatting metafields
    const formattedMetafields = metafields.map(({ key, type, value }) => ({
      ownerId,
      namespace: "custom",
      key,
      type,
      value: Array.isArray(value) ? JSON.stringify(value) : value, // Ensuring correct format
    }));

    console.log("🔹 Formatted metafields:", formattedMetafields);

    // ✅ Correct GraphQL mutation
    const query = `
      mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            id
            key
            value
            type
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const variables = { metafields: formattedMetafields };

    // ✅ Axios request configuration
    const response = await axios.post(
      `${MAIN_URL}/graphql.json`,
      // "https://pinnaclevastu-in.myshopify.com/admin/api/2024-04/graphql.json",
      { query, variables },
      {
        headers: {
          "X-Shopify-Access-Token":  API_PSW,
          "Content-Type": "application/json",
        },
      }
    );

    const metafieldsData = response?.data?.data?.metafieldsSet;

    if (metafieldsData?.userErrors?.length) {
      console.error("❌ Shopify API Errors:", metafieldsData.userErrors);
      throw new Error("Shopify GraphQL returned errors.");
    }

    console.log("✅ Metafields updated successfully:", metafieldsData?.metafields);
    return metafieldsData?.metafields || [];

  } catch (error) {
    console.error("❌ Error in updating metafields:", error.response?.data || error.message);
    throw error;
  }
};






// export const updateCustomerMetafields = async (customerId, metafields) => {
//   try {
//     console.log('get item  ',customerId,metafields);
    
//     const formattedMetafields = metafields.map(({ key, type, value }) => ({
//       ownerId: typeof customerId == 'string' && customerId.includes('gid://shopify/Customer/')
//       ? customerId
//       : convertCustomerIdNum(customerId),
//       namespace: "custom",
//       key,
//       type,
//       value: Array.isArray(value) ? JSON.stringify(value) : value, // Ensure correct formatting
//     }));
//     console.log('get item  332232323',formattedMetafields);
//     const query = `
//       mutation {
//         metafieldsSet(metafields: ${formattedMetafields}) {
//           metafields {
//             id
//             key
//             value
//             type
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `;
// console.log('logdddd',query);

//     const response =  await axios.request(GraphQlAdminConfig(query));;

//     const metafieldsData = response?.data?.data || [];
//     return metafieldsData;

//   } catch (error) {
//     console.error("❌ Error in updating metafields:", error);
//     throw error;
//   }
// };
