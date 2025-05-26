import React, { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import Search from '../AssignDriver/Search';


const titleCase = (str) => {
  if (!str) return false;

  return str.split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
}

function TruckInfo() {
  const [initialTruckInfo, setInitialTruckInfo] = useState({});
  const [truck, setTruck] = useState({});
  const [truckEditForm, setTruckEditForm] = useState('block');
  const [deleteTruckForm, setDeleteTruckForm] = useState('none');

  const navigate = useNavigate();

  const { id } = useParams();
  const docRef = doc(db, 'trucks', id);

  const getTruck = useCallback(async () => {
    const doc = await getDoc(docRef) 
    setTruck(doc.data());
    setInitialTruckInfo(doc.data());
  }, [])

  useEffect(() => {
    getTruck()
  }, [getTruck])

//   const checkCertification = () => {
//     let certificationOptions = [];
//     switch(driver.certification) {
//       case 'Tanker Endorsement':
//         certificationOptions = ['Hazard', 'Both', 'Neither'];
//         break;
//       case 'Both':
//         certificationOptions = ['Hazard', 'Tanker Endorsement', 'Neither'];
//         break;  
//       case 'Neither':
//         citizenOptions = ['Hazard', 'Tanker Endorsement', 'Both']
//       default:
//         certificationOptions = ['Tanker Endorsement', 'Both', 'Neither'];
//     }

//     return certificationOptions;
//   }

//   let certificationOptions = checkCertification();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setTruck(truck => ({...truck, [name]: value}));
  }

  const editTruck = async (event) => {
    event.preventDefault();
    if (JSON.stringify(truck) === JSON.stringify(initialTruckInfo)) {
      console.log("No changes");
    } else {
      console.log("Need to change truck...")
      console.log(truck);
      await updateDoc(docRef, {
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

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  const deleteConfirmation = (event) => {
    event.preventDefault();
    setTruckEditForm('none');
    setDeleteTruckForm('block');
  }

  const cancelDeletion = () => {
    setTruckEditForm('block');
    setDeleteTruckForm('none');
  }

  const deleteTruck = async () => {
    console.log("Deleting Truck...");
    await deleteDoc(docRef).then(() => {
      console.log("Truck was deleted")
      navigate('/dashboard');
    })
  }

  const handleDriverChange = (data) => {
    console.log(data);
    const name = 'driver_assigned_to';
    setTruck(truck => ({...truck, [name]: data}));
  }

  return (
    <div>
      <section style={{display: truckEditForm}}>
        <h2>{truck.vin_number}</h2>
        <form onSubmit={editTruck}>
        <ul>
          <li>
            <label>Truck Number: </label>
            <input name='truck_number' type='number' value={truck.truck_number} onChange={handleChange}/>
          </li>
          <li>
            <label>Driver Assigned To: </label>
            {/* <input name='driver_assigned_to' type='text' value={truck.driver_assigned_to} onChange={handleChange}/> */}
            <Search onDriverChange={handleDriverChange} value={truck.driver_assigned_to}/>
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
              <label>Citizenship: </label>
              {/* <input defaultValue={driver.citizenship} onChange={(event) => {setCitizenship(event.target.value)}} /> 
              <select name="citizenship" onChange={handleChange}>
                <option selected={driver.citizenship}>{titleCase(driver.citizenship)}</option>
                <option>{citizenOptions[0]}</option>
                <option>{citizenOptions[1]}</option>
              </select>
            </li> */}
          </ul>
          <button type='submit' onClick={editTruck}>Edit Truck</button>
          <button type='button' onClick={cancel}>Cancel</button>
          <button type='button' onClick={deleteConfirmation}>Delete Truck</button>
        </form>
      </section>
      <section style={{display: deleteTruckForm}}>
        <h2>Are you sure you want to delete the truck?</h2>
        <button onClick={deleteTruck}>Yes</button>
        <button onClick={cancelDeletion}>No</button>
      </section>
    </div>
  )
}

export default TruckInfo

