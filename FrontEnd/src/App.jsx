import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import UserHome from './pages/Logado/Logado.jsx';
import Register from './pages/SingUp/SingUp.jsx';
import Header from './components/Header/Header';

function HeaderRoute({ children }) {
  const location = useLocation();
  const headerPaths = ['/', '/userArea'];
  const shouldRenderHeader = headerPaths.includes(location.pathname);

  return (
    <>
      {shouldRenderHeader && <Header />}
      {children}
    </>
  );
}

const isAuthenticated = localStorage.getItem('access_token');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeaderRoute><Home /></HeaderRoute>} />
        <Route path="/login" element={<HeaderRoute><Login /></HeaderRoute>} />
        <Route path="/register" element={<HeaderRoute><Register /></HeaderRoute>} />
        {isAuthenticated ? (
          console.log('teste'),
          <Route path="/userArea" element={<HeaderRoute><UserHome /></HeaderRoute>} />
        ) : (
          console.log(isAuthenticated),
          <Route path="/*" element={<Home />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
