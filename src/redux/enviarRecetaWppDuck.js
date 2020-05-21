import axios from 'axios'
import history from './history'
//contantes
const data = {
    loading: false,
    errorResponse: '',
    okResponse: ''
}

const ENVIAR_WHATSAPP = 'ENVIAR_WHATSAPP'
const ENVIAR_WHATSAPP_EXITO = 'ENVIAR_WHATSAPP_EXITO'
const ENVIAR_WHATSAPP_FALLO = 'ENVIAR_EMAIL_FALLO'
const RESETEAR_ENVIAR_WHATSAPP = 'RESETEAR_ENVIAR_RESETA'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case ENVIAR_WHATSAPP:
            return {...state, loading: true, errorResponse: '', okResponse: ''}
        case ENVIAR_WHATSAPP_FALLO:
            return {...state, loading: false, errorResponse: action.payload, okResponse: ''}
        case ENVIAR_WHATSAPP_EXITO:
            return {...state, loading: false, errorResponse: '', okResponse: action.payload}
        case RESETEAR_ENVIAR_WHATSAPP:
            return {...state, loading: false, errorResponse: '', okResponse:''}
        default:
            return state
    }
}

//acciones


export const enviarWhatsappAccion = (data) => async (dispatch, getState) => {
    dispatch({
        type: ENVIAR_WHATSAPP
    })
    await axios.post(window.properties.ip  + '/compartirWhatsapp', data)
    .then(response => {
        console.log(response)
        dispatch({
            type: ENVIAR_WHATSAPP_EXITO,
            payload: response.data    
        })
    })
    .catch(e => {
        console.dir(e)
        dispatch({
            type: ENVIAR_WHATSAPP_FALLO,
            payload: 'error'
        })
    })
}

export const resetearWhatsappAccion = () => async (dispatch, getState) => {
    dispatch({
        type: RESETEAR_ENVIAR_WHATSAPP
    })
}