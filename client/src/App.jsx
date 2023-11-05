import './App.css';
import { Route, Routes } from 'react-router-dom';

import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import Catalogue from './pages/catalogue/Catalogue';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<Catalogue />} />
        <Route path="/dogs/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}

export default App
