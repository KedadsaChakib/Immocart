import React from 'react';
import "./Annonce.css";
import { IoIosHeartEmpty } from "react-icons/io";
import { Link } from 'react-router-dom';
import { GoLocation } from "react-icons/go";
import {AiOutlineHome} from "react-icons/ai";
import {RxDimensions} from "react-icons/rx"
import {BsCalendarDate} from "react-icons/bs"
import {MdAttachMoney} from "react-icons/md"
const Annonce = ({ id, picture, title, location, category, type, surface, date, price }) => {
  /*const handleSubmit = (event) =>{
      
      window.location.pathname = "/Annonces/:"  }*/
  return(
  <div className='Annonce'>
    <img src={picture} alt="Not found"/>
    <div className="container-info">
        <div className="container-title">
            <h2>{title}</h2>
        </div>
        <div className="localisation"><GoLocation/>{location}</div>
        <div className="surface"><RxDimensions/>{surface} m2</div>
        <div className="typ"><AiOutlineHome/>{type}</div>
        <div className="date"><BsCalendarDate/>{date}</div>
        <div className="container-prix">
            <div className="prix"><MdAttachMoney/>{price}DA</div>
            <button>{category}</button>
        </div>
    </div>

  </div>
  )
};

export default Annonce;