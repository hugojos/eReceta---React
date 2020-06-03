import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import HeaderMenu from './HeaderMenu';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';

const Header = () => {

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
                    <div className="col-2 pl- pr-0 text-white d-flex justify-content-start align-items-center" >
                        {   Object.keys(user).length > 0 && 
                            <MenuIcon
                            className="pointer text-white"
                            onClick={toggleMenu}
                            fontSize="large"
                            style={{border:'2px solid', borderRadius:'4px'}} />
                        }
                    </div>
                    <div className="col-10 col-md- d-flex h-100 pr-0 pl-0">
                        <div className="col-7 col-md-6 col-sm-6 col-lg-6 text-white d-flex align-items-center justify-content-end pr-2 pr-sm-0 pl-0 pr-md-2 pr-lg-5">
                                <img src="img/Logo-Trans-Rect.png" style={{width: '110px'}} alt=""/>
                        </div>
                        <div className="col-5 col-md-6 col-sm-6 col-lg-6 text-white d-flex align-items-center justify-content-end pr-0 pl-0 mr-md-4" >
                        {   
                            Object.keys(user).length > 0 && 
                            <div className="mt-4 mt-md-3 pt-1 d-flex flex-column align-items-end h-100 pr-1" style={{width:'100%'}}>
                                 <div className="pr-2 d-flex justify-content-end align-items-center pointer"
                                 onClick={toggleUserMenu} id="userMenu" >
                                    <NombreMedico />
                                    <ArrowDropDownIcon  />
                                </div>
                                <UserMenu toggleUserMenu={toggleUserMenu} open={openUserMenu}/>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
            <HeaderMenu toggleMenu={toggleMenu} open={openMenu}/>
        </header>
    );

}


export default Header;
/*

*/