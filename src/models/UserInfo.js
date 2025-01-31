import AsyncStorage from '@react-native-async-storage/async-storage';
// import {DATABASE} from '../Database';
// import {GraphqlAPI} from '../graphql';
// import DeviceInfo from 'react-native-device-info';
// import {getDeviceId} from '../redux/actions/userDataAction';
// import {store} from '../redux/store';
// import {BASE_URL} from '../common/constants';
import Axios from 'axios';
// import Config from '../graphql/config.json';
import Config from '../common/config.json';
import {
  customerDeleteQuerry,
  customerLogoutQuerry,
  GraphQlAdminConfig,
  GraphQlConfig,
  resetpasswordQuery,
} from '../common/queries';
import axios from 'axios';

export const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_db');
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getUserDetails = async accessToken => {
  console.log('this is comming here', accessToken);
  return new Promise((resolve, reject) => {
    try {
      let data = JSON.stringify({
        query: `query($accessToken: String!) {
      customer(customerAccessToken: $accessToken) {
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
    }`,
        variables: {accessToken: accessToken},
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: Config.Shopify.graphqlUrl,
        headers: {
          'Content-type': 'application/json',
          'X-Shopify-Storefront-Access-Token': Config.Shopify.storeAccessToken,
        },
        data: data,
      };

      Axios.request(config)
        .then(response => {
          console.log(JSON.stringify('response.data', response.data));
          resolve(response.data.data.customer);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
export const resetUserPassoword = async email => {
  try {
    let data = JSON.stringify({
      query: resetpasswordQuery,
      variables: {email: email},
    });
    const response = await axios.request(GraphQlConfig(data));
    return response?.data?.data;
  } catch (err) {
    throw err;
  }
};
export const removeUserAccount = async id => {
  try {
    let data = JSON.stringify({
      query: customerDeleteQuerry,
      variables: {id: id},
    });
    const response = await axios.request(GraphQlAdminConfig(data));
    console.log(
      'ths usa delete account response mian',
      JSON.stringify(response?.data),
    );
    return response?.data?.data;
  } catch (err) {
    throw err;
  }
};
export const logoutUser = async token => {
  try {
    let data = JSON.stringify({
      query: customerLogoutQuerry,
      variables: {
        customerAccessToken: token,
      },
    });
    const response = await axios.request(GraphQlAdminConfig(data));
    console.log(
      'ths usa delete account response logout',
      JSON.stringify(response?.data),
    );
    return response?.data?.data;
  } catch (err) {
    throw err;
  }
};

// export const getDeviceUniqueId = async () => {
//   try {
//     const value = await AsyncStorage.getItem(DATABASE.DEVICEID);
//     if (value != null) {
//       let DeviceId = JSON.parse(value);
//       // console.log("DeviceId-null", DeviceId);
//       store.dispatch(getDeviceId(DeviceId));
//     } else {
//       let DeviceId = DeviceInfo.getUniqueId();
//       // console.log("DeviceId", DeviceId);
//       store.dispatch(getDeviceId(DeviceId));
//       await AsyncStorage.setItem(DATABASE.DEVICEID, JSON.stringify(DeviceId));
//     }
//   } catch (e) {
//     console.log('getdeviceInfo', e);
//   }
// };

//UPDATE Name
// export const updateUserName = (accessToken, customer) => {
//   console.log('updateUserNameData', accessToken, customer);
//   return new Promise((resolve, reject) => {
//     try {
//       const FormData = require('form-data');
//       let data = new FormData();
//       data.append('firstName', customer.firstName);
//       data.append('lastName', customer.lastName);
//       data.append('customerAccessToken', accessToken);

//       let config = {
//         method: 'post',
//         url: `${BASE_URL}/update/customer-profile-app`,
//         headers: {},
//         data: data,
//       };

//       // return Axios.request(config)
//       //   .then((response) => {
//       //     console.log(JSON.stringify(response.data));
//       //     resolve(response.data.data);
//       //   })
//       //   .catch((error) => {
//       //     reject(error);
//       //     console.log(error);
//       //   });

//       return GraphqlAPI.customerUpdateName({
//         accessToken,
//         customer,
//       })
//         .then(res => {
//           console.log('updateUserNameres', res);

//           resolve(res);
//         })
//         .catch(error => {
//           reject(error);
//         });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
