import apiMethods from "../../methods/apiMethods";

// Get products API
export const getProducts = async () => {
  try {
    const response = await apiMethods.get('/product/productNames');
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get city/state from pincode API
// export const getCityState = async (pincode) => {
//   try {
//     const response = await api.get(`/admin/getCityState?pincode=${pincode}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching city/state:', error);
//     throw error;
//   }
// };

export const getCityState = async (pincode) => {
  try {
    console.log('API Call: Fetching city/state for pincode:', pincode);
    const response = await apiMethods.get(`/admin/getCityState?pincode=${pincode}`);
    
    console.log('API Response:', response.data);
    
    if (response.data && typeof response.data === 'object') {
      return response;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching city/state:', error);
    
    // More detailed error handling
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.status, error.response.data);
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      // Something else happened
      console.error('Error:', error.message);
      throw error;
    }
  }
};



// Calculate cart totals API
export const calculateCartTotals = async (productName, license, quantity) => {
  try {
    const response = await apiMethods.post('/cart/calculateGrandTotal', {
      productName,
      license,
      quantity
    });
    return response;
  } catch (error) {
    console.error('Error calculating cart totals:', error);
    throw error;
  }
};

// Send payment link API
export const sendPaymentLink = async (data) => {
  try {
    const response = await apiMethods.post('/proposal/sendPaymentLink', data);
    return response;
  } catch (error) {
    console.error('Error sending payment link:', error);
    throw error;
  }
};

// Save meeting minutes API
export const saveMeetingMinutes = async (data) => {
  try {
    const response = await apiMethods.post('/salesperson/addOnCallMoM', data);
    return response;
  } catch (error) {
    console.error('Error saving meeting minutes:', error);
    throw error;
  }
};

// Generate proposal PDF API
export const generateProposalPDF = async (data) => {
  try {
    const response = await apiMethods.post('/proposal/generatepdf', data);
    return response;
  } catch (error) {
    console.error('Error generating proposal PDF:', error);
    throw error;
  }
};

// export default api;