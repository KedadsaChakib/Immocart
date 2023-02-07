import React, { useState, useEffect, useCallback, useRef} from "react";
import { useParams } from "react-router-dom";
import {useDropzone} from 'react-dropzone';
import { Link } from "react-router-dom";

import "../App.css";
import editIcon from "../images/icons8-modify-58 (1) 1.svg";
import line from "../images/Line13.svg";
import line2 from "../images/Line14.svg";
import mouh from "../images/mouh.png";




function InformationProfil({personalInfo,setPersonalInfo,images,setImages}) {
    function Dropzone({ onDrop, accept}) {
        const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
          useDropzone({
            accept,
            onDrop,
          });
    
        return (
            <div className="champ-photo" readOnly = {isReadonly}>
                <div {...getRootProps({ className: "dropzone" })}>
                    <input className="input-zone" {...getInputProps()} />
                    <div className="text-center" style={{textAlign:"center"}} >
                        {isDragActive ? (
                        <p className="dropzone-content">
                            Relachez
                        </p>
                        ) : (
                                <p>Telecharger photo</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            reader.onload = function (e) {
            setImages((prevState) => [
                ...prevState,
                {src: e.target.result },
                ]);
            };
            console.log(images)
            reader.readAsDataURL(file);
            return file;
        });
        }, []);
    const [isReadonly, setIsReadonly] = useState(true);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPersonalInfo(values => ({...values, [name]: value}))
        console.log(personalInfo)
      }
    return(<div className="my-info">
                    <div className="entete-info">
                        <div className="profile">Profile</div>
                        <div className="edit">
                            <img src={editIcon} alt="An icon"/>
                            <button onClick={()=> setIsReadonly(prevState => !prevState)}>{(isReadonly)?"Modifier": "Enregistrer"}</button>
                        </div>
                    </div>
                    <div className="table-info">
                        <div className="une-ligne">
                        <div className="une-info">
                            <div className="nom-du-champ">Nom</div>
                            <input className="champ" value={personalInfo.nom} readOnly = {isReadonly} style={{borderWidth: "0px"}} name="nom" onChange={handleChange}/>
                            <img className="line" src={line} alt="A line"/>
                        </div>
                        <div className="une-info">

                            <div className="nom-du-champ">Adresse email</div>
                            <input className="champ" value={personalInfo.email} readOnly = {isReadonly} style={{borderWidth: "0px"}} name="email" onChange={handleChange}/>
                            <img className="line" src={line} alt="A line"/>
                        </div>
                        </div>
                        <div className="une-ligne">
                        <div className="une-info">
                            <div className="nom-du-champ">prenom</div>
                            <input className="champ" value={personalInfo.prenom} readOnly = {isReadonly} style={{borderWidth: "0px"}} name="prenom" onChange={handleChange}/>
                            <img className="line" src={line} alt="A line"/>
                        </div>
                        <div className="une-info">
                            <div className="nom-du-champ">Adresse</div>
                            <input className="champ" value={personalInfo.address} readOnly = {isReadonly} style={{borderWidth: "0px"}} name="address" onChange={handleChange}/>
                            <img className="line" src={line} alt="A line"/>
                        </div>
                        </div>
                        <div className="une-ligne">
                        <div className="une-info">
                            <div className="nom-du-champ">Numero 1</div>
                            <input className="champ" value={personalInfo.numero1} readOnly = {isReadonly} style={{borderWidth: "0px"}} name="numero1" onChange={handleChange}/>
                            <img className="line" src={line} alt="A line"/>
                        </div>
                        <div className="une-photo">
                            <div className="nom-du-champ-photo">Image de profil</div>
                            <Dropzone onDrop={onDrop} accept={"image/*"} />
                        </div>
                        </div>
                        <div className="une-ligne">
                        <div className="une-info">
                            <div className="nom-du-champ">Numero 2</div>
                            <input className="champ" value={personalInfo.numero2} readOnly = {isReadonly} style={{borderWidth: "0px"}} name="numero2" onChange={handleChange}/>
                            <img className="line" src={line} alt="A line"/>
                        </div>
                        </div>
                    </div>
            </div>
    )
}



function MessageProfil({messages,setMessages}) {
    function Messages() {

        const listItems = messages.map((item) =>
          <div className="une-ligne-message">
          <div className="un-message">
              <div className="img-info-message">
                  <img className="profile-image" src={mouh} alt="Profil"/>
                  <div className="nom-date-message">
                  <div className="nom-date">
                    <Link to="/Profil/12">
                      <div className="nom">{item.senderNom + " " + item.senderPrenom} </div>
                    </Link>
                      <div className="date-message">{item.date}</div>
                  </div>
              <   div className="le-message">{item.message}</div>
                  </div>
              </div>
              <img className="line" src={line2} alt="A line"/>
          </div>
  </div>
        );

        return (
            <div className="les-messages">
                {listItems}
            </div>
        );
      }
    return(
        <div className="my-messages">
        <div className="entete-messages">
            <div className="profile">Messages</div>
        </div>
        <Messages />
    </div>
    )
}

function Titre({titre}) {
    return (
        <div className="Titre-Text">
            <p className="Titre">{titre}</p>
        </div>
    )
}

function Image({images,personalInfo}){
    return(
        <div className="image-profil-container">
            <div className="image-profil-subcontainer">

            <div className="image-profil-container-cadre">
                <img  src={images[0]} alt=""/>
            </div>
            <div className="image-profil-container-name">
                {personalInfo.nom + " " + personalInfo.prenom}
            </div>

            </div>
        </div>
    )
}
function MesAnnoncesContainer({titre,personalInfo, setPersonalInfo,images,setImages,messages,setMessages}) {
    return(
    <>
    <div className="c-page">
        <Titre titre = {titre} />
        <Image images={images} personalInfo= {personalInfo}/>
        <div className="p-content">
            <InformationProfil personalInfo={personalInfo} setPersonalInfo={setPersonalInfo}  images={images} setImages={setImages}/>
            <MessageProfil messages={messages} setMessages ={setMessages}/>
        </div>
    </div>
    </>
    )
}

const MonProfil = ()=>{
     const titre = "Mon Profil"
     const [personalInfo,setPersonalInfo] = useState(
        {
            nom:"Kedadsa",
            prenom:"Islam",
            address:"smfj",
            email: "fsdjmq",
            numero1:"sfdl",
            numero2:"ldfs",
        }
    )
    
    const [messages,setMessages] = useState([{
        senderNom:"Nom",
        senderPrenom:  "Prenom",
        senderImage:"Image",
        date:"01/05/2020",
        message:"bonjour tout le monde"}])
    const [images, setImages] = useState([]);
    return(
    <>

    <MesAnnoncesContainer titre={titre} personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} images={images} setImages={setImages} messages={messages} setMessages ={setMessages}/>
    </>
    )
}

export default MonProfil;