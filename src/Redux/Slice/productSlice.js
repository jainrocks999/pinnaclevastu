import {createSlice} from '@reduxjs/toolkit';
import {
  API_PSW,
  MAIN_URL,
  SEARCH_URL,
  SSO_BASE_URL,
  WEB_PAGE,
} from '../../common/constants';
import axios from 'axios';
import {SHOPIFY_CLIENT} from '../../common/shopifyClient';
import {store} from '../store';
// import {getProductRecomendation} from '../../models/products';

const initialState = {
  isLoading: false,
  productDetails: [],
  productVariants: [],
  productImages: [],
  colorArray: [],
  patternsArray: [],
  sizeArray: [],
  metafieldsArray: [],
  careList: [],
  materialList: [],
  contactData: [],
  error: '',
  type: '',
  pinStatus: false,
  pinMessage: '',
  pincodeNumber: '',
  storeMessage: '',
  storeDetails: [],
  tata_url: '',
  productAvailable: '',
  tagCheck: false,
  sizeChartData: [],
  added: false,
  reletedProducts: [],
};

export const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isRefresh = false;
      state.error = '';
      state.productVariants = action.payload.productVariants;
      state.productImages = action.payload.productImages;
      state.productDetails = action.payload.productDetails;
    },
    FAILED: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    VARIANTSCHANGE: (state, action) => {
      state.productVariants = action.payload.productVariants;
    },
    SIZE_CHART_SUCCESS: (state, action) => {
      state.sizeChartData = action.payload;
    },
    GET_COLOR_SUCCESS: (state, action) => {
      state.colorArray = action.payload.colorArray;
    },
    GET_SIZE_SUCCESS: (state, action) => {
      state.sizeArray = action.payload;
    },
    GET_PATTERNS_SUCCESS: (state, action) => {
      state.patternsArray = action.payload;
    },
    GET_METAFIELDS_SUCCESS: (state, action) => {
      state.metafieldsArray = action.payload;
    },
    InitProduct: () => {
      return initialState;
    },
    GET_PRODUCT_AVAILABLE: (state, action) => {
      state.productAvailable = action.payload.productAvailable;
    },
    PRODUCT_ADDED: (state, action) => {
      state.added = action.payload;
    },
    RELETED_PRODUCT_LOADING: (state, action) => {
      state.isLoading = true;
    },
    RELETED_PRODUCT_SUCCESS: (state, action) => {
      state.reletedProducts = action.payload;
      state.isLoading = false;
    },
    RELETED_PRODUCT_ERROR: (state, action) => {
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  LOADING,
  SUCCESS,
  FAILED,
  InitProduct,
  VARIANTSCHANGE,
  SIZE_CHART_SUCCESS,
  GET_COLOR_SUCCESS,
  GET_PATTERNS_SUCCESS,
  GET_SIZE_SUCCESS,
  GET_METAFIELDS_SUCCESS,
  GET_PRODUCT_AVAILABLE,
  PRODUCT_ADDED,
  RELETED_PRODUCT_LOADING,
  RELETED_PRODUCT_SUCCESS,
  RELETED_PRODUCT_ERROR,
} = ProductSlice.actions;

export default ProductSlice.reducer;

const fetchTotalInventory = id => {
  return new Promise((resolve, reject) => {
    let data = JSON.stringify({
      query: `query getProductById($id: ID!) {
                product(id: $id) {
                  title
                  totalInventory
                }
              }`,
      variables: {id: `${id}`},
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://duckduck-baby.myshopify.com/api/2024-07/graphql.json',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': 'c1490f8105acaca2d6125053b91fb6d2',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        const totalInventory = response.data.data.product.totalInventory;
        resolve(totalInventory);
      })
      .catch(error => {
        console.error('Error response data:', error);
        reject(error); // Reject the promise
      });
  });
};

