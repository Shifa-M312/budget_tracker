import { createSlice } from "@reduxjs/toolkit"

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload)
    },
    clearTransactions: () => {
      return []
    },
  },
})

export const { addTransaction, clearTransactions } = transactionsSlice.actions
export default transactionsSlice.reducer