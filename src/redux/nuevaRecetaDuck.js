import axios from 'axios'

//contantes
const data = {
    listaObraSocial: [],
    listaMedicamentos: [],
}

let queri = ''

const TRAER_OBRA_SOCIAL = 'TRAER_OBRA_SOCIAL'
const TRAER_MEDICAMENTOS = 'TRAER_MEDICAMENTOS'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case TRAER_OBRA_SOCIAL:
            return {...state, listaObraSocial:  action.payload}
        case TRAER_MEDICAMENTOS:
            return {...state, listaMedicamentos: action.payload}
        default:
            return state;
    }
}

//acciones
export const traerListaObraSocialAccion = () => async (dispatch, getState) => {
    await axios.post('http://'+ window.properties.ip +'/obrasSociales')
            .then(response => {
                dispatch({
                    type: TRAER_OBRA_SOCIAL, 
                    payload: response.data
                })
            })  
}

export const traerListaMedicamentosAccion = (query) => async (dispatch, getState) => {
    queri = query
    if(query.length > 0) {
        await axios.post('http://'+ window.properties.ip +'/medicamentos', {
            nombre: query,
            descuento:'',
            cantidad:'',
        })
        .then(response => {
            if( queri.length > 0 ) {
                dispatch({
                    type: TRAER_MEDICAMENTOS, 
                    payload: response.data.slice(0,10)
                })
            } else {
                dispatch({
                    type: TRAER_MEDICAMENTOS, 
                    payload: []
                })
            }
        })
    } else {
        dispatch({
            type: TRAER_MEDICAMENTOS,
            payload: []
        })
    }
    
}
