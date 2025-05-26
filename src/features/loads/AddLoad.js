import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Search from '../AssignDriver/Search';


function AddLoad() {
    const initialLoadInfo = {
        load_number: null,
        driver_assigned_to: '',
        pickup_date: '',
        pickup_location: '',
        dropoff_location: ''
    }
  const [load, setLoad] = useState(initialLoadInfo);
  const navigate = useNavigate();

  const colRef = collection(db, 'loads');

  const addLoad = async (event) => {
      event.preventDefault();
      if (JSON.stringify(load) === JSON.stringify(initialLoadInfo)) {
        console.log("No changes");
      } else {
        console.log("Need to add load...")
        console.log(load);
        await addDoc(colRef, {
            load_number: load.load_number,
            driver_assigned_to: load.driver_assigned_to,
            pickup_date: load.pickup_date,
            pickup_location: load.pickup_location,
            dropoff_location: load.dropoff_location
        }).then(() => {
          navigate('/dashboard');
        });
        
      }
    }
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setLoad(load => ({...load, [name]: value}));
  }

  const handleDriverChange = (data) => {
    console.log(data);
    const name = 'driver_assigned_to';
    setLoad(load => ({...load, [name]: data}));
  }

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>Add Load</h2>
      <form onSubmit={addLoad}>
        <ul>
          <li>
            <label>Load Number: </label>
            <input name='load_number' type='number' value={load.load_number} onChange={handleChange}/>
          </li>
          <li>
            <label>Driver Assigned To: </label>
            {/* <input name='driver_assigned_to' type='text' value={truck.driver_assigned_to} onChange={handleChange}/> */}
            <Search onDriverChange={handleDriverChange} value={load.driver_assigned_to} />
          </li>
          <li>
            <label>Pickup Date: </label>
            <input name='pickup_date' type='text' value={load.pickup_date} onChange={handleChange}/>
          </li>
          <li>
            <label>Pickup Location: </label>
            <input name='pickup_location' type='text' value={load.pickup_location} onChange={handleChange} />
          </li>
          <li>
            <label>Dropoff Location: </label>
            <input name='dropoff_location' type='text' value={load.dropoff_location} onChange={handleChange} />
          </li>
        </ul>
        <button type='submit' onClick={addLoad}>Add Load</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </form>
    </div>
  )

}

export default AddLoad;