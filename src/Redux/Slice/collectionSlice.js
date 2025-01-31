import {createSlice} from '@reduxjs/toolkit';
import axios, {Axios} from 'axios';
// import {
//     API_PSW,
//     FILTER_URL,
//     MAIN_URL,
//     SEARCH_URL,
//     WIZZY_API,
//     WIZZY_API_KEY,
//     WIZZY_STORE_ID,
//     WIZZY_X_STORE_SECRET,
// } from "../../common/constants";
//import {getImageByGid} from '../../models/getMediaImagenbyGid';
import {ACCESSTOKEN, SHOPIFY_CLIENT} from '../../common/shopifyClient';
import {ACCESS_TOKEN, API_PSW, MAIN_URL} from '../../common/constants';
import {convertCollectionId} from './../../common/shopifyConverter';
import {
  GraphQlConfig,
  categoryList,
  getProducts,
  getProductsCount,
} from '../../common/queries';
import Toast from 'react-native-simple-toast';


const initialState = {
  products: [],
  CategoryList:[],
  collectionId: '',
  collectionTitle: '',
  isLoading: false,
  collectionSize: '',
  filters: [],
  endCursor: {},
  collectionBanner: [],
  countData: {},
  // graphModelProducts: [],
  // hasNextPage: false,
  // isRefresh: false,
  // isPaginationLoading: false,
  // error: "",
  // pageNo: "",
  // total_product: "",
  // sortTypeName: "1",
  // topBannerCollectionData: [],
  // starterImage: null,
  // topBannercategoryName: "",
  // isSubLoading: false,
  // filterData: [],
  // filterApplied: "",
  // isEnd: false,
  // filterAppliedList: "",
  // isFilterNull: "",
  // isSearchOption: false,
  // sortSelectedType: "",
  // isGridLoading: false,
  // collectionName: ''
};

export const CollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    LOADING: state => {
      state.isLoading = true;
    },
    SUCCESS: (state, action) => {
      state.isLoading = false;
      state.CategoryList=action.payload.CategoryList;
      state.products = action.payload.products;
      state.collectionId = action.payload.collectionId;
      state.collectionSize = action.payload.collectionSize;
      state.collectionTitle = action.payload.collectionTitle;
      state.filters = action.payload.filters;
      state.endCursor = action.payload.endCursor;
      state.error = action.payload.error;
      state.countData = action.payload.countData;
    },
    FAILED: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    INITIAL: () => {
      return initialState;
    },
    GET_FILTER_SUCCESS: (state, action) => {
      state.filterData = action.payload.filterData;
      console.log('this is called and updaatee the data', action.payload);
    },
    GET_COLLECTION_LOADING: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    GET_BANNER_LOADING: (state, action) => {
      state.isLoading = true;
    },
    GET_BANNER_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.collectionBanner = action.payload;
    },
    GET_BANNER_ERROR: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  LOADING,
  SUCCESS,
  FAILED,
  INITIAL,
  GET_FILTER_SUCCESS,
  GET_COLLECTION_LOADING,
  GET_BANNER_LOADING,
  GET_BANNER_SUCCESS,
  GET_BANNER_ERROR,
} = CollectionSlice.actions;

export default CollectionSlice.reducer;

export const initCollection = () => {
  return dispatch => {
    dispatch(INITIAL());
  };
};
export const GetSortOrder = async (collectionHandle, collectionsort) => {
  console.log('GetSortOrder', collectionHandle, collectionsort);
  var sortOrderField = 'product_' + collectionHandle + '_sortOrder:float';
  var sortOrder = 'asc';
  if (collectionsort === 'best-selling') {
    sortOrderField = 'product_wizzy-best-selling_sortOrder:float';
    sortOrder = 'asc';
  }
  if (collectionsort === 'title-ascending') {
    sortOrderField = 'name';
    sortOrder = 'asc';
  }
  if (collectionsort === 'title-descending') {
    sortOrderField = 'name';
    sortOrder = 'desc';
  }
  if (collectionsort === 'price-ascending') {
    sortOrderField = 'sellingPrice';
    sortOrder = 'asc';
  }
  if (collectionsort === 'price-descending') {
    sortOrderField = 'sellingPrice';
    sortOrder = 'desc';
  }
  if (collectionsort === 'created-ascending') {
    sortOrderField = 'createdAt';
    sortOrder = 'asc';
  }
  if (collectionsort === 'created-descending') {
    sortOrderField = 'createdAt';
    sortOrder = 'desc';
  }
  return [
    // {
    //   field: "relevance",
    //   order: "asc",
    // },
    {
      field: sortOrderField,
      order: sortOrder,
    },
  ];
};

