import apiMethods from "../../methods/apiMethods";


// Initiate call
export const initiateCall = async (phone, token) => {
  console.log('A /meetings/initiatecall', phone);
  const response = await apiMethods.get(`/meetings/initiatecall?phone=${phone}`, { });
  return response;
};

// Verify OTP
export const verifyMobileNumber = async (phone, otp, token) => {
  console.log('API called: /sms/verifyMobileNumber', phone, otp);
  const response = await apiMethods.post(`/sms/verifyMobileNumber?number=${phone}&otp=${otp}`, {}, { headers });
  return response.data;
};
