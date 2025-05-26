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
import TrailorInfo from './features/trailors/TrailorInfo';
import AddTrailor from './features/trailors/AddTrailor';
import AddLoad from './features/loads/AddLoad';
import LoadInfo from './features/loads/LoadInfo';

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
        <Route path='/trailorinfo/:id' element={<ProtectedRoute><TrailorInfo /></ProtectedRoute>} />
        <Route path='/addTrailor' element={<ProtectedRoute><AddTrailor /></ProtectedRoute>} />
        <Route path='/loadinfo/:id' element={<ProtectedRoute><LoadInfo /></ProtectedRoute>} />
        <Route path='/addLoad' element={<ProtectedRoute><AddLoad /></ProtectedRoute>} />
      </Routes>
      <AuthProvider />
    </div>
  );
}

export default App;
