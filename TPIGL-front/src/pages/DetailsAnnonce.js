
import React, { useState, useEffect,useCallback ,useRef} from "react";
import { useParams } from "react-router-dom";
import { useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import { Link } from "react-router-dom";

import "../App.css";
import descriptionIcon from "../images/Description-Icon.svg";
import emailIcon from "../images/Email.svg";
import locationIcon from "../images/location.svg";
import phoneIcon from "../images/phone.svg";
import messageIcon from "../images/message.svg";
import contactIcon from "../images/contact.svg";
import leftarrow from "../images/leftarrow.svg";
import rightarrow from "../images/rightarrow.svg";
import Navbar from "../components/Navbar";
import LogedNavBar from "../components/LogedNavBar";
import data from "../Annonces.json"
import axios from "axios";

const DetailsAnnonce = (Annonce) => {
    const center ={ lat: 48.8584, lng: 2.2945}
    const [connectedUser,setConnectedUser]= useState({
        nom:"Benabbes",
        prenom:"Ilyes",
    })
    const [message, setMessage] = useState("");
    const[pictures,setPictures] = useState([]);
    const [numPicture,setNumPicture] = useState(0);
    const [detailAnnonce, setDetailAnnonce]= useState({})

    const {id} = useParams()
    // console.log("the id is "+ id.slice(1))

    useEffect(() => {
        axios.get(`http://172.20.10.3:8000/annonces/details/${id.slice(1)}`)
              .then(response => {
                console.log (response.data)
                setDetailAnnonce(response.data)
                setConnectedUser({nom:response.data.mon_nom,prenom :response.data.mon_prenom})
                // console.log(detailAnnonce.images[1])
                setPictures(Object.values(response.data.images))
                // console.log(Object.values(response.data))
              })
              .catch(error => {
                console.log("An error has occured")
              }
            );}, []);
    
            
   

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })
    const handleClick = () => {
    axios.post(`http://172.20.10.3:8000/annonces/env_msg/${detailAnnonce.id_owner}`, JSON.stringify({msg :message}))
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
        // event.preventDefault();
        // alert(`The name you entered was: ${message}`)
}
    if (!isLoaded) {
        return <div style={{textAlign:"center",margin:"100px",fontSize:"40px",fontWeight:"200"}}>Waiting...</div>
    }
    return(
        <>
        <LogedNavBar />
        <div className="details-annonce">
            <div className="details-annonce-titre-prix">
                <div className="details-annonce-titre">{detailAnnonce.titre}</div>
                <div className="details-annonce-prix">{detailAnnonce.prix} DA</div>
            </div>
            <div className="details-annonce-photos-map">
                <div className="details-annonce-photos">
                        {console.log("the pictures of the annonce")}
                        {console.log(pictures)}
                        {console.log("le numero de la photo est")}
                        {console.log(numPicture)}
                        {(pictures[0]) ? <img src={`data:image/jpeg;base64,${pictures[numPicture]}`} alt="Not found" style={{width:"100%",height:"100%",objectFit:"cover",zIndex: -1}}/> : <div>Pas d'images</div>}
                    <div className="button-left-right">
                        <div className="button-left" onClick={()=>{setNumPicture((currPage)=>currPage-1)}}>
                        <button ><img src={rightarrow} alt="left arrow"/ ></button>
                        </div>
                        {/* <img src={phoneIcon} alt=""/> */}
                        <div className="button-right" onClick={()=>{if(numPicture <= pictures.length) setNumPicture((currPage)=>currPage+1)}}>
                        <button ><img src={leftarrow} alt="right"/></button>
                        </div>
                    </div>
                </div>
                <div className="details-annonce-map" >
                    <GoogleMap center = {{lat:parseFloat(detailAnnonce.map_pos_lat),lng : parseFloat(detailAnnonce.map_pos_lng)}} zoom = {10} mapContainerStyle={{width: '100%', height: '100%'}} options ={{zoomcontrol: false,streetViewControl: false,mapTypeControl:false,fullscreenControl:false}}>
                        <MarkerF position = {{lat:parseFloat(detailAnnonce.mrk_pos_lat),lng : parseFloat(detailAnnonce.mrk_pos_lng)}} />
                    </GoogleMap>
                </div>
            </div>
            <div className="details-annonce-description-titre-tableau-textarea">
                <div className="details-annonce-description-titre">
                    <img src={descriptionIcon} alt="img"/>
                    <div>Description de l'annonce</div>
                </div>
                <div className="details-annonce-description-tableau">
                    <table>
                        <tbody>

                        <tr>
                            <td>Date</td>
                            <td>{detailAnnonce.date}</td>
                        </tr>
                        <tr>
                            <td>Categorie</td>
                            <td>{detailAnnonce.categorie}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{detailAnnonce.type}</td>
                        </tr>
                        <tr>
                            <td>Surface</td>
                            <td>{detailAnnonce.surface}m2</td>
                        </tr>
                        <tr>
                            <td>Wilaya</td>
                            <td>{detailAnnonce.state}</td>
                        </tr>
                        <tr>
                            <td>Commune</td>
                            <td>{detailAnnonce.city}</td>
                        </tr>
                        <tr>
                            <td>Adresse</td>
                            <td>{detailAnnonce.address}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="details-annonce-description-textarea">
                    <div className="details-annonce-description-textarea-titre">Description</div>
                    <div className="details-annonce-description-textarea-text">{detailAnnonce.description}</div>
                </div>
            </div>
            <div className="details-annonce-contact">
                <div className="details-annonce-contact-titre">
                    <img src={contactIcon} alt="contact" />
                    <div>
                    Contact et coordonées
                    </div>
                </div>
                <div className="details-annonce-contact-container">
                    <div className="details-annonce-contact-container-ligne">
                        <img src={contactIcon} alt="contact" />
                        <div>{detailAnnonce.nom_annonceur +" " +detailAnnonce.prenom_annonceur}</div>
                    </div>
                    {/* <div className="details-annonce-contact-container-ligne">
                        <img src={locationIcon} alt="location" />
                        <div>{annonceInfo.proprietaire.address}</div>
                    </div> */}
                    <div className="details-annonce-contact-container-ligne">
                        <img src={emailIcon} alt="email" />
                        <div>{detailAnnonce.email}</div>
                    </div>
                    <div className="details-annonce-contact-container-ligne">
                        <img src ={phoneIcon} alt="phone"/>
                        <div>{detailAnnonce.sim}</div>
                    </div>
                </div>
            </div>
            <div className="details-annonce-envoyer-message">
                <div className="details-annonce-envoyer-message-titre">
                    <img src={messageIcon} alt="message"/>
                    <div>Envoyer message</div>
                </div>
                <div className="details-annonce-envoyer-message-container">
                    <div className="details-annonce-envoyer-message-container-name-message">
                        <img src="" alt=""/>
                        <div>
                            <div className="details-annonce-envoyer-message-container-message-sender">{connectedUser.nom + " " +connectedUser.prenom}</div>
                            <form>
                                    <textarea
                                    className="message-area"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <button className="envoyer" onClick={handleClick}>
                                    Envoyer
                                    </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    )
}


export default DetailsAnnonce;