export const setProductDetails = (products, productImages) => {
 
  return dispatch => {
    let productParam = products;
    let variantsObj = {};
    let Variants = [];
    let isSelected = [];
    var imagesObj;
    let ImagesArr = [];
    try {
      dispatch(LOADING(true));
      console.log('productParam.images.length', JSON.stringify(products));
      for (let i = 0; i < productImages.length; i++) {
        imagesObj = {
          id: productImages[i].id,
          image: productImages[i].src,
        };
        ImagesArr.push(imagesObj);
      }
    } catch (error) {
      console.log('error in set product', error);
      dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
    } finally {
      console.log('ImagesArrImagesArr,,,,',ImagesArr);
      
      let isEmpty = ImagesArr.length == 0;
      if (isEmpty) {
        console.log('jhgjlhghgh',isEmpty);
        
        dispatch(
          FAILED({
            error: 'GET_PRODUCT_FAILED',
          }),
        );
      } else {
        console.log('this is not called the app ',productParam);
        //  productParam.id = productParam.id.replace('gid://shopify/Product/');

 
        let productObj = {};
        productObj = {
          image:
            ImagesArr.length > 1
              ? ImagesArr[ImagesArr.length - 1].image
              : ImagesArr[0].image,
          id: null,
        };
        for (let i = 0; i < productParam.variants.length; i++) {
          console.log(
            'productParam.variants[i]1',
            JSON.stringify(productParam.variants[i]),
          );
          // console.log("productParam.variants[i]2", JSON.stringify(productParam));

          let isAvailable = productParam.variants[i].available;
          console.log('productParam.variants[1]', isAvailable);

          variantsObj = {
            name: productParam?.variants[i]?.title
              ?.replace(/\s/g, '')
              ?.split('/')
              ?.pop(),
            available: isAvailable,
            title: productParam.variants[i].title,
            value: productParam.variants[i]?.title,
            price: productParam.variants[i]?.price?.amount,
            sku: productParam.variants[i]?.sku,
            id: productParam.variants[i].id.replace(
              'gid://shopify/ProductVariant/',
              '',
            ),
            compare_at_price: productParam.variants[i]?.compareAtPrice?.amount
              ? productParam.variants[i]?.compareAtPrice?.amount
              : 0,
            image: productParam.variants[i]?.image,
            isSelected: false,
           
          };
          console.log('variantsObj', variantsObj);

          // if (isAvailable) {
          //   isDefaultVariantSelected = true;
          // }
          // isSelected.push(i == 0 ? true : false);
          productParam.variants[i] = variantsObj;
          // console.log("variantsObj" + JSON.stringify(variantsObj));
          Variants.push(variantsObj);
        }
        // productParam.variants = Variants;
        // dispatch(fetchSizeChart(productParam));

        // dispatch(fetchColorVariant(productId, productObj, products));
        console.log(
          'productParam1',
          productParam,
          '------------------',
          Variants,
        );
        // dispatch(fetchSizeChart(productParam));
        dispatch(
          SUCCESS({
            productVariants: Variants,
            productImages: ImagesArr,
            productDetails: productParam,
            error: '',
          }),
        );
      
      }
    }
  };
};

export const setSelectedProduct = (variants, index) => {
  return async dispatch => {
    try {
      const updateData = await variants.map((data, i) => {
        const temp = {...data, isSelected: index == i ? true : false};
        return temp;
      });
      dispatch(
        VARIANTSCHANGE({
          productVariants: updateData,
        }),
      );
    } catch (error) {
      //NOT DISPATCH ANYTHING BCZ THIS IS NOT USE ANY API
    } finally {
    }
  };
};

export const setProductDetailsFromSearch = (products, productId) => {
  return dispatch => {
    const productParam = products;
    let variantsObj = {};
    let Variants = [];
    let isSelected = [];
    var imagesObj;
    let ImagesArr = [];
    try {
      //SET VARIANT
      dispatch(LOADING(true));
      let isDefaultVariantSelected = false;
      for (let i = 0; i < productParam.variants.length; i++) {
        let isAvailable = productParam.variants[i].available;
        variantsObj = {
          name: productParam.variants[i].title
            .replace(/\s/g, '')
            .split('/')
            .pop(),
          available: productParam.variants[i].available,
          title: productParam.variants[i].title,
          value: productParam.variants[i].sku,
          price: productParam.variants[i].price,
          id: productParam.variants[i].id,
          // image: productParam.variants[i].image,
          isSelected: i == 0 ? true : false,
        };
        if (isAvailable) {
          isDefaultVariantSelected = true;
        }
        // isSelected.push(i == 0 ? true : false);
        Variants.push(variantsObj);
      }

      //SET SLIDER IMAGES
      for (let i = 0; i < productParam.images_info.length; i++) {
        imagesObj = {
          id: productParam.images_info[i].id,
          image: productParam.images_info[i].src,
        };
        ImagesArr.push(imagesObj);
      }
    } catch (error) {
      console.error('error132', error);
      dispatch(FAILED({error: error}));
    } finally {
      let productObj = {};

      if (products.brand == 'Studiowest') {
        productObj = {
          image: ImagesArr.length > 1 ? ImagesArr[1].image : ImagesArr[0].image,
          id: null,
        };
      } else {
        productObj = {
          image:
            ImagesArr.length > 1
              ? ImagesArr[ImagesArr.length - 1].image
              : ImagesArr[0].image,
          id: null,
        };
      }
      productParam.description = productParam.body_html;
      // dispatch(fetchSizeChart(productParam));
      // dispatch(fetchColorVariant(productId, productObj, productParam));
      dispatch(
        SUCCESS({
          productVariants: Variants,
          productImages: ImagesArr,
          productDetails: productParam,
        }),
      );
    }
  };
};

