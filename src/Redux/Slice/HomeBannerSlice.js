import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ACCESS_TOKEN,
  Authentication,
  FILTER_URL,
  MAIN_URL,
  SEARCH_URL,
  SETTING_URL,
} from '../../common/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DATABASE} from '../../Database';
import {
  convertProductId,
  convertVariantId,
} from '../../common/shopifyConverter';
import {getThemdata} from '../../models/them';
import {ACCESSTOKEN} from '../../common/shopifyClient';
import {getProductMetafieldsApiCall} from '../services/ApiService';
import {getSimilerProducts} from '../../models/getSimilerProduct';
// import {GetExtraData, GraphQlConfig} from '../../common/queries';
import {GetExtraData, GraphQlConfig} from '../../common/queries';
import Config from '../../common/config.json';
// import { processProducts } from "./CollectionSlice";

const initialState = {
  isLoading: true,
  isExtraDataLoading: false,
  error: '',
  // slider1: [],
  // slider2: [],
  // slider3: [],
  // slider4: [],
  // slider5: [],
  // slider6: [],
  // videoUrl: '',
  // Testimonials: [],
  // OnTheGram: [],
  // returnSearchResult: '',
  // section_heading: [],
  // colorTrends: [],
  // colorTrendsLoading: false,
  // subCollectionList: [],
  // collectionTab: [],
  // slider11: [],
  // videoWithContent: [],

  image_banner: [],
  image_banner2: [],
  our_services: [],
  premium_services: [],
  custom_testimonial: [],
  how_it_works: [],
  remedies: [],
  core_values: [],
  captured_highlights: [],
  about_pinnacle_vastu: [],
  best_Products_section: [],
  best_Products: [],
  featured_blog_section: [],
  featured_blog: [],
  courses_section: [],
  course: [],
};

export const HomeBannerSlice = createSlice({
  name: 'HomeBanner',
  initialState,
  reducers: {
    LOADING: state => {
      state.isLoading = true;
    },
    SUCCESS: (state, action) => {
      state.isLoading = false;
      state.error = '';
      // state.slider1 = action.payload.slider1;
      // state.slider11 = action.payload.slider11;
      // state.slider2 = action.payload.slider2;
      // state.slider3 = action.payload.slider3;
      // state.slider4 = action.payload.slider4;
      // state.slider5 = action.payload.slider5;
      // state.slider6 = action.payload.slider6;
      // state.videoUrl = action.payload.videoUrl;
      // state.Testimonials = action.payload.Testimonials;
      // state.videoWithContent = action.payload.videoWithContent;
      // state.OnTheGram = action.payload.OnTheGram;
      // state.section_heading = action.payload.section_heading;
      // state.subCollectionList = action.payload.subCollectionList;
      // state.collectionTab = action.payload.collectionTab;

      state.image_banner = action.payload.image_banner;
      state.image_banner2 = action.payload.image_banner2;
      state.our_services = action.payload.our_services;
      state.premium_services = action.payload.premium_services;
      state.custom_testimonial = action.payload.custom_testimonial;
      state.how_it_works = action.payload.how_it_works;
      state.remedies = action.payload.remedies;
      state.core_values = action.payload.core_values;
      state.captured_highlights = action.payload.captured_highlights;
      state.about_pinnacle_vastu = action.payload.about_pinnacle_vastu;
      state.best_Products_section = action.payload.best_Products_section;
      state.featured_blog_section = action.payload.featured_blog_section;
      state.courses_section = action.payload.courses_section;
    },
    FAILED: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    GET_EXTRADATA_LOADING: state => {
      state.isExtraDataLoading = true;
    },
    GET_EXTRADATA_FAILED: (state, action) => {
      state.error = action.payload.error;
      state.isExtraDataLoading = false;
    },
    GET_COURSES_SUCCESS: (state, action) => {
      state.isExtraDataLoading = false;
      state.error = '';
      state.course = action.payload;
    },
    // GET_COURSES_FAILED: (state, action) => {
    //   state.error = action.payload.error;
    //   state.isExtraDataLoading = false;
    // },
    GET_BEST_PROD_SUCCESS: (state, action) => {
      state.isExtraDataLoading = false;
      state.error = '';
      state.best_Products = action.payload;
    },
    // GET_BEST_PROD_LOADING: state => {
    //   state.isLoading = true;
    // },

    GET_SEARCH_SUCCESS: (state, action) => {
      state.error = '';
      state.returnSearchResult = action.payload.returnSearchResult;
    },
    // COLOR_TRENDS_LOADING: (state, action) => {
    //   state.colorTrendsLoading = true;
    // },
    // COLOR_TRENDS_SUCCESS: (state, action) => {
    //   state.colorTrendsLoading = false;
    //   state.colorTrends = action.payload;
    // },
    // COLOR_TRENDS_FAILED: (state, action) => {
    //   state.colorTrendsLoading = false;
    //   state.colorTrends = [];
    // },
  },
});

// Action creators are generated for each case reducer function
export const {
  LOADING,
  SUCCESS,
  FAILED,

  GET_EXTRADATA_LOADING,
  GET_EXTRADATA_FAILED,
  GET_COURSES_SUCCESS,
  GET_BEST_PROD_SUCCESS,
  // GET_COURSES_LOADING,
  // GET_BEST_PROD_LOADING,
  // GET_BEST_PROD_FAILED,

  GET_SEARCH_SUCCESS,
  // COLOR_TRENDS_LOADING,
  // COLOR_TRENDS_SUCCESS,
  // COLOR_TRENDS_FAILED,
} = HomeBannerSlice.actions;

