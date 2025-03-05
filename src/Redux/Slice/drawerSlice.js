import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { getThemdata } from "../../models/them";
import { fetchMenuFromGql } from "../../models/Menu";

const initialState = {
  Data: {},
  isLoading: false,
  error: "",
  banners: [],
};

export const drawerSlice = createSlice({
  name: "Drawer",
  initialState,
  reducers: {
    SUCCESS: (state, action) => {
      state.Data = action.payload;
    },
    LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    FAILED: (state, action) => {
      state.error = action.payload;
    },
    SUCCESS_BANNER: (state, action) => {
      state.banners = action.payload;
      state.isLoading = false;
    },
  },
});
export const { SUCCESS, LOADING, FAILED, SUCCESS_BANNER } = drawerSlice.actions;

export default drawerSlice.reducer;
export const getDrawerData = () => async (dispatch) => {
  // console.log("Fetching drawer data...");

  try {
    dispatch(LOADING());

    // Dono API calls ek saath execute
    const [sidebarMenu, sidebarMenuLinks] = await Promise.all([
      fetchMenuFromGql("sidebar-menu"),
      fetchMenuFromGql("sidebar-menu-links"),
    ]);

    const combinedData = {
      sidebarMenu: sidebarMenu?.items || [],
      sidebarMenuLinks: sidebarMenuLinks?.items || [],
    };

    // console.log("Drawer response:", combinedData);
    dispatch(SUCCESS(combinedData));
  } catch (error) {
    console.log("Error fetching drawer data:", error);
    dispatch(FAILED(error.message));
  }
};
const extractImagePickerBlocks = (json) => {
  const result = [];

  try {
    const data = JSON.parse(json.asset.value);
    if (data.sections) {
      Object.values(data.sections).forEach((section) => {
        if (section.blocks) {
          for (const [key, block] of Object.entries(section.blocks)) {
            if (key.startsWith("image_picker")) {
              if (block.settings?.menuImage && !block?.disabled) {
                block.settings.menuImage = block.settings.menuImage.replace(
                  "shopify://shop_images/",
                  "https://cdn.shopify.com/s/files/1/0598/8158/6848/files/"
                );

                result.push({ ...block?.settings });
              }
            }
            if (block.type == "desktop-menu-collection") {
            }
          }
        }
      });
    }
  } catch (error) {
    console.error("Error parsing JSON or extracting data:", error.message);
  }

  return result;
};
const getDrawerBanners = () => {
  return async (dispatch) => {
    try {
      dispatch(LOADING());
      const response = await getThemdata(
        "asset[key]=sections/header-group.json"
      );
      const result = extractImagePickerBlocks(response);

      dispatch(SUCCESS_BANNER(result));
    } catch (err) {
      console.log("this is error from drawe banner slice", err);
      dispatch(settingJsonCall());
    }
  };
};

export const settingJsonCall = () => {
  return async (dispatch) => {
    try {
      const json = require("../../components/Home/json/drawerbanner.json");
      const result = extractImagePickerBlocks(json);
      dispatch(SUCCESS_BANNER(result));
    } catch (error) {
      dispatch(FAILED());
    } finally {
    }
  };
};
