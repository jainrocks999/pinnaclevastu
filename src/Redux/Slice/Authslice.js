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
        const responseDataString = JSON.stringify(response.data);

        AsyncStorage.setItem('user_data', responseDataString);

        AsyncStorage.setItem('user_type', response.data.user_type);
        AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
        AsyncStorage.setItem('Token', response.data.token);
        Toast.show(response.data.msg);
        if (route?.params?.from && route?.params.from == 'MyCart'){
          navigation.replace('OTP', {data: response.data, item: mobile,from: 'MyCart'});
        }else{
          navigation.replace('OTP', {data: response.data, item: mobile});
        }
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
  async (
    {formData, gender, date, time, selectedImage, url,navigation},
    {rejectWithValue},
  ) => {
     console.log(formData, gender, date, time, selectedImage);
    data = {
      name: formData.name,
      email: formData.email,
      phone: formData.mobile,
      city_pincode:formData.cityPincode,
       dob:date,
      time_of_birth:time,
      place_of_birth:formData.birthPlace,
      gender:gender,
      avatar:selectedImage
    };


    console.log('asdadsdaa',data)
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constants.mainUrl}${url}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
console.log('shkshfskdfhsdf',data,config)

    try {
      const response = await axios.request(config);
      console.log('sfkjlsglksgsgs',response);
      
      // if (response.data.status == 200) {
      //   console.log(response.data);
      //   Toast.show(response.data.msg);
      //   navigation.navigate('OTP');
      //   return response.data;
      // }



      if (response.data.status == 200) {
        const responseDataString = JSON.stringify(response.data);

        AsyncStorage.setItem('user_data', responseDataString);

        AsyncStorage.setItem('user_type', response.data.user_type);
        AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id));
        AsyncStorage.setItem('Token', response.data.token);
        navigation.navigate('Home')
        // Toast.show(response.data.msg);
        // if (route?.params?.from && route?.params.from == 'MyCart'){
        //   navigation.replace('OTP', {data: response.data, item: mobile,from: 'MyCart'});
        // }else{
        //   navigation.replace('OTP', {data: response.data, item: mobile});
        // }
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: [],
    signupUserData: [],
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
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
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
      });
  },
});

export const {clearError} = authSlice.actions;

export default authSlice.reducer;