export default HomeBannerSlice.reducer;

export const setHomeBanners = (homeData, isDateUpdate) => {
  // THIS METHOD SET HOME BANNERS DATA ONLY
  return async dispatch => {
    try {
      let image_banner = [];
      let image_banner2 = [];
      let our_services = [];
      let premium_services = [];
      let custom_testimonial = [];
      let how_it_works = [];
      let remedies = [];
      let core_values = [];
      let captured_highlights = [];
      let about_pinnacle_vastu = [];
      let courses_section = [];
      let best_Products_section = [];
      let featured_blog_section = [];

      // let slider1 = [];
      // let slider11 = [];
      // let slider2 = [];
      // let slider3 = [];
      // let slider4 = [];
      // let slider5 = [];
      // let slider6 = [];
      // let videoUrl = '';
      // let Testimonials = [];
      // let OnTheGram = [];
      // let section_heading = [];
      // let subCollectionList = [];
      // let collectionTab = [];
      // let videoWithContent = [];

      homeData.forEach(async element => {
        image_banner = element.image_banner;
        image_banner2 = element.image_banner2;
        our_services = element.our_services;
        premium_services = element.premium_services;
        custom_testimonial = element.custom_testimonial;
        how_it_works = element.how_it_works;
        remedies = element.remedies;
        core_values = element.core_values;
        captured_highlights = element.captured_highlights;
        about_pinnacle_vastu = element.about_pinnacle_vastu;
        best_Products_section = element.best_Products_section;
        courses_section = element.courses_section;
        featured_blog_section = element.featured_blog_section;

        // slider1 = element.slider1;
        // slider11 = element.slider11;
        // slider2 = element.slider2;
        // slider3 = element.slider3;
        // slider4 = element.slider4;
        // slider5 = element.slider5;
        // slider6 = element.slider6;
        // videoUrl = element.videoUrl;
        // Testimonials = element.Testimonials;
        // OnTheGram = element.OnTheGram;
        // section_heading = element.section_heading;
        // subCollectionList = element.subCollectionList;
        // collectionTab = element.collectionTab;
        // videoWithContent = element.videoWithContent;
      });

      dispatch(
        SUCCESS({
          // slider1: slider1,
          // slider11: slider11,
          // slider2: slider2,
          // slider3: slider3,
          // slider4: slider4,
          // slider5: slider5,
          // slider6: slider6,
          // videoUrl: videoUrl,
          // Testimonials: Testimonials,
          // OnTheGram: OnTheGram,
          // section_heading: section_heading,
          // subCollectionList: subCollectionList,
          // collectionTab: collectionTab,
          // videoWithContent: videoWithContent,

          image_banner: image_banner,
          image_banner2: image_banner2,
          our_services: our_services,
          premium_services: premium_services,
          custom_testimonial: custom_testimonial,
          how_it_works: how_it_works,
          remedies: remedies,
          core_values: core_values,
          captured_highlights: captured_highlights, 
          about_pinnacle_vastu: about_pinnacle_vastu,
          best_Products_section: best_Products_section,
          courses_section: courses_section,
          featured_blog_section: featured_blog_section,

          isLoading: false,
          error: '',
        }),
      );

      dispatch(setHomeData(homeData));
    } catch (error) {
      dispatch({
        type: GET_HOME_FAILED,
        payload: {
          error: 'GET_HOME_FAILED',
        },
      });
    }
  };
};

export const homeApiCall = () => {
  return async dispatch => {
    //  console.log("homeApiCall");
    // console.log(`${SETTING_URL}storage/shopify_setting.json`);
    try {
      // let config = {
      //   method: "get",
      //   url: `${SETTING_URL}`,
      //   headers: {
        //     Authorization: `Bearer ${Authentication}`,
        //   },
        // };
        // axios(config)
        //   .then(async (response) => {
          //     // console.log('immmmmmm');
          //     const assetval = JSON.parse(response.data.asset.value);
          //     const currentval = assetval.current.sections;
          //     const getModifiedData = await modifyHomeObject(currentval);
          //     // console.log('homeApiCall---', JSON.stringify(getModifiedData));
          //     dispatch(setHomeBanners(getModifiedData, true));
          //   })
          //   .catch((err) => {
      //     console.error("err13565", err, config);
      //   });
      const data = await getThemdata('asset[key]=templates%2Findex.json');
      
      const formated = JSON.parse(data?.asset?.value);
      // console.log('this is formated data', formated);
      const formateData = await modifyHomeObject(formated?.sections);
      dispatch(setHomeBanners(formateData));
      // console.log('this is formated data', formateData);
    } catch (error) {
      console.error('error', error);
    } finally {
    }
  };
};

// LOCAL FILE DATA SET IN HOME PAGE
export const settingJsonCall = () => {
  return async dispatch => {
    try {
      const json = require('../../components/Home/json/updatedDesign.json');

      const assetval = JSON.parse(json.asset.value);

      const currentval = assetval.sections;
      const getModifiedData = await modifyHomeObject(currentval);

      dispatch(setHomeBanners(getModifiedData));
    } catch (error) {
      dispatch({
        type: GET_HOME_FAILED,
        payload: {
          error: 'GET_HOME_FAILED',
        },
      });
    } finally {
    }
  };
};

