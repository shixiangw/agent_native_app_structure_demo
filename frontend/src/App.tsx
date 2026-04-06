import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  )
}

export default App
