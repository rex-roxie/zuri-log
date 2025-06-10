import React, { useState } from 'react';
import './Nav.css'
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { auth, db } from '../../firebase';
import { FaHouseChimney } from "react-icons/fa6";
import { FaIdCard } from "react-icons/fa";
import { FaCaravan } from "react-icons/fa";
import { FaTruckRampBox } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";


function Nav() {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth);
    navigate('/');
  }

  const [bg, setBg] = useState('blue');
  const [bg2, setBg2] = useState('blue');
  const [bg3, setBg3] = useState('blue');
  const [bg4, setBg4] = useState('blue');
  const [bg5, setBg5] = useState('blue');
  const [bg6, setBg6] = useState('blue');
  

  return (
    <nav className='nav'>
      <i className="fa-house-chimney" onMouseEnter={() => {setBg('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg('blue')}} onClick={() => {
          navigate('/dashboard');
        }}><FaHouseChimney/></i>
      <i className="fa-id-card" onMouseEnter={() => {setBg2('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg2('blue')}}onClick={() => {
          navigate('/addDriver');
        }} ><FaIdCard/> </i>
      <i className="fa-caravan" onMouseEnter={() => {setBg3('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg3('blue')}} onClick={() => {
          navigate('/addTruck');
        }} ><FaCaravan/> </i>
      <i className="fa-truck-ramp-box" onMouseEnter={() => {setBg4('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg4('blue')}} onClick={() => {
          navigate('/addTrailor');
        }}><FaTruckRampBox/> </i>
      <i className="fa-truck" onMouseEnter={() => {setBg5('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg5('blue')}} onClick={() => {
          navigate('/addLoad');
        }}><FaTruck/></i>
      <i className="fa-arrow-right-from-bracket" onMouseEnter={() => {setBg6('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg6('blue')}} onClick={logout} ><FaArrowRightFromBracket/></i>
      <h3>Zuri Transportations LLC</h3>
      <ul>
        <li onClick={() => {
          navigate('/dashboard');
        }} onMouseEnter={() => {setBg('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg('blue')}} style={{backgroundColor: bg}}> <p>Dashboard</p></li>

        <li onClick={() => {
          navigate('/addDriver');
        }} onMouseEnter={() => {setBg2('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg2('blue')}} style={{backgroundColor: bg2}}><p>Add Driver</p></li>

        <li onClick={() => {
          navigate('/addTruck');
        }} onMouseEnter={() => {setBg3('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg3('blue')}} style={{backgroundColor: bg3}}><p>Add Truck</p></li>

        <li onClick={() => {
          navigate('/addTrailor');
        }} onMouseEnter={() => {setBg4('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg4('blue')}} style={{backgroundColor: bg4}}><p>Add Trailor</p></li>

        <li onClick={() => {
          navigate('/addLoad');
        }} onMouseEnter={() => {setBg5('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg5('blue')}} style={{backgroundColor: bg5}}><p>Add Load</p></li>
        <li onClick={logout} className='logout' onMouseEnter={() => {setBg6('rgba(0, 0, 0, 0.3)')}} onMouseLeave={() => {setBg6('blue')}} style={{backgroundColor: bg6}}><p>Logout</p></li>
      </ul>
      
    </nav>
  )
}

export default Nav;