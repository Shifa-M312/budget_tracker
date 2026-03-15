import TransactionForm from "../components/TransactionForm"
import HistoryList from "../components/HistoryList"

function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <TransactionForm />
      <HistoryList />
    </main>
  )
}

export default Home