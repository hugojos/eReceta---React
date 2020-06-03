import React, { useState, useEffect } from 'react'
import { Paper, CircularProgress, Button, Switch } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import { modificarMedicoAccion, traerDatosMedico, resetearMedicoAccion } from '../../../redux/modificarDatosDuck'
import { modificarUsuarioAccion } from '../../../redux/authDuck'
import AppInput from '../../../components/AppInput'
import RegisterPhoto from '../../auth/Register/components/RegisterPhoto'
import { sonLetras } from '../../../utils/validaciones'
import ProfileDialogFirma from './components/ProfileDialogFirma'

const Profile = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    const state = useSelector(state => state.modificarDatos)

    const [openFirmar, setOpenFirmar] = useState(false)

    const [modificar, setModificar] = useState(false)

    const [error, setError] = useState({})

    const [medico, setMedico] = useState({})

    useEffect(() => {
        dispatch( traerDatosMedico( {idMedico: user.idMedico} ) )
    
        return () => {
            dispatch( resetearMedicoAccion() )
        }
    },[])

    useEffect(() => {
        if(Object.keys(state.datos).length > 0 && !Object.keys(medico).length) 
            setMedico({...state.datos})
        if(state.okResponse) { // si recibo una respuesta correcta
            dispatch( modificarUsuarioAccion(state.okResponse) )
            setModificar(false)
        }
        console.log(state.datos)
    },[state])

    const toggleDialogFirmar = () => {
        setOpenFirmar(!openFirmar)
    }

    const handleInputMedicoChange = (event) => {
        let name = event.target.name
        let value = event.target.value || event.target.checked
        console.log(value)
        setError({ ...error, [name]: '' })
        if(name === 'usaFirmaAutomatica' && value) toggleDialogFirmar()
        if((name === 'matricula' || name === 'telefono' || name === 'dni') && !/^[0-9]*$/.test(value)) value = value.substring(0, value.length-1)
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

    const handleMedicoFirma = (value) => {
        setMedico({
            ...medico,
            archivoFirmaDigital: value
        })
    }

    const validate = () => {
        let newError = {}
        let auxMedico = medico
        setError({})
        if(medico.matricula.length > 7) newError.matricula = 'La matricula debe contener hasta 7 caracteres'
        if(!(medico.dni.length >= 7 && medico.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        Object.keys(medico).forEach(key => {
            if((key === 'nombre' || key === 'apellido') && !sonLetras(medico[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(medico[key] === '' && key !== 'telefono' && key !== 'archivoDni') 
                newError[key] = 'El campo no debe estar vacio'
        })
        setError(newError)
        console.log(newError)
        console.log(auxMedico)
        if(!Object.keys(newError).length)
          dispatch( modificarMedicoAccion( auxMedico ) )
    }

    return (
        <div className="container">
            <ProfileDialogFirma 
            open={openFirmar}
            toggleDialog={toggleDialogFirmar}
            handle={handleMedicoFirma}/>
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Paper
                    component="form"
                    onSubmit={validate}
                    elevation={3}
                    className="p-2">
                        <h4 className="text-center">Mi información</h4>
                        {   (state.errorResponse || state.okResponse) &&
                            <Alert
                            classes={{
                                message: 'w-100'
                            }}
                            severity={state.errorResponse ? 'error': 'success'}
                            className="mb-4">
                                <div className="d-flex justify-content-center">
                                    <span>{state.errorResponse || '¡Cambios guardados con exito!'}</span>
                                </div>
                            </Alert>
                        }
                        {   !Object.keys(state.datos).length ?
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <CircularProgress />
                                <span className="mt-2">Solicitando información...</span>
                            </div>
                            :
                            <>
                            <div className="form-group text-left w-100">
                                <AppInput 
                                error={error.nombre}
                                name="nombre"
                                label="Nombre(s)"
                                handle={handleInputMedicoChange}
                                value={medico.nombre}
                                disabled={!modificar}/>
                            </div>
                            <div className="form-group text-left">
                                <AppInput 
                                error={error.apellido}
                                name="apellido"
                                label="Apellido(s)"
                                handle={handleInputMedicoChange}
                                value={medico.apellido}
                                disabled={!modificar}/>
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
                                            value={medico.dni}
                                            disabled={!modificar}/>
                                        </div>
                                        <div className="col-12">
                                            <AppInput 
                                            error={error.telefono}
                                            name="telefono"
                                            label="Telefono (opcional)"
                                            handle={handleInputMedicoChange}
                                            value={medico.telefono}
                                            disabled={!modificar}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5 pl-1 text-center">
                                    {
                                        !medico.archivoDni &&
                                        <label className="font-weight-bold">Foto DNI</label>
                                    }
                                    {
                                        medico.archivoDni || modificar ?     
                                        <RegisterPhoto
                                        disabled={!modificar || state.loading}
                                        handle={handleMedicoPhoto}
                                        value={medico.archivoDni} />
                                        :
                                        <div>Sin foto</div>    
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <AppInput 
                                error={error.matricula}
                                name="matricula"
                                label="Matricula"
                                handle={handleMedicoPhoto}
                                value={medico.matricula}
                                disabled={true}/>
                            </div>
                            <div className="form-group">
                                <p>TIPO: <span className="font-weight-bold">{medico.tipoMatricula}</span></p>
                            </div>
                            <div className="form-group text-center">
                                <h4>Configuración</h4>
                            </div>
                            <div className="form-group row justify-content-between align-items-center">
                                <div className="col-6">
                                    <span className="font-weight-bold">Firma automatica</span>
                                </div>
                                <div className="col-6 text-right">
                                    <Switch
                                        checked={medico.usaFirmaAutomatica || false}
                                        onChange={handleInputMedicoChange}
                                        name="usaFirmaAutomatica"
                                        disabled={!modificar || state.loading}
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                </div>
                            </div>
                            <div className="text-center form-group">
                            {   !modificar ?
                                <Button 
                                size="large" 
                                color="primary" 
                                variant="contained"
                                startIcon={
                                        false &&
                                        <CircularProgress size={20} color="inherit"/>
                                }
                                onClick={() => setModificar(true)}>
                                Modificar datos
                                </Button> 
                                :
                                <div className="d-flex justify-content-between">
                                    <Button 
                                    size="large" 
                                    color="primary" 
                                    variant="outlined"
                                    onClick={() => {
                                        setModificar(false)
                                        setMedico({...state.datos})
                                    }}
                                    disabled={state.loading}>
                                    Cancelar
                                    </Button>
                                    <Button 
                                    size="large" 
                                    color="primary" 
                                    variant="contained"
                                    startIcon={
                                            state.loading &&
                                            <CircularProgress size={20} color="inherit"/>
                                    }
                                    onClick={validate}>
                                        {   state.loading ?
                                            'Guardando...'
                                            :
                                            'Guardar cambios'
                                        }
                                    </Button>
                                </div>
                            }
                            </div>
                            </>
                        }
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Profile;