import axios from 'axios'

//contantes
const data = {
    loading: false,
    errorResponse: '', 
    okResponse: '',
    medico: {}
}

const VERIFICAR_TOKEN = 'VERIFICAR_TOKEN'
const VERIFICAR_TOKEN_EXITO = 'VERIFICAR_TOKEN_EXITO'
const VERIFICAR_TOKEN_FALLO = 'VERIFICAR_TOKEN_FALLO'
const CAMBIAR_PASSWORD = 'CAMBIAR_PASSWORD'
const CAMBIAR_PASSWORD_EXITO = 'CAMBIAR_PASSWORD_EXITO'
const CAMBIAR_PASSWORD_FALLO = 'CAMBIAR_PASSWORD_FALLO'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case VERIFICAR_TOKEN: 
            return {...state, errorResponse: '', okResponse:'', loading: true}
        case VERIFICAR_TOKEN_EXITO:
            return {...state, errorResponse: '', okResponse: '', medico: action.payload, loading: false}
        case VERIFICAR_TOKEN_FALLO:
            return {...state, errorResponse: action.payload, okResponse:'', loading: false} 
        case CAMBIAR_PASSWORD:
            return {...state, errorResponse:'', okResponse:'', loading: true}
        case CAMBIAR_PASSWORD_EXITO:
            return {...state, errorResponse:'', okResponse: action.payload, loading: false}
        case CAMBIAR_PASSWORD_FALLO:
            return {...state, errorResponse:action.payload, okResponse:'', loading: false}            
        default:
            return state;
    }
}

//acciones
export const verificarTokenAccion = (token) => async (dispatch, getState) => {
    dispatch({type: VERIFICAR_TOKEN})
    await axios.get('http://' + window.properties.ip + '/recuperar-contrasena/verificar?tokenRecibido='+token)
    .then(response => {
        console.log(response)
        dispatch({
            type: VERIFICAR_TOKEN_EXITO,
            payload: response.data
        })
    })
    .catch(e => {
        console.dir(e)
        let message = 'No se pudo continuar con el proceso: ' + e.message
        if(e.response) message = e.response.data
        dispatch({
            type: VERIFICAR_TOKEN_FALLO,
            payload: message
        })
    })
}

export const cambiarPasswordAccion = (medico) => async (dispatch, getState) => {
    console.log(medico)
    dispatch({type: CAMBIAR_PASSWORD})
    axios.post('http://' + window.properties.ip + '/recuperar-contrasena/cambiar-contrasena', medico)
    .then(response => {
        console.log(response)
        dispatch({
            type: CAMBIAR_PASSWORD_EXITO,
            payload: response.data
        })
    })
    .catch(e => {
        console.dir(e)
        let message = 'No se pudo continuar con el proceso: ' + e.message
        if(e.response) message = e.response.data
        dispatch({
            type: CAMBIAR_PASSWORD_FALLO,
            payload: message
        })
    })
}

