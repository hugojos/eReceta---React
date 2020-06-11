import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HeaderMenu from './HeaderMenu';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const location = useLocation()
    const history = useHistory()

    const user = useSelector(state => state.auth.user)
    const [openMenu, setOpenMenu] = useState(false)
    const [openUserMenu, setOpenUserMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const toggleUserMenu = () => {
        setOpenUserMenu(!openUserMenu)
    }

    const NombreMedico = () => {
        return (
        <h6 style={{fontSize:'14px'}} className="text-center font-size-desktop pl-0 m-0">{user.nombre.split(' ')[0]}</h6>
        )
    }

    return (
        <header style={{backgroundColor: '#0057a4', height:'53px', position:'absolute', width: '100%'}}> 
            <div className="h-100 container pr-1">
                <div className="d-flex align-items-center justify-content-between h-100">
                    <div className="col-2 px-0 text-white d-flex justify-content-start align-items-center" >
                        {   Object.keys(user).length > 0 && 
                            <MenuIcon
                            className="pointer text-white"
                            onClick={toggleMenu}
                            fontSize="large"
                            style={{border:'2px solid', borderRadius:'4px'}} />
                        }
                        {
                            (Object.keys(user).length === 0 && (location.pathname === '/politicas-privacidad' || location.pathname === '/terminos-condiciones')) &&
                            <Link style={{color:'#fff', fontWeight:'bold', borderRadius:'5px'}} className="ml-3 px-2" onClick={() => history.goBack()} >VOLVER</Link>
                        }
                    </div>
                    <div className="col-10 h-100">
                        <div className="row">
                            <div className="col-7 col-sm-6 text-white d-flex flex-column align-items-end pr-2 pr-sm-0 pl-0 pr-md-2 pr-lg-5">
                                    <img src="img/Logo-Trans-Rect.png" style={{width: '110px'}} alt=""/>
                                    <span style={{fontSize: '10px', bottom:'10%'}} className="position-absolute pr-3" >{window.properties.version}</span>
                            </div>
                            <div className="col-5 col-sm-6 text-white d-flex align-items-center justify-content-end" >
                            {   
                                Object.keys(user).length > 0 && 
                                <>
                                    <div className="d-flex justify-content-end align-items-center pointer"
                                    onClick={toggleUserMenu} id="userMenu" >
                                        <NombreMedico />
                                        <ArrowDropDownIcon />
                                    </div>
                                    <UserMenu toggleUserMenu={toggleUserMenu} open={openUserMenu}/>
                                </>
                            }
                            {
                            (Object.keys(user).length === 0 && (location.pathname === '/politicas-privacidad' || location.pathname === '/terminos-condiciones')) &&
                            <Link style={{color:'#fff', fontWeight:'bold', borderRadius:'5px'}} className="mr-1 px-2" to="/iniciar-sesion" >ACCEDER</Link>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderMenu toggleMenu={toggleMenu} open={openMenu}/>
        </header>
    );

}


export default Header;