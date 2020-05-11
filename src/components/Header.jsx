import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';

import HeaderMenu from './HeaderMenu'
import { useSelector } from 'react-redux';

const Header = () => {

    const user = useSelector(state => state.auth.user)

    const [openMenu, setOpenMenu] = React.useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu)
    }

    const NombreMedico = () => {
        return (
            <h4 className="m-0">{user.nombre.split(' ')[0] + ' ' + user.apellido.split(' ')[0]}</h4>
        )
    }

    return (
        <header style={{backgroundColor: '#0057a4', height:'36px', position:'absolute', width: '100%'}}> 
            <div className="h-100 container">
                <div className="h-100 row">
                    <div className="col-2 d-flex justify-content-start align-items-center">
                        <MenuIcon
                        className="pointer text-white"
                        onClick={toggleMenu}
                        fontSize="large" />
                    </div> 
                    <div className="col-8 text-white d-flex justify-content-center align-items-center">
                        {   
                        Object.keys(user).length > 0 && 
                            <NombreMedico />
                        }
                    </div>
                    <div className="col-2 px-0 text-white d-flex flex-column align-items-center justify-content-center">
                        <img src="img/1.jpg" style={{height: '20px'}} alt=""/>
                        <span className="" style={{fontSize: '10px', lineHeight:'1.1'}}>{window.properties.version}</span>
                    </div>
                </div>
            </div>
            <HeaderMenu toggleMenu={toggleMenu} open={openMenu}/>
        </header>
    );

}


export default Header;