import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/login/userSlice';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore';

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);

  const getDrivers = async () => {
    const querySnapshot = await getDocs(collection(db, "drivers"));
    const drivers = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setDrivers(drivers);
    console.log(drivers)
  }

  const getTrucks = async () => {
    const querySnapshot = await getDocs(collection(db, "trucks"));
    const trucks = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setTrucks(trucks);
    console.log(trucks)
  }

  useEffect(() => {
    dispatch(login({name: auth.currentUser.displayName, email:auth.currentUser.email, uid: auth.currentUser.uid}))
    getDrivers();
    getTrucks();
  }, [])

  const logout = () => {
    signOut(auth);
    navigate('/');
  }

  return (
    <div>Dashboard {user.email}
      <button onClick={logout}>Logout</button>
      <section>
        {drivers.map((driver) => {
          return <p onClick={() => {
            navigate(`/driverinfo/${driver.id}`)
          }}>{driver.first_name}</p>
        })}
      </section>
      <section>
        {trucks.map((truck) => {
          return <p onClick={() => {
            navigate(`/truckinfo/${truck.id}`)
          }}>{truck.truck_number}</p>
        })}
      </section>

      <button onClick={() => {
        navigate('/addDriver');
      }}>Add Driver</button>

      <button onClick={() => {
        navigate('/addTruck');
      }}>Add Truck</button>
      
    </div>
    
  )
}

export default Dashboard
