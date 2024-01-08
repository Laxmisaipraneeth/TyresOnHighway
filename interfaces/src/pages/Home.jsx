import Navbar from "../components/Navbar"
import User from "../components/User"
import Tollgate from "../components/Tollgate"
import TollLogin from "../components/TollLogin"
import DealerReports from "../components/DealerReports"
import ManuLogin from "../components/ManuLogin"
import React from 'react';
import './home.css'
import { useNavigate } from "react-router"

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="home-container" >
      <div className="background-image">
        <div className="content">
          <h1>Welcome to TOH</h1>
          <h2>The one stop service for tire condition analysis</h2>
          <br></br><br></br>
          <button className='button' onClick={()=>navigate('/user')}>Check tyre condition</button>
          
        </div>
      </div>
    </div>
  );
};

export default Home;