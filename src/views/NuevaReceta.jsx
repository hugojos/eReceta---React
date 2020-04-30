import React, {useEffect} from 'react';
import TablaMedicamento from '../components/TablaMedicamento'

import { TextField, FormControl, InputLabel, Select, InputAdornment, List, ListItem, Button, Tooltip } from '@material-ui/core'
import { Search, ReportProblemOutlined } from '@material-ui/icons';

import { traerListaObraSocialAccion, traerListaMedicamentosAccion } from '../redux/nuevaRecetaDuck'
import { agregarPacienteAccion } from '../redux/recetaDuck'
import { agregarMedicamentoAccion } from '../redux/recetaDuck'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

const NuevaReceta = () => {

    const history = useHistory()

	const dispatch = useDispatch()
    
    const listaMedicamentos = useSelector(state => state.nuevaReceta.listaMedicamentos)
    const listaObraSocial = useSelector(state => state.nuevaReceta.listaObraSocial)
    const medicamentoDtos = useSelector(state => state.receta.medicamentoDtos)
    
    useEffect(() => {
        dispatch( traerListaObraSocialAccion() )
    }, [])

    const [query, setQuery] = React.useState('')
    const [error, setError] = React.useState({})
    const [paciente, setPaciente] = React.useState({
        nombre: '',
        apellido: '',
        dni: '',
        obraSocial: '',
        numeroAfiliado: ''
    })

    useEffect(() => {
        dispatch( traerListaMedicamentosAccion(query) )
        setError({...error, medicamentoDtos: ''})
    }, [query])

	const handleInputPacienteChange = (event) => {
		setPaciente({
			...paciente,
			[event.target.name]: event.target.value
        })   
        setError({...error, [event.target.name]: ''})
    }

    const agregarMedicamento = (medicamento) => {
        medicamento.cantidad = 1;
        medicamento.posologia = '';
        dispatch( agregarMedicamentoAccion(medicamento) )
        setQuery('')
    }

    const validate = () => {
        setError({})
        let newError = {}
        if(paciente.dni.length && !(paciente.dni.length >= 7 && paciente.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        if(paciente.obraSocial.length && !paciente.numeroAfiliado.length) newError.numeroAfiliado = 'El campo no debe estar vacio'
        if(!medicamentoDtos.length) newError.medicamentoDtos = '¡Debe seleccionar al menos un medicamento!'
        console.log(medicamentoDtos.length)
        Object.keys(paciente).forEach(key => {
            if((key == 'nombre' || key == 'apellido') && !/^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/.test(paciente[key]))
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
                <div className="col-12 col-md-6 text-center text-md-left">
                    <span className="text-muted font-weight-bold">Datos del paciente</span>
                    <form action="" method="POST" className="border border-dark p-2">
                        <div className="form-group row">
                            <div className="col-6 col-md-12 pr-1 pr-md-3 mb-md-3 text-left">
                                <TextField
                                className="p-0"
                                error={!!error.nombre}
                                onChange={handleInputPacienteChange}
                                fullWidth={true}
                                name="nombre"
                                label="Nombre"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: 
                                    error.nombre &&
                                    <InputAdornment
                                    position="end">
                                        <Tooltip placement="top-end" title={error.nombre}>
                                            <ReportProblemOutlined className="text-danger"/>
                                        </Tooltip>
                                    </InputAdornment>,
                                }}
                                size='small'/>
                            </div>
                            <div className="col-6 col-md-12 pl-1 pl-md-3 text-left">
                                <TextField
                                error={!!error.apellido}
                                onChange={handleInputPacienteChange}
                                fullWidth={true}
                                name="apellido"
                                label="Apellido"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: 
                                    error.apellido &&
                                    <InputAdornment
                                    position="end">
                                        <Tooltip placement="top-end" title={error.apellido}>
                                            <ReportProblemOutlined className="text-danger"/>
                                        </Tooltip>
                                    </InputAdornment>,
                                }}
                                size='small'/>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <TextField
                            error={!!error.dni}
                            onChange={handleInputPacienteChange}
                            fullWidth={true}
                            name="dni"
                            label="DNI (opcional)"
                            variant="outlined" 
                            InputProps={{
                                endAdornment: 
                                error.dni &&
                                <InputAdornment
                                position="end">
                                    <Tooltip placement="top-end" title={error.dni}>
                                        <ReportProblemOutlined className="text-danger"/>
                                    </Tooltip>
                                </InputAdornment>,
                            }}
                            size="small"/>
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
                                <TextField
                                error={!!error.numeroAfiliado}
                                InputProps={{
                                    endAdornment: 
                                    error.numeroAfiliado &&
                                    <InputAdornment
                                    position="end">
                                        <Tooltip placement="top-end" title={error.nombre}>
                                            <ReportProblemOutlined className="text-danger"/>
                                        </Tooltip>
                                    </InputAdornment>,
                                }}
                                onChange={handleInputPacienteChange}
                                fullWidth={true}
                                name="numeroAfiliado"
                                label="N° Afiliado"
                                variant="outlined" 
                                size="small"/>
                            </div>
                        }
                    </form>
                </div>
                <div className="col-12 col-md-6 text-left">
                    <div className="row">
                        <div className="col-12 my-3 my-md-0 text-center text-md-left">
                            <span className="text-muted font-weight-bold">Medicamentos</span>
                            <TextField
                            InputProps={{
                                startAdornment: 
                                <InputAdornment
                                position="start">
                                    <Search />
                                </InputAdornment>,
                                endAdornment: 
                                error.medicamentoDtos &&
                                <InputAdornment
                                position="end">
                                    <Tooltip placement="top-end" title={error.medicamentoDtos}>
                                        <ReportProblemOutlined className="text-danger"/>
                                    </Tooltip>
                                </InputAdornment>,
                            }}
                            error={error.medicamentoDtos}
                            onChange={ (event) => setQuery(event.target.value) }
                            value= {query}
                            type="text"
                            fullWidth={true}
                            variant="outlined"
                            placeholder="¿Qué medicamento esta buscando?"
                            size="small"/>
                            <List className="pt-0">
                                {
                                    listaMedicamentos.map((medicamento, index) => (
                                        <ListItem 
                                        key={index} 
                                        button 
                                        className={"border-bottom flex-column align-items-start " + (medicamento.lResaltarMedicamento ? "bg-resaltado" : '' )}
                                        onClick={ () => agregarMedicamento(medicamento) }>
                                            <p className="m-0 font-weight-bolder">{medicamento.nombre}</p>
                                            <span className="small">{medicamento.formula}</span>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            <ul className="list-unstyled mb-1 mb-md-3 bg-light">
                                
                            </ul>
                        </div>
                        <TablaMedicamento />
                        <div className="col-12 my-2 d-flex flex-column align-items-center">
                            <span className="text-danger small"> </span>
                            <div className="form-group mt-2">
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                onClick={ () => validate() }>
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
