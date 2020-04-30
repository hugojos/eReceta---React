import axios from 'axios'
//contantes
const data = {
    user: localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {},
    loading: false,
}

const INICIAR_SESION_EXITO = 'INICIAR_SESION_EXITO'
const INICIAR_SESION_FALLO = 'INICIAR_SESION_FALLO'
const INICIAR_SESION = 'INICIAR_SESION'
const CERRAR_SESION = 'CERRAR_SESION'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case INICIAR_SESION_EXITO:
            return {...state, user:  action.payload, loading: false}
        case INICIAR_SESION_FALLO:
            return {...state, loading: false}
        case INICIAR_SESION:
            return {...state, loading: true}
        case CERRAR_SESION:
            return {...state, user: {}, loading: false}
        default:
            return state
    }
}

//acciones
export const iniciarSesionAccion = (user) => async (dispatch, getState) => {
    dispatch({
        type: INICIAR_SESION
    })  
    await axios.post('http://'+ window.properties.ip +'/login', user)
            .then(response => {
                localStorage.setItem('auth', JSON.stringify(response.data))
                console.log(response)
                dispatch({
                    type: INICIAR_SESION_EXITO, 
                    payload: response.data
                })
            })  
            .catch(e => {
                console.dir(e)
                dispatch({
                    type: INICIAR_SESION_FALLO
                })
            })
}

export const cerrarSesionAccion = () => async (dispatch, getState) => {
    dispatch({
        type: CERRAR_SESION
    })
}