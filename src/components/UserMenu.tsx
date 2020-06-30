import React from 'react'

import { Menu, MenuItem} from '@material-ui/core'
import { useDispatch} from 'react-redux'
import { cerrarSesionAccion } from '../redux/authDuck'
import { useHistory } from 'react-router-dom';

const UserMenu = ({toggleUserMenu, open}: { toggleUserMenu: any, open: boolean }) => {

    const dispatch = useDispatch()

    const history = useHistory()

    return ( 
        <Menu
            onClose={() => toggleUserMenu(false)}
            style={{marginTop:'22px'}} 
            keepMounted
            anchorEl={document.getElementById('userMenu')}
            open={open} >       
            <MenuItem onClick={() => {
                history.push('/perfil')
                toggleUserMenu()
            }} >
                EDITAR PERFIL
            </MenuItem>

            <MenuItem onClick={() => {
                dispatch( cerrarSesionAccion() )
                toggleUserMenu()
            }} >
                CERRAR SESIÓN
            </MenuItem>
        </Menu>
     );
}
 
export default UserMenu;