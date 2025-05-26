import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Search from '../AssignDriver/Search';


function AddTrailor() {
    const initialTrailorInfo = {
        trailor_number: null,
        driver_assigned_to: '',
        registration_current_date: '',
        registration_expiry_date: '',
        inspection_current_date: '',
        inspection_expiry_date: '',
        manufacture_date: '',
        vented: false,
        vin_number: null
    }
  const [trailor, setTrailor] = useState(initialTrailorInfo);
  const navigate = useNavigate();

  const colRef = collection(db, 'trailors');

  const addTrailor = async (event) => {
      event.preventDefault();
      if (JSON.stringify(trailor) === JSON.stringify(initialTrailorInfo)) {
        console.log("No changes");
      } else {
        console.log("Need to add trailor...")
        console.log(trailor);
        await addDoc(colRef, {
            trailor_number: trailor.trailor_number,
            driver_assigned_to: trailor.driver_assigned_to,
            registration_current_date: trailor.registration_current_date,
            registration_expiry_date: trailor.registration_expiry_date,
            inspection_current_date: trailor.inspection_current_date,
            inspection_expiry_date: trailor.inspection_expiry_date,
            manufacture_date: trailor.manufacture_date,
            vented: trailor.vented,
            vin_number: trailor.vin_number
        }).then(() => {
          navigate('/dashboard');
        });
        
      }
    }
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setTrailor(trailor => ({...trailor, [name]: value}));
  }

  const handleDriverChange = (data) => {
    console.log(data);
    const name = 'driver_assigned_to';
    setTrailor(trailor => ({...trailor, [name]: data}));
  }

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>Add Trailor</h2>
      <form onSubmit={addTrailor}>
        <ul>
          <li>
            <label>Trailor Number: </label>
            <input name='trailor_number' type='number' value={trailor.trailor_number} onChange={handleChange}/>
          </li>
          <li>
            <label>Driver Assigned To: </label>
            {/* <input name='driver_assigned_to' type='text' value={truck.driver_assigned_to} onChange={handleChange}/> */}
            <Search onDriverChange={handleDriverChange} value={trailor.driver_assigned_to} />
          </li>
          <li>
            <label>Registration Current Date: </label>
            <input name='registration_current_date' type='text' value={trailor.registration_current_date} onChange={handleChange}/>
          </li>
          <li>
            <label>Registration Expiry Date: </label>
            <input name='registration_expiry_date' type='text' value={trailor.registration_expiry_date} onChange={handleChange} />
          </li>
          <li>
            <label>Inspection Current Date: </label>
            <input name='inspection_current_date' type='text' value={trailor.inspection_current_date} onChange={handleChange} />
          </li>
          <li>
            <label>Inspection Expiry Date: </label>
            <input name='inspection_expiry_date' type='text' value={trailor.inspection_expiry_date} onChange={handleChange} />
          </li>
          <li>
            <label>Manufacture Date: </label>
            <input name='manufacture_date' type='text' value={trailor.manufacture_date} onChange={handleChange} />
          </li>
          <li>
            <label>Vented?: </label>
            <input name='vented' type='text' value={trailor.vented} onChange={handleChange} />
          </li>
          <li>
            <label>Vin Number: </label>
            <input name='vin_number' type='text' value={trailor.vin_number} onChange={handleChange} />
          </li>
        </ul>
        <button type='submit' onClick={addTrailor}>Add Trailor</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </form>
    </div>
  )

}

export default AddTrailor