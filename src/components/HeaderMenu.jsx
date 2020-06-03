import React from 'react'
import { Drawer, List, ListItemText, ListItem, Divider } from '@material-ui/core';
import { Link  } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { cerrarSesionAccion } from '../redux/authDuck'
import { useHistory } from 'react-router-dom';

const Menu = ({toggleMenu, open}) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const auth = useSelector(state => state.auth.user)

    return (
        <Drawer 
        open={open}
        ModalProps={{ onBackdropClick: toggleMenu }}
        >
            <List className="m-0 h-100 d-flex flex-column justify-content-between">
                <div>
                    {   auth ?
                        ''
                        :
                        <ListItem className="mx-0 px-3 row align-items-center pointer" >
                            <div className="col-12">
                                <div className="row">
                                    <div 
                                    onClick={ () => {
                                        history.push('/iniciar-sesion')
                                        toggleMenu()
                                    }}
                                    className="text-decoration-none pointer col-6 d-flex align-items-center justify-content-center border-right">
                                        <span className="h5 m-0">ACCEDER</span>
                                    </div>
                                    <div 
                                    onClick={ () => {
                                        history.push('/registrarse')
                                        toggleMenu()
                                    }}
                                    className="text-decoration-none pointer col-6 d-flex align-items-center justify-content-center border-left">
                                        <span className="h5 m-0">REGISTRO</span>
                                    </div>
                                </div>
                            </div>    
                        </ListItem> 
                    }
                    
                    {   auth &&
                        <div>
                            <ListItem button
                            component={Link}
                            to="/nueva-receta"
                            onClick={ toggleMenu }>
                                <ListItemText 
                                primary="GENERAR RECETA"/>
                            </ListItem>
                            <ListItem button
                            component={Link}
                            to="/libro-digital"
                            onClick={ toggleMenu }>
                                <ListItemText 
                                primary="LIBRO DIGITAL"/>
                            </ListItem>
                            <ListItem button
                            component="a"
                            href="https://ereceta.com.ar/recetas/ManualAndroid.pdf"
                            target="__blank"
                            onClick={ toggleMenu }>
                                <ListItemText primary="MANUAL DE USUARIO" />
                            </ListItem>
                            {/*<ListItem button
                                component={Link}
                                to="/medicos"
                                onClick={ toggleMenu }>
                                <ListItemText 
                                primary="MEDICOS"/>
                            </ListItem>*/}
                        </div>
                    }
                </div>
            </List>
        </Drawer>
    );

}


export default Menu;