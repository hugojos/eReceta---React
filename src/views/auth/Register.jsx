import React, { useState, useEffect } from 'react'

import { CircularProgress, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, InputLabel, Select, FormHelperText } from '@material-ui/core'
import { useSelector,useDispatch } from 'react-redux'
import { traerListaProvinciasAccion, registrarAccion, resetearRegisterAccion } from '../../redux/registerDuck'

import RegisterDialog from '../../components/register/RegisterDialog'
import FormInput from '../../components/FormInput'
import RegisterPhoto from '../../components/register/RegisterPhoto'

const Register = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.register)
    
    let listaProvincias = useSelector(state => state.register.listaProvincias)

    const [idSinProvincia, setIdSinProvincia] = useState({})

    const [medico, setMedico] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        matricula: '',
        fotoDni: '',
        tipoMatricula: 'NACIONAL',
        password: '',
        confirmPassword: '',
        idProvincia: 0
    })

    const [error, setError] = useState({})

    useEffect(() => {
       dispatch( traerListaProvinciasAccion() )
       return () => dispatch( resetearRegisterAccion() )
    },[])

    useEffect(() => {
        let index = listaProvincias.findIndex(provincia => provincia.nombre == 'SIN PROVINCIA')
        if(index != -1) {
            setIdSinProvincia(listaProvincias.splice(index, 1)[0].id)
        }
    },[listaProvincias])

    const handleInputMedicoChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setError({ ...error, [name]: '' })
        if((name == 'matricula' || name == 'telefono' || name == 'dni') && !/^[0-9]*$/.test(value)) value = ''
        if(name == 'dni' && value.length > 8) value = value.substring(0, 8)
        if(name == 'matricula' && value.length > 6) value = value.substring(0, 6)
        console.log(value)
        setMedico({
            ...medico,
            [name]: value
        })
    }

    const handleMedicoPhoto = (value) => {
        setMedico({
            ...medico,
            fotoDni: value
        })
    }

    const validate = () => {
        let isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let onlyLetters = /(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
        let newError = {}
        let auxMedico = medico
        setError({})
        if(medico.matricula.length > 7) newError.matricula = 'La matricula debe contener hasta 7 caracteres'
        if(medico.password != medico.confirmPassword) newError.confirmPassword = 'Las contraseñas no coinciden'
        if(!(medico.dni.length >= 7 && medico.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        if(!isEmail.test(medico.email.toLowerCase())) newError.email = 'El email es invalido'
        if(medico.tipoMatricula == 'PROVINCIAL' && (!medico.idProvincia || medico.idProvincia == idSinProvincia)) newError.idProvincia = 'Debe seleccionar una provincia';
        if(medico.tipoMatricula == 'NACIONAL') auxMedico.idProvincia = idSinProvincia
        Object.keys(medico).forEach(key => {
            if((key == 'nombre' || key == 'apellido') && !onlyLetters.test(medico[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(medico[key] == '' && key != 'telefono' && key != 'idMedico' && key != 'usaApp' && key != 'idProvincia' && key != 'fotoDni') 
                newError[key] = 'El campo no debe estar vacio'
        })
        setError(newError)
        console.log(newError)
        console.log(auxMedico)
        if(!Object.keys(newError).length)
            dispatch( registrarAccion( auxMedico ) )
    }

    return (
        <div className="container">
            <RegisterDialog message={state.okResponse} />
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <Paper className="mt-2 p-3 w-100 text-center" elevation={3}>
                        <div className="form-group text-left w-100">
                            <FormInput 
                            error={error.nombre}
                            name="nombre"
                            label="Nombre(s)"
                            handle={handleInputMedicoChange}
                            value={medico.nombre}/>
                        </div>
                        <div className="form-group text-left">
                            <FormInput 
                            error={error.apellido}
                            name="apellido"
                            label="Apellido(s)"
                            handle={handleInputMedicoChange}
                            value={medico.apellido}/>
                        </div>
                        <div className="form-group row">
                            <div className="col-7 d-flex align-items-center pr-1 text-left">
                                <div className="row">
                                    <div className="col-12 form-group">
                                        <FormInput 
                                        error={error.dni}
                                        name="dni"
                                        label="DNI"
                                        handle={handleInputMedicoChange}
                                        value={medico.dni}/>
                                    </div>
                                    <div className="col-12">
                                        <FormInput 
                                        error={error.telefono}
                                        name="telefono"
                                        label="Telefono (opcional)"
                                        handle={handleInputMedicoChange}
                                        value={medico.telefono}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-5 pl-1 text-center">
                                {
                                    !medico.fotoDni &&
                                    <label className="font-weight-bold">Foto DNI</label>
                                }
                                <RegisterPhoto
                                handle={handleMedicoPhoto}
                                value={medico.fotoDni} />
                            </div>
                        </div>
                        <div className="form-group">
                            <FormInput 
                            error={error.matricula}
                            name="matricula"
                            label="Matricula"
                            handle={handleInputMedicoChange}
                            value={medico.matricula}/>
                        </div>
                        <FormControl className="d-flex justify-content-between flex-row align-content-center">
                            <FormLabel className="d-flex align-items-center">Tipo</FormLabel>
                            <RadioGroup className="d-flex flex-row">
                                <FormControlLabel
                                checked={medico.tipoMatricula == 'NACIONAL'}
                                value="NACIONAL"
                                control={<Radio />}
                                name="tipoMatricula"
                                onChange={handleInputMedicoChange}
                                label="Nacional"
                                labelPlacement="end"
                                />
                                <FormControlLabel
                                value="PROVINCIAL"
                                control={<Radio />}
                                name="tipoMatricula"
                                onChange={handleInputMedicoChange}
                                label="Provincial"
                                labelPlacement="end"
                                />
                            </RadioGroup>
                        </FormControl>
                        {
                            medico.tipoMatricula == 'PROVINCIAL' &&
                            <div className="form-group text-left">
                                <FormControl variant="outlined" fullWidth={true} size="small">
                                    <InputLabel>Provincia</InputLabel>
                                    <Select 
                                    error={!!error.idProvincia}
                                    native
                                    name="idProvincia"
                                    label="Provincia"
                                    onChange={handleInputMedicoChange}>
                                    <option value=""></option>
                                    {
                                        listaProvincias.map(provincia => (
                                            <option value={provincia.id} key={provincia.id}> {provincia.nombre} </option>
                                        ))
                                    }
                                    </Select>
                                    {   error.idProvincia &&
                                        <FormHelperText className="text-error">{error.idProvincia}</FormHelperText>
                                    }
                                </FormControl> 
                            </div>
                        }
                        <div className="form-group text-left">
                            <FormInput 
                            error={error.email}
                            name="email"
                            label="Email"
                            handle={handleInputMedicoChange}
                            value={medico.email}/>
                        </div> 
                        <div className="form-group text-left">
                            <FormInput 
                            error={error.password}
                            name="password"
                            label="Contraseña"
                            handle={handleInputMedicoChange}
                            value={medico.password}
                            type="password"/>      
                        </div>
                        <div className="form-group text-left">
                            <FormInput 
                            error={error.confirmPassword}
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            handle={handleInputMedicoChange}
                            value={medico.confirmPassword}
                            type="password"/>     
                        </div>
                        {   state.errorResponse &&
                            <span className="d-block mb-2 text-error">{state.errorResponse}</span>
                        }
                            <Button 
                            size="large" 
                            color="primary" 
                            variant="contained"
                            startIcon={
                                state.loading &&
                                <CircularProgress size={20} color="inherit"/>
                            }
                            onClick={validate}>
                            Registrarse
                            </Button>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Register;