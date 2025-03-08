import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constant/constants';
import {getUserDetails} from './loginSlice';
import {updateCustomerMetafields} from '../Api';
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
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };

    try {
      const response = await axios.request(config);

      if (response.data.status == 200) {
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
          } else if (route?.params?.from && route?.params.from == 'profile') {
            navigation.replace('OTP', {
              data: response.data,
              item: mobile,
              from: 'profile',
            });
          } else {
            navigation.replace('OTP', {data: response.data, item: mobile});
          }
        }
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

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (
    {formUserData, url, navigation, data, route},
    {dispatch, rejectWithValue},
  ) => {
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
      const response = await axios.request(config);

      console.log('response ,datat', response.data, data);

      if (response.data.status == 200) {
        const responseDataString = JSON.stringify(response.data);

        AsyncStorage.setItem('user_data', responseDataString);
        AsyncStorage.setItem('user_type', response.data.user_type);
        AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
        AsyncStorage.setItem('Token', response.data.token);

        let customerId = response?.data?.shopify_register_response?.id;
        const metafields = [
          {  namespace: "custom",
            key: 'gender',
            type: 'list.single_line_text_field',
            value: [data?.gender],
          },
          {  namespace: "custom",
            key: 'current_city_pincode',
            type: 'single_line_text_field',
            value: data.pincode,
          },

          {  namespace: "custom",
            key: 'place_of_birth',
            type: 'single_line_text_field',
            value: data?.palceofbirth,
          },
          {  namespace: "custom",
            key: 'mobile_number',
            type: 'single_line_text_field',
            value: data.mobile,
          },
          {  namespace: "custom",
            key: 'full_name',
            type: 'single_line_text_field',
            value: data.name,
          },
          {  namespace: "custom",
            key: 'email',
            type: 'single_line_text_field',
            value: data.email   ,
          },

          {  namespace: "custom", key: 'birth_time', type: 'date_time', value: data.birthtime},
          {  namespace: "custom",key: 'birth_date', type: 'date', value: data.birthdate},
          {  namespace: "facts",key: 'birth_date', type: 'date', value: data.birthdate},
        ];

        await updateCustomerMetafields(customerId, metafields);

                if (route?.params?.from == 'profile') {

        await dispatch(getUserDetails(response?.data?.shopify_access_token));

                  await dispatch(
                    getUserDetailApi({
                      token: response.data.token,
                      url: `profile-list?user_id=${response.data.user_id}`,
                    }),
                  );
                  navigation.pop();
                  navigation.pop();
                  navigation.replace('profile');
                } else if (route?.params?.from == 'CourseDetails') {
                  await dispatch(getUserDetails(response?.data?.shopify_access_token));
                  await dispatch(
                    getUserDetailApi({
                      token: response.data.token,
                      url: `profile-list?user_id=${response.data.user_id}`,
                    }),
                  );
                  navigation.pop();
                  navigation.pop();
                  navigation.replace('CourseDetail');
                } else {
                  navigation.navigate('Home');
                }

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
      const response = await axios.request(config);
      if (response.data.status == 200) {
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

export const updateApi = createAsyncThunk(
  'auth/updateApi',
  async (
    {formUserData, url, navigation, token, userid},
    {rejectWithValue, dispatch},
  ) => {
    try {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },

        data: formUserData,
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        await dispatch(
          getUserDetailApi({
            token: token,
            url: `profile-list?user_id=${userid}`,
          }),
        );
        navigation.goBack();
        return response.data;
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: [],
    signupUserData: [],
    loginUserData: [],
    updatedata: {},
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
      })
      .addCase(updateApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApi.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedata = action.payload;
      })
      .addCase(updateApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {clearError, clearUserData, clearloginUserData} =
  authSlice.actions;

export default authSlice.reducer;
