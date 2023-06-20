import axios from "axios";
export const httpGet = async (url) => {
  try {
    let response = await axios.get(process.env.REACT_APP_BASE_URL + url);
    return response.data;
  } catch (exception) {
    console.log(exception);
    return [];
  }
};
