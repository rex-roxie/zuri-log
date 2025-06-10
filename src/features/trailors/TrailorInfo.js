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

function TrailorInfo() {
  const [initialTrailorInfo, setInitialTrailorInfo] = useState({});
  const [trailor, setTrailor] = useState({});
  const [trailorEditForm, setTrailorEditForm] = useState('flex');
  const [deleteTrailorForm, setDeleteTrailorForm] = useState('none');

  const navigate = useNavigate();

  const { id } = useParams();
  const docRef = doc(db, 'trailors', id);

  const getTrailor = useCallback(async () => {
    const doc = await getDoc(docRef) 
    setTrailor(doc.data());
    setInitialTrailorInfo(doc.data());
  }, [])

  useEffect(() => {
    getTrailor()
  }, [getTrailor])

  const handleChange = (event) => {
    const {name, value} = event.target;
    setTrailor(trailor => ({...trailor, [name]: value}));
  }

  const editTrailor = async (event) => {
    event.preventDefault();
    if (JSON.stringify(trailor) === JSON.stringify(initialTrailorInfo)) {
      console.log("No changes");
    } else {
      console.log("Need to change trailor...")
      console.log(trailor);
      await updateDoc(docRef, {
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

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  const deleteConfirmation = (event) => {
    event.preventDefault();
    setTrailorEditForm('none');
    setDeleteTrailorForm('block');
  }

  const cancelDeletion = () => {
    setTrailorEditForm('flex');
    setDeleteTrailorForm('none');
  }

  const deleteTrailor = async () => {
    console.log("Deleting Trailor...");
    await deleteDoc(docRef).then(() => {
      console.log("Trailor was deleted")
      navigate('/dashboard');
    })
  }

  const handleDriverChange = (data) => {
    console.log(data);
    const name = 'driver_assigned_to';
    setTrailor(trailor => ({...trailor, [name]: data}));
  }

  return (
    <div className='forms'>
      <section style={{display: trailorEditForm}}>
        <h2>{trailor.vin_number}</h2>
        <form onSubmit={editTrailor}>
          <ul>
            <li>
                <label>Trailor Number: </label>
                <input name='trailor_number' type='number' value={trailor.trailor_number} onChange={handleChange}/>
            </li>
            <li>
                <label>Driver Assigned To: </label>
                <Search onDriverChange={handleDriverChange} value={trailor.driver_assigned_to}/>
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
          <div className='buttons'>
            <button type='submit' onClick={editTrailor}>Edit Trailor</button>
            <button type='button' onClick={cancel}>Cancel</button>
            <button type='button' onClick={deleteConfirmation}>Delete Trailor</button>
          </div>
        </form>
      </section>
      <section style={{display: deleteTrailorForm}} className='deleteConfirmation'>
        <h2>Are you sure you want to delete the trailor?</h2>
        <button onClick={deleteTrailor}>Yes</button>
        <button onClick={cancelDeletion}>No</button>
      </section>
    </div>
  )
}

export default TrailorInfo

