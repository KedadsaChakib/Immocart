
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
import data from "../Annonces.json"
const DetailsAnnonce = (Annonce) => {
    const {id} = useParams()
    console.log(id[1])
    const center ={ lat: 48.8584, lng: 2.2945}
    const [annonceInfo, setAnnonceInfo] = useState(data.filter(item => item.id === id[1])[0])
    const [connectedUser,setConnectedUser]= useState({
        photo:"",
        nom:"Benabbes",
        prenom:"Ilyes",
    })
    const [message, setMessage] = useState("");
  const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    })
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${message}`)
      }
      if (!isLoaded) {
        return <div style={{textAlign:"center",margin:"100px",fontSize:"40px",fontWeight:"200"}}>Waiting...</div>
      }
    return(
        <>
        <Navbar/>
        <div className="details-annonce">
            <div className="details-annonce-titre-prix">
                <div className="details-annonce-titre">{annonceInfo.titre}-{id[1]}</div>
                <div className="details-annonce-prix">{annonceInfo.prix} DA</div>
            </div>
            <div className="details-annonce-photos-map">
                <div className="details-annonce-photos">
                    <div className="button-left-right">
                        <div className="button-left">
                        <button ><img src={rightarrow} alt="left arrow"/></button>
                        </div>
                        <div className="button-right">
                        <button ><img src={leftarrow} alt="right"/></button>
                        </div>
                    </div>
                </div>
                <div className="details-annonce-map" >
                    <GoogleMap center = {annonceInfo.location.mapPosition} zoom = {15} mapContainerStyle={{width: '100%', height: '100%'}} options ={{zoomcontrol: false,streetViewControl: false,mapTypeControl:false,fullscreenControl:false}}>
                        <MarkerF position = {annonceInfo.location.markerPosition} />
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
                        <tr>
                            <td>Date</td>
                            <td>{annonceInfo.date}</td>
                        </tr>
                        <tr>
                            <td>Categorie</td>
                            <td>{annonceInfo.typeDeTransaction}</td>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>{annonceInfo.typeDuBien}</td>
                        </tr>
                        <tr>
                            <td>Surface</td>
                            <td>{annonceInfo.surface}m2</td>
                        </tr>
                        <tr>
                            <td>Wilaya</td>
                            <td>{annonceInfo.location.area}</td>
                        </tr>
                        <tr>
                            <td>Commune</td>
                            <td>{annonceInfo.location.city}</td>
                        </tr>
                        <tr>
                            <td>Adresse</td>
                            <td>{annonceInfo.location.address}</td>
                        </tr>
                    </table>
                </div>
                <div className="details-annonce-description-textarea">
                    <div className="details-annonce-description-textarea-titre">Description</div>
                    <div className="details-annonce-description-textarea-text">{annonceInfo.description}</div>
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
                        <div>{annonceInfo.proprietaire.nom +" " +annonceInfo.proprietaire.prenom}</div>
                    </div>
                    <div className="details-annonce-contact-container-ligne">
                        <img src={locationIcon} alt="location" />
                        <div>{annonceInfo.proprietaire.address}</div>
                    </div>
                    <div className="details-annonce-contact-container-ligne">
                        <img src={emailIcon} alt="email" />
                        <div>{annonceInfo.proprietaire.email}</div>
                    </div>
                    <div className="details-annonce-contact-container-ligne">
                        <img src ={phoneIcon} alt="phone"/>
                        <div>{annonceInfo.proprietaire.numero1}</div>
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
                            <form onSubmit={handleSubmit}>
                                    <textarea
                                    className="message-area"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <input className="envoyer" type="submit" value="Envoyer"/>
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