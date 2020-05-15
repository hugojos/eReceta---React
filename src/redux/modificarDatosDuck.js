import axios from 'axios'
//contantes
const data = {
    datos: {},
    loading: false,
    errorResponse: '',
    okResponse: ''
}

const TRAER_DATOS = 'TRAER_DATOS'
const TRAER_DATOS_FALLO = 'TRAER_DATOS_FALLO'
const MODIFICAR_MEDICO = 'MODIFICAR_MEDICO'
const MODIFICAR_MEDICO_EXITO = 'MODIFICAR_MEDICO_EXITO'
const MODIFICAR_MEDICO_FALLO = 'MODIFICAR_MEDICO_FALLO'
const RESETEAR_MODIFICAR_DATOS = 'RESETEAR_MODIFICAR_DATOS'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case TRAER_DATOS:
            return {...state, datos: action.payload}
        case TRAER_DATOS_FALLO:
            return {...state, errorResponse: action.payload}
        case MODIFICAR_MEDICO:
            return {...state, errorResponse: '', okResponse: '', loading: true}
        case MODIFICAR_MEDICO_EXITO:
            return {...state, errorResponse: '', okResponse:action.payload, datos: action.payload , loading: false}
        case MODIFICAR_MEDICO_FALLO:
            return {...state, errorResponse: action.payload, okResponse:'', loading: false}
        case RESETEAR_MODIFICAR_DATOS:
            return {...state, datos: {}, loading: false, errorResponse:'', okResponse:''}
        default:
            return state
    }
}

//acciones
export const modificarMedicoAccion = (medico) => async (dispatch, getState) => {
    dispatch({
        type: MODIFICAR_MEDICO
    })  
    await axios.post('http://'+ window.properties.ip +'/guardarDatosMedico', medico)
            .then(response => {
                console.log(response)
                dispatch({
                    type: MODIFICAR_MEDICO_EXITO,
                    payload: response.data
                })
            })  
            .catch(e => {
                console.dir(e)
                dispatch({
                    type: MODIFICAR_MEDICO_FALLO,
                    payload: 'No se pudo continuar con el proceso: ' + e.message
                })
            })
}

export const traerDatosMedico = (medico) => async (dispatch, getState) => {
    await axios.post('http://'+ window.properties.ip +'/getDatosMedico', medico)
            .then(response => {
                dispatch({
                    type: TRAER_DATOS,
                    payload: response.data
                })
                console.log(response)
            })  
            .catch(e => {
                dispatch({
                    type: TRAER_DATOS_FALLO,
                    payload: 'No se pudo continuar conel proceso: ' + e.message
                })
            })
}

export const resetearMedicoAccion = () => async (dispatch, getState) => {
    dispatch({
        type: RESETEAR_MODIFICAR_DATOS
    })
}