import axios from 'axios';

const BASE_URL = "http://localhost:3000/api";

const axiosInstance = axios.create({
    baseURL:BASE_URL,
});


export const fetchTodaysSales = async () => {
  try {
    const response = await axiosInstance.get('/todays-sales');
    return response.data;
  } catch (error) {
    console.error("Error fetching today's sales:", error);
    throw error;
  }
};

export const fetchSalesComparison = async (date1, date2) => {
  try {
    const response = await axiosInstance.get('/sales-comparison', {
      params: { date1, date2 }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sales comparison:", error);
    throw error;
  }
};
