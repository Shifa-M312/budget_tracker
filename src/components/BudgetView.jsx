import React, { useState } from "react";
import { useSelector } from "react-redux";

function BudgetView() {

  const transactions = useSelector((state) => state.transactions.transactions);
  const [goal, setGoal] = useState("");

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;
  const remaining = goal ? Number(goal) - expenses : null;

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
      <div className="space-y-2 mb-4">
        <p className="text-green-600 font-bold">
          Total Income: ₹{income.toFixed(2)}
        </p>
        <p className="text-red-600 font-bold">
          Total Expenses: ₹{expenses.toFixed(2)}
        </p>
        <p className="text-blue-600 font-bold">
          Remaining Balance: ₹{balance.toFixed(2)}
        </p>
      </div>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Set Monthly Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {goal && (
          <p className="font-semibold">
            Goal: ₹{goal} | Spent: ₹{expenses.toFixed(2)} | Remaining: ₹
            {remaining.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}

export default BudgetView;