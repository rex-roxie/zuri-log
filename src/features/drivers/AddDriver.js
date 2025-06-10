import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './AddDriver.css';

const titleCase = (str) => {
  if (!str) return false;

  return str.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
}

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

  const checkCitizenship = () => {
    let citizenshipOptions = [];
    switch(driver.citizenship) {
      case 'Non Citizen':
        citizenshipOptions = ['Citizen', 'Work Permit'];
        break;
      case 'Work Permit':
        citizenshipOptions = ['Citizen', 'Non Citizen'];
        break;  
      default:
        citizenshipOptions = ['Non Citizen', 'Work Permit'];
        break;
    }

    return citizenshipOptions;
  }

  const checkCertification = () => {
    let certificationOptions = [];
    switch(driver.certification) {
      case 'Tanker Endorsement':
        certificationOptions = ['Hazard', 'Both', 'Neither'];
        break;
      case 'Both':
        certificationOptions = ['Hazard', 'Tanker Endorsement', 'Neither'];
        break;  
      case 'Neither':
        certificationOptions = ['Hazard', 'Tanker Endorsement', 'Both'];
        break;
      default:
        certificationOptions = ['Tanker Endorsement', 'Both', 'Neither'];
        break;
    }

    return certificationOptions;
  }

  let citizenOptions = checkCitizenship();
  let certificationOptions = checkCertification();

  return (
    <div className='forms'>
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
              <option selected={driver.certification}>{titleCase(driver.certification)}</option>
              <option>{certificationOptions[0]}</option>
              <option>{certificationOptions[1]}</option>
              <option>{certificationOptions[2]}</option>
            </select>
          </li>
          <li>
            <label>Citizenship: </label>
            {/* <input defaultValue={driver.citizenship} onChange={(event) => {setCitizenship(event.target.value)}} /> */}
            <select name="citizenship" onChange={handleChange}>
              <option selected={driver.citizenship}>{titleCase(driver.citizenship)}</option>
              <option>{citizenOptions[0]}</option>
              <option>{citizenOptions[1]}</option>
            </select>
          </li>
        </ul>
        <div className='buttons'>
          <button type='submit' onClick={addDriver}>Add Driver</button>
          <button type='button' onClick={cancel}>Cancel</button>
        </div>
        
      </form>
    </div>
  )

}

export default AddDriver