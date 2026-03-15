import { useSelector } from "react-redux"

function HistoryList() {
  const transactions = useSelector((state) => state.transactions)

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Transaction History</h2>
      <ul>
        {transactions.length === 0 ? (
          <li className="text-gray-500">No transactions yet</li>
        ) : (
          transactions.map((t) => (
            <li key={t.id} className="flex justify-between border-b py-1">
              <span>{t.type} - {t.category}</span>
              <span className={t.type === "expense" ? "text-red-600" : "text-green-600"}>
                ₹{t.amount}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default HistoryList