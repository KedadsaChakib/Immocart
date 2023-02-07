import React from "react";

import eyeIcon from '../images/icons8-eye-90 1.svg'
import removeIcon from '../images/delete.svg'
import '../App.css'

const MonAnnonce =({Ai})=>{
    return(
        <div className="container">
                <div className="information">
                    <div className="aiImage">
                        <img src={Ai.imagePri} alt="An Ai" />
                    </div>
                    <div className="Titleanddate">
                        <div className="titre">{Ai.Titre}</div>
                        <div className="date">{Ai.Date}</div>
                    </div>
                </div>
                <div className="buttons">
                    <div>
                        <button className="actionButton">
                        <img className="eye" src={eyeIcon} alt="eyeIcon"/>
                        </button>
                    </div>
                    <div>
                        <button className="actionButton">
                        <img className="delete" src={removeIcon} alt= "removeIcon"/>
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default MonAnnonce