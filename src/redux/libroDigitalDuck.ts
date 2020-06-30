import axios from 'axios'
import history from '@/utils/history'
//constantes
const data = {
    loading: false,
    errorResponse: '',
    archivo:''
}

const TRAER_PDF = 'TRAER_PDF'
const TRAER_PDF_EXITO = 'TRAER_PDF_EXITO'
const TRAER_PDF_FALLO = 'TRAER_PDF_FALLO'


//reducer
export default function reducer(state = data, action: any){
    switch (action.type) {
        case TRAER_PDF:
            return {...state, loading: true}
        case TRAER_PDF_EXITO:
            return {...state, archivo: action.payload, loading: false, errorResponse:''}
        case TRAER_PDF_FALLO:
            return {...state, loading: false, errorResponse:action.payload}
    
        default:
            return state
    }
}

//acciones
export const traerPDFAccion = (objeto: any) => async (dispatch: any, getState: any) => {
    dispatch({
        type: TRAER_PDF
    })  
    await axios.post(window.properties.ip +'/libroDigital', objeto)
            .then(response => {
                dispatch({
                    type: TRAER_PDF_EXITO,
                    payload: response.data})
                    history.push('/libro-digital-pdf')         
            })  
            .catch(e =>{
                dispatch({
                    type: TRAER_PDF_FALLO,
                    payload: 'No se pudo generar el libro digital: ' + e.message})
            })
}


