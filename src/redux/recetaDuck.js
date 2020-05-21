import axios from 'axios'
import history from './history'
//contantes
const data = {
    pacienteDto: {},
    medicamentoDtos: [],
    firmaDigital: [],
    receta: [],
    loading: false,
    errorResponse: '',
}

const AGREGAR_MEDICAMENTO = 'AGREGAR_MEDICAMENTO'
const SACAR_MEDICAMENTO = 'QUITAR_MEDICAMENTO'
const SUMAR_CANTIDAD = 'SUMAR_CANTIDAD'
const AGREGAR_POSOLOGIA = 'AGREGAR_POSOLOGIA'
const AGREGAR_FIRMA = 'AGREGAR_FIRMA'
const AGREGAR_PACIENTE = 'AGREGAR_PACIENTE'
const GENERAR_RECETA = 'GENERAR RECETA'
const GENERAR_RECETA_EXITO = 'GENERAR_RECETA_EXITO'
const GENERAR_RECETA_FALLO = 'GENERAR_RECETA_FALLO'
const RESETEAR = 'RESETEAR'

//reducer
export default function reducer(state = data, action){
    switch (action.type) {
        case AGREGAR_MEDICAMENTO: 
            return {...state, medicamentoDtos: [...state.medicamentoDtos, action.payload]}
        case SUMAR_CANTIDAD:
            return {...state, medicamentoDtos: [...action.payload]}
        case SACAR_MEDICAMENTO:
            return {...state, medicamentoDtos: [...action.payload]}
        case AGREGAR_POSOLOGIA:
            return {...state, medicamentoDtos: [...action.payload]}
        case AGREGAR_FIRMA:
            return {...state, firmaDigital: action.payload}
        case AGREGAR_PACIENTE:
            return {...state, pacienteDto: action.payload}
        case GENERAR_RECETA:
            return {...state, receta:[], errorResponse:'', loading: true}
        case GENERAR_RECETA_EXITO:
            return {...state, receta: action.payload, loading: false} 
        case GENERAR_RECETA_FALLO:
            return {...state, errorResponse: action.payload, loading: false}
        case RESETEAR:
            return {pacienteDto: {},  medicamentoDtos: [], firmaDigital: [], receta: [], loading: false, errorResponse: '',}
        default:
            return state
    }
}

//acciones
export const agregarMedicamentoAccion = (medicamento) => async (dispatch, getState) => {
    let existe = getState().receta.medicamentoDtos.find(seleccionado => seleccionado.nombre == medicamento.nombre)
    if(!existe) {
        dispatch({
            type: AGREGAR_MEDICAMENTO, 
            payload: medicamento
        })
    }
}

export const sacarMedicamentoAccion = (index) => async (dispatch, getState) => {
    let newmedicamentoDtos = getState().receta.medicamentoDtos
    newmedicamentoDtos.splice(index, 1)
    dispatch({
        type: SACAR_MEDICAMENTO,
        payload: newmedicamentoDtos
    })
}

export const sumarCantidadAccion = (index, valor) => async (dispatch, getState) => {
    let newmedicamentoDtos = getState().receta.medicamentoDtos
    newmedicamentoDtos[index].cantidad += valor
    if(newmedicamentoDtos[index].cantidad <= 0) newmedicamentoDtos[index].cantidad = 1
    dispatch({
        type: SUMAR_CANTIDAD,
        payload: newmedicamentoDtos
    })
}

export const agregarPosologiaAccion = (index, valor) => async (dispatch, getState) => {
    let newMedicamentoDtos = getState().receta.medicamentoDtos
    newMedicamentoDtos[index].posologia = valor
    dispatch({
        type: AGREGAR_POSOLOGIA,
        payload: newMedicamentoDtos
    })
}

export const agregarPacienteAccion = (paciente) => async (dispatch, getState) => {
    dispatch({
        type: AGREGAR_PACIENTE,
        payload: paciente
    })
}

export const resetearAccion = () => async (dispatch, getState) => {
    dispatch({
        type: RESETEAR
    })
}

export const generarRecetaAccion = (data) => async (dispatch, getState) => {
    dispatch({
        type: GENERAR_RECETA
    })
    await axios.post(window.properties.ip+'/nuevaReceta', data)
    .then(response => {
        console.dir(response)
        dispatch({
            type: GENERAR_RECETA_EXITO,
            payload: response.data
        })
        history.push('/receta')
    })
    .catch(e => {
        console.dir(e)
        dispatch({
            type: GENERAR_RECETA_FALLO,
            payload: 'No se pudo continuar con el proceso: ' + e.message
        })
    })
}