import './App.css'
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Vote from './pages/Vote'
import VoteEnd from './pages/VoteEnd'
import VoteResult from './pages/VoteResult'
import MyPage from './pages/MyPage'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path='/home' element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vote/:type-president" element={<Vote />} />
      <Route path="/vote/vote-end" element={<VoteEnd />} />
      <Route path="/vote/result" element={<VoteResult />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default App
