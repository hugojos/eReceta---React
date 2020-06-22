import axios from 'axios'
//contantes
const data = {
    listaMedicos: [],
    listaInfo: {}
}

const TRAER_MEDICOS = 'TRAER_MEDICOS'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case TRAER_MEDICOS:
            return {...state, listaMedicos: action.payload.content, listaInfo: action.payload}
        default:
            return state
    }
}

//acciones
export const traerMedicosAccion = (page, size, filtro) => async (dispatch, getState) => {
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