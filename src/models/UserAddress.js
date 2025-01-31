import Axios from "axios";
import {
  AddAddressQuery,
  DeleteAddressQuery,
  EditAddressQuery,
  GraphQlConfig,
  SetDefaultAddressQuery,
} from "../common/queries";

// Add Address
export const AddAddress = (accessToken, address) => {
  return new Promise((resolve, reject) => {
    try {
      let data = JSON.stringify({
        query: AddAddressQuery,
        variables: {
          customerAccessToken: accessToken,
          address: address,
        },
      });
      console.log("this is address string", data);
      return Axios.request(GraphQlConfig(data))
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve(response.data.data);
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

//REMOVE USER ADDRESS
export const RemoveAddress = (accessToken, id) => {
  return new Promise((resolve, reject) => {
   
    
    try {
      let data = JSON.stringify({
        query: DeleteAddressQuery,
        variables: {
          customerAccessToken: accessToken,
          id: id,
        },
      });
      return Axios.request(GraphQlConfig(data))
        .then((response) => {
          console.log('thisis issisrepsonse',JSON.stringify(response.data));
          resolve(response.data?.data);
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

//UPDATE DEFAULT ADDRESS
export const updateUserDefaultAddress = (accessToken, addressId) => {
  console.log("Update adress aid", addressId);
  return new Promise((resolve, reject) => {
    try {
      let data = JSON.stringify({
        query: SetDefaultAddressQuery,
        variables: { addressId: addressId, customerAccessToken: accessToken },
      });
      return Axios.request(GraphQlConfig(data))
        .then((response) => {
          console.log(JSON.stringify(response.data));
          resolve(response.data);
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

//UPDATE ADDRESS
export const updateUserAddress = (accessToken, id, address) => {
  return new Promise((resolve, reject) => {
    try {
      let data = JSON.stringify({
        query: EditAddressQuery,
        variables: {
          customerAccessToken: accessToken,
          id: id,
          address: address,
        },
      });
      return Axios.request(GraphQlConfig(data))
        .then((response) => {
          console.log('virre',JSON.stringify(response.data));
          resolve(response.data.data.customerAddressUpdate);
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
