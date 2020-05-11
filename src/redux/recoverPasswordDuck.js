import axios from 'axios'
//contantes
const data = {
    enviado: false,
    errorResponse: false,
    loading: false,
}

const ENVIAR_LINK = 'ENVIAR_LINK'
const ENVIAR_LINK_EXITO = 'ENVIAR_LINK_EXITO'
const ENVIAR_LINK_FALLO = 'ENVIAR_LINK_FALLO'
const COMPROBAR_TOKEN = 'COMPROMBAR_TOKEN'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case ENVIAR_LINK:
            return {...state, loading: true}
        case ENVIAR_LINK_EXITO:
            return {...state, enviado: true, errorResponse: '',loading: false}
        case ENVIAR_LINK_FALLO:
            return {...state, enviado: false, errorResponse: action.payload, loading: false}
        case COMPROBAR_TOKEN:
            return {...state, user: false, loading: false}
        default:
            return state
    }
}

//acciones
export const enviarLinkAccion = (email) => async (dispatch, getState) => {
    dispatch({
        type: ENVIAR_LINK
    })
    axios.post('http://'+window.properties.ip+'/recuperar-contrasena', {email})
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