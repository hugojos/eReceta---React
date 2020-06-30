import React, { useState, useEffect } from 'react'

import { CircularProgress, Button, FormControl, Paper, Select } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { traerListaProvinciasAccion, resetearRegisterAccion, IRegister } from '@/redux/registerDuck'
import Checkbox from '@material-ui/core/Checkbox'
import { esEmail, sonLetras, filtroSoloNumeros } from '@/utils/validaciones'

import RegisterDialog from './components/RegisterDialog'
import AppInput from '@/components/AppInput'
import RegisterPhoto from './components/RegisterPhoto'
import DialogTerminos from './components/DialogTerminos'
import DialogPoliticas from './components/DialogPoliticas'
import DialogAceptarRegistro from './components/DialogAceptarRegistro'
import { useMedico } from '@/hooks/useMedico'
import IMedico from '@/models/IMedico'

const Register = () => {

    const dispatch = useDispatch()

    const state: IRegister = useSelector((state: any) => state.register)
    const [openTerminos, setOpenTerminos] = useState<boolean>(false)
    const [openPoliticas, setOpenPoliticas] = useState<boolean>(false)
    const [aceptaPoliticas, setAceptaPoliticas] = useState<boolean>(true)
    const [openAceptarRegistro, setOpenAceptarRegistro] = useState<boolean>(false)

    const aceptarPoliticasTerminos = (): void => {
        setAceptaPoliticas(!aceptaPoliticas)
    }

    const toggleTerminos = (): void => {
        setOpenTerminos(!openTerminos)
    }

    const togglePoliticas = (): void => {
        setOpenPoliticas(!openPoliticas)
    }

    const toggleAceptarRegistro = (): void => {
        setOpenAceptarRegistro(!openAceptarRegistro)
    }
    
    const listaProvincias = useSelector((state: any) => state.register.listaProvincias)

    const [medico, setMedico]: [IMedico, any] = useMedico();

    const [error, setError] = useState<any>({})

    useEffect((): any => {
       dispatch( traerListaProvinciasAccion() )
       return () => dispatch( resetearRegisterAccion() )
    },[])

    const handleInputMedicoChange = (event: any): void => {
        let name = event.target.name
        let value = event.target.value
        setError({ ...error, [name]: '' })
        if( name === 'idProvincia' ) setError({ ...error, matricula: ''})
        if(name === 'matricula' || name === 'telefono' || name === 'dni') value = filtroSoloNumeros(value)
        if(name === 'dni' && value.length > 8) value = value.substring(0, 8)
        if(name === 'matricula' && value.length > 6) value = value.substring(0, 6)
        setMedico({
            ...medico,
            [name]: value
        })
    }
    const handleMedicoPhoto = (value: string): void => {
        setMedico({
            ...medico,
            archivoDni: value
        })
    }

    const validate = (): void => {
        let newError: any = {}
        setError({})
        if(medico.matricula.length > 7) newError.matricula = 'La matricula debe contener hasta 7 caracteres'
        if(medico.password !== medico.confirmPassword) newError.confirmPassword = 'Las contraseñas no coinciden'
        if(!(medico.dni.length >= 7 && medico.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        if(!esEmail(medico.email.toLowerCase())) newError.email = 'El email es invalido'
        if(medico.idProvincia === "0") newError.matricula = 'Debe seleccionar un tipo de matricula';
        Object.keys(medico).forEach(key => {
            if((key === 'nombre' || key === 'apellido') && !sonLetras(medico[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(medico[key] === '' && key !== 'telefono' && key !== 'idMedico' && key !== 'usaApp' && key !== 'idProvincia' && key !== 'archivoDni') 
                newError[key] = 'El campo no debe estar vacio'
        })
        setError(newError)
        if(!Object.keys(newError).length)
           toggleAceptarRegistro()
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
                            onChange={handleInputMedicoChange}
                            value={medico.nombre}/>
                        </div>
                        <div className="form-group text-left">
                            <AppInput 
                            error={error.apellido}
                            name="apellido"
                            label="Apellido(s)"
                            onChange={handleInputMedicoChange}
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
                                        onChange={handleInputMedicoChange}
                                        value={medico.dni}/>
                                    </div>
                                    <div className="col-12">
                                        <AppInput 
                                        error={error.telefono}
                                        name="telefono"
                                        label="Telefono (opcional)"
                                        onChange={handleInputMedicoChange}
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
                                onChange={handleMedicoPhoto}
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
                                        listaProvincias.map((provincia: any) => (
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
                                onChange={handleInputMedicoChange}
                                value={medico.matricula}/>
                            </div>
                        </div>
                        <div className="form-group text-left">
                            <AppInput 
                            error={error.email}
                            name="email"
                            label="Email"
                            onChange={handleInputMedicoChange}
                            value={medico.email}/>
                        </div> 
                        <div className="form-group text-left">
                            <AppInput 
                            error={error.password}
                            name="password"
                            label="Contraseña"
                            onChange={handleInputMedicoChange}
                            value={medico.password}
                            type="password"/>      
                        </div>
                        <div className="form-group text-left mb-3">
                            <AppInput 
                            error={error.confirmPassword}
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            onChange={handleInputMedicoChange}
                            value={medico.confirmPassword}
                            type="password"/>     
                        </div>
                        <p className="text-left mt-0 mb-3 ml-1 ml-sm-3 ml-md-2 ml-lg-4" style={{fontSize:'14px'}}>
                            <Checkbox
                            onChange={aceptarPoliticasTerminos}
                            className="my-0 ml-0 mr-1 p-0"
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}/>
                            Al registrarme, declaro que soy mayor de edad y acepto los <Link to="#" onClick={toggleTerminos}>Términos y condiciones</Link> y las <Link to="#" onClick={togglePoliticas}>Políticas de privacidad</Link> de MBSoft S.A.
                        </p>
                        {   state.errorResponse &&
                            <span className="d-block mb-2 text-error">{state.errorResponse}</span>
                        }
                        <div className="form-group d-flex justify-content-around">
                            <Button
                            className="col-5" 
                            component={Link}
                            to="/"
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
                            onClick={validate}
                            disabled={aceptaPoliticas}>
                            Registrarse
                            </Button>
                        </div>
                    </Paper>
                </div>
            </div>
            <DialogTerminos toggleTerminos={toggleTerminos} open={openTerminos}/>
            <DialogPoliticas togglePoliticas={togglePoliticas} open={openPoliticas}/>
            <DialogAceptarRegistro toggleAceptarRegistro={toggleAceptarRegistro} open={openAceptarRegistro} medico={medico} />
        </div>
    )
}

export default Register;