export const fetchColorVariant = (ID, productObj, product) => {
  return dispatch => {
    let careList = [];
    let colorArray = [];
    let materialList = [];
    let contactData = [];
    let tata_url = '';

    //console.log("product-fetchColorVariant", product);

    let vendor = product.vendor;
    // console.log("product-fetchColorVariant", vendor);

    let imgObj = {};
    let pid = isNaN(ID)
      ? atob(ID).split('/', 5)
      : product.product_id === undefined
      ? product.id
      : product.product_id;
    const product_id = isNaN(pid) ? pid[4] : pid;
    var FormData = require('form-data');
    var data = new FormData();
    data.append('type', 'products');
    data.append('id', product_id);
    data.append('website_type', 'go colors');

    // console.log(" pid[4]", JSON.stringify(data));
    var config = {
      method: 'post',
      url: `${SSO_BASE_URL}/meta-fields`,
      data: data,
    };

    axios(config)
      .then(function (response) {
        let data = response.data;
        // console.log("tata_url", data);
        if (data.success) {
          tata_url = response.data.tata_url;
          // console.log("tata_url", tata_url);
          let ImageThubnail = response.data.metafields;

          if (ImageThubnail.images) {
            let ImgArr = ImageThubnail.images;
            if (vendor != 'Studiowest') colorArray.push(productObj);

            ImgArr.forEach((element, i) => {
              let temp = {};
              if (vendor == 'Studiowest') {
                temp.image = element[1].src;
              } else {
                temp.image = element[element.length - 1].src;
              }
              temp.id = element[element.length - 1].product_id;
              colorArray.push(temp);
            });
          }
          var careDetails = JSON.stringify(response.data.metafields);
          var parsedJSON = JSON.parse(careDetails);
          // console.log("careDetails", careDetails);
          // console.log("parsedJSON", parsedJSON);
          var careObject;
          var material;
          var contactObject;

          if (parsedJSON.For_Consumer_Complaints) {
            contactObject = {
              name: 'For Consumer Complaints',
              value: parsedJSON.For_Consumer_Complaints,
            };
            contactData.push(contactObject);
          }
          if (parsedJSON.fit) {
            careObject = {name: 'Fit', value: parsedJSON.fit};
            careList.push(careObject);
          }
          if (parsedJSON.care_instruction) {
            careObject = {
              name: 'Care Instruction',
              value: parsedJSON.care_instruction,
            };
            careList.push(careObject);
          }
          if (parsedJSON.NetQty) {
            careObject = {
              name: 'NetQty',
              value: parsedJSON.NetQty,
            };
            careList.push(careObject);
          }

          if (parsedJSON.fabric_composition) {
            material = {
              name: 'Fabric Composition',
              value: parsedJSON.fabric_composition,
            };
            materialList.push(material);
          }

          if (parsedJSON.SKU) {
            material = {name: 'SKU', value: parsedJSON.SKU};
            materialList.push(material);
          }
          if (parsedJSON.Country_Of_Origin) {
            material = {
              name: 'Country Of Origin',
              value: parsedJSON.Country_Of_Origin,
            };
            materialList.push(material);
          }
          if (parsedJSON.Manufactured_and_Marketed_By) {
            material = {
              name: 'Manufactured and Marketed By',
              value: parsedJSON.Manufactured_and_Marketed_By,
            };
            materialList.push(material);
          }
        }
      })
      .catch(function (error) {
        console.log('error786', error);
        // dispatch({
        //   type: GET_COLOR_FAILED,
        //   payload: {
        //     error: error,
        //     type: "COLOR_FAILED",
        //   },
        // });
      })
      .finally(() => {
        //  console.log("colorArray-action", tata_url);
        dispatch(
          GET_COLOR_SUCCESS({
            careList: careList,
            materialList: materialList,
            colorArray: colorArray,
            contactData: contactData,
            tata_url: tata_url,
          }),
        );
      });
  };
};
export const fetchMetafields = ID => {
  console.log('this is fetch metafield  in workign', ID);
  return async dispatch => {
    let colors = [];
    let patterns = [];
    let size = [];
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${MAIN_URL}products/${ID}/metafields.json?limit=250`,
      headers: {
        'X-Shopify-Access-Token': API_PSW,
      },
    };

    await axios
      .request(config)
      .then(async response => {
        console.log('metafields', JSON.stringify(response.data.metafields));
        const metafields = response?.data?.metafields;
        dispatch(GET_METAFIELDS_SUCCESS(metafields));
        // for (let i = 0; i < metafields.length; i++) {
        //     const element = metafields[i];
        //     if (element.key == "select_variant") {
        //         const obj = element.value.split("||");
        //         for (let j = 0; j < obj.length; j++) {
        //             const element = obj[j];
        //             console.log(element.split("+"));
        //             const elementj = element.split("+");
        //             let config = {
        //                 method: "get",
        //                 url: `https://duckduckbaby.in/products/${elementj[0]}.json`,
        //                 headers: {},
        //             };

        //             await axios
        //                 .request(config)
        //                 .then((response) => {
        //                     console.log(
        //                         "elementj[0]",
        //                         elementj[1],
        //                         JSON.stringify(response.data.product)
        //                     );
        //                     colors.push({
        //                         data: response.data.product,
        //                         title: elementj[1],
        //                     });
        //                 })
        //                 .catch((error) => {
        //                     console.log(error);
        //                 });

        //             //17/09/2024
        //         }
        //         // console.log(obj);
        //     } else if (element.key == "select_color") {
        //         const obj = element.value.split("||");
        //         for (let j = 0; j < obj.length; j++) {
        //             const element = obj[j];
        //             console.log(element.split("+"));
        //             const elementj = element.split("+");
        //             let config = {
        //                 method: "get",
        //                 url: `https://duckduckbaby.in/products/${elementj[0]}.json`,
        //                 headers: {},
        //             };

        //             await axios
        //                 .request(config)
        //                 .then((response) => {
        //                     console.log(
        //                         "elementj[0]",
        //                         elementj[1],
        //                         JSON.stringify(response.data.product)
        //                     );
        //                     patterns.push({
        //                         data: response.data.product,
        //                         title: elementj[1],
        //                     });
        //                 })
        //                 .catch((error) => {
        //                     console.log(error);
        //                 });

        //             //17/09/2024
        //         }
        //     } else if (element.key == "select_size") {
        //         const obj = element.value.split("||");
        //         for (let j = 0; j < obj.length; j++) {
        //             const element = obj[j];
        //             console.log(element.split("+"));
        //             const elementj = element.split("+");
        //             let config = {
        //                 method: "get",
        //                 url: `https://duckduckbaby.in/products/${elementj[0]}.json`,
        //                 headers: {},
        //             };

        //             await axios
        //                 .request(config)
        //                 .then((response) => {
        //                     console.log(
        //                         "elementj[0]",
        //                         elementj[1],
        //                         JSON.stringify(response.data.product)
        //                     );
        //                     size.push({
        //                         data: response.data.product,
        //                         title: elementj[1],
        //                     });
        //                 })
        //                 .catch((error) => {
        //                     console.log(error);
        //                 });

        //             //17/09/2024
        //         }
        //     }
        // }
      })
      .catch(error => {
        console.log('error', error, config);
      });
    dispatch(GET_COLOR_SUCCESS({colorArray: colors}));
    dispatch(GET_PATTERNS_SUCCESS(patterns));
    dispatch(GET_SIZE_SUCCESS(size));
    console.log('colors', JSON.stringify(colors));
  };
};

