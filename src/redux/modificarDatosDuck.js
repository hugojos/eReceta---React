import axios from 'axios'
//contantes
const data = {
    fotoMedico: [],
    loading: false,
    errorResponse: '',
    okResponse: ''
}

const TRAER_FOTO = 'TRAER_FOTO'
const MODIFICAR_MEDICO = 'MODIFICAR_MEDICO'
const MODIFICAR_MEDICO_EXITO = 'MODIFICAR_MEDICO_EXITO'
const MODIFICAR_MEDICO_FALLO = 'MODIFICAR_MEDICO_FALLO'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case TRAER_FOTO:
            return {...state, user:  action.payload, loading: false}
        case MODIFICAR_MEDICO:
            return {...state, errorResponse: action.payload,loading: false}
        case MODIFICAR_MEDICO_EXITO:
            return {...state, loading: true}
        case MODIFICAR_MEDICO_FALLO:
            localStorage.removeItem('auth')
            return {...state, user: false, loading: false}
        default:
            return state
    }
}

//acciones
export const modificarMedicoAccion = (user) => async (dispatch, getState) => {
    dispatch({
        type: MODIFICAR_MEDICO
    })  
    await axios.post('http://'+ window.properties.ip +'/getDatosMedico', user)
            .then(response => {
                console.log(response)
            })  
            .catch(e => {
                
            })
}
