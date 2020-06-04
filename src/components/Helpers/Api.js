import Axios from "./Axios";
import { isAuthenticated } from "./AuthHelpers";

export const createExpense = async (expense) => {
  try {
    let success = await Axios.post("/api/expense/create-expense", expense, {
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

export const getAllExpenses = async () => {
  try {
    let success = await Axios.get("/api/expense/get-all-expenses", {
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

export const deleteExpenseByID = async (id) => {
  try {
    let success = await Axios.delete(
      `/api/expense/delete-expense-by-id/${id}`,
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

export const editExpense = async (expense) => {
  try {
    let success = await Axios.put(
      `/api/expense/edit-expense`, expense,
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