import apiMethods from "../../methods/apiMethods";

export const getUserDetails = async (id) => {
  try {
    const res = await apiMethods.get(`/userDetails`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    console.error("Meetings API Error:", error);
    throw error;
  }
};