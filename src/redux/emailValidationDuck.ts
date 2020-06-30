import axios from 'axios'

//contantes
const data: IEmailValidation = {
    loading: false,
    errorResponse: '', 
    okResponse: '',
}

const VALIDAR_EMAIL = 'VALIDAR_EMAIL'
const VALIDAR_EMAIL_EXITO = 'VALIDAR_EMAIL_EXITO'
const VALIDAR_EMAIL_FALLO = 'VALIDAR_EMAIL_FALLO'

//reducer
export default function reducer(state = data, action: any){
    switch (action.type) {
        case VALIDAR_EMAIL: 
            return {...state, errorResponse: '', okResponse:'', loading: true}
        case VALIDAR_EMAIL_EXITO:
            return {...state, errorResponse: '', okResponse: action.payload, loading: false}
        case VALIDAR_EMAIL_FALLO:
            return {...state, errorResponse: action.payload, okResponse:'', loading: false} 
        default:
            return state;
    }
}

//acciones
export const validarEmailAccion = (token: string) => async (dispatch: any, getState: any) => {
    dispatch({type: VALIDAR_EMAIL})
    await axios.get(window.properties.ip + '/validar?tokenRecibido='+token)
    .then(response => {
        console.log(response)
        dispatch({
            type: VALIDAR_EMAIL_EXITO,
            payload: '¡La cuenta ' + response.data.email + ' se ha validado correctamente!'
        })
    })
    .catch(e => {
        dispatch({
            type: VALIDAR_EMAIL_FALLO,
            payload: 'No se pudo validar la cuenta'
        })
    })
}

export interface IEmailValidation {
    loading: boolean,
    errorResponse: string, 
    okResponse: string,
}
