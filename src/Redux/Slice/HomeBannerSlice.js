import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {getThemdata} from '../../models/them';
import Config from '../../common/config.json';

const initialState = {
  isLoading: true,
  isExtraDataLoading: false,
  error: '',
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

    GET_BEST_PROD_SUCCESS: (state, action) => {
      state.isExtraDataLoading = false;
      state.error = '';
      state.best_Products = action.payload;
    },
    GET_SEARCH_SUCCESS: (state, action) => {
      state.error = '';
      state.returnSearchResult = action.payload.returnSearchResult;
    },
  },
});

export const {
  LOADING,
  SUCCESS,
  FAILED,

  GET_EXTRADATA_LOADING,
  GET_EXTRADATA_FAILED,
  GET_COURSES_SUCCESS,
  GET_BEST_PROD_SUCCESS,
  GET_SEARCH_SUCCESS,
} = HomeBannerSlice.actions;

export default HomeBannerSlice.reducer;

export const setHomeBanners = homeData => {
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
      });

      dispatch(
        SUCCESS({
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
    try {
      const data = await getThemdata('asset[key]=templates%2Findex.json');

      const formated = JSON.parse(data?.asset?.value);

      const formateData = await modifyHomeObject(formated?.sections);
      dispatch(setHomeBanners(formateData));
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

export const modifyHomeObject = async currentval => {
  return new Promise(async (resolve, reject) => {
    try {
      let replaceImage = '';
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

      const homeData = [];
      let homeObject = {
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

export const fetchExtraCollectonHome = collectionHandle => {
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
      const includesCourse = result?.data?.collectionByHandle?.title
        ?.toLowerCase()
        .includes('course');

      const transformedProducts = (products || []).map(item => item.node);
      if (includesCourse) {
        dispatch(GET_COURSES_SUCCESS(transformedProducts));
      } else {
        dispatch(
          GET_BEST_PROD_SUCCESS({
            collectionId: result?.data?.collectionByHandle?.id,

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
