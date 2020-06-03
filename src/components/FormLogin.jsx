import React, {useState} from 'react'

import { TextField, Button, InputAdornment, IconButton, CircularProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { iniciarSesionAccion } from '../redux/authDuck'

const FormLogin = (props) => {

    const dispatch = useDispatch()

    const loadingLogin = useSelector(state => state.auth.loading)

    const errorResponse = useSelector(state => state.auth.errorResponse)

	const [state, setState] = useState({
		showPassword: false,
		loading: false
    })
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState({})

	const handleInputChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value
		})
	}

	const handleToggleShowPassword = () => {
		setState({
			...state,
			showPassword: !state.showPassword
		})
    }

    const validate = () => {
        setError({})
        let newError = {}
        Object.keys(user).forEach(key => {
            if(!user[key]) 
                newError[key] = 'El campo no debe estar vacio'
        })
        setError(newError)
        if(!Object.keys(newError).length) dispatch( iniciarSesionAccion(user) )
    }
    
    return (
        <form 
        onKeyPress={event => event.key === 'Enter' ? validate() : ''}
        action="" className="d-flex justify-content-center text-left">
            <div className="row w-100 justify-content-center">
                <div className="col-12">
                    {   !!errorResponse &&
                        <Alert 
                        classes={{
                            message: 'w-100'
                        }}
                        severity="error"
                        className="mb-4">
                            <div className="d-flex justify-content-center">
                                <span>{errorResponse}</span>
                            </div>
                        </Alert>
                    }
                </div>
                <div className="col-12 form-group">
                    <TextField
                    helperText={error.email}
                    error={error.email !== undefined} 
                    onChange={handleInputChange}
                    type="email"
                    fullWidth={true}
                    name="email"
                    label="Email"
                    variant="outlined" />
                </div>
                <div className="col-12 form-group">
                    <TextField 
                    helperText={error.password}
                    error={error.password !== undefined} 
                    type={state.showPassword ? 'text' : 'password'}
                    fullWidth={true} 
                    name="password"
                    onChange={handleInputChange}
                    label="Contraseña" 
                    variant="outlined" 
                    InputProps={{
                        endAdornment: 
                        <InputAdornment
                        position="end">
                            <IconButton aria-label="" onClick={handleToggleShowPassword}>
                                {
                                    state.showPassword ? <Visibility /> : <VisibilityOff />
                                }
                            </IconButton>
                        </InputAdornment>,
                    }}/>
                    <Link to="/recuperar" className="small">Olvidé mi contraseña</Link>
                </div>
                <div className="col-12 form-group text-center">
                    <Button
                    size="large"
                    onClick={validate}
                    variant="contained"
                    color="primary"
                    startIcon={
                        loadingLogin &&
                        <CircularProgress size={20} color="inherit"/>
                    }>
                        Acceder
                    </Button>
                </div>
                <div className="col-12 text-center">
                    <span className="text-muted">¿No tienes cuenta? <Link to="/registrarse"> Regístrate</Link></span>
                </div>
            </div>
        </form>
    )
}

export default FormLogin