const changeTitle = name => {
  return name.toUpperCase();
  //   .replace(/\s+/g, "");
  // return name.trim().replace(regex, "").toLowerCase();
};

export const modifyHomeObject = async currentval => {
  return new Promise(async (resolve, reject) => {
    try {
      // let slider1 = [];
      // let slider11 = [];
      // let slider2 = [];
      // let slider3 = [];
      // let slider4 = [];
      // let slider5 = [];
      // let slider6 = [];
      // let Testimonials = [];
      // let collectionTab = [];
      // let subCollectionList = [];
      // let OnTheGram = [];
      // let slider3MobileImage = '';
      let replaceImage = '';

      // let videoUrl = {};

      let image_banner = [];
      let image_banner2 = [];
      let our_services = [];
      let premium_services = [];
      let custom_testimonial = [];
      let how_it_works = [];
      let remedies = [];
      let core_values = [];
      let captured_highlights = [];
      let about_pinnacle_vastu = [];
      let best_Products_section = [];
      let courses_section = [];
      let featured_blog_section = [];

      for (const key in currentval) {
        if (currentval.hasOwnProperty(key)) {
          const element = currentval[key];
          // console.log(element, '--------element');

          if (
            element.type === 'our-services' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            let updatedData;
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
              updatedData = data?.map(item => {
                const dynamicPart = item.icon?.split('/')?.pop();
                const fileName = dynamicPart?.split('.')[0];

                const newMobileImage = `https://pinnaclevastu-in.myshopify.com/cdn/shop/files/${fileName}.svg`;
                return {
                  ...item,
                  CardImage: newMobileImage,
                };
              });
            });
            our_services = our_services.concat(updatedData);
          }

          if (
            element.type === 'premium-services' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            let updatedData;
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
              updatedData = data?.map(item => {
                const dynamicPart = item.image?.split('/')?.pop();
                const fileName = dynamicPart?.split('.')[0];

                const newMobileImage = `https://pinnaclevastu-in.myshopify.com/cdn/shop/files/${fileName}.png`;
                return {
                  ...item,
                  CardImage: newMobileImage,
                };
              });
            });
            premium_services = premium_services.concat(updatedData);
          }
          if (
            element.type == 'remedies-section' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            let updatedData;
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
              updatedData = data?.map(item => {
                replaceImage = item.mob_card_background.replace(
                  'shopify://shop_images/',
                  'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
                );
                return {
                  ...item,
                  CardImage: replaceImage,
                };
              });
            });
            let replaceBgImage = element.settings?.background_image.replace(
              'shopify://shop_images/',
              'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
            );
            remedies = {
              content: {
                ...element.settings,
                mob_background_image: replaceBgImage,
              },
              cards: [...updatedData],
            };
          }
          if (
            element.type == 'custom-testimonial' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            let updatedData;
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
              updatedData = data?.map(item => {
                replaceImage = item.review_image.replace(
                  'shopify://shop_images/',
                  'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
                );
                return {
                  ...item,
                  mob_review_image: replaceImage,
                };
              });
            });
            let replaceBgImage = element.settings?.background_image.replace(
              'shopify://shop_images/',
              'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
            );
            custom_testimonial = {
              content: {
                ...element.settings,
                mob_background_image: replaceBgImage,
              },
              custom_review: [...updatedData],
            };
          }

          if (element.type == 'slideshow') {
            if (Object.keys(element.blocks)?.length != 0) {
              let data = [];
              let updatedData;
              Object.values(element?.blocks)?.forEach(item => {
                data.push(item?.settings);
                updatedData = data?.map(item => {
                  replaceImage = item.mobile_image.replace(
                    'shopify://shop_images/',
                    'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
                  );
                  return {
                    ...item,
                    silderImage: replaceImage,
                  };
                });
              });

              image_banner.push({
                content: element?.settings,
                slider: updatedData,
              });
            }
          }

          if (
            element.type == 'card_with_icon' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            let updatedData;
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
              updatedData = data?.map(item => {
                replace_icon = item?.icon?.replace(
                  'shopify://shop_images/',
                  'https://pinnaclevastu-in.myshopify.com/cdn/shop/files/',
                );
                replace_icon2 = item?.icon2?.replace(
                  'shopify://shop_images/',
                  'https://pinnaclevastu-in.myshopify.com/cdn/shop/files/',
                );

                return {
                  ...item,
                  cardIcon1: replace_icon,
                  cardIcon2: replace_icon2,
                };
              });
            });
            image_banner2 = updatedData;
          }
          if (
            element.type == 'how-it-works' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            let updatedData;
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
              updatedData = data?.map(item => {
                let replace_image = item?.card_background?.replace(
                  'shopify://shop_images/',
                  'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
                );

                return {
                  ...item,
                  mob_card_background: replace_image,
                };
              });
            });
            how_it_works = {
              content: element.settings,
              cards: updatedData,
            };
          }
          if (
            element.type == 'core-values' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
            });
            let replaceBgImage = element.settings?.image?.replace(
              'shopify://shop_images/',
              'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
            );
            core_values = {
              content: {
                ...element.settings,
                mob_image: replaceBgImage,
              },
              items: data,
            };
          }
          if (
            element.type == 'Captured-Highlights' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = element.blocks;
            let image = [];
            let video = [];
            Object.keys(data).forEach(key => {
              if (key.startsWith('image_')) {
                let replaceImage = data[key]?.settings.photo?.replace(
                  'shopify://shop_images/',
                  'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
                );

                image.push({...data[key].settings, mob_photo: replaceImage});
              } else if (key.startsWith('video_')) {
                video.push(data[key].settings);
              }
            });

            captured_highlights = {
              content: element.settings,
              image,
              video,
            };
          }
          if (
            element.type == 'about-pinnacle-vastu' &&
            Object.keys(element.blocks)?.length > 0
          ) {
            let data = [];
            Object.values(element?.blocks)?.forEach(item => {
              data.push(item?.settings);
            });
            let replaceBgImage = element.settings?.image?.replace(
              'shopify://shop_images/',
              'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
            );
            about_pinnacle_vastu = {
              content: {
                ...element.settings,
                mob_image: replaceBgImage,
              },
              items: data,
            };
          }
          if (element.type == 'courses') {
            courses_section = {
              content: {
                ...element.settings,
              },
            };
          }
          if (element.type == 'featured-collection-2') {
            best_Products_section = {
              content: {
                ...element.settings,
              },
            };
          }
          if (element.type == 'featured-blog') {
            let replaceBgImage = element.settings?.background_image?.replace(
              'shopify://shop_images/',
              'https://cdn.shopify.com/s/files/1/0920/1041/4387/files/',
            );
            featured_blog_section = {
              content: {
                ...element.settings,
                mob_background_image: replaceBgImage,
              },
            };
          }
        }
      }

      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];

      //     if (element.type == 'custom-image-slider' && !element?.disabled) {
      //       if (Object.keys(element.blocks).length != 0) {
      //         homeSlider4Section.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }
      // let homeSlider1Section = [];
      // let homeSlider2Section = [];
      // let homeSlider3Section = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];

      //     if (element.type == 'Image-section') {
      //       if (Object.keys(element.blocks).length != 0 && !element?.disabled) {
      //         if (element?.settings?.['section-position'] == '1') {
      //           homeSlider1Section.push({
      //             data: element.blocks,
      //             settings: element.settings,
      //           });
      //         }

      //         if (element?.settings?.['section-position'] == '2') {
      //           homeSlider2Section.push({
      //             data: element.blocks,
      //             settings: element.settings,
      //           });
      //         }

      //         if (element?.settings?.['section-position'] == '3') {
      //           homeSlider3Section.push({
      //             data: element.blocks,
      //             settings: element.settings,
      //           });
      //         }
      //       }
      //     }
      //   }
      // }

      // let homeSlider4Section = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];

      //     if (element.type == 'custom-image-slider' && !element?.disabled) {
      //       if (Object.keys(element.blocks).length != 0) {
      //         homeSlider4Section.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }

      // let homeSlider1Section1 = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];
      //     //   console.log("this is element htth ", element.type);
      //     if (element.type == 'test' && !element?.disabled) {
      //       if (Object.keys(element.blocks).length != 0) {
      //         homeSlider1Section1.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }

      // let subCollectionlistSection = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];

      //     if (element.type == 'tab-sub-collection-list' && !element?.disabled) {
      //       if (Object.keys(element.blocks).length != 0) {
      //         subCollectionlistSection.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }

      // let collectiontabSection = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];

      //     if (element.type == 'feature-collection-tab' && !element?.disabled) {
      //       if (Object.keys(element.blocks).length != 0) {
      //         collectiontabSection.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }

      // let homeTestimonialsSection = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];
      //     if (
      //       element.type == 'image-with-content-slider2' &&
      //       !element?.disabled
      //     ) {
      //       if (Object.keys(element.blocks).length != 0) {
      //         // console.log('home-sildeshow===>', element.blocks);
      //         homeTestimonialsSection.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }
      // Object.values(homeSlider1Section).forEach(item => {
      //   Object.values(item.data).forEach(item1 => {
      //     if (
      //       typeof item1.settings.mobile__image !== 'undefined' &&
      //       !item?.disabled
      //     ) {
      //       str = item1.settings.mobile__image;
      //       replaceImage = str.replace(
      //         'shopify://shop_images/',
      //         'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
      //       );
      //       let str = replaceImage;
      //       var imageObject = {uri: str};
      //       item1.image = imageObject;
      //       item1.url = item1.settings['collec-link'];
      //       if (!item1.disabled) {
      //         slider1.push(item1);
      //       }
      //     }
      //   });
      // });
      // let videSection = [];
      // for (const key in currentval) {
      //   if (currentval.hasOwnProperty(key)) {
      //     const element = currentval[key];
      //     if (element.type == 'video-with-content2') {
      //       if (Object.keys(element.blocks).length != 0) {
      //         videSection.push({
      //           data: element.blocks,
      //           settings: element.settings,
      //         });
      //       }
      //     }
      //   }
      // }
      // function convertShopifyVideoUrl(shopifyUrl) {
      //   if (!shopifyUrl) {
      //     return null;
      //   }
      //   const cdnVideoBaseUrl = 'https://cdn.shopify.com/videos/c/o/v/';
      //   const fileName = shopifyUrl.split('/').pop(); // Extract the file name
      //   return `${cdnVideoBaseUrl}${fileName}`;
      // }

      // const videoWithContent = videSection
      //   .filter(item => !item?.disabled) // Filter out disabled items
      //   .map(item => {
      //     // Convert Shopify video URL
      //     const str = convertShopifyVideoUrl(item.settings.video);

      //     // Define video settings
      //     const videoSettings = {
      //       video: item?.settings?.video,
      //       mob_video: item.settings['mob-video'],
      //       video_url: item.settings.video_url,
      //     };

      //     // Extract and format content
      //     const content = Object.values(item.data).map(contentItem => ({
      //       type: contentItem.type,
      //       settings: contentItem.settings,
      //     }));

      //     // Function to find content by type
      //     function findContentByType(content, type) {
      //       return content.find(item => item.type === type) || null;
      //     }

      //     // Extract specific content types
      //     const heading = findContentByType(content, 'heading');
      //     const text = findContentByType(content, 'text');
      //     const buttons = findContentByType(content, 'buttons');
      //     const nonExistentType = findContentByType(content, 'image');

      //     // Debugging log for specific types

      //     return {
      //       video: videoSettings,
      //       // content: content,
      //       specificContent: {heading, text, buttons, nonExistentType}, // Include specific content in the returned object
      //     };
      //   });

      // Object.values(homeSlider2Section).forEach(item => {
      //   Object.values(item.data).forEach(item1 => {
      //     if (
      //       typeof item1.settings.mobile__image !== 'undefined' &&
      //       !item?.disabled
      //     ) {
      //       str = item1.settings.mobile__image;
      //       replaceImage = str.replace(
      //         'shopify://shop_images/',
      //         'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
      //       );
      //       let str = replaceImage;
      //       var imageObject = {uri: str};
      //       item1.image = imageObject;
      //       item1.url = item1.settings['collec-link'];
      //       if (!item1.disabled) {
      //         slider2.push(item1);
      //       }
      //     }
      //   });
      // });
      // Object.values(homeSlider3Section).forEach(item => {
      //   Object.values(item.data).forEach(item1 => {
      //     if (
      //       typeof item1.settings.mobile__image !== 'undefined' &&
      //       !item?.disabled
      //     ) {
      //       str = item1.settings.mobile__image;
      //       replaceImage = str.replace(
      //         'shopify://shop_images/',
      //         'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
      //       );
      //       let str = replaceImage;
      //       var imageObject = {uri: str};
      //       item1.image = imageObject;
      //       item1.url = item1.settings['collec-link'];
      //       if (!item1.disabled) {
      //         slider3.push(item1);
      //       }
      //     }
      //   });
      // });
      // Object.values(homeSlider1Section1).forEach(item => {
      //   Object.values(item.data).forEach(item1 => {
      //     if (
      //       typeof item1.settings.mobile__image !== 'undefined' &&
      //       !item1?.disabled
      //     ) {
      //       str = item1.settings.mobile__image;
      //       replaceImage = str.replace(
      //         'shopify://shop_images/',
      //         'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
      //       );
      //       let str = replaceImage;
      //       var imageObject = {uri: str};
      //       item1.image = imageObject;
      //       item1.url = item1.settings['collec-link'];
      //       if (!item1.disabled) {
      //         slider11.push(item1);
      //       }
      //     }
      //   });
      // });
      // const sectiondata = tranformSectionFirstdata(subCollectionlistSection);

      // collectiontabSection.forEach(items => {
      //   Object.values(items?.data).forEach(item => {
      //     if (
      //       item?.type == 'Collection' &&
      //       item?.settings['Collection-url'] != ''
      //     ) {
      //       const prefix = 'shopify://';
      //       const newBaseURL = 'https://gocolors.com/';
      //       let url = item?.settings['Collection-url'];
      //       if (item?.settings['Collection-url'].includes(prefix)) {
      //         url = item?.settings['Collection-url']?.replace(
      //           prefix,
      //           newBaseURL,
      //         );
      //       }
      //       if (!item?.disabled) {
      //         collectionTab.push({
      //           ...item,
      //           settings: {
      //             ...item?.settings,
      //             ['Collection-url']: url,
      //             mainTtile: items?.settings?.title,
      //           },
      //         });
      //       }
      //     }
      //   });
      // });

      // Object.values(homeTestimonialsSection).forEach(item => {
      //   Object.values(item.data).forEach(item1 => {
      //     // console.log('item isssss1', item1);
      //     if (typeof item1.settings['content-img'] !== 'undefined') {
      //       // console.log(item1.settings.mobile__image);
      //       str = item1.settings['content-img'];
      //       replaceImage = str.replace(
      //         'shopify://shop_images/',
      //         'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
      //       );

      //       let str = replaceImage;
      //       // let temp = str.split(".jpg")[0];
      //       // const ImageData = temp + "_700x700.jpg";
      //       var imageObject = {uri: str};
      //       item1.image = imageObject;

      //       if (!item1.disabled) {
      //         Testimonials.push(item1);
      //       }
      //     }
      //   });
      // });

      // homeSlider4Section.forEach(item => {
      //   Object.values(item?.data).forEach(item => {
      //     if (item?.type == 'slide') {
      //       const prefix = 'shopify://';
      //       const newBaseURL = 'https://gocolors.com/';
      //       let image = item?.settings['image'];
      //       replaceImage = image.replace(
      //         'shopify://shop_images/',
      //         'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
      //       );
      //       if (!item?.disabled) {
      //         slider4.push({
      //           ...item,
      //           settings: {...item?.settings, image: replaceImage},
      //         });
      //       }
      //     }
      //   });
      // });

      // let section_heading = [];
      // for (const key in currentval) {
      //   if (currentval[key]?.settings?.hasOwnProperty('sec-heading')) {
      //     section_heading.push({
      //       value: currentval[key]?.settings['sec-heading'],
      //       backgroundColor: currentval[key]?.settings['sec-bg-color'],
      //     });
      //   }
      // }

      const homeData = [];
      let homeObject = {
        // slider1: slider1,
        // slider11: slider11,
        // slider2: slider2,
        // subCollectionList: sectiondata[0],
        // slider3, //{ data: slider3, image: slider3MobileImage },
        // slider4: slider4,
        // slider5: slider5,
        // slider6: slider6,
        // videoUrl: videoUrl,
        // Testimonials: Testimonials,
        // section_heading,
        // collectionTab,
        // videoWithContent,

        our_services,
        premium_services,
        remedies,
        custom_testimonial,
        image_banner,
        image_banner2,
        how_it_works,
        core_values,
        captured_highlights,
        about_pinnacle_vastu,
        courses_section,
        best_Products_section,
        featured_blog_section,
      };
      homeData.push(homeObject);

      resolve(homeData);
    } catch (err) {
      console.log('this is errorr', err);
      reject(err);
    }
  });
};

