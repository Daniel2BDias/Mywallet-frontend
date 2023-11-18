import { transactionsAPI } from "../api/transactions/transactionsAPI";

export async function authVerification(auth, navigate, setEntries) {
    try {
      if (auth) {
        const promise = await transactionsAPI.getEntries(auth?.token);
        setEntries(promise.data);
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(`${error}`);
      navigate("/");
    }
  }