export const fetchProduct = productId => {
  return dispatch => {
    let productTemp;
    try {
      dispatch(LOADING(true));
      //  dispatch(fetchReletedProduct(productId));
      SHOPIFY_CLIENT.product
        .fetch(productId)
        .then(async product => {
          console.log('this is product ata', product);
          if (product) {
            console.log('productTemp', JSON.stringify(product));
            dispatch(setProductDetails(product, product.images));
            // dispatch(
            //   fetchMetafields(product.id.replace('gid://shopify/Product/', '')),
            // );
          } else {
            dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
          }
        })
        .catch(error => {
          console.log('error789', error, productId);
          dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
        })
        .finally(() => {
        });
    } catch (error) {
      console.log('error465', error);
      dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
    }
  };
};

export const fetchProductBySKU = (productId, sku) => {
  return async dispatch => {
    let productTemp;
    try {
      await dispatch(InitProduct());
      dispatch(LOADING(true));
      // console.log("fetch product", productId);
      let finalUrl = `${SEARCH_URL}&q=${sku}`;
      // console.log("fetchProductBySKU url", finalUrl);
      await fetch(`${finalUrl}`)
        .then(response => response.json())
        .then(product => {
          if (product.total_product > 0) {
            dispatch(GET_PRODUCT_AVAILABLE({productAvailable: 'YES'}));
            dispatch(
              setProductDetailsFromSearch(product.products[0], productId),
            );
          } else {
            // console.log("else")
            dispatch(GET_PRODUCT_AVAILABLE({productAvailable: 'NO'}));
          }
        })
        .catch(error => {
          console.error('error546 ', error);
          dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
        })
        .finally(() => {});
    } catch (error) {
      dispatch(
        FAILED({
          error: 'GET_PRODUCT_FAILED',
        }),
      );
    }
  };
};
export const fetchProductId = (productUrl, navigation) => {
  return async dispatch => {
    // console.log(productUrl);
    try {
      dispatch(LOADING(true));
      var config = {
        method: 'get',
        url: `${productUrl}.json`,
        // data: data,
        headers: {},
      };
      await axios(config)
        .then(function (response) {
          // console.log(response.data.product.id);
          let productId = response?.data?.product?.id;
          let sku = response?.data?.product?.variants[0]?.sku;

          dispatch(fetchProductBySKU(productId, sku));
          navigation.navigate('ProductScreen');
        })
        .catch(error => {
          console.log(error);
          dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
        });
    } catch (error) {}
  };
};

