import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';


const titleCase = (str) => {
  if (!str) return false;

  return str.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
}

function DriverInfo() {
  const [initialDriverInfo, setInitialDriverInfo] = useState({});
  const [driver, setDriver] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  const docRef = doc(db, 'drivers', id);

  const getDriver = useCallback(async () => {
    const doc = await getDoc(docRef) 
    setDriver(doc.data());
    setInitialDriverInfo(doc.data());
  }, [])

  useEffect(() => {
    getDriver()
  }, [getDriver])

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
    }

    return citizenshipOptions;
  }

  let citizenOptions = checkCitizenship();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setDriver(driver => ({...driver, [name]: value}));
  }

  const editDriver = async (event) => {
    event.preventDefault();
    if (JSON.stringify(driver) === JSON.stringify(initialDriverInfo)) {
      console.log("No changes");
    } else {
      console.log("Need to change driver...")
      console.log(driver);
      await updateDoc(docRef, {
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

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>{driver.first_name} {driver.last_name}</h2>
      <form onSubmit={editDriver}>
        <ul>
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
            <input name='certification' type='text' value={driver.certification} onChange={handleChange} />
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
        <button type='submit' onClick={editDriver}>Edit Driver</button>
        <button type='button' onClick={cancel}>Cancel</button>
      </form>
    </div>
  )
}

export default DriverInfo

