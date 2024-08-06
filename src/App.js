import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './features/login/SignIn';
import ProtectedRoute from './features/login/ProtectedRoute';
import { AuthProvider } from './features/login/AuthProvider';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      <AuthProvider />
    </div>
  );
}

export default App;
