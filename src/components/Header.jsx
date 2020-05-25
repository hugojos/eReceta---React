import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';

import HeaderMenu from './HeaderMenu'
import { useSelector } from 'react-redux';

const Header = () => {

    const user = useSelector(state => state.auth.user)

    const [openMenu, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const NombreMedico = () => {
        return (
            <h6 className="pl-2 m-0">BIENVENIDO/A, {user.nombre.split(' ')[0]}</h6>
        )
    }

    return (
        <header style={{backgroundColor: '#0057a4', height:'36px', position:'absolute', width: '100%'}}> 
            <div className="h-100 container">
                <div className="h-100 row">
                    <div className="col-10 pr-0 text-white d-flex justify-content-start align-items-center">
                        <MenuIcon
                        className="pointer text-white"
                        onClick={toggleMenu}
                        fontSize="large" />
                        {   
                        Object.keys(user).length > 0 && 
                            <NombreMedico />
                        }
                    </div> 
                    <div className="col-2 pl-0 text-white d-flex flex-column align-items-end justify-content-center">
                        <div className="d-flex align-items-center flex-column text-center">
                            <img src="img/1.png" style={{width: '20px'}} alt=""/>
                            <span className="" style={{fontSize: '10px', lineHeight:'1.1'}}>{window.properties.version}</span>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderMenu toggleMenu={toggleMenu} open={openMenu}/>
        </header>
    );

}


export default Header;