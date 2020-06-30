import axios from 'axios'
import { IMedicamento } from '@/models/IMedicamento'
import { IObraSocial } from '@/models/IObraSocial'

//contantes
const data: INuevaReceta = {
    listaObraSocial: [],
    listaMedicamentos: [],
    acumuladorAjax: []
}

const TRAER_LISTA_OBRA_SOCIAL = 'TRAER_LISTA_OBRA_SOCIAL'
const TRAER_LISTA_MEDICAMENTOS = 'TRAER_LISTA_MEDICAMENTOS'
const VACIAR_MEDICAMENTO = 'VACIAR_MEDICAMENTO'
const VACIAR_ACUMULADOR = 'VACIAR_ACUMULADOR'
//reducer
export default function reducer(state = data, action: any){
    switch (action.type) {
        case TRAER_LISTA_OBRA_SOCIAL:
            return {...state, listaObraSocial:  action.payload}
        case TRAER_LISTA_MEDICAMENTOS:
            console.log(action.payload)
            return {...state, listaMedicamentos: action.payload.data, acumuladorAjax: [...state.acumuladorAjax, action.payload]}
        case VACIAR_MEDICAMENTO:
            return {...state, listaMedicamentos: []}
        case VACIAR_ACUMULADOR:
            return {...state, acumuladorAjax: []}
        default:
            return state;
    }
}

//acciones
export const traerListaObraSocialAccion = () => async (dispatch: any, getState: any) => {
    await axios.post(window.properties.ip +'/obrasSociales')
            .then(response => {
                dispatch({
                    type: TRAER_LISTA_OBRA_SOCIAL, 
                    payload: response.data
                })
            })  
}

export const traerListaMedicamentosAccion = (query: string) => async (dispatch: any, getState: any) => {
    await axios.post(window.properties.ip +'/medicamentos', {
        nombre: query,
        descuento:'',
        cantidad:'',
    })
    .then(response => {
            dispatch({
                type: TRAER_LISTA_MEDICAMENTOS, 
                payload: response
            })
    })
}

export const vaciarMedicamentoAccion = () => async (dispatch: any, getState: any) => {
    dispatch({
        type: VACIAR_MEDICAMENTO
    })
}

export const vaciarAcumuladorAccion = () => async (dispatch: any, getState: any) => {
    dispatch({
        type: VACIAR_ACUMULADOR
    })
}

export interface INuevaReceta {
    listaObraSocial: IObraSocial[];
    listaMedicamentos: IMedicamento[];
    acumuladorAjax: any[];
}