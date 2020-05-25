import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment, IconButton, Button,CircularProgress, Paper } from '@material-ui/core'
import { VisibilityOff, Visibility } from '@material-ui/icons'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verificarTokenAccion, cambiarPasswordAccion } from '../../redux/newPasswordDuck'

import DialogNewPassword from '../../components/DialogNewPassword'

const NewPassword = (props) => {
    
    const dispatch = useDispatch()

    const state = useSelector(state => state.newPassword)

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState({
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({})

    const token = new URLSearchParams(useLocation().search).get('token')

    useEffect(() => {
        dispatch( verificarTokenAccion(token) )
    },[])

    const validate = () => {
        let newError = {}
        if(password.password !== password.confirmPassword) newError.confirmPassword = 'Las contraseñas no coinciden'
        if(!password.password) newError.password = 'El campo no debe estar vacio'
        if(!password.confirmPassword) newError.confirmPassword = 'El campo no debe estar vacio'
        setError(newError)
        if(!Object.keys(newError).length){
            let aux = state.medico;
            aux.password = password.password
            dispatch( cambiarPasswordAccion(aux) )
        }
    }
    
    return (
        <div className="container h-100">
            <DialogNewPassword message={state.okResponse} />
            <div className="row justify-content-center">
                <Paper 
                elevation={3}
                action="/" method="POST" className="border pt-3 col-12 col-md-8 col-lg-8 text-center">
                    <h4 className="mb-3">Escriba su nueva contraseña</h4>
                    <div className="form-group text-left">
                        <TextField 
                        helperText={error.password}
                        disabled={state.loading || !!state.errorResponse}
                        error={!!error.password} 
                        type={showPassword ? 'text' : 'password'}
                        fullWidth={true}
                        value={password.password} 
                        name="password"
                        onChange={(event) => setPassword({...password, password: event.target.value})}
                        label="Contraseña" 
                        variant="outlined" 
                        InputProps={{
                            endAdornment: 
                            <InputAdornment
                            position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <Visibility /> : <VisibilityOff />
                                    }
                                </IconButton>
                            </InputAdornment>,
                        }}/>
                    </div>
                    <div className="form-group text-left mb-2">
                        <TextField 
                        helperText={error.confirmPassword}
                        disabled={state.loading || !!state.errorResponse}
                        error={!!error.confirmPassword} 
                        fullWidth={true}
                        type="password"
                        value={password.confirmPassword} 
                        name="confirmPassword"
                        onChange={(event) => setPassword({...password, confirmPassword: event.target.value})}
                        label="Contraseña" 
                        variant="outlined"/>
                    </div>
                    <div className="form-group mt-3 row flex-column align-items-center">
                        {   state.errorResponse &&
                            <span className="text-error col-12 p-0 mb-2">{state.errorResponse}</span>
                        }
                        <Button
                        disabled={state.loading || !!state.errorResponse}
                        color="primary"
                        startIcon={
                            state.loading &&
                            <CircularProgress size={20} color="inherit"/>
                        }
                        onClick={validate}
                        variant="contained">
                            Reestablecer
                        </Button>
                    </div>
                </Paper>
            </div>
        </div>
    )
}

export default NewPassword