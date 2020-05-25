import axios from 'axios'
//contantes
const data = {
    loading: false,
    errorResponse: '',
    okResponse: ''
}

const ENVIAR_EMAIL = 'ENVIAR_EMAIL'
const ENVIAR_EMAIL_EXITO = 'ENVIAR_EMAIL_EXITO'
const ENVIAR_EMAIL_FALLO = 'ENVIAR_EMAIL_FALLO'
const RESETEAR_ENVIAR_RECETA = 'RESETEAR_ENVIAR_RESETA'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case ENVIAR_EMAIL:
            return {...state, loading: true, errorResponse: '', okResponse: ''}
        case ENVIAR_EMAIL_FALLO:
            return {...state, loading: false, errorResponse: action.payload, okResponse: ''}
        case ENVIAR_EMAIL_EXITO:
            return {...state, loading: false, errorResponse: '', okResponse: action.payload}
        case RESETEAR_ENVIAR_RECETA:
            return {...state, loading: false, errorResponse: '', okResponse:''}
        default:
            return state
    }
}

//acciones
export const enviarEmailAccion = (data) => async (dispatch, getState) => {
    dispatch({
        type: ENVIAR_EMAIL
    })
    await axios.post(window.properties.ip + '/enviarPDF', data)
    .then(response => {
        console.log(response)
        dispatch({
            type: ENVIAR_EMAIL_EXITO,
            payload: response.data
        })
    })
    .catch(e => {
        console.dir(e)
        dispatch({
            type: ENVIAR_EMAIL_FALLO,
            payload: 'No se pudo continuar con el proceso: ' + e.message
        })
    })
}

export const resetearAccion = () => async (dispatch, getState) => {
    dispatch({
        type: RESETEAR_ENVIAR_RECETA
    })
}