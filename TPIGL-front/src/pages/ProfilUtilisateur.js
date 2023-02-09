import React, { useState, useEffect,useCallback ,useRef} from "react";
import LogedNavBar from "../components/LogedNavBar";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";


function Titre({titre}) {
    return (
        <div className="Titre-Text">
            <p className="Titre">{titre}</p>
        </div>
    )
}
function Image({image,personalInfo}){
  return(
      <div className="image-profil-container">
          <div className="image-profil-subcontainer">

          <div className="image-profil-container-cadre">
          <img src={`data:image/jpeg;base64,${image}`} alt="image" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          </div>
          <div className="image-profil-container-name">
              {personalInfo.nom + " " + personalInfo.prenom}
          </div>

          </div>
      </div>
  )
}
const ProfileUtilisateur = () => {
    const [personalInfo,setPersonalInfo] = useState(
        {
            nom:"Kedadsa",
            prenom:"Islam",
            email: "fsdjmq",
            sim:"sfdl",
            image:"",
        }
    )
    
    const {id} = useParams()

    const current = window.location.pathname
    useEffect(() => {
        axios.get(`http://172.20.10.3:8000/annonces/visiter/${id}`)
              .then(response => {
                setPersonalInfo(response.data)
                // console.log (response.data)
                // setPersonalInfo(response.data.profile)
                // setMessages(Object.values(response.data.messages))
                // setImages(response.data.profile.image)
                // console.log(Object.values(response.data))
              })
              .catch(error => {
                console.log("An error has occured")
              }
            );}, []);


    return (
    <>
        <LogedNavBar/>
        <div className="c-page">
            <Titre titre = {"Profil"} />
            <Image image={personalInfo.image} personalInfo= {personalInfo}/>
            <div className="profil-table-cadre"></div>
            <table className="profile-table" >
            <tbody>
                <tr className="profile-table-header">
                <td >
                  <div className="profile-table-header">
                  Profile
                  </div>
                  </td>
              </tr>
              <tr >
                <td>
                <div className="profile-table-label">Nom</div>
                <div className="profile-table-content">{personalInfo.nom}</div>
                </td>

              </tr>
              <tr>
              <td>
                    <div className="profile-table-label">Prenom</div>
                <div className="profile-table-content">{personalInfo.prenom}</div>
                </td>
              </tr>
              <tr>
                <td>
                    <div className="profile-table-label">Adresse email</div>
                <div className="profile-table-content">{personalInfo.email}</div>
                </td>
                
              </tr>
              <tr>
              <td>
                    <div className="profile-table-label">Numero</div>
                <div className="profile-table-content">{personalInfo.sim}</div>
                </td>
              </tr>
            </tbody>
            </table>
        </div>
    </>
  );
};

export default ProfileUtilisateur;