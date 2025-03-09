import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './features/login/SignIn';
import ProtectedRoute from './features/login/ProtectedRoute';
import { AuthProvider } from './features/login/AuthProvider';
import DriverInfo from './features/drivers/DriverInfo';
import AddDriver from './features/drivers/AddDriver';
import AddTruck from './features/trucks/AddTruck';
import TruckInfo from './features/trucks/TruckInfo';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/driverinfo/:id' element={<ProtectedRoute><DriverInfo /></ProtectedRoute>} />
        <Route path='/addDriver' element={<ProtectedRoute><AddDriver /></ProtectedRoute>} />
        <Route path='/truckinfo/:id' element={<ProtectedRoute><TruckInfo /></ProtectedRoute>} />
        <Route path='/addTruck' element={<ProtectedRoute><AddTruck /></ProtectedRoute>} />
      </Routes>
      <AuthProvider />
    </div>
  );
}

export default App;
