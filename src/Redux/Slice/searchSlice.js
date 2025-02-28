import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { searchProducts } from "../../common/queries";
import { MAIN_URL, ACCESS_TOKEN, BASE_URL } from "../../common/constants";

const initialState = {
    products: [],
    isLoading: false,
    totalCount: '',
    endCursor: '',
};

export const searchSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {
        LOADING: (state) => {
            state.isLoading = true;
        },
        SUCCESS: (state, action) => {
            state.isLoading = false;
            state.products = action.payload.products;
            state.totalCount = action.payload.totalCount
            state.endCursor = action.payload.endCursor
        },
        FAILED: (state, action) => {
            state.error = action.payload.error;
            state.isLoading = false;
        },

        // SEARCH_FOR_REQUEST: () => {
        //     state.isLoading = true;
        // },
        // SEARCH_FOR_SUCCESS: () => {
        //     state.isLoading = false;
        //     state.totalProduct = action.payload.products;
        //     state.totalProductCount = action.payload.totalCount
        //     state.totalCursor = action.payload.endCursor
        // },
        // SEARCH_FOR_FAILED: () => {
        //     state.isLoading = false;

        // },
        InitSearch: () => {
            return initialState;
        },

    },
});
export const {
    LOADING,
    SUCCESS,
    FAILED,
    InitSearch,
} = searchSlice.actions;

export default searchSlice.reducer;


// export const searchResultFor = (char) => {

//     return async (dispatch) => {
//         try {
//             dispatch(SEARCH_FOR_REQUEST());

//             let data = JSON.stringify({
//                 "query": searchProducts,
//                 "variables": {
//                     "query": char,
//                     "first": 20,
//                     "after": null
//                 }
//             });
//             let config = {
//                 method: 'post',
//                 maxBodyLength: Infinity,
//                 url: `${BASE_URL}graphql.json`,
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
//                 },
//                 data: data
//             };

//             axios.request(config)
//                 .then((response) => {
//                     console.log('this isirespo', response.data.data);
//                     dispatch(
//                         SEARCH_FOR_SUCCESS({
//                             products: response.data.data.search.edges,
//                             totalCount: response.data.data.search.totalCount,
//                             endCursor: response.data.data.search.pageInfo.endCursor
//                         })
//                     );
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         } catch (e) {
//             console.log("collection.catch11", e);
//             dispatch(SEARCH_FOR_FAILED({ error: e.massage }));
//         }
//     };
// };

export const searchResult = (char) => {

    return async (dispatch) => {
        try {
            dispatch(LOADING());
            console.log('this is lasr call ', char);
            let data = JSON.stringify({
                "query": searchProducts,
                "variables": {
                    "query": char,
                    "first": 10,
                    "after": null
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${BASE_URL}graphql.json`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log('this is response data', response.data);
                    dispatch(
                        SUCCESS({
                            products: response.data.data.search.edges,
                            totalCount: response.data.data.search.totalCount,
                            endCursor: response.data.data.search.pageInfo.endCursor
                        })
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log("collection.catch11", e);
            dispatch(FAILED({ error: e.massage }));
        }
    };
};


export const searchResultLoadMore = (char, after, products) => {
    return async (dispatch) => {
        try {
            dispatch(LOADING());
            let data = JSON.stringify({
                "query": searchProducts,
                "variables": {
                    "query": char,
                    "first": 10,
                    "after": after
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${BASE_URL}graphql.json`,
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log('response datattatt',response.data);
                    
                    let newresponse = response.data.data.search.edges
                    if (response.data.data.search.pageInfo.hasNextPage) {
                        let finalResponse = [...products, ...newresponse]
                        dispatch(
                            SUCCESS({
                                products: finalResponse,
                                totalCount: response.data.data.search.totalCount,
                                endCursor: response.data.data.search.pageInfo.endCursor
                            })
                        );
                    }
                    else {

                        dispatch(
                            SUCCESS({
                                products: products,
                                totalCount: response.data.data.search.totalCount,
                                endCursor: response.data.data.search.pageInfo.endCursor
                            })
                        );
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (e) {
            console.log("collection.catch11", e);
            dispatch(FAILED({ error: e.massage }));
        }
    };
};

















