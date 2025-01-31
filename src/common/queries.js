import Config from './config.json';
import {API_PSW, MAIN_URL} from './constants';

export const searchProducts =
  'query searchProducts($query: String!, $first: Int, $after: String) { search(query: $query, first: $first,after: $after, types: PRODUCT) {totalCount edges { node { ... on Product { id title images(first: 1) { edges { node { originalSrc altText } } } variants(first: 250) { edges { node { price { amount currencyCode } compareAtPrice { amount currencyCode} } } } } } } pageInfo { hasNextPage endCursor } } }';

export const getProducts =
  'query getCollectionById($id: ID!, $first: Int, $after: String $sortKey: ProductCollectionSortKeys, $reverse: Boolean,  $minPrice: Float,$maxPrice: Float, $available: Boolean) { collection(id: $id) {    title   products(first: $first,after: $after, sortKey: $sortKey, reverse: $reverse, filters:[{ price: { min:$minPrice , max:$maxPrice }},{available:$available} ]) {    edges { node { availableForSale id title descriptionHtml priceRange { minVariantPrice { amount currencyCode }    maxVariantPrice { amount currencyCode } } variants(first: 250) { edges { node { id price { amount currencyCode } compareAtPrice { amount currencyCode } image { src altText } } } } } } pageInfo { hasNextPage endCursor } filters { id label values { count id input label  } }  } } }';
// "query getCollectionById($id: ID!, $first: Int, $after: String $sortKey: ProductCollectionSortKeys, $reverse: Boolean) { collection(id: $id) { title products(first: $first,after: $after, sortKey: $sortKey, reverse: $reverse) { edges { node  { id title descriptionHtml priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } } variants(first: 250) { edges { node { id price { amount currencyCode } compareAtPrice { amount currencyCode } image { src altText } } } } } } pageInfo { hasNextPage endCursor } filters { id label values { count id input label  } }  } } }"
export const getProductsCount = `query getCollectionProductCount($id: ID!, $first: Int, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $minPrice: Float, $maxPrice: Float, $available: Boolean) {
  collection(id: $id) {
    products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse, filters: [{price: {min: $minPrice, max: $maxPrice}}, {available: $available}]) {
      edges {
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}`;

export const categoryList  = `
query {
  collections(first:100){
    nodes{
        id
        image{
            url
        }
        title
    }
  }
}
  `



export const ProductMetafieldsQuery = `
 query($id: ID!) {
  product(id: $id) {
    id
    metafields(first: 200) {
      edges {
        node {
          id
          namespace
          key
          value
          type
          description
        }
      }
    }
  }
}
`;


export const RegisterUser =
  'mutation customerCreate($input: CustomerCreateInput!) { customerCreate(input: $input) { customer { firstName lastName email phone acceptsMarketing } customerUserErrors { field message code } } }';
export const LoginUser = `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;

export const userDetails = `
query($customerAccessToken: String!) { 
  customer(customerAccessToken: $customerAccessToken) { 
    id
    email
    createdAt
    displayName
    phone
    firstName
    lastName
    tags
    defaultAddress {
      address1
      address2
      city
      company
      firstName
      id
      lastName
      zip
      phone
      name
      latitude
      longitude
      province
      country
      countryCode
    }
    addresses(first: 100) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          address1
          address2
          city
          company
          firstName
          id
          lastName
          zip
          phone
          name
          latitude
          longitude
          province
          country
          countryCode
        }
      }
    }
  } 
}`;

// export const getProducts = "query getCollectionById($id: ID!) { collection(id: $id) { title products(first: 10) { edges { node  { id title descriptionHtml priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } } variants(first: 250) { edges { node { id price { amount currencyCode } compareAtPrice { amount currencyCode } image { src altText } } } } } } filters { id label values { count id input label  } }  } } }"
export const EditAddressQuery = `
  mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
    customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
      userErrors {
        field
        message
      }
      customerAddress {
        address1
        address2
        city
        company
        firstName
        id
        lastName
        zip
        phone
        name
        latitude
        longitude
        province
        country
        countryCode
      }
    }
  }
