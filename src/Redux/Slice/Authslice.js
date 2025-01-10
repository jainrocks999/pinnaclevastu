import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constant/constants';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({mobile, navigation, url, route}, {rejectWithValue}) => {
    let data = {
      phone_no: mobile,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constants.mainUrl}${url}`,
      headers: {
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);
      console.log('response data', response.data);

      if (response.data.status == 200) {
        // const responseDataString = JSON.stringify(response.data);

        // AsyncStorage.setItem('user_data', responseDataString);

        // AsyncStorage.setItem('user_type', response.data.user_type);
        // AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
        // AsyncStorage.setItem('Token', response.data.token);

        Toast.show(response.data.msg);

        if (navigation) {
          if (route?.params?.from && route?.params.from == 'MyCart') {
            navigation.replace('OTP', {
              data: response.data,
              item: mobile,
              from: 'MyCart',
            });
          } else if (
            route?.params?.from &&
            route?.params.from == 'CourseDetails'
          ) {
            navigation.replace('OTP', {
              data: response.data,
              item: mobile,
              from: 'CourseDetails',
            });
          } else {
            navigation.replace('OTP', {data: response.data, item: mobile});
          }
        }
        console.log(response.data, 'asdkoasjkdsadjo');
        return response.data;
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({formUserData, url, navigation}, {rejectWithValue}) => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },

        data: formUserData,
      };
      console.log('shkshfskdfhsdf', config);

      const response = await axios.request(config);
      // console.log('sfkjlsglksgsgs', response);

      if (response.data.status == 200) {
        const responseDataString = JSON.stringify(response.data);

        AsyncStorage.setItem('user_data', responseDataString);

        AsyncStorage.setItem('user_type', response.data.user_type);
        AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
        AsyncStorage.setItem('Token', response.data.token);
        navigation.navigate('Home');

        return response.data;
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getUserDetailApi = createAsyncThunk(
  'auth/getUserDetail',
  async ({token, url}, {rejectWithValue}) => {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // console.log('shkshfskdfhsdf', config);

      const response = await axios.request(config);
      // console.log('sfkjlsglksgsgs', response.data);

      if (response.data.status == 200) {
        // const responseDataString = JSON.stringify(response.data)
        // console.log(response.data.data, 'userData..........');
        return response.data.data;
      } else {
        Toast.show(response.data.msg);
        console.log('errrorroro', response.data);
        return rejectWithValue(error.response?.data || error.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: [],
    signupUserData: [],
    loginUserData: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearUserData: state => {
      state.userData = [];
    },
    clearloginUserData: state => {
      state.loginUserData = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log('thissisisisi', action.payload);

        state.loginUserData = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(signupUser.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.signupUserData = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserDetailApi.pending, state => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getUserDetailApi.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserDetailApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError, clearUserData, clearloginUserData} =
  authSlice.actions;

export default authSlice.reducer;
