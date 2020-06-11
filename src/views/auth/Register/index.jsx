import React, { useState, useEffect } from 'react'

import { CircularProgress, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Paper, InputLabel, Select, FormHelperText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { traerListaProvinciasAccion, registrarAccion, resetearRegisterAccion } from '../../../redux/registerDuck'

import { esEmail, sonLetras, sonNumeros } from '../../../utils/validaciones'

import RegisterDialog from './components/RegisterDialog'
import AppInput from '../../../components/AppInput'
import RegisterPhoto from './components/RegisterPhoto'
import DialogTerminos from './components/DialogTerminos'
import DialogPoliticas from './components/DialogPoliticas'

const Register = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.register)
    const [openTerminos, setOpenTerminos] = useState(false)
    const [openPoliticas, setOpenPoliticas] = useState(false)

    const toggleTerminos = () => {
        setOpenTerminos(!openTerminos)
    }

    const togglePoliticas = () => {
        setOpenPoliticas(!openPoliticas)
    }
    
    let listaProvincias = useSelector(state => state.register.listaProvincias)

    const [medico, setMedico] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        telefono: '',
        email: '',
        matricula: '',
        archivoDni: '',
        tipoMatricula: "",
        password: '',
        confirmPassword: '',
        idProvincia: "0"
    })

    const [error, setError] = useState({})

    useEffect(() => {
       dispatch( traerListaProvinciasAccion() )
       return () => dispatch( resetearRegisterAccion() )
    },[])

    useEffect(() => {
        if(medico.idProvincia === "1")
            setMedico({...medico, tipoMatricula: "NACIONAL"})
        else
            setMedico({...medico, tipoMatricula: "PROVINCIAL"})
    }, [medico.idProvincia])

    const handleInputMedicoChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setError({ ...error, [name]: '' })
        if( name === 'idProvincia' ) setError({ ...error, matricula: ''})
        if((name === 'matricula' || name === 'telefono' || name === 'dni') && !sonNumeros(value)) value = value.substring(0, value.length-1)
        if(name === 'dni' && value.length > 8) value = value.substring(0, 8)
        if(name === 'matricula' && value.length > 6) value = value.substring(0, 6)
        setMedico({
            ...medico,
            [name]: value
        })
    }

    const handleMedicoPhoto = (value) => {
        setMedico({
            ...medico,
            archivoDni: value
        })
    }

    const validate = () => {
        let newError = {}
        let auxMedico = medico
        setError({})
        if(medico.matricula.length > 7) newError.matricula = 'La matricula debe contener hasta 7 caracteres'
        if(medico.password !== medico.confirmPassword) newError.confirmPassword = 'Las contraseñas no coinciden'
        if(!(medico.dni.length >= 7 && medico.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        if(!esEmail(medico.email.toLowerCase())) newError.email = 'El email es invalido'
        if(medico.idTipo === "0" || medico.idProvincia === "0") newError.matricula = 'Debe seleccionar un tipo de matricula';
        Object.keys(medico).forEach(key => {
            if((key === 'nombre' || key === 'apellido') && !sonLetras(medico[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(medico[key] === '' && key !== 'telefono' && key !== 'idMedico' && key !== 'usaApp' && key !== 'idProvincia' && key !== 'archivoDni') 
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
                <div className="col-12 text-center">
                    <h1 className="h2">Registro de usuario</h1>
                </div>
                <div className="col-12 col-md-8 col-lg-6">
                    <Paper className="mt-2 p-3 w-100 text-center" elevation={3}>
                        <div className="form-group text-left w-100">
                            <AppInput 
                            error={error.nombre}
                            name="nombre"
                            label="Nombre(s)"
                            handle={handleInputMedicoChange}
                            value={medico.nombre}/>
                        </div>
                        <div className="form-group text-left">
                            <AppInput 
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
                                        <AppInput 
                                        error={error.dni}
                                        name="dni"
                                        label="DNI"
                                        handle={handleInputMedicoChange}
                                        value={medico.dni}/>
                                    </div>
                                    <div className="col-12">
                                        <AppInput 
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
                                    !medico.archivoDni &&
                                    <label className="m-0 font-weight-bold">Foto DNI <p className="small m-0 text-muted" style={{lineHeight: 1}}>(opcional)</p> </label>
                                }
                                <RegisterPhoto
                                handle={handleMedicoPhoto}
                                value={medico.archivoDni} />
                            </div>
                        </div>
                        <div className="form-group row align-items-center">
                            <div className="col-3 col-md-2">
                                <span className="text-left small text-muted">Matricula</span>
                            </div>
                            <div className="col-4 col-md-5 pl-0 pr-1">
                                <FormControl variant="outlined" fullWidth={true} size="small">
                                    <Select 
                                    native
                                    name="idProvincia"
                                    onChange={handleInputMedicoChange}>
                                    <option value={0}>Tipo</option>
                                    {
                                        listaProvincias.map(provincia => (
                                            <option value={provincia.id} key={provincia.id}> {provincia.nombre} </option>
                                        ))
                                    }
                                    </Select>
                                </FormControl> 
                            </div>
                            <div className="col-5 pl-0">
                                <AppInput 
                                error={error.matricula}
                                name="matricula"
                                label="Matricula"
                                handle={handleInputMedicoChange}
                                value={medico.matricula}/>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <AppInput 
                            error={error.email}
                            name="email"
                            label="Email"
                            handle={handleInputMedicoChange}
                            value={medico.email}/>
                        </div> 
                        <div className="form-group text-left">
                            <AppInput 
                            error={error.password}
                            name="password"
                            label="Contraseña"
                            handle={handleInputMedicoChange}
                            value={medico.password}
                            type="password"/>      
                        </div>
                        <div className="form-group text-left mb-3">
                            <AppInput 
                            error={error.confirmPassword}
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            handle={handleInputMedicoChange}
                            value={medico.confirmPassword}
                            type="password"/>     
                        </div>
                        <p className="text-left mt-0 mb-3 ml-1 ml-sm-3 ml-md-2 ml-lg-4" style={{fontSize:'14px'}}>
                            Al registrarme, declaro que soy mayor de edad y acepto los <Link onClick={toggleTerminos}>Términos y condiciones</Link> y las <Link onClick={togglePoliticas}>Políticas de privacidad</Link> de MBSoft S.A.
                        </p>
                        {   state.errorResponse &&
                            <span className="d-block mb-2 text-error">{state.errorResponse}</span>
                        }
                        <div className="form-group d-flex justify-content-around">
                            <Button
                            className="col-5" 
                            to="/"
                            component={Link}
                            size="medium" 
                            color="primary" 
                            variant="outlined">
                            Salir
                            </Button>
                            <Button
                            className="col-5"  
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
                        </div>
                    </Paper>
                </div>
            </div>
            <DialogTerminos toggleTerminos={toggleTerminos} open={openTerminos}/>
            <DialogPoliticas togglePoliticas={togglePoliticas} open={openPoliticas}/>
        </div>
    )
}

export default Register;