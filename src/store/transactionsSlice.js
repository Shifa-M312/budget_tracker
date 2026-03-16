import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: [],
  categories: ["Food", "Transport", "Bills", "Entertainment"],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const payload = action.payload;
      if (!payload || !payload.amount) return;

      state.transactions.push({
        ...payload,
        id: payload.id || Date.now(),
        type: payload.type || "expense",
        date: payload.date || new Date().toISOString(),
      });
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },

    addCategory: (state, action) => {
      const newCategory = action.payload?.trim();
      if (!newCategory) return;

      const normalized =
        newCategory.charAt(0).toUpperCase() + newCategory.slice(1).toLowerCase();
      const exists = state.categories.some(
        (c) => c.toLowerCase() === normalized.toLowerCase()
      );

      if (!exists) {
        state.categories.push(normalized);
      }
    },

    clearTransactions: (state) => {
      state.transactions = [];
    },

    editTransaction: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.transactions.findIndex((t) => t.id === id);
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          ...updates,
        };
      }
    },
  },
});

export const {
  addTransaction,
  deleteTransaction,
  addCategory,
  clearTransactions,
  editTransaction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;