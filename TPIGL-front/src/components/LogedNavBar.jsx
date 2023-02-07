import React from "react";
import { Outlet, Link } from "react-router-dom";
import profilIcon from "../images/profil-icon.svg";
import messageIcon from "../images/message-icon.svg";
import annonceIcon from "../images/annonce-icon.svg";

import '../App.css'



const LogedNavBar = () =>{
    return(
        <>
            <div className="nav-container">
                <div className="nav-container-center">
                    <div className="nav-container-center-logo">IMMO CART</div>
                    <div className="nav-container-center-icons">
                        <Link className="nav-container-center-icons-icon" to="/HomeConnected/MonCompte/MesAnnonces">
                        <img src={annonceIcon} alt=""/>
                        </Link>
                        <Link to="/HomeConnected/MonCompte" className="nav-container-center-icons-icon">
                        <img src={messageIcon} alt=""/>
                        </Link>
                        <Link to="/HomeConnected/MonCompte" className="nav-container-center-icons-icon">
                        <img src={profilIcon} alt=""/> 
                        </Link>
                    </div>
                    <Link to="DeposerAnnonce">
                        <div className="nav-container-center-button">
                            <div >Déposer une annonce</div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default LogedNavBar;