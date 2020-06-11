import React, { useState, useEffect } from 'react';

import TablaMedicamento from './components/TablaMedicamento'
import BuscadorMedicamento from './components/BuscadorMedicamento'
import Paciente from './components/Paciente'

import { Button, CircularProgress } from '@material-ui/core'

import { traerListaObraSocialAccion, traerListaMedicamentosAccion, vaciarMedicamentoAccion } from '../../../redux/nuevaRecetaDuck'
import { agregarPacienteAccion, resetearAccion } from '../../../redux/recetaDuck'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { generarRecetaAccion } from '../../../redux/recetaDuck'

const NuevaReceta = () => {

    const history = useHistory()

	const dispatch = useDispatch()
    
    const user = useSelector(state => state.auth.user)
    const medicamentoDtos = useSelector(state => state.receta.medicamentoDtos)
    const loading = useSelector(state => state.receta.loading)

    let data = useSelector(state => state.receta)

    const [buscador, setBuscador] = useState('')
     
    const [paciente, setPaciente] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        obraSocial: '',
        numeroAfiliado: ''
    })

    const [error, setError] = useState({})

	const handleInputPacienteChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        if(name === 'dni' && !/^[0-9]*$/.test(value)) value = value.substring(0, value.length-1)
        if(name === 'dni' && value.length > 8) value = value.substring(0, 8)
        setPaciente({
			...paciente,
			[name]: value
        })   
        setError({...error, [event.target.name]: ''})
    }

    const handleBuscador = (query) => {
        setBuscador(query)
        setError({...error, medicamentoDtos: ''})
        if(query.length >= 2) {
            dispatch( traerListaMedicamentosAccion(query) )
        } else {
            dispatch( vaciarMedicamentoAccion() )
        }
    }

    useEffect(() => {
        dispatch( traerListaObraSocialAccion() )
        dispatch( resetearAccion() )
    }, [])

    const validate = () => {
        setError({})
        let onlyLetters = /^[\sA-Za-zÁÉÍÓÚáéíóúñÑÄËÏÖÜäëïöü]+[A-Za-zÁÉÍÓÚáéíóúñÑÄËÏÖÜäëïöü]+[\s]*$/
        let newError = {}
        if(paciente.dni.length && !(paciente.dni.length >= 7 && paciente.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        if(paciente.obraSocial.length && !paciente.numeroAfiliado.length) newError.numeroAfiliado = 'El campo no debe estar vacio'
        if(!medicamentoDtos.length) newError.medicamentoDtos = '¡Debe seleccionar al menos un medicamento!'
        Object.keys(paciente).forEach(key => {
            if((key === 'nombre' || key === 'apellido') && !onlyLetters.test(paciente[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(!paciente[key] && key !== 'dni' && key !== 'obraSocial' && key !== 'numeroAfiliado')
                newError[key] = 'El campo no debe estar vacio'
        })
        setError({...newError})
        if(!Object.keys(newError).length){
            if(user.usaFirmaAutomatica) {
                data.usuarioMedicoDto = user
                data.pacienteDto = paciente
                dispatch( generarRecetaAccion(data) )
            } else {
                dispatch( agregarPacienteAccion(paciente) )
                history.push('/firmar')
            }
            
        }
    }

	return (
        <div className="container h-100">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h1 className="h4">Generación de receta digital</h1>
                </div>
                <div className="col-12 col-md-6 text-left">
                    <span className="font-weight-bold">Datos del paciente</span>
                    <Paciente 
                    handle={handleInputPacienteChange} 
                    error={error}
                    paciente={paciente}
                    />
                </div>
                <div className="col-12 col-md-6 text-left">
                    <div className="row">
                        <BuscadorMedicamento
                        buscador={buscador}
                        handleBuscador={handleBuscador}
                        error={error.medicamentoDtos}
                        className="col-12 my-3 my-md-0 text-left"
                        />
                        <TablaMedicamento 
                        className="col-12 m-auto"
                        />
                        <div className="col-12 my-2 d-flex flex-column align-items-center">
                            <span className="text-danger small"> </span>
                            <div className="form-group mt-2">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                startIcon={
                                    loading &&
                                    <CircularProgress size={20} color="inherit"/>
                                }
                                onClick={ validate }>
                                Generar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default NuevaReceta;
