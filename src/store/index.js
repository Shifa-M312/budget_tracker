import transactionsReducer from "./transactionsSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
  },
});