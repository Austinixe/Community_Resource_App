import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateResource from './pages/CreateResource';
import ResourceDetail from './pages/ResourceDetail';
import MyResources from './pages/MyResources';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-resource" element={<CreateResource />} />
          <Route path="/resource/:id" element={<ResourceDetail />} />
          <Route path="/my-resources" element={<MyResources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;