`;
export const SetDefaultAddressQuery = `mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
  customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
     customer {
        id
        email
        createdAt
        displayName
        phone
        firstName
        lastName
        defaultAddress {
          address1
          address2
          city
          firstName
          id
          lastName
          zip
          phone
          name
          latitude
          longitude
          province
          country
          countryCode
        }
        addresses(first: 10) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              address1
              address2
              city
              firstName
              id
              lastName
              zip
              phone
              name
              latitude
              longitude
              province
              country
              countryCode
            }
          }
        }
     }
    customerUserErrors {
     field
     code
    }
    userErrors {
      field
      message
    }
  }
}`;
export const DeleteAddressQuery = `
  mutation customerAddressDelete($id: ID!, $customerAccessToken: String!) {
    customerAddressDelete(id: $id, customerAccessToken: $customerAccessToken) {
      userErrors {
        field
        message
      }
      deletedCustomerAddressId
    }
  }`;

export const AddAddressQuery = `
  mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      userErrors {
        field
        message
      }
      customerAddress {
        address1
        address2
        city
        company
        firstName
        id
        lastName
        zip
        phone
        name
        latitude
        longitude
        province
        country
        countryCode
      }
    }
  }
`;
export const GetOrdersQuery =
  'query($after: String, $pageSize: Int, $customerAccessToken: String!) { customer(customerAccessToken: $customerAccessToken) { orders(first: $pageSize, after: $after , reverse : true) {    pageInfo {     hasNextPage hasPreviousPage } edges {          node {    currentSubtotalPrice { amount }  totalTax { amount }    currentTotalPrice { amount }       processedAt            shippingAddress{             address1             address2             city             firstName             id             lastName             zip             phone             name             latitude             longitude             province             country             countryCode           }  billingAddress{             address1             address2             city             firstName             id             lastName             zip             phone             name             latitude             longitude             province             country             countryCode           }           orderNumber   id        statusUrl   fulfillmentStatus  financialStatus      lineItems(first: $pageSize) {             pageInfo {               hasNextPage               hasPreviousPage             }             edges {               node { originalTotalPrice { amount } discountedTotalPrice { amount }                quantity                                    title                 variant {     id              title      sku             image {                     src                   }                   selectedOptions {                     name                     value                   }                   product {                   id                     title                     description                     availableForSale                     productType                     onlineStoreUrl                     options {                       id                       name                       values                     }                     variants(first: 250) {                       pageInfo {                         hasNextPage                         hasPreviousPage                       }                       edges {                         node {                           id                           title                           selectedOptions {                             name                             value                           }                           image {                             src                           }                                                  }                       }                     }                     images(first: 250) {                       pageInfo {                         hasNextPage                         hasPreviousPage                       }                       edges {                         node {                           src                         }                       }                     }                   }                 }               }             }           }         }       }     }   } }';

export const mediaImageQuery = `query getImage($id: ID!) {
    node(id: $id) {
      ... on MediaImage {
        image {
          src
          altText
        }
      }
    }
  }`;

export const productRecommendationsQuery = `query productRecommendations($productId: ID!) {
  productRecommendations(productId: $productId) {
    id
    title
    descriptionHtml
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          image {
            src
            altText
          }
        }
      }
    }
  }
}
`;
export const resetpasswordQuery = `mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
  }
}`;

export const customerDeleteQuerry = `mutation customerDelete($id: ID!) {
  customerDelete(input: {id: $id}) {
    shop {
      id
    }
    userErrors {
      field
      message
    }
    deletedCustomerId
  }
}`;

export const customerLogoutQuerry = `mutation customerAccessTokenDelete($customerAccessToken: String!) {
  customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
    deletedAccessToken
    deletedCustomerAccessTokenId
    userErrors {
      field
      message
    }
  }
}`;
//https://cdn.shopify.com/s/files/1/0293/6448/6192/files/image_7297bb59-748b-4320-9e7c-7906048c0417.png?v=1661434833
export const GraphQlConfig = data => {
  return {
    method: 'post',
    url: Config.Shopify.graphqlUrl,
    headers: {
      'Content-type': 'application/json',
      'X-Shopify-Storefront-Access-Token': Config.Shopify.storeAccessToken,
    },
    data: data,
  };
};
export const GraphQlAdminConfig = data => {
  return {
    method: 'post',
    url: `${MAIN_URL}/graphql.json`,
    headers: {
      'Content-type': 'application/json',
      'X-Shopify-Access-Token': API_PSW,
    },
    data: data,
  };
};

{
  /***
 
 curl -X POST \
https://your-development-store.myshopify.com/api/2024-10/graphql.json \
-H 'Content-Type: application/json' \
-H 'X-Shopify-Storefront-Access-Token: {storefront_access_token}' \
-d '{
"query": "mutation customerCreate($input: CustomerCreateInput!) { customerCreate(input: $input) { customer { firstName lastName email phone acceptsMarketing } customerUserErrors { field message code } } }",
 "variables": {
    "input": {
      "firstName": "John",
      "lastName": "Smith",
      "email": "mailto:johnsmith@shopify.com",
      "phone": "+15146669999",
      "password": "5hopify",
      "acceptsMarketing": true
    }
  }
}'
 
 
*/
}
