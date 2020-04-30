import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';

import Menu from './Menu'

const TheHeader = () => {

    const [state, setState] = React.useState({
        toggleMenu: false,
    })

    const toggleMenu = () => {
        setState({...state, toggleMenu: !state.toggleMenu})
    }

    return (
        <header style={{backgroundColor: '#6200ed', height:'36px', position:'absolute', width: '100%'}}> 
            <div className="container">
                <div className="row">
                    <div className="col-2 d-flex justify-content-start align-items-center">
                        <MenuIcon
                        style={{color:'white'}}
                        onClick={toggleMenu}
                        fontSize="large" />
                    </div> 
                    <div className="col-4">
                    </div>
                    <div className="col-6 d-flex justify-content-end align-items-center">
                        
                    </div>
                </div>
            </div>
            <Menu toggleMenu={state.toggleMenu} close={toggleMenu}/>
        </header>
    );

}


export default TheHeader;