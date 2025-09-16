import apiMethods from "../../methods/apiMethods";

export const getWalkinHistory = async (id) => {
  try {
    const res = await apiMethods.get(`/salesperson/walkInDetailsById/${id}`, {
      // headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (error) {
    console.error("Meetings API Error:", error);
    throw error;
  }
};