// const tranformSectionFirstdata = input => {
//   return input.map(tab => {
//     const maindata = [];
//     Object.keys(tab?.data).forEach(item => {
//       const settings = tab?.data[item].settings;

//       const formattedData = [];
//       const imagePattern = /^imageNumbers(\d+)$/;
//       const linkPattern = /^linkNumbers(\d+)$/;
//       const textPattern = /^textNumbers(\d+)$/;
//       Object.entries(settings).forEach(([key, value]) => {
//         if (value === '' && value?.disabled) return;
//         let match;
//         if ((match = key.match(imagePattern))) {
//           let newvalue = value.replace(
//             'shopify://shop_images/',
//             'https://cdn.shopify.com/s/files/1/0598/8158/6848/files/',
//           );
//           const index = match[1];
//           if (!formattedData[index - 1]) formattedData[index - 1] = {};
//           formattedData[index - 1].image = newvalue;
//         } else if ((match = key.match(linkPattern))) {
//           const index = match[1]; // Extract numeric part (link number)
//           if (!formattedData[index - 1]) formattedData[index - 1] = {};
//           formattedData[index - 1].link = value;
//         } else if ((match = key.match(textPattern))) {
//           const index = match[1];
//           if (!formattedData[index - 1]) formattedData[index - 1] = {};
//           formattedData[index - 1].text = value;
//         }
//       });
//       maindata.push({
//         title: settings['tab-title'],
//         items: formattedData,
//       });
//     });

