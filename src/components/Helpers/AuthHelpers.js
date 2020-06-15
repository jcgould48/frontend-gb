import Axios from "./Axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export const createUser = async (userInfo) => {
  try {
    let success = await Axios.post("/api/users/create-user", userInfo);

    return success.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const loginUser = async (userInfo) => {
  try {
    let success = await Axios.post("/api/users/login", userInfo, {
      withCredentials: true,
    });

    return success.data;
  } catch (e) {
    console.log(e);
    throw Error(e.response.data.message);
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  let foundCookie = Cookies.get("jwt-cookie-expense");

  if (foundCookie) {
    return foundCookie;
  } else {
    return false;
  }
};

export const setUserAuth = (jwtToken, dispatch) => {
  let decodedToken = jwt_decode(jwtToken);
  console.log(decodedToken);
  
  dispatch({
    type: "SUCCESS_SIGNED_IN",
    payload: decodedToken,
  });
};

export const logout = async () => {
  try {
    await Axios.get("/api/users/logout",{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthenticated(),
      }});
    Cookies.remove("jwt-cookie-expense");
    Cookies.remove("jwt-cookie-refresh-expense");
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const editUser= async (id,userInfo)=>{
  try {
    let success = await Axios.put(`/api/users/update-user/${id}`,userInfo,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthenticated(),
      }},)
    return success.data
  } catch (error) {
    throw Error(error.response.data.message)
  }
}

export const deleteUser = async(id)=>{
  try {
    let success = await Axios.delete(`/api/users/delete-user/${id}`,{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthenticated(),
      }})
      return success
  } catch (error) {
    console.log(error);
    
    throw Error(error.response.data.message)
  }
}