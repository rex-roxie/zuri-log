import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


function AddDriver() {
    const initialDriverInfo = {
        first_name: '',
        last_name: '',
        email: '',
        phone: null,
        truck_number: null,
        certification: 'Hazard',
        citizenship: 'Citizen',
        driver_license_numbers: null,
        driver_license_expiry_date: '',
        medical_card_expiry_date: '',
        medical_card_number: null
    }
  const [driver, setDriver] = useState(initialDriverInfo);
  const navigate = useNavigate();

  const colRef = collection(db, 'drivers');

  const addDriver = async (event) => {
      event.preventDefault();
      if (JSON.stringify(driver) === JSON.stringify(initialDriverInfo)) {
        console.log("No changes");
      } else {
        console.log("Need to add driver...")
        console.log(driver);
        await addDoc(colRef, {
          first_name: driver.first_name,
          last_name: driver.last_name,
          email: driver.email,
          phone: driver.phone,
          truck_number: driver.truck_number,
          certification: driver.certification,
          citizenship: driver.citizenship,
          driver_license_numbers: driver.driver_license_numbers,
          driver_license_expiry_date: driver.driver_license_expiry_date,
          medical_card_expiry_date: driver.medical_card_expiry_date,
          medical_card_number: driver.medical_card_number
        }).then(() => {
          navigate('/dashboard');
        });
        
      }
    }
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setDriver(driver => ({...driver, [name]: value}));
  }

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>Add Driver</h2>
      <form onSubmit={addDriver}>
        <ul>
          <li>
            <label>First Name: </label>
            <input name='first_name' type='text' value={driver.first_name} onChange={handleChange}/>
          </li>
          <li>
            <label>Last Name: </label>
            <input name='last_name' type='text' value={driver.last_name} onChange={handleChange}/>
          </li>
          <li>
            <label>Email: </label>
            <input name='email' type='email' value={driver.email} onChange={handleChange}/>
          </li>
          <li>
            <label>Phone: </label>
            <input name='phone' type='number' value={driver.phone} onChange={handleChange} />
          </li>
          <li>
            <label>Medical Card Number: </label>
            <input name='medical_card_number' type='number' value={driver.medical_card_number} onChange={handleChange} />
          </li>
          <li>
            <label>Medical Card Expiry Date: </label>
            <input name='medical_card_expiry_date' type='text' value={driver.medical_card_expiry_date} onChange={handleChange} />
          </li>
          <li>
            <label>Truck Number: </label>
            <input name='truck_number' type='number' value={driver.truck_number} onChange={handleChange} />
          </li>
          <li>
            <label>Driver License Number: </label>
            <input name='driver_license_numbers' type='number' value={driver.driver_license_numbers} onChange={handleChange} />
          </li>
          <li>
            <label>Driver License Expiry Date: </label>
            <input name='driver_license_expiry_date' type='text' value={driver.driver_license_expiry_date} onChange={handleChange} />
          </li>
          <li>
            <label>Certification: </label>
            <select name="certification" onChange={handleChange}>
            <option selected={driver.certification}>{driver.certification}</option>
              <option>Tanker Endorsement</option>
              <option>Both</option>
              <option>Neither</option>
            </select>
          </li>
          <li>
            <label>Citizenship: </label>
            <select name="citizenship" onChange={handleChange}>
            <option selected={driver.citizenship}>{driver.citizenship}</option>
              <option>Non Citizen</option>
              <option>Work Permit</option>
            </select>
          </li>
        </ul>
        <button type='submit' onClick={addDriver}>Add Driver</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </form>
    </div>
  )

}

export default AddDriver