//     return maindata;
//   });
// };

export const getCollectionId = async url => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(url + '.json')
        .then(response => {
          // console.log("getCollectionId", response);

          let collectionId = response.data.collection
            ? response.data.collection.id
            : null;
          if (collectionId) {
            resolve(collectionId);
          }
        })
        .catch(e => console.log('collectionId err', e));
    } catch (error) {
      console.log('errlam', error);
      reject(error);
    }
  });
};

//SET DATA IN LOCAL STORAGE
// export const setHomeData = homeData => {
//   return async dispatch => {
//     try {
//       await AsyncStorage.setItem('HOMEINFO', JSON.stringify(homeData));
//     } catch (error) {
//       console.log('error', error);
//     }
//   };
// };

// export const fetchFooter = (searchCriteria, navigation) => {
//   return async dispatch => {
//     let returnList = null;
//     let ProductObj;
//     let images = [];
//     const productList = [];
//     let isSelected = [];
//     searchCriteria = searchCriteria.replace(
//       /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
//       '',
//     );
//     let pageNo = 1;
//     await fetch(
//       `${SEARCH_URL}&q=${searchCriteria}&page=${pageNo}&product_available=true&limit=20&sort=relevance&build_filter_tree=true&check_cache=false&event_type=filter`,
//     )
//       .then(response => response.json())
//       .then(json => {
//         let totalRecords = json.total_product;
//         pageNo = parseInt(pageNo) + 1;
//         if (totalRecords != 0) {
//           const productsData = json.products;
//           // console.log("search json ",productsData)

