import './App.css'
import Dashboard from './pages/Dashboard'
import Vote from './pages/Vote'
import VoteEnd from './pages/VoteEnd'
import VoteResult from './pages/VoteResult'
import { Routes, Route } from 'react-router-dom';

function App() {
  

  return (
     <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vote/:type-president" element={<Vote />} />
      <Route path="/vote/vote-end" element={<VoteEnd />} />
      <Route path="/vote/result" element={<VoteResult />} />
    </Routes>
    
  )
}

export default App
