import axios from "axios";

function getEntries (token) {
    return axios.get(
        `${import.meta.env.VITE_API_URL}/transactions`,
        { headers: { authorization: `Bearer ${token}` } }
      );
};

function postIncome (token, body) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/nova-transacao/add`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

function postExpense (token, body) {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/nova-transacao/subtract`,
    body,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

function editIncome (id, body, auth) {
  return axios.put(
    `${import.meta.env.VITE_API_URL}/edit-entry/add/${id}`,
    body,
    { headers: { Authorization: `Bearer ${auth.token}` } }
  );
};

function editExpense (id, body, auth) {
    return axios.put(
      `${import.meta.env.VITE_API_URL}/edit-entry/subtract/${id}`,
      body,
      { headers: { Authorization: `Bearer ${auth.token}` } }
    );
};

function deleteEntry (id, token) {
  return axios.delete(
    `${import.meta.env.VITE_API_URL}/delete-entry/${id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const transactionsAPI = { getEntries, postIncome, postExpense, editIncome, editExpense, deleteEntry };