//           //callProductApi(btoa(`gid://shopify/Product/${productsData[0].id}`))

//           for (let i = 0; i < productsData.length; i++) {
//             let ImagesArr = [];
//             let VarientArr = [];
//             ProductObj = {
//               ...productsData[i],
//               id: productsData[i].id,
//               title: productsData[i].title,
//               vendorName: productsData[i].vendor,
//               price: productsData[i].variants[0].price,
//               image: productsData[i].images[1],
//               details: productsData[i], 
//             };

//             ProductObj.id = convertProductId(ProductObj.id);
//             //  4936763506741
//             //  4904633008181

//             //  console.log("encrpt",convertProductId(4936763506741))
//             //sujata added down
//             let isDefaultVariantSelected = false;
//             for (let j = 0; j < productsData[i].variants.length; j++) {
//               let isAvailable = productsData[i].variants[j].available;
//               variantObj = {
//                 //id: btoa(`gid://shopify/ProductVariant/${productsData[i].variants[j].id}`),
//                 id: convertVariantId(productsData[i].variants[j].id),
//                 available: productsData[i].variants[j].available,
//                 price: productsData[i].variants[j].price,
//                 sku: productsData[i].variants[j].sku,
//                 title: productsData[i].variants[j].title,
//                 compare_at_price: productsData[i].variants[j].compare_at_price,
//                 isSelected:
//                   isAvailable && !isDefaultVariantSelected ? true : false,
//               };
//               if (isAvailable) {
//                 isDefaultVariantSelected = true;
//               }
//               isSelected.push(i == 0 ? true : false);
//               VarientArr.push(variantObj);
//             }
//             for (let j = 0; j < productsData[i].images_info.length; j++) {
//               imagesObj = {
//                 id: productsData[i].images_info[j].id,
//                 src: productsData[i].images_info[j].src,
//               };
//               ImagesArr.push(imagesObj);
//             }
//             ProductObj.variants = VarientArr;
//             ProductObj.details.id = ProductObj.id;
//             ProductObj.details.images = ImagesArr;
//             ProductObj.details.availableForSale = ProductObj.details.available;
//             ProductObj.details.variants[0].compareAtPrice =
//               ProductObj.details.variants[0].compare_at_price;
//             ProductObj.details.variants = VarientArr;
//             //difference in variable name so
//             ProductObj.details.singleColorText =
//               productsData[i].options_with_values[0].values[0].title;
//             ProductObj.details.description = productsData[i].body_html; // for displaying product description
//             //   console.log("search json after modify ",ProductObj)
//             productList.push(ProductObj);
//           }

