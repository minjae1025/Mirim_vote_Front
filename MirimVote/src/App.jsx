import './App.css'
import Index from './pages/Index'
import { Routes, Route } from 'react-router-dom';

function App() {
  

  return (
  
      // <Routes>
      //   <Route path="/" element={<Index />} />
      // </Routes>
     <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Index />} />
    </Routes>
    
  )
}

export default App
