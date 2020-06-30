import axios from 'axios'
//contantes
const data: IModificarDatos = {
    datos: {},
    loading: false,
    errorResponse: '',
    okResponse: '',
}

const TRAER_DATOS = 'TRAER_DATOS'
const TRAER_DATOS_FALLO = 'TRAER_DATOS_FALLO'
const MODIFICAR_MEDICO = 'MODIFICAR_MEDICO'
const MODIFICAR_MEDICO_EXITO = 'MODIFICAR_MEDICO_EXITO'
const MODIFICAR_MEDICO_FALLO = 'MODIFICAR_MEDICO_FALLO'
const RESETEAR_MODIFICAR_DATOS = 'RESETEAR_MODIFICAR_DATOS'

//reducer
export default function reducer(state = data, action: any){
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
export const modificarMedicoAccion = (medico: any) => async (dispatch: any, getState: any) => {
    dispatch({
        type: MODIFICAR_MEDICO
    })  
    await axios.post(window.properties.ip +'/guardarDatosMedico', medico)
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

export const traerDatosMedico = (medico: any) => async (dispatch: any, getState: any) => {
    await axios.post(window.properties.ip +'/getDatosMedico', medico)
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
                    payload: 'No se pudo continuar con el proceso: ' + e.message
                })
                console.dir(e)
            })
}

export const resetearMedicoAccion = () => async (dispatch: any, getState: any) => {
    dispatch({
        type: RESETEAR_MODIFICAR_DATOS
    })
}

export interface IModificarDatos {
    datos: any;
    loading: boolean;
    errorResponse: string;
    okResponse: any;
}