//           returnList = {
//             products: productList,
//             totalRecords: totalRecords,
//           };

//           dispatch(setSearchFilterData(json.filter));
//         } else {
//           returnList = {
//             products: productList,
//             totalRecords: totalRecords,
//           };
//         }
//       })
//       .then(() => {
//         dispatch(
//           setSearchResultToCollection(returnList.products, searchCriteria),
//         );
//       })
//       .catch(function (error) {
//         dispatch({
//           type: GET_SEARCH_FAILED,
//           payload: {
//             error: error,
//           },
//         });
//       })
//       .finally(() => {
//         dispatch(
//           GET_SEARCH_SUCCESS({
//             returnSearchResult: returnList,
//             pageNo: pageNo,
//           }),
//         );
//         navigation.navigate('Collections', {
//           collectionList: returnList.products,
//           details: returnList.products,
//         });
//       });
//   };
// };

// export const fetchCollectionColorTrends = (collectionId, CollectionTitle) => {
//   return async dispatch => {
//     try {
//       dispatch(COLOR_TRENDS_LOADING());
//       let collectionData = [];
//       let collectionTitle = CollectionTitle;
//       var productList = [];
//       let isSelected = [];

//       let starterImage = null;
//       let pageNo = 1;

//       await axios(`${MAIN_URL}collections/${collectionId}/products.json`, {
//         headers: {
//           'X-Shopify-Access-Token': ACCESSTOKEN,
//         },
//       })
//         .then(function (response) {})
//         .then(
//           await fetch(
//             `${FILTER_URL}&collection_scope=${collectionId}&product_available=true&sort=manual&limit=80&page=1`,
//             {
//               headers: {
//                 'X-Shopify-Access-Token': ACCESSTOKEN,
//               },
//             },
//           )
//             .then(response => response.json())
//             .then(async collection => {
//               pageNo = parseInt(pageNo) + 1;

//               var prodObj;
//               productList = collection.products;
//               const productids = productList.map(item => item.id);
//               let similarProductArr = [];
//               collectionData = await processProducts(productList);

//               // for (let i = 0; i < productList.length; i++) {
//               //   const tempdata = await getSimilerProducts(productList[i].id);
//               //   similarProductArr.push(tempdata);

//               //   let ImagesArr = [];
//               //   let VarientArr = [];

//               //   prodObj = {
//               //     id: productList[i].id,
//               //     title: productList[i].title,
//               //     price: productList[i].variants[0].price,
//               //     image: productList[i].images[1], //image is different format
//               //     details: productList[i],
//               //     similarProductArr: similarProductArr[i],
//               //   };
//               //   let isDefaultVariantSelected = false;
//               //   for (let j = 0; j < productList[i].variants.length; j++) {
//               //     // console.log('i am here 3');

//               //     let isAvailable = productList[i].variants[j].available;
//               //     let variantObj = {
//               //       id: productList[i].variants[j].id,
//               //       available: productList[i].variants[j].available,
//               //       price: productList[i].variants[j].price,
//               //       sku: productList[i].variants[j].sku,
//               //       title: productList[i].variants[j].title,
//               //       compare_at_price:
//               //         productList[i].variants[j].compare_at_price,
//               //       isSelected:
//               //         isAvailable && !isDefaultVariantSelected ? true : false,
//               //     };
//               //     if (isAvailable) {
//               //       // console.log('i am here 4');

