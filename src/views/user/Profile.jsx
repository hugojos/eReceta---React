import React, { useState, useEffect } from 'react'
import { Paper, CircularProgress, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useSelector, useDispatch } from 'react-redux'
import { modificarMedicoAccion } from '../../redux/modificarDatosDuck'
import FormInput from '../../components/FormInput'
import RegisterPhoto from '../../components/register/RegisterPhoto'

const Profile = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.auth.user)

    const [medico, setMedico] = useState({
        nombre: user.nombre,
        apellido: user.apellido,
        dni: user.dni,
        telefono: user.telefono,
        matricula: user.matricula,
        tipoMatricula: user.tipoMatricula,
        fotoDni: '',
    })

    const [modificar, setModificar] = useState(false)

    const [error, setError] = useState({})

    useEffect(() => {
        dispatch( modificarMedicoAccion( user ) )
    },[])

    const handleInputMedicoChange = (event) => {
        let name = event.target.name
        let value = event.target.value
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
        let onlyLetters = /^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/
        let newError = {}
        let auxMedico = medico
        setError({})
        if(!(medico.dni.length >= 7 && medico.dni.length <= 8)) newError.dni = 'El DNI debe tener entre 7 y 8 digitos'
        Object.keys(medico).forEach(key => {
            if((key == 'nombre' || key == 'apellido') && !onlyLetters.test(medico[key]))
                newError[key] = 'El campo debe contener solo letras'
            if(medico[key] == '' && key != 'telefono' && key != 'fotoDni') 
                newError[key] = 'El campo no debe estar vacio'
        })
        setError(newError)
        console.log(newError)
        console.log(auxMedico)
        //if(!Object.keys(newError).length)
          //  dispatch( registrarAccion( auxMedico ) )
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Alert 
                    classes={{
                        message: 'w-100'
                    }}
                    severity="error"
                    className="mb-2">
                        <div className="d-flex justify-content-center">
                            <span>hika</span>
                        </div>
                    </Alert>
                    <Paper
                    elevation={3}
                    className="p-2">
                        <h2 className="text-center">Mi información</h2>
                        <div className="form-group text-left w-100">
                            <FormInput 
                            error={error.nombre}
                            name="nombre"
                            label="Nombre(s)"
                            handle={handleInputMedicoChange}
                            value={medico.nombre}
                            disabled={!modificar}/>
                        </div>
                        <div className="form-group text-left">
                            <FormInput 
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
                                        <FormInput 
                                        error={error.dni}
                                        name="dni"
                                        label="DNI"
                                        handle={handleInputMedicoChange}
                                        value={medico.dni}
                                        disabled={!modificar}/>
                                    </div>
                                    <div className="col-12">
                                        <FormInput 
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
                                    !medico.fotoDni &&
                                    <label className="font-weight-bold">Foto DNI</label>
                                }
                                <RegisterPhoto
                                disabled={!modificar}
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
                            value={medico.matricula}
                            disabled={!modificar}/>
                        </div>
                        <div className="form-group">
                            <p>TIPO: <span className="font-weight-bold">{medico.tipoMatricula}</span></p>
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
                                    onClick={() => setModificar(false)}>
                                    Cancelar
                                    </Button>
                                    <Button 
                                    size="large" 
                                    color="primary" 
                                    variant="contained"
                                    startIcon={
                                            false &&
                                            <CircularProgress size={20} color="inherit"/>
                                    }
                                    onClick={() => setModificar(true)}>
                                    Guardar cambios
                                    </Button>
                                </div>
                            }
                        </div>
                    </Paper>
                </div>
            </div>
        </div>
    )
}

export default Profile;