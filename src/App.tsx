import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Aboutus from './components/Aboutus';
import Home from './components/Home';
import UserOpenPage from './components/UserOpenPage/UserOpenPage'




const App: React.FC = () => {
  return (
    <Router>
      <div className="nav-wrapper">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/aboutus">About</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/user/:id' element={<UserOpenPage />} />
        <Route path="/aboutus" element={<Aboutus />} />
      </Routes>
    </Router>
  );
};

export default App;
