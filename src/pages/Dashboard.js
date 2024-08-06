import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/login/userSlice';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login({name: auth.currentUser.displayName, email:auth.currentUser.email, uid: auth.currentUser.uid}))
  }, [])

  const logout = () => {
    signOut(auth);
    navigate('/');
  }

  return (
    <div>Dashboard {user.email}
      <button onClick={logout}>Logout</button>
    </div>
    
  )
}

export default Dashboard