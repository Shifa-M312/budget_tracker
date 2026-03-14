import TransactionForm from "../components/TransactionForm"
import Analytics from "../components/Analytics"
import BudgetView from "../components/BudgetView"
import HistoryList from "../components/HistoryList"

function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <TransactionForm />
      <Analytics />
      <BudgetView />
      <HistoryList />
    </main>
  )
}

export default Home