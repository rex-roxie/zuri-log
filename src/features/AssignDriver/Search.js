import React from 'react'
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

function Search({onDriverChange, value}) {
  const [driversList, setDriversList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    onDriverChange(event.target.value)
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
  }

  useEffect(() => {
    getDrivers();
  }, [])

  return (
    <div>
        <input name='driver_assigned_to' type='text' onChange={handleChange} value={value || ''}/>
        
        <section>
            {filteredList.map((x) => {
            return <p onClick={() => onDriverChange(x.first_name)} key={x.id}>{x.first_name}</p>
            })}
        </section>
    </div>
  )
}

export default Search