export const fetchCategory =(

) => {
  return async dispatch => {
    try {
      dispatch(LOADING());
    
     
      let data = JSON.stringify({
        query: categoryList,
      
      });
      return axios
        .request(GraphQlConfig(data))
        .then(response => {  
          dispatch(
            SUCCESS({
              CategoryList:response?.data?.data?.collections?.nodes
            }),
          );
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    } catch (e) {
      console.log('collection.catch2', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};




export const fetchCollection = (
  collectionId,
  // CollectionTitle,
  // collectionSize,
) => {
  return async dispatch => {
    try {
      dispatch(LOADING());
     console.log('collectionId',collectionId);
     
      let data = JSON.stringify({
        query: getProducts,
        variables: {
          id:collectionId,
          // id: convertCollectionId(collectionId),
          first: 10,
          after: null,
        },
      });
      return axios
        .request(GraphQlConfig(data))
        .then(response => {
        
          
          dispatch(
            SUCCESS({
              
               products: response?.data?.data?.collection?.products?.edges,
               filters: response?.data?.data?.collection?.products?.filters,
               endCursor: response?.data?.data?.collection?.products?.pageInfo,
                collectionId: collectionId,
              //  collectionSize: collectionSize,
              // collectionTitle: CollectionTitle,
            }),
          );
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    } catch (e) {
      console.log('collection.catch2', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};

export const fetchCollectionUrl = collectionUrl => {
  return async dispatch => {
    try {
      dispatch(LOADING());
      var config = {
        method: 'get',
        url: `${collectionUrl}.json`,
        // data: data,
        headers: {},
      };
      await axios(config)
        .then(function (response) {
          console.log('fetchCollection', response.data);
          let collectionId = response?.data?.collection?.id;
          let collectionTitle = response.data.collection.title;
          let collectionSize = response.data.collection.products_count;

          dispatch(initCollection());
          dispatch(
            fetchCollection(collectionId, collectionTitle, collectionSize),
          );
          dispatch(getCollectionBanner(collectionId));
        })
        .catch(error => {
          console.log(error);
          dispatch(FAILED({error: error.massage}));
        });
    } catch (e) {
      console.log('collection.catch11', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};

export const fetchCollectionById = collectionId => {
  return async dispatch => {
    try {
      dispatch(LOADING());
      let Sortconfig = {
        method: 'get',
        url: `${MAIN_URL}/collections/${collectionId}.json`,
        headers: {
          'X-Shopify-Access-Token': ACCESSTOKEN,
        },
      };
      axios
        .request(Sortconfig)
        .then(async response => {
          console.log(
            'response data from now  titll',
            JSON.stringify(response.data),
          );

          let collectionId = response?.data?.collection?.id;
          let collectionTitle = response.data.collection.title;
          let collectionSize = response.data.collection.products_count;

          dispatch(initCollection());
          dispatch(
            fetchCollection(collectionId, collectionTitle, collectionSize),
          );
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log('collection.catch2', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};

export const fetchCollectionSortBy = (
  collectionId,
  CollectionTitle,
  collectionSize,
  data,
) => {
  return async dispatch => {
    try {
      dispatch(LOADING());
      return axios
        .request(GraphQlConfig(data))
        .then(response => {
          console.log('this is response', JSON.stringify(response));
          dispatch(
            SUCCESS({
              products: response?.data?.data?.collection?.products?.edges,
              filters: response?.data?.data?.collection?.products?.filters,
              endCursor: response?.data?.data?.collection?.products?.pageInfo,
              collectionId: collectionId,
              collectionSize: collectionSize,
              collectionTitle: CollectionTitle,
            }),
          );
        })
        .catch(error => {
          console.log(error);
          reject(error);
          dispatch(FAILED({error: error.massage}));
        });
    } catch (e) {
      console.log('collection.catch2', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};

export const fetchCollectionApplyFilter = (
  collectionId,
  CollectionTitle,
  collectionSize,
  data,
  variables,
) => {
  return async dispatch => {
    try {
      dispatch(LOADING());
      return axios
        .request(GraphQlConfig(data))
        .then(async response => {
          // console.log(
          //   'this is appiled fileter++++++++++++++',
          //   JSON.stringify(response),
          // );
          const endCursor =
            response?.data?.data?.collection?.products?.pageInfo?.endCursor;
          const countData = await fetchCountAfterFiltFilter(
            variables,
            endCursor,
          );

          dispatch(
            SUCCESS({
              products: response?.data?.data?.collection?.products?.edges,
              filters: response?.data?.data?.collection?.products?.filters,
              endCursor: response?.data?.data?.collection?.products?.pageInfo,
              collectionId: collectionId,
              collectionSize: collectionSize,
              collectionTitle: CollectionTitle,
              countData: countData,
            }),
          );
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    } catch (e) {
      console.log('collection.catch2', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};

export const fetchCountAfterFiltFilter = async (variables, cursor) => {
  console.log(JSON.stringify(variables), cursor);
  try {
    const data = JSON.stringify({
      query: getProductsCount,
      variables: {...variables, first: 250},
    });
    const response = await axios.request(GraphQlConfig(data));
    const productsData = response?.data?.data?.collection?.products;
    if (productsData) {
      let cursor = productsData.pageInfo.endCursor;
      let hasNextPage = productsData.pageInfo.hasNextPage;
      let totalCount = productsData.edges.length;
      return {
        cursor,
        hasNextPage,
        totalCount,
      };
    } else {
      console.log(
        'error in get apply filter coiunt',
        JSON.stringify(response.data),
      );
      return {
        cursor: null,
        hasNextPage: null,
        totalCount: null,
      };
    }
  } catch (error) {
    console.log('error in get apply filter coiunt', error);
    return {
      cursor: null,
      hasNextPage: null,
      totalCount: null,
    };
  }
};

export const fetchCollectionLoadMore = (
  collectionId,
  CollectionTitle,
  collectionSize,
  data,
  products,
  hasNext,
  countData,
) => {
  return async dispatch => {
    try {
      dispatch(LOADING());
      return axios
        .request(GraphQlConfig(data))
        .then(response => {
          let newresponse = response?.data?.data?.collection?.products?.edges;
          let finalResponse = [...products, ...newresponse];
          if (hasNext) {
            dispatch(
              SUCCESS({
                products: finalResponse,
                filters: response?.data?.data?.collection?.products?.filters,
                endCursor: response?.data?.data?.collection?.products?.pageInfo,
                collectionId: collectionId,
                collectionSize: collectionSize,
                collectionTitle: CollectionTitle,
                countData,
              }),
            );
          } else {
            dispatch(
              SUCCESS({
                products: products,
                filters: response?.data?.data?.collection?.products?.filters,
                endCursor: response?.data?.data?.collection?.products?.pageInfo,
                collectionId: collectionId,
                collectionSize: collectionSize,
                collectionTitle: CollectionTitle,
                countData,
              }),
            );
            Toast.show('No More Proucts Found!');
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    } catch (e) {
      console.log('collection.catch2', e);
      dispatch(FAILED({error: e.massage}));
    }
  };
};

export const getCollectionBanner = id => {
  return async dispatch => {
    try {
      dispatch(GET_BANNER_LOADING());

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${MAIN_URL}collections/${id}/metafields.json?limit=250`,
        headers: {
          'X-Shopify-Access-Token': API_PSW,
        },
      };

      const response = await axios.request(config);
      const metafields = response.data?.metafields;
      const bannerPromises = metafields
        .filter(item => item.key === 'plpbanner')
        .flatMap(item => {
          const value = JSON.parse(item.value);
          return;
          // return value.map(bannerItem => getImageByGid(bannerItem));
        });
      const banners = (await Promise.all(bannerPromises)).filter(Boolean);
      dispatch(dispatch(GET_BANNER_SUCCESS(banners)));
    } catch (error) {
      console.error('Error fetching banner:', error);
      dispatch(dispatch(GET_BANNER_ERROR(banners)));
    }
  };
};
