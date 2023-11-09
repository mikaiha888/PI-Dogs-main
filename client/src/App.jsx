import './App.css';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/Home';
import Nav from './modules/nav/Nav';
import Detail from './pages/detail/Detail';
import Catalogue from './pages/catalogue/Catalogue';
import Footer from './modules/footer/Footer';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div className='App'>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dogs" element={<Catalogue />} />
        <Route path="/about-us" element={<Profile />} />
        <Route path="/dogs/:id" element={<Detail />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
