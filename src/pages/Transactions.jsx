import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TransactionForm from "../components/TransactionForm";
import HistoryList from "../components/HistoryList";
import { addCategory } from "../store/transactionsSlice";

function Transactions() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const categories = useSelector((state) => state.transactions.categories);
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState("");

  const summary = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const formatAmount = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amt);

  
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
      setNewCategory("");
    }
  };

  return (
    <div className="p-6 space-y-6">
      
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Transactions Dashboard
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Income</h2>
          <p className="text-lg font-bold text-green-700">
            {formatAmount(summary.income)}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h2 className="text-sm font-medium text-gray-600">Total Expenses</h2>
          <p className="text-lg font-bold text-red-700">
            {formatAmount(summary.expense)}
          </p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h2 className="text-sm font-medium text-gray-600">Available Balance</h2>
          <p className="text-lg font-bold text-blue-700">
            {formatAmount(summary.balance)}
          </p>
        </div>
      </div>

      
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Manage Categories</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCategory}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
          >
            Add Category
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600">
          Current categories: {categories.join(", ")}
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">Add Transaction</h2>
          <TransactionForm />
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <HistoryList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default Transactions;