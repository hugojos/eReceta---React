import axios from 'axios'
import history from './history'
//contantes
const data = {
    user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false,
    loading: false,
    errorResponse: ''
}

const INICIAR_SESION_EXITO = 'INICIAR_SESION_EXITO'
const INICIAR_SESION_FALLO = 'INICIAR_SESION_FALLO'
const INICIAR_SESION = 'INICIAR_SESION'
const MODIFICAR_USUARIO = 'MODIFICAR_USUARIO'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case INICIAR_SESION_EXITO:
            return {...state, user:  action.payload, loading: false}
        case INICIAR_SESION_FALLO:
            return {...state, errorResponse: action.payload,loading: false}
        case INICIAR_SESION:
            return {...state, loading: true}
        case MODIFICAR_USUARIO:
            return {...state, user: action.payload}
        case CERRAR_SESION:
            localStorage.removeItem('auth')
            return {...state, user: false, loading: false}
        default:
            return state
    }
}

//acciones
export const iniciarSesionAccion = (user) => async (dispatch, getState) => {
    dispatch({
        type: INICIAR_SESION
    })  
    await axios.post('http://'+ window.properties.ip +'/login', user)
            .then(response => {
                localStorage.setItem('auth', JSON.stringify(response.data))
                dispatch({
                    type: INICIAR_SESION_EXITO, 
                    payload: response.data
                })
                //if(Object.keys(getState().receta.pacienteDto).length) history.push('/receta')
            })  
            .catch(e => {
                if(e.response && e.response.status == '404') {
                    dispatch({
                        type: INICIAR_SESION_FALLO,
                        payload: '¡Usuario y/o contraseña incorrecto!'
                    })
                }
                else if(e.response && e.response.status == '401') {
                    dispatch({
                        type: INICIAR_SESION_FALLO,
                        payload: 'El usuario aún no ha sido validado con el mail que se le ha enviado'
                    })
                } 
                else {
                    dispatch({
                        type: INICIAR_SESION_FALLO,
                        payload: 'No se pudo continuar con el proceso: '+ e.message
                    })
                }
            })
}

export const modificarUsuarioAccion = (data) => async (dispatch, getState) => {
    localStorage.setItem('auth', JSON.stringify(data))
    dispatch({
        type: MODIFICAR_USUARIO,
        payload: data
    })
}

export const cerrarSesionAccion = () => async (dispatch, getState) => {
    dispatch({
        type: CERRAR_SESION
    })
}