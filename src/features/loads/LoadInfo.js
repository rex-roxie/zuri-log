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

function LoadInfo() {
  const [initialLoadInfo, setInitialLoadInfo] = useState({});
  const [load, setLoad] = useState({});
  const [loadEditForm, setLoadEditForm] = useState('block');
  const [deleteLoadForm, setDeleteLoadForm] = useState('none');

  const navigate = useNavigate();

  const { id } = useParams();
  const docRef = doc(db, 'loads', id);

  const getLoad = useCallback(async () => {
    const doc = await getDoc(docRef) 
    setLoad(doc.data());
    setInitialLoadInfo(doc.data());
  }, [])

  useEffect(() => {
    getLoad()
  }, [getLoad])

  const handleChange = (event) => {
    const {name, value} = event.target;
    setLoad(load => ({...load, [name]: value}));
  }

  const editLoad = async (event) => {
    event.preventDefault();
    if (JSON.stringify(load) === JSON.stringify(initialLoadInfo)) {
      console.log("No changes");
    } else {
      console.log("Need to change load...")
      console.log(load);
      await updateDoc(docRef, {
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

  const cancel = (event) => {
    event.preventDefault();
    navigate('/dashboard');
  }

  const deleteConfirmation = (event) => {
    event.preventDefault();
    setLoadEditForm('none');
    setDeleteLoadForm('block');
  }

  const cancelDeletion = () => {
    setLoadEditForm('block');
    setDeleteLoadForm('none');
  }

  const deleteLoad = async () => {
    console.log("Deleting Load...");
    await deleteDoc(docRef).then(() => {
      console.log("Load was deleted")
      navigate('/dashboard');
    })
  }

  const handleDriverChange = (data) => {
    console.log(data);
    const name = 'driver_assigned_to';
    setLoad(load => ({...load, [name]: data}));
  }

  return (
    <div>
      <section style={{display: loadEditForm}}>
        <h2>{load.vin_number}</h2>
        <form onSubmit={editLoad}>
          <ul>
            <li>
                <label>Load Number: </label>
                <input name='load_number' type='number' value={load.load_number || ""} onChange={handleChange}/>
            </li>
            <li>
                <label>Driver Assigned To: </label>
                <Search onDriverChange={handleDriverChange} value={load.driver_assigned_to || ""} />
            </li>
            <li>
                <label>Pickup Date: </label>
                <input name='pickup_date' type='text' value={load.pickup_date || ""} onChange={handleChange}/>
            </li>
            <li>
                <label>Pickup Location: </label>
                <input name='pickup_location' type='text' value={load.pickup_location || ""} onChange={handleChange} />
            </li>
            <li>
                <label>Dropoff Location: </label>
                <input name='dropoff_location' type='text' value={load.dropoff_location || ""} onChange={handleChange} />
            </li>
          </ul>
          <button type='submit' onClick={editLoad}>Edit Load</button>
          <button type='button' onClick={cancel}>Cancel</button>
          <button type='button' onClick={deleteConfirmation}>Delete Load</button>
        </form>
      </section>
      <section style={{display: deleteLoadForm}}>
        <h2>Are you sure you want to delete the load?</h2>
        <button onClick={deleteLoad}>Yes</button>
        <button onClick={cancelDeletion}>No</button>
      </section>
    </div>
  )
}

export default LoadInfo

