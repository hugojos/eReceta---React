import axios from 'axios'
import IMedico from '@/models/IMedico'
import { IPaginado } from '@/models/IPaginado'
//contantes
const data: IMedicos = {
    listaMedicos: [],
    listaInfo: {}
}

const TRAER_MEDICOS = 'TRAER_MEDICOS'

//reducer
export default function reducer(state = data, action: any){
    switch (action.type) {
        case TRAER_MEDICOS:
            return {...state, listaMedicos: action.payload.content, listaInfo: action.payload}
        default:
            return state
    }
}

//acciones
export const traerMedicosAccion = (page:number, size:number, filtro:object) => async (dispatch: any, getState: any) => {
    console.log(filtro)
    axios.post(window.properties.ip + '/medicos?page=' + page + '&size=' + size, filtro)
    .then(response => {
        console.log(response)
        dispatch({
            type: TRAER_MEDICOS,
            payload: response.data
        })
    })
}

export interface IMedicos {
    listaMedicos: IMedico[];
    listaInfo: IPaginado<IMedico>;
}
