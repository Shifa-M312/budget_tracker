import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../store/transactionsSlice";

function HistoryList({ transactions }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amt) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amt);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) =>
        search
          ? t.category.toLowerCase().includes(search.toLowerCase()) ||
            t.description?.toLowerCase().includes(search.toLowerCase())
          : true
      ),
    [transactions, search]
  );

  const exportCSV = () => {
    const headers = ["ID", "Date", "Type", "Category", "Amount"];
    const rows = filteredTransactions.map((t) => [
      t.id,
      formatDate(t.date),
      t.type,
      t.category,
      t.amount,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Transaction History</h2>


      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by category or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            Clear
          </button>
        )}
      </div>


      <div className="mb-4">
        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
        >
          Export CSV
        </button>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="text-gray-400 italic">No transactions found</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Date</th>
              <th className="p-2">Type</th>
              <th className="p-2">Category</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, idx) => (
              <tr
                key={t.id}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-2 text-sm text-gray-500">{formatDate(t.date)}</td>
                <td className="p-2">{t.type === "expense" ? "Expense" : "Income"}</td>
                <td className="p-2">{t.category}</td>
                <td
                  className={`p-2 font-semibold ${
                    t.type === "expense" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatAmount(t.amount)}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoryList;