import axios from 'axios'
//contantes
const data: IRecoverPassword = {
    enviado: false,
    errorResponse: '',
    loading: false,
}

const ENVIAR_LINK = 'ENVIAR_LINK'
const ENVIAR_LINK_EXITO = 'ENVIAR_LINK_EXITO'
const ENVIAR_LINK_FALLO = 'ENVIAR_LINK_FALLO'
const COMPROBAR_TOKEN = 'COMPROMBAR_TOKEN'
const RESETEAR_RECOVER_PASSWORD = 'RESETEAR_RECOVER_PASSWORD'

//reducer
export default function reducer(state = data, action: any){
    switch (action.type) {
        case ENVIAR_LINK:
            return {...state, loading: true}
        case ENVIAR_LINK_EXITO:
            return {...state, enviado: true, errorResponse: '',loading: false}
        case ENVIAR_LINK_FALLO:
            return {...state, enviado: false, errorResponse: action.payload, loading: false}
        case COMPROBAR_TOKEN:
            return {...state, user: false, loading: false}
        case RESETEAR_RECOVER_PASSWORD:
            return {enviado: false, errorResponse: '', loading: false}
        default:
            return state
    }
}

//acciones
export const enviarLinkAccion = (email: string) => async (dispatch: any, getState: any) => {
    dispatch({
        type: ENVIAR_LINK
    })
    axios.post(window.properties.ip+'/recuperar-contrasena', {email})
    .then(response => {
        dispatch({
            type: ENVIAR_LINK_EXITO
        })
    })
    .catch(e => {
        dispatch({
            type: ENVIAR_LINK_FALLO,
            error: 'No se pudo continuar con el proceso ' + e.message
        })
    })
}

export const resetearAccion = () => (dispatch: any, getState: any) => {
    dispatch({
        type: RESETEAR_RECOVER_PASSWORD
    })
}

export interface IRecoverPassword {
    enviado: boolean;
    errorResponse: string;
    loading: boolean;
}