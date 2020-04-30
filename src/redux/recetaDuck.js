import axios from 'axios'
//contantes
const data = {
    pacienteDto: {},
    medicamentoDtos: [],
    firmaDigital: [],
    receta: []
}

const AGREGAR_MEDICAMENTO = 'AGREGAR_MEDICAMENTO'
const SACAR_MEDICAMENTO = 'QUITAR_MEDICAMENTO'
const SUMAR_CANTIDAD = 'SUMAR_CANTIDAD'
const AGREGAR_POSOLOGIA = 'AGREGAR_POSOLOGIA'
const AGREGAR_FIRMA = 'AGREGAR_FIRMA'
const AGREGAR_PACIENTE = 'AGREGAR_PACIENTE'
const GENERAR_RECETA = 'GENERAR RECETA'

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
            return {...state, firma: action.payload}
        case AGREGAR_PACIENTE:
            return {...state, paciente: action.payload}
        case GENERAR_RECETA:
            return {...state, receta: action.payload}
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

export const agregarFirmaAccion = (firma) => async (dispatch, getState) => {
    
}

export const generarRecetaAccion = (data) => async (dispatch, getState) => {
    await axios.post('http://'+window.properties.ip+'/nuevaReceta', data)
    .then(response => {
        console.log(response)
    })
}