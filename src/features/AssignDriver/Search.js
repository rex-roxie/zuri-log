import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function Search({onDriverChange}) {
  const [driver, setDriver] = useState('');
  const [driversList, setDriversList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    setDriver(event.target.value);
    results(event.target.value);
  }

  const getDrivers = async () => {
      const querySnapshot = await getDocs(collection(db, "drivers"));
      const drivers = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
      setDriversList(drivers);
  }

  const results = (value) => {
    setFilteredList([]);

    let newList = driversList.filter((x) => {
        return x.first_name.toLowerCase().includes(value.toLowerCase());
    })
    
    if (newList.length > 0) {
      setFilteredList(newList);
    }
    
    console.log(newList);  
    console.log(driver);
    onDriverChange(driver);
  }

  useEffect(() => {
    getDrivers();
  }, [])

  return (
    <div>
        <li>
            <input name='driver_assigned_to' type='text' onChange={handleChange} value={driver}/>
        </li>
        <section>
            {filteredList.map((x) => {
            return <p onClick={() => setDriver(x.first_name)} key={x.id}>{x.first_name}</p>
            })}
        </section>
    </div>
  )
}

export default Search