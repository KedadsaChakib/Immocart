import React, { useState, useEffect,useRef } from "react";
import "./PopUp.css";
import jwt_decode from "jwt-decode"
import axios from "axios" 
export default function Connexion() {
  function handeCallbackResponse(response){
    var my_user = jwt_decode(response.credential) ; 
    console.log("now the real use under the mask is : " );
    console.log(my_user);
    axios.get('http://benabbes05ilyes.pythonanywhere.com/annonces/check/' + my_user.email)
          .then(response => { 
            console.log(response) 
            if(response.data.exist === "True"){
              window.location.href = "/HomeConnected";
            }
            else{
              window.location.href = "/InscriptionForm";
            }
            console.log(response);
          }
          )
          .catch(error => {
            console.error(error);
          });
      

  }
  const divRef = useRef(null) 
  useEffect(() =>{
  if(divRef.current){  
  /* global google */
  window.google.accounts.id.initialize({
  client_id : "386512640934-dsrl533naj8mm0ipcofuggc240vc8set.apps.googleusercontent.com" , 
  callback : handeCallbackResponse

  }) ; 
  window.google.accounts.id.renderButton(
    divRef.current, {
      theme : "outline" , size:"medium", 
    } 
  ) ;
  }
  },[divRef.current]);
  return (
    <a ref={divRef}></a>
  );
}