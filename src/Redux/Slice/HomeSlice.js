import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import constant from '../constant/constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCosultationListApi} from './ConsultancySlice';

export const Banner = createAsyncThunk(
  'home/Banner',
  async ({url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        return response?.data;
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('banner error 33 ', error);
      Toast.show(error.message);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const GetConsultationList = createAsyncThunk(
  'home/ConsultationList',
  async ({url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        return response?.data?.data?.franchises;
      } else {
        // Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('consultationList error 211', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const CourceLis = createAsyncThunk(
  'home/CourceLis',
  async ({url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {},
      };

      const response = await axios.request(config);
      if (response?.data?.status == 200) {
        return response?.data?.data;
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('banner error 211', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const submitEnquryApi = createAsyncThunk(
  'home/submitEnquryApi',
  async ({Requestdata, url}, {rejectWithValue}) => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },

        data: Requestdata,
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        Toast.show(response?.data?.msg);
        return response?.data?.status;
      } else {
        Toast.show(response?.data?.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    HomeBanner: [],
    ConsultationList: [],
    submitedEnqury: false,
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
      .addCase(Banner.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Banner.fulfilled, (state, action) => {
        state.loading = false;
        state.HomeBanner = action.payload;
      })
      .addCase(Banner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(CourceLis.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CourceLis.fulfilled, (state, action) => {
        state.loading = false;
        state.Cource = action.payload;
      })
      .addCase(CourceLis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitEnquryApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitEnquryApi.fulfilled, state => {
        state.loading = false;
        state.submitedEnqury = true;
      })
      .addCase(submitEnquryApi.rejected, (state, action) => {
        state.loading = false;
        state.submitedEnqury = false;
        state.error = action.payload;
      })
      .addCase(GetConsultationList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetConsultationList.fulfilled, (state, action) => {
        state.loading = false;
        state.ConsultationList = action.payload;
      })
      .addCase(getCosultationListApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError} = homeSlice.actions;

export default homeSlice.reducer;
