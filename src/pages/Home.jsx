import React from "react";
import { useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import BudgetView from "../components/BudgetView";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Home() {
  const transactions = useSelector((state) => state.transactions.transactions);
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Totals
  const income = safeTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = safeTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expense;

  const pieData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#34d399", "#f87171"],
      },
    ],
  };

  return (
    <main className="pt-20 px-4">
      {/* Added pt-20 so content sits below Navbar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-green-300 to-green-500 text-center 
                        transform transition duration-300 hover:scale-105 hover:shadow-xl 
                        border-2 border-transparent hover:border-green-400 hover:shadow-green-400/50">
          <h2 className="font-semibold">Total Income</h2>
          <p className="text-2xl">₹{income}</p>
        </div>

        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-red-300 to-red-500 text-center 
                        transform transition duration-300 hover:scale-105 hover:shadow-xl 
                        border-2 border-transparent hover:border-red-400 hover:shadow-red-400/50">
          <h2 className="font-semibold">Total Expense</h2>
          <p className="text-2xl">₹{expense}</p>
        </div>

        <div className="p-6 rounded-lg shadow text-white bg-gradient-to-r from-blue-300 to-blue-500 text-center 
                        transform transition duration-300 hover:scale-105 hover:shadow-xl 
                        border-2 border-transparent hover:border-blue-400 hover:shadow-blue-400/50">
          <h2 className="font-semibold">Available Balance</h2>
          <p className="text-2xl">₹{balance}</p>
        </div>
      </div>

      {/* Pie chart section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow 
                      transform transition duration-300 hover:scale-105 hover:shadow-xl 
                      border-2 border-transparent hover:border-gray-300 hover:shadow-gray-400/50">
        <h2 className="font-semibold mb-4">Income vs Expense</h2>
        <Pie data={pieData} />
      </div>

      {/* Budget view section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow 
                      transform transition duration-300 hover:scale-105 hover:shadow-xl 
                      border-2 border-transparent hover:border-gray-300 hover:shadow-gray-400/50">
        <BudgetView />
      </div>
    </main>
  );
}

export default Home;