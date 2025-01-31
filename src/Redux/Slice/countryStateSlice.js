import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_PSW, COUNTRIES_URL } from "../../common/constants";

const initialState = {
  isLoading: false,
  error: "",
  countryStateList: [],
};

export const countryStateSlice = createSlice({
  name: "countryList",
  initialState: initialState,
  reducers: {
    GET_COUNTRY_LOADING: (state) => {
      state.isLoading = true;
    },
    GET_COUNTRY_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.countryStateList = action.payload;
    },
    GET_COUNTRY_FAILED: (state) => {
      state.isLoading = false;
    },
  },
});
export const { GET_COUNTRY_LOADING, GET_COUNTRY_SUCCESS, GET_COUNTRY_FAILED } =
  countryStateSlice.actions;

export default countryStateSlice.reducer;

export const getCountryStateList = () => {
  return (dispatch) => {
    dispatch(GET_COUNTRY_LOADING());
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: COUNTRIES_URL,
        headers: {
          "X-Shopify-Access-Token": API_PSW,
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log("this is user response", response.data);
          if (response) {
            dispatch(GET_COUNTRY_SUCCESS(response.data));
          } else {
            console.log("something went wrong1");
            dispatch(GET_COUNTRY_FAILED());
          }
        })
        .catch((error) => {
          console.log(error);
          console.log("something went wrong12");
          dispatch(GET_COUNTRY_FAILED());
        });
    } catch (error) {
      console.log("something went wrong13");
      dispatch(GET_COUNTRY_FAILED());
    }
  };
};
