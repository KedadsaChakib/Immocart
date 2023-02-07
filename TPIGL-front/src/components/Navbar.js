import {useRef} from "react"
import {FaBars, FaTimes} from "react-icons/fa"
import "./NavBar.css"
import {Link} from "react-router-dom" 
import PopUp from '../components/PopUp';
import Connexion from "../components/Connexion"
import {useState} from 'react'
import { FaGoogle } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
const Navbar = () => {
    const [modal, setModal] = useState(true);
    const toggleModal = () => {
      setModal(!modal);
      console.log(modal)
    };
    if(modal) {
    document.body.classList.add('active-modal')
    } else {
    document.body.classList.remove('active-modal')
    }
    const path = window.location.pathname
    return ( 
        <header>
        <h3>IMMO CART</h3>
        <nav>
        <PopUp />
        <CustomLink  to="/#">
            <a id="Connexion"><Connexion/></a>
        </CustomLink>
            
        </nav>
        </header>
     );
}
function CustomLink({to,children, ...props}){
    return (
        <Link to={to}>{children}</Link>
    )
}
export default Navbar;