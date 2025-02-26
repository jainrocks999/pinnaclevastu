import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import constants from '../constant/constants';

export const orderlistcource = createAsyncThunk(
  'Order1/orderlistcource',
  async ({id, token, url}, {rejectWithValue}) => {
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
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const courceorderDetail = createAsyncThunk(
  'Order1/courceorderDetail',
  async ({id, token, url, orderid, navigation}, {rejectWithValue}) => {
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


// remedies Order list Api 
export const orderlistapi = createAsyncThunk(
  'Order1/orderlistapi',

  async ({id, token, url, accessToken}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${id}&access_token=${accessToken}`,

        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);
  
      if (response.data.status == 200) {
        return response?.data?.data?.customer?.orders?.edges;
      } else {
        console.log(error);
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const cancelorders = createAsyncThunk(
  'address/cancelorders',
  async ({url, token, data1}, {dispatch, rejectWithValue}) => {
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
      if (response.data.status == 200) {
        await dispatch(
          // orderlistapi({id: data1.user_id, token: token, url: 'fetch-order'}),
        );
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

const orderSclice = createSlice({
  name: 'Order1',
  initialState: {
    orderDetal: {},
    orderCource: [],
    orderList1: [],
    cancelOr: [],
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
      });
  },
});

export const {clearError} = orderSclice.actions;

export default orderSclice.reducer;
