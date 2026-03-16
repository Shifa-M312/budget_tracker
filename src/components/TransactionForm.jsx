import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/transactionsSlice";

function TransactionForm() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.transactions.categories);

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category: "",
      type: "expense",
      description: "",
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, type, description } = formData;

    if (!amount || amount <= 0) {
      setError("Amount must be greater than 0");
      return;
    }
    if (!category) {
      setError("Please select a category");
      return;
    }

    dispatch(
      addTransaction({
        id: Date.now(), 
        type,
        category,
        amount: Number(amount),
        description,
        date: new Date().toISOString(),
      })
    );

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white shadow-md rounded-lg p-4"
    >
      {error && (
        <p className="text-red-600 text-sm" aria-live="polite">
          {error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional description"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;