//               //       isDefaultVariantSelected = true;
//               //     }
//               //     isSelected.push(i == 0 ? true : false);
//               //     VarientArr.push(variantObj);
//               //   }
//               //   for (let j = 0; j < productList[i].images_info.length; j++) {
//               //     // console.log('i am here 5');

//               //     imagesObj = {
//               //       id: productList[i].images_info[j].id,
//               //       src: productList[i].images_info[j].src,
//               //     };
//               //     ImagesArr.push(imagesObj);
//               //   }
//               //   prodObj.details.images = ImagesArr;
//               //   //difference in variable name so
//               //   prodObj.details.singleColorText =
//               //     productList[i].options_with_values[0].values[0].title;
//               //   prodObj.details.id = prodObj.id;
//               //   prodObj.details.availableForSale = prodObj.details.available;
//               //   prodObj.details.variants[0].compareAtPrice =
//               //     prodObj.details.variants[0].compare_at_price;
//               //   prodObj.details.variants = VarientArr;
//               //   prodObj.details.description = productList[i].body_html; // for displaying product description
//               //   collectionData.push(prodObj);
//               // }
//             }),
//         )
//         //end to take product deatils
//         .catch(error => {
//           console.log('collection.catch1', error);
//           // console.log("i am here 6");

//           dispatch(COLOR_TRENDS_FAILED({error: error.massage}));
//         })
//         .finally(() => {
//           // console.log("next pageNo in action is "+pageNo)
//           let isEmpty = collectionData.length == 0;
//           //  console.log("collection product details ", isEmpty);
//           if (isEmpty) {
//             dispatch(COLOR_TRENDS_FAILED({error: 'GET_COLLECTION_FAILED'}));
//           } else {
//             // console.log(
//             //   "this is collectiondata",
//             //   JSON.stringify(collectionData)
//             // );
//             dispatch(COLOR_TRENDS_SUCCESS(collectionData));
//           }
//         });
//     } catch (e) {
//       console.log('collection.catch2', e);
//       dispatch(COLOR_TRENDS_FAILED({error: e.massage}));
//     }
//   };
// };

export const fetchExtraCollectonHome =(collectionHandle) => {
  return async dispatch => {
    try {
      dispatch(GET_EXTRADATA_LOADING());
      const query = `
      query {
           collectionByHandle(handle: "${collectionHandle}") {
          id
          title
          products(first: 10) {
            edges {
              node {
                id
                title
                description
                handle
                availableForSale
                productType
                vendor
                tags
                totalInventory
                createdAt
                updatedAt
                featuredImage {
                  url
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                  variants(first: 10) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                image {
                  src
                  altText
                }
              }
            }
              }
              }
            }
          }
        }
      }
    `;
      const response = await fetch(Config.Shopify.graphqlUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': Config?.Shopify.storeAccessToken,
        },
        body: JSON.stringify({query}),
      });

      const result = await response.json();
      const products = result?.data?.collectionByHandle?.products?.edges;
      const includesCourse = result?.data?.collectionByHandle?.title?.toLowerCase().includes("course") 
      const transformedProducts = (products || []).map(item => item.node);
      if (includesCourse) {
        dispatch(GET_COURSES_SUCCESS(transformedProducts));
      } else {
 
//  let updatedProducts = await Promise.all(
//   transformedProducts.map(async (product) => {
  
//     const review = await getSimilarProductMetafieldValue(product?.id);
//     let parsedReview = null;

    
//     if (review && review.value && review.value.trim() !== '') {
//       try {
       
//         parsedReview = JSON.parse(review.value);
//       } catch (error) {
//         console.error(
//           'JSON Parse error:',
//           error.message,
//           'with value:',
//           review.value
//         );
//       }
//     } else {
//       console.log('No valid JSON string to parse for product id', product?.id);
//     }

//     // Return the updated product with review attached directly
//     return {
//       ...product,
//       review: parsedReview,
//     };
//   })
// );

// console.log('updatedProducts with review data:', updatedProducts);


        dispatch(
          GET_BEST_PROD_SUCCESS({
            collectionId:
              result?.data?.collectionByHandle?.id,

            products: transformedProducts,
          }),
        );
      }
    } catch (error) {
      console.error('Error fetching collection:', error);

      dispatch(
        GET_EXTRADATA_FAILED({error: error.message || 'An error occurred'}),
      );
    }
  };
};

export const getSimilarProductMetafieldValue = async (id) => {
  try {
    if (!id) {
      throw new Error("Product ID is required");
    }

    const variables = {
      id: typeof id === "string" && id.includes("gid://shopify/Product")
        ? id
        : convertProductId(id),
    };

    const data = JSON.stringify({
      query: `query ($id: ID!) {
        product(id: $id) {
         review: metafield(namespace: "reviews", key: "rating") {
       
            value
            type
          }
             title
        }
      }`,
      variables,
    });

    

    const response = await axios.request(GraphQlAdminConfig(data));
    console.log("GraphQL Request Data:", response.data);
    if (response?.data?.errors) {
      console.error("GraphQL Errors:", response.data.errors);
      return null;
    }
    return response?.data?.data?.product?.review || null;
  } catch (err) {
    console.error("Error fetching similar product metafield:", err);
    throw err;
  }
};