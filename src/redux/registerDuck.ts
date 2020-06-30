import axios from 'axios'
import IMedico from '@/models/IMedico'

//contantes
const data: IRegister = {
    listaProvincias: [],
    loading: false,
    errorResponse: '',
    okResponse: ''
}

const TRAER_LISTA_PROVINCIAS = 'TRAER_LISTA_PROVINCIAS'
const REGISTRAR = 'REGISTRAR'
const REGISTRAR_EXITO = 'REGISTRAR_EXITO'
const REGISTRAR_FALLO = 'REGISTRAR_FALLO'
const RESETEAR_REGISTER = 'RESETEAR_REGISTER'

//reducer
export default function reducer(state = data, action: any){
    switch (action.type) {
        case REGISTRAR: 
            return {...state, errorResponse: '', okResponse:'', loading: true}
        case REGISTRAR_EXITO:
            return {...state, errorResponse: '', okResponse: action.payload, loading: false}
        case REGISTRAR_FALLO:
            return {...state, errorResponse: action.payload, okResponse:'', loading: false} 
        case TRAER_LISTA_PROVINCIAS:
            return {...state, listaProvincias: action.payload}
        case RESETEAR_REGISTER: 
            return {...state, okResponse:'', errorResponse:''}
        default:
            return state;
    }
}

//acciones
export const registrarAccion = (medico: IMedico) => async (dispatch: any, getState: any) => {
    dispatch({type: REGISTRAR})
    await axios.post(window.properties.ip + '/registrar', medico)
    .then(response => {
        console.dir(response)
        dispatch({
            type: REGISTRAR_EXITO,
            payload: response.data
        })
    })
    .catch(e => {
        console.dir(e)
        let message = 'No se pudo continuar con el proceso: ' + e.message
        if(e.response) message = e.response.data
        dispatch({
            type: REGISTRAR_FALLO,
            payload: message
        })
    })
}

export const traerListaProvinciasAccion = () => async (dispatch: any, getState: any) => {
    await axios.post(window.properties.ip + '/provincias')
    .then(response => {
        console.log(response)
        dispatch({
            type: TRAER_LISTA_PROVINCIAS,
            payload: response.data
        })
    })
}

export const resetearRegisterAccion = () => async (dispatch: any, getState: any) => {
    dispatch({
        type: RESETEAR_REGISTER
    })
}

export interface IRegister {
    listaProvincias: [];
    loading: boolean;
    errorResponse: string;
    okResponse: string;
}