import React from "react";
import { Link } from "react-router-dom";

import eyeIcon from '../images/icons8-eye-90 1.svg'
import removeIcon from '../images/delete.svg'
import '../App.css'

const MaPremiereAnnonce =({Ai,handleClick,index})=>{

    return(
    <div className="firstAnnonce">
        <div className="cadre">
        </div>
        <div className="container">
                <div className="information">
                    <div className="aiImage">
                    <img src={`data:image/jpeg;base64,${Ai.image}`} alt="Not found" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                    </div>
                    <div className="Titleanddate">
                    <div className="titre">{Ai.titre}</div>
                    <div className="date">{Ai.date}</div>
                    </div>
                </div>
                <div className="buttons">
                    <div>
                        <button className="actionButton">
                        <Link key={Ai.id} to={`/Annonces/:${Ai.id}`}>
                        <img className="eye" src={eyeIcon} alt="eyeIcon"/>
                        </Link>
                        </button>
                    </div>
                    <div>
                        <button className="actionButton">
                        <img className="delete" src={removeIcon} alt= "removeIcon" onClick={()=>handleClick(index,Ai.id)}/>
                        </button>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default MaPremiereAnnonce 
