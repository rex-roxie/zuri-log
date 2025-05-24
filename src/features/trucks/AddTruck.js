import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Search from '../AssignDriver/Search';


function AddTruck() {
    const initialTruckInfo = {
        truck_number: null,
        driver_assigned_to: '',
        registration_current_date: '',
        registration_expiry_date: '',
        inspection_current_date: '',
        inspection_expiry_date: '',
        vin_number: null
    }
  const [truck, setTruck] = useState(initialTruckInfo);
  const navigate = useNavigate();

  const colRef = collection(db, 'trucks');

  const addTruck = async (event) => {
      event.preventDefault();
      if (JSON.stringify(truck) === JSON.stringify(initialTruckInfo)) {
        console.log("No changes");
      } else {
        console.log("Need to add truck...")
        console.log(truck);
        await addDoc(colRef, {
            truck_number: truck.truck_number,
            driver_assigned_to: truck.driver_assigned_to,
            registration_current_date: truck.registration_current_date,
            registration_expiry_date: truck.registration_expiry_date,
            inspection_current_date: truck.inspection_current_date,
            inspection_expiry_date: truck.inspection_expiry_date,
            vin_number: truck.vin_number
        }).then(() => {
          navigate('/dashboard');
        });
        
      }
    }
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setTruck(truck => ({...truck, [name]: value}));
  }

  const handleDriverChange = (data) => {
    console.log(data);
    const name = 'driver_assigned_to';
    setTruck(truck => ({...truck, [name]: data}));
  }

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>Add Truck</h2>
      <form onSubmit={addTruck}>
        <ul>
          <li>
            <label>Truck Number: </label>
            <input name='truck_number' type='number' value={truck.truck_number} onChange={handleChange}/>
          </li>
          <li>
            <label>Driver Assigned To: </label>
            {/* <input name='driver_assigned_to' type='text' value={truck.driver_assigned_to} onChange={handleChange}/> */}
            <Search onDriverChange={handleDriverChange} />
          </li>
          <li>
            <label>Registration Current Date: </label>
            <input name='registration_current_date' type='text' value={truck.registration_current_date} onChange={handleChange}/>
          </li>
          <li>
            <label>Registration Expiry Date: </label>
            <input name='registration_expiry_date' type='text' value={truck.registration_expiry_date} onChange={handleChange} />
          </li>
          <li>
            <label>Inspection Current Date: </label>
            <input name='inspection_current_date' type='text' value={truck.inspection_current_date} onChange={handleChange} />
          </li>
          <li>
            <label>Inspection Expiry Date: </label>
            <input name='inspection_expiry_date' type='text' value={truck.inspection_expiry_date} onChange={handleChange} />
          </li>
          <li>
            <label>Vin Number: </label>
            <input name='vin_number' type='text' value={truck.vin_number} onChange={handleChange} />
          </li>
          {/* <li>
            <label>Certification: </label>
            <select name="certification" onChange={handleChange}>
            <option selected={driver.certification}>{driver.certification}</option>
              <option>Tanker Endorsement</option>
              <option>Both</option>
              <option>Neither</option>
            </select>
          </li> */}
        </ul>
        <button type='submit' onClick={addTruck}>Add Truck</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </form>
    </div>
  )

}

export default AddTruck