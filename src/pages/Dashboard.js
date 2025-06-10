import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../features/login/userSlice';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Dashboard.css';
import Nav from '../features/NavBar/Nav';

function Dashboard() {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [trailors, setTrailors] = useState([]);
  const [loads, setLoads] = useState([]);
  const [driverSearch, setDriverSearch] = useState('');
  const [truckSearch, setTruckSearch] = useState('');
  const [trailorSearch, setTrailorSearch] = useState('');
  const [loadSearch, setLoadSearch] = useState('');

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

  const getTrailors = async () => {
    const querySnapshot = await getDocs(collection(db, "trailors"));
    const trailors = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setTrailors(trailors);
    console.log(trailors)
  }

  const getLoads = async () => {
    const querySnapshot = await getDocs(collection(db, "loads"));
    const loads = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    setLoads(loads);
    console.log(loads);
  }

  useEffect(() => {
    dispatch(login({name: auth.currentUser.displayName, email:auth.currentUser.email, uid: auth.currentUser.uid}))
    getDrivers();
    getTrucks();
    getTrailors();
    getLoads();
  }, [])

  return (
    <div className='dashboard'>
      <Nav />
      <main>
        <h1>Dashboard {user.email}</h1>
        <div className="lists">
          <section>
            <h2>Driver's List</h2>
            <input name='driverSearch' type='text' value={driverSearch} placeholder='Search Drivers..' onChange={(event) => setDriverSearch(event.target.value)}/>
            <div>
              {drivers.map((driver) => {
                if (driver.first_name.includes(driverSearch)) {
                  return <p onClick={() => {
                    navigate(`/driverinfo/${driver.id}`)
                  }} key={driver.id}>{driver.first_name}</p>
                }
              })}
            </div>
          </section>
          <section>
            <h2>Trucks List</h2>
            <input name='truckSearch' type='text' value={truckSearch} placeholder='Search Trucks..' onChange={(event) => setTruckSearch(event.target.value)}/>
            <div>
              {trucks.map((truck) => {
                if (truck.truck_number.includes(truckSearch)) {
                  return <p onClick={() => {
                    navigate(`/truckinfo/${truck.id}`)
                  }} key={truck.id}>{truck.truck_number}</p>
                }
              })}
            </div>
          </section>
          <section>
            <h2>Trailors List</h2>
            <input name='trailorSearch' type='text' value={trailorSearch} placeholder='Search Trailors..' onChange={(event) => setTrailorSearch(event.target.value)}/>
            <div>
              {trailors.map((trailor) => {
                if (trailor.trailor_number.includes(trailorSearch)) {
                  return <p onClick={() => {
                    navigate(`/trailorinfo/${trailor.id}`)
                  }} key={trailor.id}>{trailor.trailor_number}</p>
                }
              })}
            </div>
          </section>
          <section>
            <h2>Loads List</h2>
            <input name='loadSearch' type='text' value={loadSearch} placeholder='Search Loads..' onChange={(event) => setLoadSearch(event.target.value)}/>
            <div>
              {loads.map((load) => {
                if (load.load_number.includes(loadSearch)) {
                  return <p onClick={() => {
                    navigate(`/loadinfo/${load.id}`)
                  }} key={load.id}>{load.load_number}</p>
                }
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
    
  )
}

export default Dashboard
