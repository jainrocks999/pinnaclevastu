
import Config from "../common/config.json";

export const checkout = async (product, navigation) => {
  let lineItemsToAdd = product.map((item) => ({
    
    
    merchandiseId: item.id, 
    quantity: item.qty,
  }));

  const query = `
    mutation CartCreate {
      cartCreate(input: {
        lines: ${JSON.stringify(lineItemsToAdd).replace(/"([^"]+)":/g, '$1:')}
      }) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          message
        }
      }
    }
  `;


  try {
    const response = await fetch(Config.Shopify.graphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": Config.Shopify.storeAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const jsonResponse = await response.json();
   
  
    const checkoutUrl = jsonResponse?.data?.cartCreate?.cart?.checkoutUrl;
   
    if (checkoutUrl) {

      navigation.navigate('CartWeb', {
                             Url: checkoutUrl,
                              name: 'cart',
                         });
      return checkoutUrl;
    } else {
      Alert.alert("Error", "Failed to create checkout.");
      return null;
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong.");
    console.error("Checkout Error:", error);
    return null;
  }
};

