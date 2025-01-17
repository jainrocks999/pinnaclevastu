import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import constant from '../constant/constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Banner = createAsyncThunk(
  'home/Banner',
  async ({url}, {rejectWithValue}) => {
    console.log('homesclider..', url);

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
      console.log('banner error ', error);
      Toast.show(error.message);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const DrawerApi = createAsyncThunk(
  'home/DrawerApi',
  async ({url}, {rejectWithValue}) => {
    console.log('DrawerApi..', url);

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
      console.log('Service error ', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);
export const Remedie = createAsyncThunk(
  'home/Remedie',
  async ({url}, {rejectWithValue}) => {
    console.log('Remedies', url);

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
      console.log('banner error dfsfsd ', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const RemediesCategory = createAsyncThunk(
  'home/RemediesCategory',
  async ({url, category_id}, {rejectWithValue}) => {
    console.log('Remedies category', url, category_id);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?category_id=${category_id}`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log('categoriyes response ', response.data);

      if (response?.data?.status == 200) {
        return response?.data;
        // navigation.reset({
        //   index: 0,
        //   routes: [
        //     {
        //       name: 'Home1',
        //       state: {
        //         routes: [
        //           {
        //             name: 'Remedie12',
        //             state: {
        //               routes: [
        //                 {name: 'ProductList', params: {name1: name, id: id}},
        //               ],
        //             },
        //           },
        //         ],
        //       },
        //     },
        //   ],
        // });

        // navigation.navigate('Home1', {
        //   screen: 'Remedie12',
        //   params: {screen: 'ProductList',params: {name1: name, id: id}},
        // });
        // navigation.navigate('Home1', {
        //   screen: 'Remedie12',
        //   params: {
        //     screen: 'ProductList',
        //     params: { name1:name, id:id },
        //   },
        // })
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('banner error category hnfhdf', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const productDetail1 = createAsyncThunk(
  'home/productDetail1',
  async ({url, product_id, navigation}, {rejectWithValue}) => {
    console.log('Remedies detail00', url, product_id);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?product_id=${product_id}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        console.log('response data remedies detail ', response.data);
        // navigation.navigate('ProductDetail');
        return response?.data;
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

export const CourceLis = createAsyncThunk(
  'home/CourceLis',
  async ({url, slug}, {rejectWithValue}) => {
    console.log('Coureseedfgdfgfgh ', url, slug);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?slug=${slug}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        return response?.data?.data;
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

export const CourceDetailApi = createAsyncThunk(
  'home/CourceDetailApi',
  async ({url, course_id, navigation, isLiveCourse}, {rejectWithValue}) => {
    console.log('CCourceDetailApih ', url, course_id);

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}?course_id=${course_id}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        navigation.navigate('CourseDetail', {coursetype: isLiveCourse});
        return response?.data?.data;
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

export const likedProductListApi = createAsyncThunk(
  'home/likedProducts',
  async ({url}, {rejectWithValue}) => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      // console.log(response.data, 'sandeep df,sdfsl;df');

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

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    HomeBanner: [],
    Remedi: [],
    RemeiesCat: [],
    RemeiesDetail: [],
    Drawerdata: [],
    Cource: [],
    CourceDetailA: [],
    likeProductList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearRemedis: (state, action) => {
      state.RemeiesCat = [];
    },
    clearRemeiesDetail1: (state, action) => {
      state.RemeiesDetail = [];
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

      .addCase(DrawerApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DrawerApi.fulfilled, (state, action) => {
        state.loading = false;
        state.Drawerdata = action.payload;
      })
      .addCase(DrawerApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(Remedie.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Remedie.fulfilled, (state, action) => {
        state.loading = false;
        state.Remedi = action.payload;
      })
      .addCase(Remedie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(RemediesCategory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemediesCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.RemeiesCat = action.payload;
      })
      .addCase(RemediesCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(productDetail1.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(productDetail1.fulfilled, (state, action) => {
        state.loading = false;
        state.RemeiesDetail = action.payload;
      })
      .addCase(productDetail1.rejected, (state, action) => {
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

      .addCase(CourceDetailApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CourceDetailApi.fulfilled, (state, action) => {
        state.loading = false;
        state.CourceDetailA = action.payload;
      })
      .addCase(CourceDetailApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likedProductListApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likedProductListApi.fulfilled, (state, action) => {
        state.loading = false;
        state.likeProductList = action.payload;
      })
      .addCase(likedProductListApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {clearError, clearRemedis, clearRemeiesDetail1} =
  homeSlice.actions;

export default homeSlice.reducer;
