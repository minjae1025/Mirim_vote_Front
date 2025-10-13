import './App.css'
import Index from './pages/Index'
import Vote from './pages/Vote'
import VoteEnd from './pages/VoteEnd'
import { Routes, Route } from 'react-router-dom';

function App() {
  

  return (
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
      <Route path="/vote/:type-president" element={<Vote />} />
      <Route path="/vote/vote-end" element={<VoteEnd />} />
    </Routes>
    
  )
}

export default App
