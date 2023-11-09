import './App.css';
import { Route, Routes } from 'react-router-dom';

import Landing from './pages/landing/Landing';
import Home from './pages/home/Home';
import Nav from './modules/nav/Nav';
import Detail from './pages/detail/Detail';
import Catalogue from './pages/catalogue/Catalogue';
import Footer from './modules/footer/Footer';

function App() {
  return (
    <div className='App'>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<Catalogue />} />
        <Route path="/dogs/:id" element={<Detail />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
