import axios from 'axios'
import IMedico from '@/models/IMedico'
//contantes
const data: IAuth = {
    user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!) : false,
    loading: false,
    errorResponse: '',
}

axios.defaults.headers.common.idMedico = data.user ? data.user.idMedico : ''

const INICIAR_SESION_EXITO = 'INICIAR_SESION_EXITO'
const INICIAR_SESION_FALLO = 'INICIAR_SESION_FALLO'
const INICIAR_SESION = 'INICIAR_SESION'
const MODIFICAR_USUARIO = 'MODIFICAR_USUARIO'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer
export default function reducer(state = data, action: any){
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
            return {...state, user: false, loading: false}
        default:
            return state
    }
}

//acciones
export const iniciarSesionAccion = (user: IUser) => async (dispatch: any, getState: any) => {
    dispatch({
        type: INICIAR_SESION
    })  
    await axios.post(window.properties.ip +'/login', user)
            .then(response => {
                let expiry = new Date().getTime() + window.properties.tiempoSesion
                response.data.expiry = expiry;
                localStorage.setItem('auth', JSON.stringify(response.data))
                dispatch({
                    type: INICIAR_SESION_EXITO, 
                    payload: response.data
                })
                
            })  
            .catch(e => {
                if(e.response && e.response.status === 404) {
                    dispatch({
                        type: INICIAR_SESION_FALLO,
                        payload: '¡Usuario y/o contraseña incorrecto!'
                    })
                }
                else if(e.response && e.response.status === 401) {
                    dispatch({
                        type: INICIAR_SESION_FALLO,
                        payload: `
                        Usuario aún no validado.
                        Para ingresar a la aplicación, por favor revise el correo electrónico que ha enviado eReceta a su cuenta de email "${user.email}" y
                        haga click sobre el botón que figura en el cuerpo de dicho mail.
                        `
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

export const modificarUsuarioAccion = (user: IMedico) => async (dispatch: any, getState: any) => {
    localStorage.setItem('auth', JSON.stringify(user))
    dispatch({
        type: MODIFICAR_USUARIO,
        payload: user
    })
}

export const cerrarSesionAccion = () => async (dispatch: any, getState: any) => {
    localStorage.removeItem('auth')
    dispatch({
        type: CERRAR_SESION
    })
}

declare global {
    interface Window {
        properties: any
    }
}

export interface IAuth {
    user: IMedico;
    loading: boolean;
    errorResponse: string;
}

export interface IUser {
    email?: string;
    password?: string;
    [key: string]: any;
}