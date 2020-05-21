import axios from 'axios'

//contantes
const data = {
    loading: false,
    errorResponse: '', 
    okResponse: '',
}

const VALIDAR_EMAIL = 'VALIDAR_EMAIL'
const VALIDAR_EMAIL_EXITO = 'VALIDAR_EMAIL_EXITO'
const VALIDAR_EMAIL_FALLO = 'VALIDAR_EMAIL_FALLO'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case VALIDAR_EMAIL: 
            return {...state, errorResponse: '', okResponse:'', loading: true}
        case VALIDAR_EMAIL_EXITO:
            return {...state, errorResponse: '', okResponse: action.payload, loading: false}
        case VALIDAR_EMAIL_FALLO:
            return {...state, errorResponse: action.payload, okResponse:'', loading: false} 
        default:
            return state;
    }
}

//acciones
export const validarEmailAccion = (token) => async (dispatch, getState) => {
    dispatch({type: VALIDAR_EMAIL})
    await axios.get(window.properties.ip + '/validar?tokenRecibido='+token)
    .then(response => {
        dispatch({
            type: VALIDAR_EMAIL_EXITO,
            payload: '¡La cuenta se ha validado correctamente!'
        })
    })
    .catch(e => {
        dispatch({
            type: VALIDAR_EMAIL_FALLO,
            payload: 'No se pudo validar la cuenta'
        })
    })
}

