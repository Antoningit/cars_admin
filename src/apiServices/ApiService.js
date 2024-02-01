import { SERVER_HOST } from "../constants";
import axios from "axios";
export const resolveIsAuth = async () => {
  // без trycatch в случае ошибки output не возвращается
  // а через then сначала возвращается значение, а потом то, что в промисе
  try {
    const output = await axios.get(`${SERVER_HOST}/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return output;
  } catch (error) {
    return null;
  }
};
