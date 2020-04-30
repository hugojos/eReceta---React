import React from 'react'
import { Drawer, List, ListItemText,ListItem } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { useDispatch } from 'react-redux'
import { cerrarSesionAccion } from '../redux/authDuck'
import { useHistory } from 'react-router-dom';

const Menu = (props) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const [state, setState] = React.useState(props)
    
    React.useEffect(() => {
        setState({...props})
    }, [props])

    return (
        <Drawer open={state.toggleMenu} style={{width: '30%'}}>
            <List>
                <ListItem 
                button
                onClick={state.close}>
                    <CloseIcon /> 
                </ListItem>
                <ListItem button>
                    <ListItemText 
                    onClick={ () => {
                        history.push('/nueva-receta')
                    } }
                    primary="GENERAR RECETA"/>
                </ListItem>
                <ListItem button>
                    <ListItemText 
                    onClick={() => dispatch( cerrarSesionAccion() )}
                    primary="CERRAR SESION"/>
                </ListItem>
            </List>
        </Drawer>
    );

}


export default Menu;