export const fetchSizeChart = productData => {
  return async dispatch => {
    try {
      let product;
      let sizeChartObj;
      // console.log("product", product);
      let config = {
        method: 'get',
        url: `https://pinnaclevastu-in/products/${productData?.handle}.json`,
        headers: {},
      };

      await axios
        .request(config)
        .then(response => {
          console.log(
            'response.data.product',
            JSON.stringify(response?.data?.product),
          );
          product = response?.data?.product;
          console.log('product', product);

          const productTags = product.tags ? product.tags : []; // SELECTED PRODUCT TAGS
          console.log('productTags', productTags);
          if (productTags.includes('boys')) {
            sizeChartObj = `boys-${product.product_type}-${product.vendor}`;
          } else if (productTags.includes('girls')) {
            sizeChartObj = `girls-${product.product_type}-${product.vendor}`;
          } else {
            sizeChartObj = `${product.product_type}-${product.vendor}`;
          }
          const formattedName = sizeChartObj.toLowerCase().replace(/\s+/g, '-');

          console.log('tagArray', formattedName);

          if (formattedName) {
            const url =
              `${WEB_PAGE}` + 'pages/' + formattedName + `?webview=yes`;

            const fetchJson =
              `${WEB_PAGE}` + 'pages/' + formattedName + `.json`;

            let temp = sizeChartObj;
            temp = {url: url, ...temp};

            axios
              .get(fetchJson)
              .then(response => {
                temp.html = response.data.page.body_html;
                temp.title = response.data.page.title;
                console.log('response', temp);

                dispatch(SIZE_CHART_SUCCESS(temp));
              })
              .catch(error => {
                console.error('error', error);
                dispatch(SIZE_CHART_SUCCESS([]));
              });

            // dispatch({
            //   type: SIZE_CHART_SUCCESS,
            //   payload: temp,
            // });
          } else {
            //IF NOT SIZE CHART
            dispatch(SIZE_CHART_SUCCESS([]));
          }
        })
        .catch(error => {
          console.log('response.data.product', error);
        });

      //https://www.westside.com/pages/
    } catch (error) {
      console.log('response.data.product', error);

      //IF NOT SIZE CHART
      dispatch(SIZE_CHART_SUCCESS([]));
    }
  };
};

export const fetchReletedProduct = productId => {
  return async dispatch => {
    try {
      dispatch(RELETED_PRODUCT_LOADING());
      const response = await getProductRecomendation(productId);
      if (response?.productRecommendations) {
        dispatch(RELETED_PRODUCT_SUCCESS(response?.productRecommendations));
      } else {
        dispatch(RELETED_PRODUCT_ERROR());
      }
    } catch (error) {
      dispatch(RELETED_PRODUCT_ERROR());
    }
  };
};
