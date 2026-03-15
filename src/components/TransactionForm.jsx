import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTransaction } from "../store/transactionsSlice"

function TransactionForm() {
  const [type, setType] = useState("expense")
  const [category, setCategory] = useState("Food")
  const [amount, setAmount] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount) return

    dispatch(addTransaction({
      id: Date.now(),
      type,
      category,
      amount: parseFloat(amount),
    }))

    setAmount("")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Add Transaction</h2>
      <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded mb-2">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded mb-2">
        <option>Food</option>
        <option>Transport</option>
        <option>Bills</option>
        <option>Shopping</option>
        <option>Other</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Add
      </button>
    </form>
  )
}

export default TransactionForm