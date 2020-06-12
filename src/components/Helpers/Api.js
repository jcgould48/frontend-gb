import Axios from "./Axios";
import { isAuthenticated } from "./AuthHelpers";


export const getScores = async (id) => {
  try {
    let success = await Axios.get(`/api/games/find-score/${id}`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + isAuthenticated(),
      },
    });
    return success.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const resetScore = async (id) => {
  try {
    let success = await Axios.put(
      `/api/games/reset-score/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + isAuthenticated(),
        },
      }
    );
    return success.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const updateScore = async (id, score) => {
  try {
    let success = await Axios.put(`/api/games/update-score/${id}`, score)
    // {
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + isAuthenticated(),
    //   },
    // });

    return success.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};


