import apiMethods from "../../methods/apiMethods";

/** Get on-call customer list */
export const getOnCallCustomerList = async () => {
  console.log('API: GET /salesperson/onCallCustomerList');
  const res = await apiMethods.get('/salesperson/onCallCustomerList');
  return res;
};

/** Add on-call customer */
export const addOnCallCustomer = async (body) => {
  console.log('API: POST /salesperson/addOnCallCustomer', body);
  const res = await apiMethods.post('/salesperson/addOnCallCustomer', body);
  console.log('reeeeeeeeee',res);  
  return res;
};

/** Update on-call customer */
export const updateOnCallCustomer = async (id, body) => {
  console.log('API: PUT /salesperson/updateOnCallCustomer', { id, body });
  // server expects id as query param in your original code
  const res = await apiMethods.put(`/salesperson/updateOnCallCustomer?id=${id}`, body);
  return res;
};

/** Delete on-call customer */
export const deleteOnCallCustomer = async (id) => {
  console.log('API: DELETE /salesperson/deleteOnCallCustomer', id);
  const res = await apiMethods.delete(`/salesperson/deleteOnCallCustomer?id=${id}`);
  return res;
};

// export default api;
