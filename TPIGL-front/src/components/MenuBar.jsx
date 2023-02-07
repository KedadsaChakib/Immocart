import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../App.css'
import { useState } from "react"
const MenuBar =()=>{
    const current = window.location.pathname
    const [color, setColor] = useState(current === '/HomeConnected/MonCompte' ? '#BEBEBE' : '#E2E2E2')
    const [color2, setColor2] = useState(current === '/HomeConnected/MonCompte/MesAnnonces' ? '#BEBEBE' : '#E2E2E2')
    const handleClick = () => {
        const newColor = current === '/HomeConnected/MonCompte' ? '#BEBEBE' : '#E2E2E2';
        setColor(newColor);
    }    
    const handleClick2 = () => {
        const newColor = current === '/HomeConnected/MonCompte' ? '#BEBEBE' : '#E2E2E2';
        const newColor2 = current === '/HomeConnected/MonCompte/MesAnnonces' ? '#BEBEBE' : '#E2E2E2';
        console.log(color2, color)
        setColor(newColor);
        setColor2(newColor2);
    }    
    return(
    <div className="MenuBar">
        <div className="options">
            <Link to="/HomeConnected/MonCompte">
                <button className="profilButton" style={{ backgroundColor: color }} onClick={handleClick}>MON PROFIL</button>
            </Link>
            <Link to="/HomeConnected/MonCompte/MesAnnonces">
                <button className="annoncesButton" style={{ backgroundColor: color2 }} onClick={handleClick}>ANNONCES</button>
            </Link>
        </div>
    </div>
    )
}

export default MenuBar 
