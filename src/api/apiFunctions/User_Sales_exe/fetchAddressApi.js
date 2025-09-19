import apiMethods from "../../methods/apiMethods";

// Fetch address suggestions
export const fetchAddressSuggestions = async (input) => {
  try {
    console.log('API call: /admin/placeSuggestions', input);
    const res = await apiMethods.get(`/admin/placeSuggestions?input=${encodeURIComponent(input)}`);
    return res;
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
};

// export default api;
