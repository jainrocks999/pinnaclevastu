import { decode as atob, encode as btoa } from "base-64";

//IT CONVERT COLLECTION ID TO BASE64
export const convertCollectionId = (id) => {
  return btoa(`gid://shopify/Collection/${id}`);
};

export const convertProductId = (id) => {
  return btoa(`gid://shopify/Product/${id}`);
};

export const convertAddressId = (id) => {
  return btoa(`gid://shopify/MailingAddress/${id}`);
};

export const convertVariantId = (id) => {
  return (`gid://shopify/ProductVariant/${id}`);
};

export const convertVariantIdNum = (id) => {
  return atob(id).split("/").pop();
};
export const convertCustomerIdNum = (customerId) => {
  return (`gid://shopify/Customer/${customerId}`);
};