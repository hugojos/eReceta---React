import React from 'react'
import { Drawer, List, ListItemText, ListItem, Divider } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesionAccion } from '../redux/authDuck'
import { useHistory } from 'react-router-dom';

const Menu = (props) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const auth = useSelector(state => state.auth.user)

    return (
        <Drawer 
        open={props.open}
        ModalProps={{ onBackdropClick: () => props.toggleMenu() }}
        >
            <List className="m-0 h-100 d-flex flex-column justify-content-between">
                <div>
                    {   auth ?
                        <ListItem button
                        onClick={ () => {
                            history.push('/perfil')
                            props.toggleMenu()
                        } }>
                            <ListItemText 
                            primary="MI PERFIL"/>
                        </ListItem>
                        :
                        <ListItem className="mx-0 px-3 row align-items-center pointer" >
                            <div className="col-12">
                                <div className="row">
                                    <div 
                                    onClick={ () => {
                                        history.push('/iniciar-sesion')
                                        props.toggleMenu()
                                    }}
                                    className="text-decoration-none pointer col-6 d-flex align-items-center justify-content-center border-right">
                                        <span className="h5 m-0">ACCEDER</span>
                                    </div>
                                    <div 
                                    onClick={ () => {
                                        history.push('/registrarse')
                                        props.toggleMenu()
                                    }}
                                    className="text-decoration-none pointer col-6 d-flex align-items-center justify-content-center border-left">
                                        <span className="h5 m-0">REGISTRO</span>
                                    </div>
                                </div>
                            </div>    
                        </ListItem> 
                    }
                    <Divider />
                    <ListItem button
                    onClick={ () => {
                        props.toggleMenu()
                        history.push('/nueva-receta')
                    } }>
                        <ListItemText 
                        primary="GENERAR RECETA"/>
                    </ListItem>
                </div>
                {   auth &&    
                    <ListItem 
                    onClick={() => {
                        dispatch( cerrarSesionAccion() )
                        props.toggleMenu()
                    }}
                    button>
                        <ListItemText
                        className="d-flex"
                        primary="CERRAR SESION"/>
                    </ListItem>
                }
            </List>
        </Drawer>
    );

}


export default Menu;