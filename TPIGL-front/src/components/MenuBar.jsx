import React from "react";
import { Outlet, Link } from "react-router-dom";
import '../App.css'
import { useState } from "react"
const MenuBar =()=>{
    return(
    <div className="MenuBar">
        <div className="options">
            <Link to="/HomeConnected/MonCompte">
                <button className="profilButton" >MON PROFIL</button>
            </Link>
            <Link to="/HomeConnected/MonCompte/MesAnnonces">
                <button className="profilButton" >ANNONCES</button>
            </Link>
        </div>
    </div>
    )
}

export default MenuBar 
