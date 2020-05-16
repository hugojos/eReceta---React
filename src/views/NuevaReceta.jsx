import React, { useState, useEffect } from 'react';
import TablaMedicamento from '../components/nuevaReceta/TablaMedicamento'
import BuscadorMedicamento from '../components/nuevaReceta/BuscadorMedicamento'

import { FormControl, InputLabel, Select, Button, Paper } from '@material-ui/core'
import FormInput from '../components/FormInput' 

import { traerListaObraSocialAccion, traerListaMedicamentosAccion, vaciarMedicamentoAccion } from '../redux/nuevaRecetaDuck'
import { agregarPacienteAccion, resetearAccion } from '../redux/recetaDuck'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

const NuevaReceta = () => {

    const history = useHistory()

	const dispatch = useDispatch()
    
    const listaObraSocial = useSelector(state => state.nuevaReceta.listaObraSocial)
    const medicamentoDtos = useSelector(state => state.receta.medicamentoDtos)

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
        if(name == 'dni' && !/^[0-9]*$/.test(value)) value = value.substring(0, value.length-1)
        if(name == 'dni' && value.length > 8) value = value.substring(0, 8)
        setPaciente({
			...paciente,
			[name]: value
        })   
        setError({...error, [event.target.name]: ''})
    }

    const handleBuscador = (query) => {
        setBuscador(query)
        setError({...error, medicamentoDtos: ''})
        if(query.length >= 3) {
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
            if((key == 'nombre' || key == 'apellido') && !onlyLetters.test(paciente[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(!paciente[key] && key != 'dni' && key != 'obraSocial' && key != 'numeroAfiliado')
                newError[key] = 'El campo no debe estar vacio'
        })
        setError({...newError})
        if(!Object.keys(newError).length){
            dispatch( agregarPacienteAccion(paciente) )
            history.push('/firmar')
        }
    }

	return (
        <div className="container h-100">
            <div className="row pt-2 justify-content-center">
                <div className="col-12 col-md-6 text-left">
                    <span className="font-weight-bold">Datos del paciente</span>
                    <Paper 
                    elevation={4}
                    className="p-2">
                        <form action="" method="POST" className="">
                            <div className="form-group row">
                                <div className="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                                    <FormInput 
                                    handle={handleInputPacienteChange}
                                    name="nombre"
                                    error={error.nombre}
                                    label="Nombre"
                                    value={paciente.nombre}/>
                                </div>
                                <div className="col-6 col-md-12 pl-1 pl-md-3 text-left">
                                    <FormInput 
                                    handle={handleInputPacienteChange}
                                    name="apellido"
                                    error={error.apellido}
                                    label="Apellido"
                                    value={paciente.apellido}/>
                                </div>
                            </div>
                            <div className="form-group text-left">
                                <FormInput 
                                handle={handleInputPacienteChange}
                                name="dni"
                                error={error.dni}
                                label="DNI (opcional)"
                                value={paciente.dni}/>
                            </div>
                            <div className="form-group text-left">
                                <FormControl variant="outlined" fullWidth={true} size="small">
                                    <InputLabel>Obra social (opcional)</InputLabel>
                                    <Select 
                                    error={!!error.obraSocial}
                                    native
                                    name="obraSocial"
                                    label="Obra social (opcional)"
                                    onChange={handleInputPacienteChange}>
                                    <option value=""></option>
                                    {
                                        listaObraSocial.map(obra => (
                                            <option value={obra.nombre} key={obra.nombre}> {obra.nombre} </option>
                                        ))
                                    }
                                    </Select>
                                </FormControl>      
                            </div>
                            {   paciente.obraSocial &&
                                <div className="form-group text-left">
                                    <FormInput 
                                    handle={handleInputPacienteChange}
                                    name="numeroAfiliado"
                                    error={error.numeroAfiliado}
                                    label="N° Afiliado"
                                    value={paciente.numeroAfiliado}/>
                                </div>
                            }
                        </form>
                    </Paper>
                </div>
                <div className="col-12 col-md-6 text-left">
                    <div className="row">
                        <BuscadorMedicamento
                        buscador={buscador}
                        handleBuscador={handleBuscador}
                        error={error.medicamentoDtos}
                        className="col-12 my-3 my-md-0 text-left"/>
                        <TablaMedicamento 
                        className="col-12 m-auto"/>
                        <div className="col-12 my-2 d-flex flex-column align-items-center">
                            <span className="text-danger small"> </span>
                            <div className="form-group mt-2">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                onClick={ validate }>
                                Siguiente
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
