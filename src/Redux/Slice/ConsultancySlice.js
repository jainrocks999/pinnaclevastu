import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import constant from '../constant/constants';
import Toast from 'react-native-simple-toast';

export const getCosultationListApi = createAsyncThunk(
  'consultation/getCosultationList',
  async ({url}, {rejectWithValue}) => {
    // console.log('getCosultationList..', url);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {},
      };

      const response = await axios.request(config);

      // console.log(response.data.data, 'sdmfsdkjfsldf');

      if (response?.data?.status == 200) {
        return response?.data?.data;
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('CosultationList error ', error);
      Toast.show(error.message);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const consultationDetail1 = createAsyncThunk(
  'consultation/consultationDetail1',
  async ({url, franchise_id, navigation}, {rejectWithValue}) => {
    // console.log('consultation detail00', url, franchise_id);
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?franchise_id=${franchise_id}`,
        headers: {},
      };
      const response = await axios.request(config);
      if (response?.data?.status == 200) {
        // console.log('response data consultation detail ', response.data.data);
        navigation.navigate('profile');
        return response?.data.data;
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('banner error ', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const getAppoinment = createAsyncThunk(
  'consultation/getAppoinment',
  async ({url, token}, {rejectWithValue}) => {
    // console.log(url,token, 'Appoinment1 ,,,response ');
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log('Appoinment1 ,,,response ',config);

      const response = await axios.request(config);
      //  console.log(response.data, 'Appoinment1 ,,,response ');

      if (response?.data?.status == 200) {
        // console.log(response.data, 'response.data Sandeep dfgmkdflgkdflg');
        return response?.data?.data;
      }
    } catch (error) {
      console.log('Liked Product List error ', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);
export const signupAsFranchiseApi = createAsyncThunk(
  'consultation/signupAsFranchiseApi',
  async ({formUserData, url, token,navigation}, {rejectWithValue}) => {
    console.log('consultation/signupAsFranchiseApi', formUserData, url, token);

    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },

        data: formUserData,
      };
    // return 
      const response = await axios.request(config);
      console.log(response.data, 'signupAsFranchiseApi');

      if (response.data.status == 200) {
        Toast.show(response?.data?.msg);
        navigation.replace('Home');
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }
    } catch (error) {
      console.log('errro', error);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const consultationSlice = createSlice({
  name: 'consultation',
  initialState: {
    ConsultationList: [],
    ConsultationDetail: [],
    Appoinment1: [],
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
      .addCase(getCosultationListApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCosultationListApi.fulfilled, (state, action) => {
        state.loading = false;
        state.ConsultationList = action.payload;
      })
      .addCase(getCosultationListApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(consultationDetail1.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(consultationDetail1.fulfilled, (state, action) => {
        state.loading = false;
        state.ConsultationDetail = action.payload;
      })
      .addCase(consultationDetail1.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAppoinment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAppoinment.fulfilled, (state, action) => {
        state.loading = false;
        state.Appoinment1 = action.payload;
      })
      .addCase(getAppoinment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupAsFranchiseApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsFranchiseApi.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupAsFranchiseApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError} = consultationSlice.actions;

export default consultationSlice.reducer;
