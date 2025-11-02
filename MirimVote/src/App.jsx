import './App.css'
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Vote from './pages/Vote'
import VoteEnd from './pages/VoteEnd'
import VoteStatus from './pages/VoteStatus'
import MyPage from './pages/MyPage'
import VoteManagement from './pages/VoteManagement'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path='/home' element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vote/:type-president" element={<Vote />} />
      <Route path="/vote/vote-end" element={<VoteEnd />} />
      <Route path="/vote/status" element={<VoteStatus />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/vote/management" element={<VoteManagement />} />
    </Routes>
  )
}

export default App
