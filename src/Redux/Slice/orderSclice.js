import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constant/constants';

export const orderlistcource = createAsyncThunk(
  'Order1/orderlistcource',
  async ({id, token, url}, {rejectWithValue}) => {
    console.log('get open cource list api call ', url, id, token);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        console.log('response data cource order ',response?.data);
        
        // Toast.show(response.data.msg);
        // navigation.navigate('Details')
        return response?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);


export const courceorderDetail = createAsyncThunk(
  'Order1/courceorderDetail',
  async ({id, token, url, orderid, navigation}, {rejectWithValue}) => {
    console.log('detail order action ', url, id, token, orderid, );

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${id}&course_order_id=${orderid}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
     console.log(' curce  order detail response  ',response.data);
     
      if (response.data.status == 200) {
        

        Toast.show(response.data.msg);
         navigation.navigate('CourceDetail');
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      //  Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);


export const orderlistapi = createAsyncThunk(
  'Order1/orderlistapi',
  async ({id, token, url}, {rejectWithValue}) => {
    console.log('get to cart data action ', url, id, token);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        // navigation.navigate('Details')
        return response?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const orderDetail = createAsyncThunk(
  'Order1/orderDetail',
  async ({id, token, url, orderid, code, navigation}, {rejectWithValue}) => {
    console.log('detail order action ', url, id, token, orderid, code);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${id}&order_id=${orderid}&order_code=${code}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
     console.log('order detail response  ',response.data);
     
      if (response.data.status == 200) {
        

        Toast.show(response.data.msg);
        navigation.navigate('OrderDetail');
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      //  Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const shipmethod = createAsyncThunk(
  'Order1/shipmethod',
  async ({user_id, token, url}, {rejectWithValue}) => {
    console.log('shipment ffgdfg ', url, token);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
     
      if (response.data.status == 200) {
        // Toast.show(response.data.msg);
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      // Toast.show(error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const cancelorders = createAsyncThunk(
  'address/cancelorders',
  async ({url, token, data1, navigation}, {dispatch,rejectWithValue}) => {
    console.log('cancel ord  hgfghhg ', url, JSON.stringify(data1));
    let data2 = {
      user_id: data1.user_id,
      order_id: data1.order_id,
      order_number: data1.order_number,
      description: data1.description,
    };
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constants.mainUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data2),
    };
   

    try {
      const response = await axios.request(config);
      console.log(response?.data,"order cancle......")
      
      if (response.data.status == 200) {

         await dispatch(
                orderlistapi({id: data1.user_id, token: token, url: 'fetch-order'}),
              );
        // Toast.show(response.data.msg);
        return response.data;
      } else {
        Toast.show(response.data.msg);
      }

      
    } catch (error) {
      console.log('error', error);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// export const conatctus = createAsyncThunk(
//   'address/conatctus',
//   async ({url, token, data, navigation}, {rejectWithValue}) => {
//     console.log('Contact us order  ', url, JSON.stringify(data), token);

//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: `${constants.mainUrl}${url}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       data: JSON.stringify(data),
//     };

//     try {
//       const response = await axios.request(config);
     
//       if (response.data.status == 200) {
//        // Toast.show(response.data.msg);
//         return response.data;
//       } else {
//         Toast.show(response.data.msg);
//       }

//       // return response.data; // Return the API response data
//     } catch (error) {
//       console.log('error', error);

//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// export const Termsandcondtion = createAsyncThunk(
//   'Order1/Termsandcondtion',
//   async ({user_id, token, url}, {rejectWithValue}) => {
//     console.log('terms .. ', url, token, user_id);

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constant.mainUrl}${url}user_id=${user_id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       console.log('fhgfklfsgl', config);

//       const response = await axios.request(config);

//       if (response.data.status == 200) {
//       //  Toast.show(response.data.msg);
//         return response?.data?.data;
//       } else {
//         Toast.show(response.data.msg);
//       }
//     } catch (error) {
//       // Toast.show(error);

//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );

// export const PrivacyRefund = createAsyncThunk(
//   'Order1/PrivacyRefund',
//   async ({user_id, token, url}, {rejectWithValue}) => {
//     console.log('terms .. ', url, token, user_id);

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constant.mainUrl}${url}user_id=${user_id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
    

//       const response = await axios.request(config);

//       if (response.data.status == 200) {
//        // Toast.show(response.data.msg);
//         return response?.data?.data;
//       } else {
//         Toast.show(response.data.msg);
//       }
//     } catch (error) {
//       // Toast.show(error);

//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );


// export const Faqs = createAsyncThunk(
//   'Order1/Faqs',
//   async ({user_id, token, url}, {rejectWithValue}) => {
//     console.log('Fawqs .. ', url, token, user_id);

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constant.mainUrl}${url}user_id=${user_id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
     

//       const response = await axios.request(config);

//       if (response.data.status == 200) {
//       //  Toast.show(response.data.msg);
//         return response?.data?.data;
//       } else {
//         Toast.show(response.data.msg);
//       }
//     } catch (error) {
//       // Toast.show(error);

//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );

// export const Careers = createAsyncThunk(
//   'Order1/Careers',
//   async ({user_id, token, url}, {rejectWithValue}) => {
//     console.log('Fawqs .. ', url, token, user_id);

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constant.mainUrl}${url}user_id=${user_id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
    

//       const response = await axios.request(config);

//       if (response.data.status == 200) {
//        // Toast.show(response.data.msg);
//         return response?.data?.data;
//       } else {
//         Toast.show(response.data.msg);
//       }
//     } catch (error) {
//       // Toast.show(error);

//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );


// export const Aboutus = createAsyncThunk(
//   'Order1/Aboutus',
//   async ({user_id, token, url}, {rejectWithValue}) => {
//     console.log('Fawqs .. ', url, token, user_id);

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constant.mainUrl}${url}user_id=${user_id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
     

//       const response = await axios.request(config);

//       if (response.data.status == 200) {
//         //Toast.show(response.data.msg);
//         return response?.data?.data;
//       } else {
//         Toast.show(response.data.msg);
//       }
//     } catch (error) {
//       // Toast.show(error);

//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );
// Creating a slice for authentication
const orderSclice = createSlice({
  name: 'Order1',
  initialState: {
    orderD: [],
    orderDetal:{},
    orderCource:[],
    orderList1: [],
    shipm: {},
    cancelOr: [],
    Contact: [],
    TermsC: {},
    PrivacyR: {},
    Faqs1: {},
    Career:{},
    Abouts:{},
    loading: false,
    error: null,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
    
    .addCase(orderlistcource.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(orderlistcource.fulfilled, (state, action) => {
      state.loading = false;
      state.orderCource = action.payload; 
    })
    .addCase(orderlistcource.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    })

    .addCase(courceorderDetail.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(courceorderDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetal = action.payload; 
    })
    .addCase(courceorderDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; 
    })
      .addCase(orderlistapi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderlistapi.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList1 = action.payload; 
      })
      .addCase(orderlistapi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(orderDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.orderD = action.payload; 
      })
      .addCase(orderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(shipmethod.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shipmethod.fulfilled, (state, action) => {
        state.loading = false;
        state.shipm = action.payload; 
      })
      .addCase(shipmethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(cancelorders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelorders.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelOr = action.payload;
      })
      .addCase(cancelorders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

    //   .addCase(conatctus.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(conatctus.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.Contact = action.payload; 
    //   })
    //   .addCase(conatctus.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   })

    //   .addCase(Termsandcondtion.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(Termsandcondtion.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.TermsC = action.payload; 
    //   })
    //   .addCase(Termsandcondtion.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   })

    //   .addCase(PrivacyRefund.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(PrivacyRefund.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.PrivacyR = action.payload; 
    //   })
    //   .addCase(PrivacyRefund.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   })

    //   .addCase(Faqs.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(Faqs.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.Faqs1 = action.payload; 
    //   })
    //   .addCase(Faqs.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   })
     
    //   .addCase(Careers.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(Careers.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.Career = action.payload; 
    //   })
    //   .addCase(Careers.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   })
      
    //   .addCase(Aboutus.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(Aboutus.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.Abouts = action.payload; 
    //   })
    //   .addCase(Aboutus.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   });
  },
});

export const {clearError} = orderSclice.actions;

export default orderSclice.reducer;
