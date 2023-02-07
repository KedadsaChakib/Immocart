import React, { useState, useEffect,useCallback ,useRef} from "react";
import LogedNavBar from "../components/LogedNavBar";
import Navbar from "../components/Navbar";
import "../App.css";


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
const ProfileUtilisateur = () => {
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
    const [image,setImage]= useState("")
    const current = window.location.pathname
    useEffect(() =>{
        console.log(current)
    },[])
    return (
    <>
        {current===`/HomeConnected/Profil/12` ? <LogedNavBar/>:<Navbar />}
        <div className="c-page">
            <Titre titre = {"Profil"} />
            <Image images={image} personalInfo= {personalInfo}/>
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
                <div className="profile-table-content">{personalInfo.numero1}</div>
                </td>
              </tr>
            </tbody>
            </table>
        </div>
    </>
  );
};

export default ProfileUtilisateur;